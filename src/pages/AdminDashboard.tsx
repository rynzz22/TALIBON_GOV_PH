import React, { useState, useEffect } from 'react';
import { db, auth, signInWithGoogle, logout, handleFirestoreError, OperationType } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LogIn, LogOut, Upload, Trash2, FileText, CheckCircle, 
  AlertCircle, ShieldCheck, Plus, X, Search, Folder, 
  ChevronRight, Download, Newspaper, Users, Gavel, 
  LayoutDashboard, Edit3, Save, Image as ImageIcon, Calendar,
  Mic, Globe
} from 'lucide-react';
import MeetingAssistant from '../components/MeetingAssistant';
import FileUpload from '../components/FileUpload';
import { 
  collection, addDoc, updateDoc, deleteDoc, doc, 
  getDocs, query, orderBy, Timestamp, onSnapshot 
} from 'firebase/firestore';

const AdminDashboard: React.FC = () => {
  const { user, isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'news' | 'resolutions' | 'officials' | 'ordinances' | 'meeting-assistant' | 'navigation'>('news');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Data States
  const [news, setNews] = useState<any[]>([]);
  const [resolutions, setResolutions] = useState<any[]>([]);
  const [officials, setOfficials] = useState<any[]>([]);
  const [ordinances, setOrdinances] = useState<any[]>([]);
  const [navigation, setNavigation] = useState<any[]>([]);

  // Form States
  const [newsForm, setNewsForm] = useState({ title: '', content: '', summary: '', category: 'ARTICLE', imageUrl: '', fileUrl: '', date: new Date().toISOString().split('T')[0] });
  const [resForm, setResForm] = useState({ no: '', date: '', author: '', title: '', fileUrl: '' });
  const [offForm, setOffForm] = useState({ name: '', role: '', level: 3, order: 0 });
  const [ordForm, setOrdForm] = useState({ title: '', year: new Date().getFullYear().toString(), fileUrl: '', fileSize: '2 MB' });
  const [navForm, setNavForm] = useState({ name: '', href: '', section: 'NEWS', order: 0, isExternal: false, isHash: false });

  useEffect(() => {
    if (!isAdmin) return;

    const unsubNews = onSnapshot(query(collection(db, 'news'), orderBy('date', 'desc')), (snapshot) => {
      setNews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'news');
    });

    const unsubRes = onSnapshot(query(collection(db, 'resolutions'), orderBy('no', 'desc')), (snapshot) => {
      setResolutions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'resolutions');
    });

    const unsubOff = onSnapshot(query(collection(db, 'officials'), orderBy('level', 'asc'), orderBy('order', 'asc')), (snapshot) => {
      setOfficials(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'officials');
    });

    const unsubOrd = onSnapshot(query(collection(db, 'ordinances'), orderBy('year', 'desc')), (snapshot) => {
      setOrdinances(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'ordinances');
    });

    const unsubNav = onSnapshot(query(collection(db, 'navigation'), orderBy('section', 'asc'), orderBy('order', 'asc')), (snapshot) => {
      setNavigation(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'navigation');
    });

    return () => {
      unsubNews();
      unsubRes();
      unsubOff();
      unsubOrd();
      unsubNav();
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

  const handleSaveOrdinance = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'ordinances', editingId), ordForm);
        setSuccess("Ordinance updated successfully!");
      } else {
        await addDoc(collection(db, 'ordinances'), { ...ordForm, createdAt: new Date().toISOString() });
        setSuccess("Ordinance added successfully!");
      }
      setIsModalOpen(false);
      resetForms();
    } catch (err) {
      handleFirestoreError(err, editingId ? OperationType.UPDATE : OperationType.CREATE, 'ordinances');
    }
  };

  const handleSaveNavigation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'navigation', editingId), navForm);
        setSuccess("Navigation link updated successfully!");
      } else {
        await addDoc(collection(db, 'navigation'), navForm);
        setSuccess("Navigation link added successfully!");
      }
      setIsModalOpen(false);
      resetForms();
    } catch (err) {
      handleFirestoreError(err, editingId ? OperationType.UPDATE : OperationType.CREATE, 'navigation');
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
    setNewsForm({ title: '', content: '', summary: '', category: 'ARTICLE', imageUrl: '', fileUrl: '', date: new Date().toISOString().split('T')[0] });
    setResForm({ no: '', date: '', author: '', title: '', fileUrl: '' });
    setOffForm({ name: '', role: '', level: 3, order: 0 });
    setOrdForm({ title: '', year: new Date().getFullYear().toString(), fileUrl: '', fileSize: '2 MB' });
    setNavForm({ name: '', href: '', section: 'NEWS', order: 0, isExternal: false, isHash: false });
    setEditingId(null);
  };

  const openEdit = (type: 'news' | 'resolutions' | 'officials' | 'ordinances' | 'navigation', item: any) => {
    setEditingId(item.id);
    setActiveTab(type);
    if (type === 'news') setNewsForm({ title: item.title, content: item.content, summary: item.summary || '', category: item.category, imageUrl: item.imageUrl || '', fileUrl: item.fileUrl || '', date: item.date });
    if (type === 'resolutions') setResForm({ no: item.no, date: item.date, author: item.author || '', title: item.title, fileUrl: item.fileUrl || '' });
    if (type === 'officials') setOffForm({ name: item.name, role: item.role, level: item.level, order: item.order || 0 });
    if (type === 'ordinances') setOrdForm({ title: item.title, year: item.year, fileUrl: item.fileUrl || '', fileSize: item.fileSize || '2 MB' });
    if (type === 'navigation') setNavForm({ name: item.name, href: item.href, section: item.section, order: item.order || 0, isExternal: item.isExternal || false, isHash: item.isHash || false });
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
            { id: 'ordinances', label: 'Enacted Ordinances', icon: FileText },
            { id: 'officials', label: 'Organizational Chart', icon: Users },
            { id: 'navigation', label: 'Navigation Menu', icon: Globe },
            { id: 'meeting-assistant', label: 'Meeting Assistant', icon: Mic },
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
              {activeTab === 'ordinances' && 'Ordinances Management'}
              {activeTab === 'officials' && 'Officials Management'}
              {activeTab === 'navigation' && 'Navigation Management'}
              {activeTab === 'meeting-assistant' && 'Meeting Assistant'}
            </h2>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search..." className="bg-gray-50 border border-transparent rounded-xl py-2 pl-10 pr-4 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-400/20" />
            </div>
          </div>

          <div className="overflow-x-auto">
            {activeTab === 'meeting-assistant' && (
              <MeetingAssistant />
            )}

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

            {activeTab === 'ordinances' && (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Title</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Year</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {ordinances.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-6 font-bold text-gray-900">{item.title}</td>
                      <td className="px-8 py-6 font-black text-blue-600">{item.year}</td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => openEdit('ordinances', item)} className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                            <Edit3 size={18} />
                          </button>
                          <button onClick={() => handleDelete('ordinances', item.id)} className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
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

            {activeTab === 'navigation' && (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Name</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Section</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Order</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {navigation.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-6 font-bold text-gray-900">{item.name}</td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                          {item.section}
                        </span>
                      </td>
                      <td className="px-8 py-6 font-black text-blue-600">{item.order}</td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => openEdit('navigation', item)} className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                            <Edit3 size={18} />
                          </button>
                          <button onClick={() => handleDelete('navigation', item.id)} className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
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
                  {editingId ? 'Edit' : 'Add New'} {activeTab === 'news' ? 'News' : activeTab === 'resolutions' ? 'Resolution' : activeTab === 'officials' ? 'Official' : activeTab === 'ordinances' ? 'Ordinance' : 'Navigation Link'}
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
                          <option value="DISASTER">Disaster Preparedness</option>
                          <option value="UPDATE">Update</option>
                          <option value="GALLERY">Gallery</option>
                          <option value="COMMUNITY">Community</option>
                          <option value="NOTICE">Notice</option>
                          <option value="FORM">Downloadable Form</option>
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
                    <FileUpload 
                      label="Feature Image"
                      accept="image/*"
                      folder="news/images"
                      currentValue={newsForm.imageUrl}
                      onUploadComplete={(url) => setNewsForm({...newsForm, imageUrl: url})}
                    />
                    {newsForm.category === 'FORM' && (
                      <FileUpload 
                        label="Downloadable Form (PDF/DOC)"
                        accept=".pdf,.doc,.docx"
                        folder="news/forms"
                        currentValue={newsForm.fileUrl}
                        onUploadComplete={(url) => setNewsForm({...newsForm, fileUrl: url})}
                      />
                    )}
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
                    <FileUpload 
                      label="Official Resolution Document (PDF)"
                      accept=".pdf"
                      folder="resolutions"
                      currentValue={resForm.fileUrl}
                      onUploadComplete={(url) => setResForm({...resForm, fileUrl: url})}
                    />
                    <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xs tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3">
                      <Save size={18} />
                      {editingId ? 'UPDATE' : 'SAVE'} RESOLUTION
                    </button>
                  </form>
                )}

                {activeTab === 'ordinances' && (
                  <form onSubmit={handleSaveOrdinance} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Title</label>
                      <input 
                        type="text" 
                        required
                        value={ordForm.title}
                        onChange={e => setOrdForm({...ordForm, title: e.target.value})}
                        className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-6 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400/20" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Year</label>
                        <input 
                          type="text" 
                          required
                          value={ordForm.year}
                          onChange={e => setOrdForm({...ordForm, year: e.target.value})}
                          className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-6 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400/20" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">File Size (e.g. 2 MB)</label>
                        <input 
                          type="text" 
                          value={ordForm.fileSize}
                          onChange={e => setOrdForm({...ordForm, fileSize: e.target.value})}
                          className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-6 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400/20" 
                        />
                      </div>
                    </div>
                    <FileUpload 
                      label="Full Ordinance Document (PDF)"
                      accept=".pdf"
                      folder="ordinances"
                      currentValue={ordForm.fileUrl}
                      onUploadComplete={(url) => setOrdForm({...ordForm, fileUrl: url})}
                    />
                    <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xs tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3">
                      <Save size={18} />
                      {editingId ? 'UPDATE' : 'SAVE'} ORDINANCE
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

                {activeTab === 'navigation' && (
                  <form onSubmit={handleSaveNavigation} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Link Name</label>
                      <input 
                        type="text" 
                        required
                        value={navForm.name}
                        onChange={e => setNavForm({...navForm, name: e.target.value})}
                        className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-6 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400/20" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">HREF (URL or Path)</label>
                      <input 
                        type="text" 
                        required
                        value={navForm.href}
                        onChange={e => setNavForm({...navForm, href: e.target.value})}
                        className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-6 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400/20" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Section</label>
                        <select 
                          value={navForm.section}
                          onChange={e => setNavForm({...navForm, section: e.target.value})}
                          className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-6 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                        >
                          <option value="NEWS">News</option>
                          <option value="ABOUT">About</option>
                          <option value="EXECUTIVE">Executive</option>
                          <option value="LEGISLATIVE">Legislative</option>
                          <option value="TRANSPARENCY">Transparency</option>
                          <option value="TOURISM">Tourism</option>
                          <option value="FORMS">Forms</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order</label>
                        <input 
                          type="number" 
                          value={navForm.order}
                          onChange={e => setNavForm({...navForm, order: parseInt(e.target.value)})}
                          className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 px-6 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400/20" 
                        />
                      </div>
                    </div>
                    <div className="flex gap-8">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            className="sr-only"
                            checked={navForm.isExternal}
                            onChange={e => setNavForm({...navForm, isExternal: e.target.checked})}
                          />
                          <div className={`w-10 h-6 rounded-full transition-colors ${navForm.isExternal ? 'bg-blue-600' : 'bg-gray-200'}`} />
                          <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${navForm.isExternal ? 'translate-x-4' : ''}`} />
                        </div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">External Link</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            className="sr-only"
                            checked={navForm.isHash}
                            onChange={e => setNavForm({...navForm, isHash: e.target.checked})}
                          />
                          <div className={`w-10 h-6 rounded-full transition-colors ${navForm.isHash ? 'bg-blue-600' : 'bg-gray-200'}`} />
                          <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${navForm.isHash ? 'translate-x-4' : ''}`} />
                        </div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">Hash Link</span>
                      </label>
                    </div>
                    <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-xs tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3">
                      <Save size={18} />
                      {editingId ? 'UPDATE' : 'SAVE'} NAVIGATION LINK
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
