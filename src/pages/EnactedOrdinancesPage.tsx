import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';
import { Search, FileText, Download, Folder, Grid, List as ListIcon, ChevronRight } from 'lucide-react';

interface Ordinance {
  id: string;
  title: string;
  year: string;
  fileUrl: string;
  fileName?: string;
  fileSize?: string;
  createdAt: any;
}

const EnactedOrdinancesPage: React.FC = () => {
  const [ordinances, setOrdinances] = useState<Ordinance[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeYear, setActiveYear] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const q = query(collection(db, 'ordinances'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ordinance));
      setOrdinances(docs);
      
      // Set initial active year to the latest available
      if (docs.length > 0 && !activeYear) {
        const years = Array.from(new Set(docs.map(o => o.year))).sort((a, b) => b.localeCompare(a));
        setActiveYear(years[0]);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching ordinances:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [activeYear]);

  const years = Array.from(new Set(ordinances.map(o => o.year))).sort((a, b) => b.localeCompare(a));
  
  const filteredOrdinances = ordinances.filter(o => 
    o.year === activeYear && 
    o.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <FileText size={24} />
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase">Enacted Ordinances</h1>
          </div>
          <p className="text-lg text-gray-500 font-medium max-w-2xl">
            Access the official legislative records and municipal ordinances of Talibon.
          </p>
        </div>

        {/* Year Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {years.map(year => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`px-8 py-4 rounded-2xl font-black text-sm tracking-widest transition-all ${
                activeYear === year 
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' 
                : 'bg-white text-gray-400 hover:bg-gray-100 border border-gray-100'
              }`}
            >
              MUN - ORD {year}
            </button>
          ))}
        </div>

        {/* Search & Controls */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative w-full md:max-w-md group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-transparent rounded-2xl py-4 pl-16 pr-6 text-sm font-bold tracking-tight focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white focus:border-blue-200 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 p-1 bg-gray-50 rounded-2xl border border-gray-100">
            <button 
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <ListIcon size={20} />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Grid size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Loading records...</p>
          </div>
        ) : filteredOrdinances.length > 0 ? (
          <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" : "space-y-4"}>
            <AnimatePresence mode="popLayout">
              {filteredOrdinances.map((ord) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={ord.id}
                  className={viewMode === 'grid' 
                    ? "group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 hover:border-blue-100 transition-all flex flex-col items-center text-center"
                    : "group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all flex items-center gap-6"
                  }
                >
                  <div className={viewMode === 'grid' ? "mb-8 relative" : "relative"}>
                    <div className="w-24 h-32 bg-gray-50 rounded-2xl flex flex-col items-center justify-center border border-gray-100 group-hover:bg-blue-50 transition-colors">
                      <FileText size={40} className="text-gray-300 group-hover:text-blue-200 transition-colors" />
                      <div className="absolute bottom-4 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-lg shadow-red-500/20">PDF</div>
                    </div>
                  </div>

                  <div className={viewMode === 'grid' ? "flex-1 flex flex-col" : "flex-1"}>
                    <h3 className="text-lg font-black text-gray-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors">
                      {ord.title}
                    </h3>
                    <div className="flex items-center justify-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <span>{ord.fileSize || '2 MB'}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span>{new Date(ord.createdAt?.seconds * 1000).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <a
                    href={ord.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={viewMode === 'grid'
                      ? "mt-8 w-full py-4 bg-gray-50 text-gray-400 rounded-2xl font-black text-[10px] tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
                      : "px-8 py-4 bg-gray-50 text-gray-400 rounded-2xl font-black text-[10px] tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
                    }
                  >
                    <Download size={14} className="group-hover/btn:scale-110 transition-transform" />
                    DOWNLOAD
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-gray-200">
            <Folder className="mx-auto text-gray-200 mb-6" size={64} />
            <h3 className="text-2xl font-black text-gray-900 mb-2">No ordinances found</h3>
            <p className="text-gray-400 font-medium">Try adjusting your search or selecting a different year.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnactedOrdinancesPage;
