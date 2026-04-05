import React, { useState, useEffect } from 'react';
import { auth, db, storage, googleProvider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, LogOut, Upload, Trash2, FileText, CheckCircle, AlertCircle, ShieldCheck, Plus, X, Search, Folder, ChevronRight, Download } from 'lucide-react';

interface Ordinance {
  id: string;
  title: string;
  year: string;
  fileUrl: string;
  fileName?: string;
  fileSize?: string;
  createdAt: any;
}

const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ordinances, setOrdinances] = useState<Ordinance[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Check if user is admin
        const adminDoc = await getDoc(doc(db, 'admins', currentUser.uid));
        const isDefaultAdmin = currentUser.email === 'labradarenz@gmail.com';
        setIsAdmin(adminDoc.exists() || isDefaultAdmin);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      const q = query(collection(db, 'ordinances'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ordinance));
        setOrdinances(docs);
      });
      return () => unsubscribe();
    }
  }, [isAdmin]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = () => signOut(auth);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !year || !user) return;

    setIsUploading(true);
    setError(null);

    try {
      const storageRef = ref(storage, `ordinances/${year}/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (err) => {
          setError(err.message);
          setIsUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const fileSize = (file.size / (1024 * 1024)).toFixed(2) + ' MB';

          await addDoc(collection(db, 'ordinances'), {
            title,
            year,
            fileUrl: downloadURL,
            fileName: file.name,
            fileSize,
            createdAt: new Date(),
            authorUid: user.uid,
          });

          setIsUploading(false);
          setIsModalOpen(false);
          setTitle('');
          setFile(null);
          setUploadProgress(0);
        }
      );
    } catch (err: any) {
      setError(err.message);
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this ordinance?')) {
      try {
        await deleteDoc(doc(db, 'ordinances', id));
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
                      {new Date(ord.createdAt?.seconds * 1000).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-gray-400">
                      {ord.fileSize}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        <a href={ord.fileUrl} target="_blank" rel="noopener noreferrer" className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                          <Download size={18} />
                        </a>
                        <button 
                          onClick={() => handleDelete(ord.id)}
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
              onClick={() => !isUploading && setIsModalOpen(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Upload Ordinance</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-400 hover:bg-gray-100 rounded-xl"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleUpload} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Ordinance Title</label>
                  <textarea
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter the full title of the ordinance..."
                    className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white focus:border-blue-200 transition-all min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Year Enacted</label>
                    <input
                      required
                      type="number"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white focus:border-blue-200 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">PDF File</label>
                    <input
                      required
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="w-full text-xs font-bold text-gray-400 file:mr-4 file:py-4 file:px-6 file:rounded-2xl file:border-0 file:text-[10px] file:font-black file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 transition-all cursor-pointer"
                    />
                  </div>
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-blue-600">Uploading...</span>
                      <span className="text-gray-400">{Math.round(uploadProgress)}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        className="h-full bg-blue-600"
                      />
                    </div>
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100 flex items-center gap-2">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xs tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Upload size={18} />
                      PUBLISH ORDINANCE
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
