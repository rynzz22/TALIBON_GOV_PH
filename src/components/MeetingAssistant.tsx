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
      <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Meeting Assistant</h2>
            <p className="text-sm font-bold text-gray-400">Record and summarize municipal discussions in real-time.</p>
          </div>
          <div className="flex items-center gap-3">
            {isRecording && (
              <motion.div 
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest"
              >
                <div className="w-2 h-2 bg-red-600 rounded-full" />
                Listening...
              </motion.div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls & Input */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Meeting Title</label>
              <input 
                type="text" 
                placeholder="e.g., Sangguniang Bayan Weekly Session"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-6 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
              />
            </div>

            <div className="flex gap-4">
              {!isRecording ? (
                <button 
                  onClick={startRecording}
                  disabled={isProcessing}
                  className="flex-1 py-5 bg-blue-600 text-white rounded-2xl font-black text-xs tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <Mic size={20} />
                  START LISTENING
                </button>
              ) : (
                <button 
                  onClick={stopRecording}
                  className="flex-1 py-5 bg-red-600 text-white rounded-2xl font-black text-xs tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-500/20 flex items-center justify-center gap-3"
                >
                  <Square size={20} />
                  STOP & SUMMARIZE
                </button>
              )}
            </div>

            {isProcessing && (
              <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                <Loader2 size={40} className="text-blue-600 animate-spin mb-4" />
                <p className="text-sm font-black text-gray-900 uppercase tracking-widest">Gemini is analyzing audio...</p>
                <p className="text-xs font-bold text-gray-400 mt-2">Transcribing and summarizing discussion points.</p>
              </div>
            )}

            {summary && !isProcessing && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                  <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <CheckCircle size={14} />
                    Generated Summary
                  </h3>
                  <div className="prose prose-sm max-w-none text-gray-700 font-medium whitespace-pre-wrap">
                    {summary}
                  </div>
                </div>
                
                <button 
                  onClick={saveMeeting}
                  className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-xs tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3"
                >
                  <Save size={18} />
                  SAVE TO RECORDS
                </button>
              </motion.div>
            )}
          </div>

          {/* Transcription Preview */}
          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <FileText size={14} />
              Full Transcription
            </label>
            <div className="h-[400px] bg-gray-50 rounded-[2rem] p-6 overflow-y-auto border border-gray-100">
              {transcription ? (
                <p className="text-sm text-gray-600 leading-relaxed font-medium whitespace-pre-wrap">
                  {transcription}
                </p>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-300">
                  <MessageSquare size={48} className="mb-4 opacity-20" />
                  <p className="text-xs font-black uppercase tracking-widest">No transcription yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gray-100 rounded-xl">
            <History size={20} className="text-gray-600" />
          </div>
          <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Recent Meetings</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {meetings.map((meeting) => (
            <motion.div 
              key={meeting.id}
              layout
              className="group p-6 bg-gray-50 rounded-[2rem] border border-transparent hover:border-blue-100 hover:bg-white transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">{meeting.title}</h3>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                    {meeting.date?.toDate().toLocaleDateString()} • {meeting.author}
                  </p>
                </div>
                <button 
                  onClick={() => deleteMeeting(meeting.id)}
                  className="p-2 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="text-sm text-gray-600 font-medium line-clamp-3 whitespace-pre-wrap">
                {meeting.summary}
              </div>
            </motion.div>
          ))}
          
          {meetings.length === 0 && (
            <div className="col-span-full py-12 text-center bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-100">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">No meeting records found</p>
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
            className="fixed bottom-8 right-8 bg-red-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-[200]"
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
            className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-[200]"
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
