import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, addDoc, Timestamp, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, Square, Loader2, Save, Trash2, 
  FileText, History, MessageSquare, 
  CheckCircle, AlertCircle, Play, Pause
} from 'lucide-react';

const MeetingAssistant: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [summary, setSummary] = useState('');
  const [title, setTitle] = useState('');
  const [meetings, setMeetings] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (!isAdmin) return;

    const q = query(collection(db, 'meetings'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMeetings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'meetings');
    });

    return () => unsubscribe();
  }, [isAdmin]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await processAudio(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setError(null);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setError("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const processAudio = async (audioBlob: Blob) => {
    setIsProcessing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const base64Audio = await blobToBase64(audioBlob);

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            parts: [
              { text: "You are a professional municipal secretary. Please transcribe the following audio recording from a local government meeting and then provide a concise summary in bullet points of the key discussion items, decisions made, and action points. Format the output as: \n\nTRANSCRIPTION:\n[Full transcription here]\n\nSUMMARY:\n- [Point 1]\n- [Point 2]" },
              { inlineData: { data: base64Audio, mimeType: "audio/webm" } }
            ]
          }
        ]
      });

      const resultText = response.text || "";
      const [transPart, sumPart] = resultText.split("SUMMARY:");
      
      setTranscription(transPart.replace("TRANSCRIPTION:", "").trim());
      setSummary(sumPart ? sumPart.trim() : "No summary generated.");
      
      if (!title) {
        setTitle(`Meeting - ${new Date().toLocaleDateString()}`);
      }
    } catch (err) {
      console.error("Error processing audio with Gemini:", err);
      setError("Failed to process audio. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const saveMeeting = async () => {
    if (!title || !summary) {
      setError("Please provide a title and ensure a summary was generated.");
      return;
    }

    try {
      await addDoc(collection(db, 'meetings'), {
        title,
        summary,
        transcription,
        date: Timestamp.now(),
        author: user?.email || 'Admin'
      });
      setSuccess("Meeting summary saved successfully!");
      setTitle('');
      setSummary('');
      setTranscription('');
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'meetings');
    }
  };

  const deleteMeeting = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this meeting record?")) return;
    try {
      await deleteDoc(doc(db, 'meetings', id));
      setSuccess("Meeting record deleted.");
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, 'meetings');
    }
  };

  return (
    <div className="space-y-8">
      {/* Recording Section */}
      <div className="civic-card p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-brand-text tracking-tight font-display uppercase">Meeting Assistant</h2>
            <p className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em]">Record and summarize municipal discussions in real-time.</p>
          </div>
          <div className="flex items-center gap-3">
            {isRecording && (
              <motion.div 
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="flex items-center gap-2 px-4 py-2 bg-brand-secondary/10 text-brand-secondary rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-brand-secondary/20"
              >
                <div className="w-2 h-2 bg-brand-secondary rounded-full" />
                Listening...
              </motion.div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Controls & Input */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em] ml-1">Meeting Title</label>
              <input 
                type="text" 
                placeholder="e.g., Sangguniang Bayan Weekly Session"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-brand-bg border-2 border-brand-border rounded-2xl py-4 px-6 font-bold text-brand-text focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all"
              />
            </div>

            <div className="flex gap-4">
              {!isRecording ? (
                <button 
                  onClick={startRecording}
                  disabled={isProcessing}
                  className="civic-button-primary flex-1 py-5 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <Mic size={20} />
                  START LISTENING
                </button>
              ) : (
                <button 
                  onClick={stopRecording}
                  className="flex-1 py-5 bg-brand-secondary text-white rounded-2xl font-black text-[10px] tracking-[0.2em] hover:bg-brand-secondary/90 transition-all shadow-2xl shadow-brand-secondary/20 flex items-center justify-center gap-3 uppercase"
                >
                  <Square size={20} />
                  STOP & SUMMARIZE
                </button>
              )}
            </div>

            {isProcessing && (
              <div className="flex flex-col items-center justify-center py-12 bg-brand-bg rounded-[2.5rem] border-2 border-dashed border-brand-primary/20">
                <Loader2 size={40} className="text-brand-primary animate-spin mb-4" />
                <p className="text-[10px] font-black text-brand-text uppercase tracking-[0.2em]">Gemini is analyzing audio...</p>
                <p className="text-xs font-medium text-brand-muted mt-2">Transcribing and summarizing discussion points.</p>
              </div>
            )}

            {summary && !isProcessing && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="p-8 bg-brand-primary/5 rounded-[2rem] border-2 border-brand-primary/10">
                  <h3 className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                    <CheckCircle size={14} />
                    Generated Summary
                  </h3>
                  <div className="prose prose-sm max-w-none text-brand-text font-medium whitespace-pre-wrap leading-relaxed">
                    {summary}
                  </div>
                </div>
                
                <button 
                  onClick={saveMeeting}
                  className="w-full py-4 bg-brand-text text-white rounded-2xl font-black text-[10px] tracking-[0.2em] hover:bg-black transition-all flex items-center justify-center gap-3 shadow-2xl shadow-brand-text/20 uppercase"
                >
                  <Save size={18} />
                  SAVE TO RECORDS
                </button>
              </motion.div>
            )}
          </div>

          {/* Transcription Preview */}
          <div className="space-y-4">
            <label className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em] flex items-center gap-2 ml-1">
              <FileText size={14} />
              Full Transcription
            </label>
            <div className="h-[400px] bg-brand-bg rounded-[2.5rem] p-8 overflow-y-auto border-2 border-brand-border shadow-inner">
              {transcription ? (
                <p className="text-sm text-brand-text leading-relaxed font-medium whitespace-pre-wrap">
                  {transcription}
                </p>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-brand-muted/20">
                  <MessageSquare size={48} className="mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-[0.2em]">No transcription yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="civic-card p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-brand-bg rounded-xl flex items-center justify-center text-brand-primary shadow-sm border border-brand-primary/5">
            <History size={24} />
          </div>
          <h2 className="text-xl font-black text-brand-text tracking-tight font-display uppercase">Recent Meetings</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {meetings.map((meeting) => (
            <motion.div 
              key={meeting.id}
              layout
              className="group p-8 bg-brand-bg rounded-[2.5rem] border-2 border-transparent hover:border-brand-primary/20 hover:bg-white transition-all shadow-sm hover:shadow-2xl hover:shadow-brand-primary/5"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-black text-brand-text group-hover:text-brand-primary transition-colors font-display uppercase tracking-tight">{meeting.title}</h3>
                  <p className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em] mt-1">
                    {meeting.date?.toDate().toLocaleDateString()} • {meeting.author}
                  </p>
                </div>
                <button 
                  onClick={() => deleteMeeting(meeting.id)}
                  className="p-2 text-brand-muted/40 hover:text-brand-secondary hover:bg-brand-secondary/10 rounded-xl transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="text-sm text-brand-muted font-medium line-clamp-3 whitespace-pre-wrap leading-relaxed">
                {meeting.summary}
              </div>
            </motion.div>
          ))}
          
          {meetings.length === 0 && (
            <div className="col-span-full py-16 text-center bg-brand-bg rounded-[2.5rem] border-2 border-dashed border-brand-border">
              <p className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em]">No meeting records found</p>
            </div>
          )}
        </div>
      </div>

      {/* Notifications */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 bg-red-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 z-[200]"
          >
            <AlertCircle size={20} />
            <span className="font-bold text-sm">{error}</span>
            <button onClick={() => setError(null)} className="ml-4 hover:opacity-70"><X size={18} /></button>
          </motion.div>
        )}
        {success && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 bg-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 z-[200]"
          >
            <CheckCircle size={20} />
            <span className="font-bold text-sm">{success}</span>
            <button onClick={() => setSuccess(null)} className="ml-4 hover:opacity-70"><X size={18} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const X = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
  </svg>
);

export default MeetingAssistant;
