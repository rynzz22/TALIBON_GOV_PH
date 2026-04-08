import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Newspaper, Calendar, ArrowRight, Loader2, Search, Filter, Download, Image as ImageIcon, FileText } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  imageUrl: string;
  fileUrl?: string;
  date: string;
}

const NewsCategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const categoryMap: Record<string, string> = {
    'articles': 'ARTICLE',
    'advisories': 'ADVISORY',
    'disaster': 'DISASTER',
    'updates': 'UPDATE',
    'gallery': 'GALLERY',
    'community': 'COMMUNITY',
    'notices': 'NOTICE',
    'forms': 'FORM'
  };

  const displayTitle: Record<string, string> = {
    'articles': 'News Articles',
    'advisories': 'Public Advisories',
    'disaster': 'Disaster Preparedness',
    'updates': 'LGU Updates',
    'gallery': 'Photo Gallery',
    'community': 'Community News',
    'notices': 'Public Notices',
    'forms': 'Downloadable Forms'
  };

  useEffect(() => {
    const firestoreCategory = categoryMap[category || ''] || (category?.toUpperCase().replace(/-/g, ' ') || 'ARTICLE');
    const q = query(
      collection(db, 'news'),
      where('category', '==', firestoreCategory),
      orderBy('date', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsItem));
      setNews(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'news');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [category]);

  const filteredNews = news.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderGallery = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence mode="popLayout">
        {filteredNews.map((item, idx) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: idx * 0.05 }}
            className="group relative aspect-square bg-gray-100 rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all"
          >
            <img
              src={item.imageUrl || `https://picsum.photos/seed/${item.id}/800/800`}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
              <p className="text-xs font-black text-blue-400 uppercase tracking-widest mb-2">
                {new Date(item.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
              <h3 className="text-xl font-black text-white tracking-tight">
                {item.title}
              </h3>
              <Link 
                to={`/news/view/${item.id}`}
                className="mt-4 flex items-center gap-2 text-xs font-black text-white hover:text-blue-400 transition-colors"
              >
                VIEW DETAILS <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  const renderForms = () => (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {filteredNews.map((item, idx) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: idx * 0.05 }}
            className="group bg-white p-6 md:p-8 rounded-3xl border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <FileText size={28} />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">
                  Posted: {new Date(item.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                to={`/news/view/${item.id}`}
                className="px-6 py-3 bg-gray-50 text-gray-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all"
              >
                DETAILS
              </Link>
              <a 
                href={item.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
              >
                <Download size={14} />
                DOWNLOAD FORM
              </a>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  const renderStandard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence mode="popLayout">
        {filteredNews.map((item, idx) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: idx * 0.05 }}
            className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/5 transition-all flex flex-col"
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={item.imageUrl || `https://picsum.photos/seed/${item.id}/800/600`}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-center shadow-lg">
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-wider">
                  {new Date(item.date).toLocaleDateString('en-US', { month: 'short' })}
                </p>
                <p className="text-lg font-black text-gray-900 leading-none">
                  {new Date(item.date).getDate()}
                </p>
              </div>
            </div>

            <div className="p-8 flex-1 flex flex-col">
              <h3 className="text-xl font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                {item.title}
              </h3>
              <p className="text-gray-500 font-medium leading-relaxed line-clamp-3 mb-8">
                {item.summary}
              </p>
              
              <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <Calendar size={14} />
                  {new Date(item.date).getFullYear()}
                </div>
                <Link 
                  to={`/news/view/${item.id}`}
                  className="flex items-center gap-2 text-xs font-black text-blue-600 hover:gap-3 transition-all"
                >
                  READ MORE <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );

  if (loading) {
    return (
      <div className="pt-44 pb-20 flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  const isGallery = category === 'gallery';
  const isForms = category === 'forms';

  return (
    <div className="pt-32 md:pt-44 pb-20 min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-1 bg-blue-600 rounded-full" />
            <span className="text-sm font-black text-blue-600 uppercase tracking-[0.3em]">News & Media</span>
          </motion.div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-none">
              {displayTitle[category || ''] || 'News'}
            </h1>
            
            <div className="flex flex-col md:flex-row gap-6 items-center bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-50 border border-transparent rounded-2xl py-3 pl-14 pr-6 text-xs font-bold tracking-tight focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white focus:border-blue-200 transition-all w-full md:w-64"
                />
              </div>
              <div className="flex items-center gap-3 px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest border-l border-gray-100">
                <Filter size={14} />
                {filteredNews.length} Items
              </div>
            </div>
          </div>
        </div>

        {filteredNews.length > 0 ? (
          isGallery ? renderGallery() : isForms ? renderForms() : renderStandard()
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-gray-200">
            {isGallery ? <ImageIcon className="mx-auto text-gray-200 mb-6" size={64} /> : <Newspaper className="mx-auto text-gray-200 mb-6" size={64} />}
            <h3 className="text-2xl font-black text-gray-900 mb-2">No content found</h3>
            <p className="text-gray-400 font-medium">There are currently no items in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCategoryPage;

