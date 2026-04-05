import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { supabase } from '../lib/supabase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { googleProvider } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, LogOut, Upload, Trash2, FileText, CheckCircle, AlertCircle, ShieldCheck, Plus, X, Search, Folder, ChevronRight, Download } from 'lucide-react';

interface Ordinance {
  id: string;
  title: string;
  year: string;
  file_url: string;
  file_name?: string;
  file_size?: string;
  created_at: string;
}

const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ordinances, setOrdinances] = useState<Ordinance[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Bulk Upload State
  const [uploadQueue, setUploadQueue] = useState<{ file: File; title: string; year: string; progress: number; status: 'pending' | 'uploading' | 'success' | 'error'; error?: string }[]>([]);
  const [isBatchUploading, setIsBatchUploading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // We'll trust the email for now, or you can add a 'admins' table in Supabase too
        const isDefaultAdmin = currentUser.email === 'labradarenz@gmail.com';
        setIsAdmin(isDefaultAdmin);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchOrdinances();
    }
  }, [isAdmin]);

  const fetchOrdinances = async () => {
    const { data, error } = await supabase
      .from('ordinances')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching ordinances:", error);
    } else {
      setOrdinances(data || []);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = () => signOut(auth);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    addFilesToQueue(files);
  };

  const addFilesToQueue = (files: File[]) => {
    const newItems = files.map(file => {
      const yearMatch = file.name.match(/\b(20\d{2})\b/);
      const guessedYear = yearMatch ? yearMatch[0] : new Date().getFullYear().toString();
      
      return {
        file,
        title: file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
        year: guessedYear,
        progress: 0,
        status: 'pending' as const
      };
    });
    setUploadQueue(prev => [...prev, ...newItems]);
  };

  const startBatchUpload = async () => {
    if (isBatchUploading || uploadQueue.length === 0) return;
    setIsBatchUploading(true);

    for (let i = 0; i < uploadQueue.length; i++) {
      const item = uploadQueue[i];
      if (item.status === 'success') continue;

      setUploadQueue(prev => prev.map((it, idx) => idx === i ? { ...it, status: 'uploading' } : it));

      try {
        const fileExt = item.file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${item.year}/${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('ordinances')
          .upload(filePath, item.file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('ordinances')
          .getPublicUrl(filePath);

        const fileSize = (item.file.size / (1024 * 1024)).toFixed(2) + ' MB';

        const { error: dbError } = await supabase
          .from('ordinances')
          .insert([
            {
              title: item.title,
              year: item.year,
              file_url: publicUrl,
              file_name: item.file.name,
              file_size: fileSize,
              author_uid: user?.uid,
            }
          ]);

        if (dbError) throw dbError;

        setUploadQueue(prev => prev.map((it, idx) => idx === i ? { ...it, status: 'success', progress: 100 } : it));
        fetchOrdinances();
      } catch (err: any) {
        setUploadQueue(prev => prev.map((it, idx) => idx === i ? { ...it, status: 'error', error: err.message } : it));
      }
    }
    setIsBatchUploading(false);
  };

  const removeFromQueue = (index: number) => {
    setUploadQueue(prev => prev.filter((_, i) => i !== index));
  };

  const updateQueueItem = (index: number, updates: Partial<typeof uploadQueue[0]>) => {
    setUploadQueue(prev => prev.map((item, i) => i === index ? { ...item, ...updates } : item));
  };

  const handleDelete = async (id: string, fileUrl: string) => {
    if (window.confirm('Are you sure you want to delete this ordinance?')) {
      try {
        // Delete from DB
        const { error: dbError } = await supabase
          .from('ordinances')
          .delete()
          .eq('id', id);

        if (dbError) throw dbError;

        // Try to delete from storage if possible (optional, requires more logic to parse path)
        // For now, just refresh the list
        fetchOrdinances();
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100 text-center"
        >
          <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-blue-600">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight uppercase">Admin Access</h1>
          <p className="text-gray-500 font-medium mb-12 leading-relaxed">
            This area is restricted to authorized personnel only. Please sign in with your official account.
          </p>
          
          <button
            onClick={handleLogin}
            className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xs tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 group"
          >
            <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
            SIGN IN WITH GOOGLE
          </button>

          {!isAdmin && user && (
            <div className="mt-8 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-black uppercase tracking-widest border border-red-100 flex items-center gap-2">
              <AlertCircle size={16} />
              Access Denied: Not an Admin
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <ShieldCheck size={24} />
              </div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-2 text-gray-400 font-bold text-sm tracking-widest">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              LOGGED IN AS: <span className="text-blue-600">{user.email}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center gap-2 group"
            >
              <Plus size={18} className="group-hover:rotate-90 transition-transform" />
              NEW ORDINANCE
            </button>
            <button
              onClick={handleLogout}
              className="px-8 py-4 bg-white text-gray-400 rounded-2xl font-black text-xs tracking-widest hover:bg-gray-100 border border-gray-100 transition-all flex items-center gap-2"
            >
              <LogOut size={18} />
              LOGOUT
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Ordinances</p>
            <p className="text-4xl font-black text-gray-900">{ordinances.length}</p>
          </div>
          <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Latest Year</p>
            <p className="text-4xl font-black text-gray-900">{ordinances[0]?.year || 'N/A'}</p>
          </div>
          <div className="p-8 bg-blue-600 text-white rounded-[2.5rem] shadow-xl shadow-blue-500/20">
            <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest mb-2">System Status</p>
            <p className="text-4xl font-black">ACTIVE</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Recent Uploads</h2>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Filter..." className="bg-gray-50 border border-transparent rounded-xl py-2 pl-10 pr-4 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-400/20" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Ordinance Title</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Year</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date Uploaded</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Size</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {ordinances.map((ord) => (
                  <tr key={ord.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                          <FileText size={18} />
                        </div>
                        <span className="font-bold text-gray-900 line-clamp-1">{ord.title}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-[10px] font-black uppercase tracking-widest">
                        {ord.year}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-gray-400">
                      {new Date(ord.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-gray-400">
                      {ord.file_size}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        <a href={ord.file_url} target="_blank" rel="noopener noreferrer" className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                          <Download size={18} />
                        </a>
                        <button 
                          onClick={() => handleDelete(ord.id, ord.file_url)}
                          className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isBatchUploading && setIsModalOpen(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Bulk Upload Ordinances</h2>
                <button 
                  onClick={() => !isBatchUploading && setIsModalOpen(false)}
                  className="p-2 text-gray-400 hover:bg-gray-100 rounded-xl"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 max-h-[70vh] overflow-y-auto space-y-6">
                {/* Dropzone */}
                <div 
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const files = Array.from(e.dataTransfer.files);
                    addFilesToQueue(files);
                  }}
                  className="border-2 border-dashed border-gray-200 rounded-[2rem] p-12 text-center hover:border-blue-400 hover:bg-blue-50 transition-all group cursor-pointer"
                  onClick={() => document.getElementById('bulk-file-input')?.click()}
                >
                  <input 
                    id="bulk-file-input"
                    type="file" 
                    multiple 
                    accept=".pdf" 
                    className="hidden" 
                    onChange={handleFileSelect}
                  />
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                    <Upload size={32} />
                  </div>
                  <p className="text-sm font-black text-gray-900 uppercase tracking-tight">Drag & Drop PDFs here</p>
                  <p className="text-xs font-medium text-gray-400 mt-2">or click to browse files</p>
                </div>

                {/* Queue */}
                {uploadQueue.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center px-4">
                      <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Upload Queue ({uploadQueue.length})</h3>
                      <button 
                        onClick={() => setUploadQueue([])}
                        className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline"
                      >
                        Clear All
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {uploadQueue.map((item, idx) => (
                        <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400">
                            <FileText size={20} />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <input 
                              type="text" 
                              value={item.title}
                              onChange={(e) => updateQueueItem(idx, { title: e.target.value })}
                              className="w-full bg-transparent font-bold text-sm text-gray-900 focus:outline-none focus:text-blue-600"
                            />
                            <div className="flex items-center gap-2 mt-1">
                              <input 
                                type="text" 
                                value={item.year}
                                onChange={(e) => updateQueueItem(idx, { year: e.target.value })}
                                className="w-16 bg-white border border-gray-200 rounded px-1 text-[10px] font-black text-gray-500"
                              />
                              <span className="text-[10px] font-medium text-gray-400">{(item.file.size / 1024 / 1024).toFixed(2)} MB</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            {item.status === 'uploading' && (
                              <div className="w-12 h-12 relative flex items-center justify-center">
                                <svg className="w-full h-full -rotate-90">
                                  <circle cx="24" cy="24" r="20" fill="none" stroke="#f3f4f6" strokeWidth="4" />
                                  <circle cx="24" cy="24" r="20" fill="none" stroke="#2563eb" strokeWidth="4" strokeDasharray={125.6} strokeDashoffset={125.6 - (125.6 * item.progress) / 100} />
                                </svg>
                                <span className="absolute text-[8px] font-black">{Math.round(item.progress)}%</span>
                              </div>
                            )}
                            {item.status === 'success' && <CheckCircle className="text-green-500" size={20} />}
                            {item.status === 'error' && <AlertCircle className="text-red-500" size={20} />}
                            {item.status === 'pending' && (
                              <button onClick={() => removeFromQueue(idx)} className="p-2 text-gray-400 hover:text-red-500">
                                <X size={16} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-8 bg-gray-50 border-t border-gray-100">
                <button
                  onClick={startBatchUpload}
                  disabled={isBatchUploading || uploadQueue.length === 0}
                  className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xs tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isBatchUploading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Upload size={18} />
                      START UPLOADING {uploadQueue.length} FILES
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
