import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { citizenCharterData, CharterService } from "../lib/citizenCharterData";

export default function GeminiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Mabuhay! I am your Talibon Digital Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getCitizenCharterRequirement: FunctionDeclaration = {
    name: "getCitizenCharterRequirement",
    description: "Retrieves the requirements, processing time, and office for a specific government service in Talibon.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        serviceName: {
          type: Type.STRING,
          description: "The name of the service (e.g., 'Business Permit', 'Building Permit', 'Mayor's Clearance').",
          enum: Object.keys(citizenCharterData)
        }
      },
      required: ["serviceName"]
    }
  };

  const handleFunctionCall = (name: string, args: any) => {
    if (name === "getCitizenCharterRequirement") {
      const service = args.serviceName as CharterService;
      const data = citizenCharterData[service];
      if (data) {
        return {
          service: service,
          requirements: data.requirements,
          processingTime: data.processingTime,
          office: data.office,
          status: "success"
        };
      }
      return { status: "not_found", message: "Service not found in the Digital Citizen's Charter." };
    }
    return null;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API Key is not configured.");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const contents = [
        ...messages.map(m => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.text }]
        })),
        { role: "user", parts: [{ text: userMessage }] }
      ];

      // Initial request with tools
      const firstResponse = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: contents,
        config: {
          systemInstruction: `You are the official digital assistant for the Municipality of Talibon, Bohol, Philippines. 
          Your goal is to provide accurate, helpful, and polite information about the LGU's services, tourism, and history.
          Use "Mabuhay!" as a greeting.
          Talibon is the "Seafood Capital of Bohol".
          The current Mayor is Hon. Janette A. Garcia.
          You have access to the Digital Citizen's Charter and Google Search.
          ALWAYS use the getCitizenCharterRequirement tool when asked about specific requirements for local permits or clearances.
          Use Google Search for real-time weather, sea conditions, or ongoing regional events in Bohol.`,
          tools: [
            { googleSearch: {} },
            { functionDeclarations: [getCitizenCharterRequirement] }
          ],
          toolConfig: { includeServerSideToolInvocations: true }
        }
      });

      let finalBotText = firstResponse.text;

      // Check if the model called a function
      const functionCalls = firstResponse.functionCalls;
      if (functionCalls && functionCalls.length > 0) {
        const functionCall = functionCalls[0];
        const toolResult = handleFunctionCall(functionCall.name, functionCall.args);
        
        if (toolResult) {
          // Second call to incorporate tool results
          const secondResponse = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: [
              ...contents,
              { role: "model", parts: [{ functionCall: functionCall }] },
              { role: "user", parts: [{ functionResponse: { name: functionCall.name, response: toolResult } }] }
            ],
            config: {
              systemInstruction: `Explain the requirements clearly based on the tool result provided.`,
            }
          });
          finalBotText = secondResponse.text;
        }
      }

      const botResponse = finalBotText || "I'm sorry, I couldn't process that request. Please try again.";
      setMessages(prev => [...prev, { role: "bot", text: botResponse }]);
    } catch (error) {
      console.error("Gemini Assistant Error:", error);
      const errorMessage = error instanceof Error && error.message.includes("Key") 
        ? "The AI assistant is currently unavailable due to a configuration issue. Please try again later."
        : "I'm having trouble connecting right now. Please try again later.";
      setMessages(prev => [...prev, { role: "bot", text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[500px] bg-white dark:bg-dark-surface rounded-[2.5rem] shadow-2xl border border-brand-border dark:border-dark-border overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-brand-primary text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-widest uppercase">Talibon AI</h3>
                  <p className="text-[10px] opacity-70 font-medium uppercase tracking-widest">Digital Assistant</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-xl transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-brand-primary text-white" : "bg-brand-surface dark:bg-dark-bg text-brand-primary"}`}>
                      {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm font-medium leading-relaxed ${msg.role === "user" ? "bg-brand-primary text-white rounded-tr-none" : "bg-brand-surface dark:bg-dark-bg text-brand-text dark:text-dark-text rounded-tl-none border border-brand-border dark:border-dark-border"}`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-surface dark:bg-dark-bg flex items-center justify-center text-brand-primary">
                      <Loader2 size={16} className="animate-spin" />
                    </div>
                    <div className="p-4 rounded-2xl bg-brand-surface dark:bg-dark-bg border border-brand-border dark:border-dark-border">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-brand-border dark:border-dark-border bg-brand-surface dark:bg-dark-bg/50">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me anything..."
                  className="w-full pl-6 pr-14 py-4 bg-white dark:bg-dark-surface border border-brand-border dark:border-dark-border rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary/20 dark:text-dark-text"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-2 p-2 bg-brand-primary text-white rounded-xl hover:bg-brand-primary/90 transition-all disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-brand-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-brand-primary/90 transition-all group relative"
      >
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-accent rounded-full border-4 border-white dark:border-dark-bg flex items-center justify-center animate-pulse">
          <span className="w-2 h-2 bg-white rounded-full" />
        </div>
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </motion.button>
    </div>
  );
}
