import React, { useState, useEffect } from 'react';
import { db, auth, signInWithGoogle, logout, handleFirestoreError, OperationType } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LogIn, LogOut, Upload, Trash2, FileText, CheckCircle, 
  AlertCircle, ShieldCheck, Plus, X, Search, Folder, 
  ChevronRight, Download, Newspaper, Users, Gavel, 
  LayoutDashboard, Edit3, Save, Image as ImageIcon, Calendar
} from 'lucide-react';
import { 
  collection, addDoc, updateDoc, deleteDoc, doc, 
  getDocs, query, orderBy, Timestamp, onSnapshot 
} from 'firebase/firestore';

const AdminDashboard: React.FC = () => {
  const { user, isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'news' | 'resolutions' | 'officials'>('news');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Data States
  const [news, setNews] = useState<any[]>([]);
  const [resolutions, setResolutions] = useState<any[]>([]);
  const [officials, setOfficials] = useState<any[]>([]);

  // Form States
  const [newsForm, setNewsForm] = useState({ title: '', content: '', summary: '', category: 'ARTICLE', imageUrl: '', date: new Date().toISOString().split('T')[0] });
  const [resForm, setResForm] = useState({ no: '', date: '', author: '', title: '', fileUrl: '' });
  const [offForm, setOffForm] = useState({ name: '', role: '', level: 3, order: 0 });

  useEffect(() => {
    if (!isAdmin) return;

    const unsubNews = onSnapshot(query(collection(db, 'news'), orderBy('date', 'desc')), (snapshot) => {
      setNews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubRes = onSnapshot(query(collection(db, 'resolutions'), orderBy('no', 'desc')), (snapshot) => {
      setResolutions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubOff = onSnapshot(query(collection(db, 'officials'), orderBy('level', 'asc'), orderBy('order', 'asc')), (snapshot) => {
      setOfficials(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubNews();
      unsubRes();
      unsubOff();
    };
  }, [isAdmin]);

  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'news', editingId), { ...newsForm, updatedAt: Timestamp.now() });
        setSuccess("News updated successfully!");
      } else {
        await addDoc(collection(db, 'news'), { ...newsForm, createdAt: Timestamp.now() });
        setSuccess("News added successfully!");
      }
      setIsModalOpen(false);
      resetForms();
    } catch (err) {
      handleFirestoreError(err, editingId ? OperationType.UPDATE : OperationType.CREATE, 'news');
    }
  };

  const handleSaveResolution = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'resolutions', editingId), resForm);
        setSuccess("Resolution updated successfully!");
      } else {
        await addDoc(collection(db, 'resolutions'), resForm);
        setSuccess("Resolution added successfully!");
      }
      setIsModalOpen(false);
      resetForms();
    } catch (err) {
      handleFirestoreError(err, editingId ? OperationType.UPDATE : OperationType.CREATE, 'resolutions');
    }
  };

  const handleSaveOfficial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'officials', editingId), offForm);
        setSuccess("Official updated successfully!");
      } else {
        await addDoc(collection(db, 'officials'), offForm);
        setSuccess("Official added successfully!");
      }
      setIsModalOpen(false);
      resetForms();
    } catch (err) {
      handleFirestoreError(err, editingId ? OperationType.UPDATE : OperationType.CREATE, 'officials');
    }
  };

  const handleDelete = async (collectionName: string, id: string) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteDoc(doc(db, collectionName, id));
      setSuccess("Item deleted successfully!");
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, collectionName);
    }
  };

  const resetForms = () => {
    setNewsForm({ title: '', content: '', summary: '', category: 'ARTICLE', imageUrl: '', date: new Date().toISOString().split('T')[0] });
    setResForm({ no: '', date: '', author: '', title: '', fileUrl: '' });
    setOffForm({ name: '', role: '', level: 3, order: 0 });
    setEditingId(null);
  };

  const openEdit = (type: 'news' | 'resolutions' | 'officials', item: any) => {
    setEditingId(item.id);
    setActiveTab(type);
    if (type === 'news') setNewsForm({ title: item.title, content: item.content, summary: item.summary || '', category: item.category, imageUrl: item.imageUrl || '', date: item.date });
    if (type === 'resolutions') setResForm({ no: item.no, date: item.date, author: item.author || '', title: item.title, fileUrl: item.fileUrl || '' });
    if (type === 'officials') setOffForm({ name: item.name, role: item.role, level: item.level, order: item.order || 0 });
    setIsModalOpen(true);
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
            onClick={signInWithGoogle}
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
    <div className="min-h-screen bg-gray-50 pt-32 md:pt-44 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <LayoutDashboard size={24} />
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight uppercase">CMS Dashboard</h1>
            </div>
            <div className="flex items-center gap-2 text-gray-400 font-bold text-sm tracking-widest">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              LOGGED IN AS: <span className="text-blue-600">{user.email}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => { resetForms(); setIsModalOpen(true); }}
              className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center gap-2 group"
            >
              <Plus size={18} className="group-hover:rotate-90 transition-transform" />
              ADD NEW CONTENT
            </button>
            <button
              onClick={logout}
              className="px-8 py-4 bg-white text-gray-400 rounded-2xl font-black text-xs tracking-widest hover:bg-gray-100 border border-gray-100 transition-all flex items-center gap-2"
            >
              <LogOut size={18} />
              LOGOUT
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { id: 'news', label: 'News & Advisories', icon: Newspaper },
            { id: 'resolutions', label: 'Legislative Resolutions', icon: Gavel },
            { id: 'officials', label: 'Organizational Chart', icon: Users },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 transition-all ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'bg-white text-gray-400 hover:bg-gray-50 border border-gray-100'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">
              {activeTab === 'news' && 'News Management'}
              {activeTab === 'resolutions' && 'Resolutions Management'}
              {activeTab === 'officials' && 'Officials Management'}
            </h2>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search..." className="bg-gray-50 border border-transparent rounded-xl py-2 pl-10 pr-4 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-400/20" />
            </div>
          </div>

          <div className="overflow-x-auto">
            {activeTab === 'news' && (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Title</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {news.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-6 font-bold text-gray-900">{item.title}</td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-sm font-bold text-gray-400">{item.date}</td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => openEdit('news', item)} className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                            <Edit3 size={18} />
                          </button>
                          <button onClick={() => handleDelete('news', item.id)} className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'resolutions' && (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">No.</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Title</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {resolutions.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-6 font-black text-blue-600">{item.no}</td>
                      <td className="px-8 py-6 font-bold text-gray-900">{item.title}</td>
                      <td className="px-8 py-6 text-sm font-bold text-gray-400">{item.date}</td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => openEdit('resolutions', item)} className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                            <Edit3 size={18} />
                          </button>
                          <button onClick={() => handleDelete('resolutions', item.id)} className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'officials' && (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Role</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Level</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {officials.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-6 font-bold text-gray-900">{item.name}</td>
                      <td className="px-8 py-6 text-sm font-bold text-gray-400">{item.role}</td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-[10px] font-black uppercase tracking-widest">
                          Level {item.level}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => openEdit('officials', item)} className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                            <Edit3 size={18} />
                          </button>
                          <button onClick={() => handleDelete('officials', item.id)} className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Editor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                  {editingId ? 'Edit' : 'Add New'} {activeTab === 'news' ? 'News' : activeTab === 'resolutions' ? 'Resolution' : 'Official'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-xl">
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 max-h-[70vh] overflow-y-auto">
                {activeTab === 'news' && (
                  <form onSubmit={handleSaveNews} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Title</label>
                      <input 
                        type="text" 
                        required
                        value={newsForm.title}
                        onChange={e => setNewsForm({...newsForm, title: e.target.value})}
                        className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-6 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400/20" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</label>
                        <select 
                          value={newsForm.category}
                          onChange={e => setNewsForm({...newsForm, category: e.target.value})}
                          className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-6 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                        >
                          <option value="ARTICLE">Article</option>
                          <option value="ADVISORY">Advisory</option>
                          <option value="UPDATE">Update</option>
                          <option value="NOTICE">Notice</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</label>
                        <input 
                          type="date" 
                          required
                          value={newsForm.date}
                          onChange={e => setNewsForm({...newsForm, date: e.target.value})}
                          className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-6 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400/20" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Image URL</label>
                      <input 
                        type="url" 
                        value={newsForm.imageUrl}
                        onChange={e => setNewsForm({...newsForm, imageUrl: e.target.value})}
                        className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-6 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400/20" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Summary (Short description for home page)</label>
                      <textarea 
                        required
                        rows={2}
                        value={newsForm.summary}
                        onChange={e => setNewsForm({...newsForm, summary: e.target.value})}
                        className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-6 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400/20 resize-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Content</label>
                      <textarea 
                        required
                        rows={6}
                        value={newsForm.content}
                        onChange={e => setNewsForm({...newsForm, content: e.target.value})}
                        className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-6 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400/20 resize-none" 
                      />
                    </div>
                    <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xs tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3">
                      <Save size={18} />
                      {editingId ? 'UPDATE' : 'SAVE'} NEWS
                    </button>
                  </form>
                )}

                {activeTab === 'resolutions' && (
                  <form onSubmit={handleSaveResolution} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Resolution No.</label>
                        <input 
                          type="text" 
                          required
                          value={resForm.no}
                          onChange={e => setResForm({...resForm, no: e.target.value})}
                          className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-6 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400/20" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Date Approved</label>
                        <input 
                          type="text" 
                          placeholder="MM/DD/YYYY"
                          required
                          value={resForm.date}
                          onChange={e => setResForm({...resForm, date: e.target.value})}
                          className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-6 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400/20" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Title</label>
                      <input 
                        type="text" 
                        required
                        value={resForm.title}
                        onChange={e => setResForm({...resForm, title: e.target.value})}
                        className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-6 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400/20" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Author/Sponsor</label>
                      <input 
                        type="text" 
                        value={resForm.author}
                        onChange={e => setResForm({...resForm, author: e.target.value})}
                        className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-6 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400/20" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">File URL (PDF)</label>
                      <input 
                        type="url" 
                        value={resForm.fileUrl}
                        onChange={e => setResForm({...resForm, fileUrl: e.target.value})}
                        className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-6 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400/20" 
                      />
                    </div>
                    <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xs tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3">
                      <Save size={18} />
                      {editingId ? 'UPDATE' : 'SAVE'} RESOLUTION
                    </button>
                  </form>
                )}

                {activeTab === 'officials' && (
                  <form onSubmit={handleSaveOfficial} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={offForm.name}
                        onChange={e => setOffForm({...offForm, name: e.target.value})}
                        className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-6 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400/20" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Role / Designation</label>
                      <input 
                        type="text" 
                        required
                        value={offForm.role}
                        onChange={e => setOffForm({...offForm, role: e.target.value})}
                        className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-6 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400/20" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Hierarchy Level</label>
                        <select 
                          value={offForm.level}
                          onChange={e => setOffForm({...offForm, level: parseInt(e.target.value)})}
                          className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-6 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                        >
                          <option value={1}>Level 1 (Mayor)</option>
                          <option value={2}>Level 2 (Admin/SB)</option>
                          <option value={3}>Level 3 (Department Head)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Display Order</label>
                        <input 
                          type="number" 
                          value={offForm.order}
                          onChange={e => setOffForm({...offForm, order: parseInt(e.target.value)})}
                          className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-6 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400/20" 
                        />
                      </div>
                    </div>
                    <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xs tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3">
                      <Save size={18} />
                      {editingId ? 'UPDATE' : 'SAVE'} OFFICIAL
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success/Error Toasts */}
      <AnimatePresence>
        {(success || error) && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-8 right-8 px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-[110] ${
              success ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}
          >
            {success ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span className="font-bold text-sm">{success || error}</span>
            <button onClick={() => { setSuccess(null); setError(null); }} className="ml-4 opacity-70 hover:opacity-100">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
