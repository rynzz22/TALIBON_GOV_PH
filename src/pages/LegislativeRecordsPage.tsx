import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Download, Calendar, Search, Filter, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

const LegislativeRecordsPage: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'MINUTES' | 'COMMITTEE_REPORT' | 'LEGISLATIVE_AGENDA'>('ALL');

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('legislative_reports')
        .select('*')
        .order('date', { ascending: false });
      
      if (!error) {
        setReports(data || []);
      }
      setLoading(false);
    };

    fetchReports();

    const channel = supabase
      .channel('legislative-public')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'legislative_reports' }, () => fetchReports())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'ALL' || report.report_type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const categories = [
    { id: 'ALL', label: 'All Records' },
    { id: 'MINUTES', label: 'Minutes of Meeting' },
    { id: 'COMMITTEE_REPORT', label: 'Committee Reports' },
    { id: 'LEGISLATIVE_AGENDA', label: 'Legislative Agenda' }
  ];

  return (
    <div className="pt-32 md:pt-44 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-1 bg-blue-600 rounded-full" />
            <span className="text-sm font-black text-blue-600 uppercase tracking-[0.3em]">Sangguniang Bayan</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-8">
            Legislative Records
          </h1>
          <p className="text-xl text-gray-500 font-medium max-w-3xl leading-relaxed">
            Official archives of the municipal legislative branch, including minutes, committee findings, and session agendas.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
           <div className="flex flex-wrap gap-2 p-1.5 bg-gray-100 rounded-3xl border border-gray-200">
             {categories.map((cat) => (
               <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id as any)}
                className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                  activeFilter === cat.id 
                    ? 'bg-white text-blue-600 shadow-xl shadow-gray-900/5' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
               >
                 {cat.label}
               </button>
             ))}
           </div>

           <div className="relative flex-1 group">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
             <input 
               type="text" 
               placeholder="Search by report title..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-white border-2 border-gray-100 rounded-[2rem] py-5 pl-16 pr-8 font-bold text-sm focus:outline-none focus:border-blue-600 transition-all shadow-sm"
             />
           </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Accessing Archives...</p>
          </div>
        ) : filteredReports.length > 0 ? (
          <div className="space-y-4">
             <AnimatePresence mode="popLayout">
               {filteredReports.map((report) => (
                 <motion.div
                   key={report.id}
                   layout
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="group bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 hover:border-blue-600/30 transition-all hover:shadow-2xl hover:shadow-blue-900/5 flex flex-col md:flex-row items-center gap-8"
                 >
                   <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shrink-0">
                     <FileText size={32} />
                   </div>
                   <div className="flex-1 text-center md:text-left">
                     <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
                       <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[8px] font-black uppercase tracking-widest">
                         {report.report_type.replace('_', ' ')}
                       </span>
                       <span className="flex items-center gap-1.5 text-[10px] font-black text-gray-300 uppercase tracking-widest">
                         <Calendar size={12} /> {new Date(report.date).toLocaleDateString()}
                       </span>
                     </div>
                     <h3 className="text-xl font-black text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                       {report.title}
                     </h3>
                   </div>
                   <a
                     href={report.file_url}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="px-10 py-5 bg-gray-50 text-gray-400 rounded-2xl font-black text-[10px] tracking-widest group-hover:bg-blue-600 group-hover:text-white transition-all flex items-center gap-3"
                   >
                     <Download size={16} />
                     DOWNLOAD PDF
                   </a>
                 </motion.div>
               ))}
             </AnimatePresence>
          </div>
        ) : (
          <div className="p-32 text-center bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
             <FileText size={64} className="mx-auto text-gray-200 mb-8" />
             <h3 className="text-2xl font-black text-gray-400 uppercase tracking-tight">No legislative records found</h3>
             <p className="text-gray-400 text-sm font-bold mt-2">The archives are currently being digitized. Check back soon.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default LegislativeRecordsPage;
