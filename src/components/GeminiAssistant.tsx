import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

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
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction: `You are the official digital assistant for the Municipality of Talibon, Bohol, Philippines. 
          Your goal is to provide accurate, helpful, and polite information about the LGU's services, tourism, and history.
          Keep your responses concise and professional. Use "Mabuhay!" as a greeting.
          If you don't know something specific about a local ordinance not in your training, advise the user to contact the relevant department or visit the Municipal Hall.
          Talibon is the "Seafood Capital of Bohol".
          The current Mayor is Hon. Michael I. Doria.
          Key services include e-BOSS (Business One-Stop Shop), e-Permits, and e-Clearance.`,
        }
      });

      const botResponse = response.text || "I'm sorry, I couldn't process that request. Please try again.";
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
