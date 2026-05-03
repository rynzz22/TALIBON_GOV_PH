import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ExternalLink, Download, FileText, Calendar, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';

const FullDisclosurePage: React.FC = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const imageUrl = "https://talibon.gov.ph/wp-content/themes/yootheme/cache/e8/RegistrationCert_page-0001-e8213d59.webp";

  useEffect(() => {
    const fetchDocs = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('transparency_documents')
        .select('*')
        .order('year', { ascending: false })
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching transparency docs:", error);
      } else {
        setDocuments(data || []);
      }
      setLoading(false);
    };

    fetchDocs();

    const channel = supabase
      .channel('transparency-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'transparency_documents' }, () => fetchDocs())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const filteredDocs = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.year.toString().includes(searchQuery)
  );

  return (
    <div className="pt-32 md:pt-44 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-8">
            Full Disclosure
          </h1>
          <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100 inline-flex">
            <Shield className="text-blue-600" size={24} />
            <span className="text-sm font-black text-blue-600 uppercase tracking-widest">Transparency & Accountability Policy</span>
          </div>
        </div>

        {/* Existing Official Certification Section */}
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-gray-100 overflow-hidden mb-20">
          <div className="p-8 md:p-12 border-b border-gray-50 bg-gray-50/50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Official Certification</h2>
                <p className="text-gray-500 font-medium mt-2">Registration and Compliance Certificate for the Municipality of Talibon.</p>
              </div>
              <div className="flex gap-4">
                <a 
                  href={imageUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-sm text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm"
                >
                  <ExternalLink size={18} />
                  VIEW FULL IMAGE
                </a>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-12 flex justify-center bg-white">
            <div className="relative group max-w-4xl w-full">
              <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
              <img 
                src={imageUrl} 
                alt="Full Disclosure Policy Registration Certificate" 
                className="w-full h-auto rounded-2xl shadow-lg border border-gray-100"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Documents Section */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
            <div>
              <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-2">Transparency Records</h2>
              <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">Financial Reports, Budgets, and Biddings</p>
            </div>
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 pl-16 pr-6 font-bold text-sm focus:outline-none focus:border-blue-600 transition-all shadow-sm"
              />
            </div>
          </div>

          {loading ? (
             <div className="flex flex-col items-center justify-center py-20 gap-4">
               <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
               <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Fetching records...</p>
             </div>
          ) : filteredDocs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredDocs.map((doc) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 hover:border-blue-600/30 transition-all hover:shadow-2xl hover:shadow-blue-900/10 flex flex-col h-full"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                        <FileText size={28} />
                      </div>
                      <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-lg text-[10px] font-black uppercase tracking-widest">
                        {doc.category}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-black text-gray-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors">
                        {doc.title}
                      </h3>
                      <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><Calendar size={12} /> {doc.year}</span>
                        <span className="w-1 h-1 bg-gray-200 rounded-full" />
                        <span>{doc.file_size || '1.2 MB'}</span>
                      </div>
                    </div>
                    <a
                      href={doc.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 flex items-center justify-center gap-2 py-4 bg-gray-50 text-gray-400 rounded-2xl font-black text-[10px] tracking-widest group-hover:bg-blue-600 group-hover:text-white transition-all"
                    >
                      <Download size={14} />
                      DOWNLOAD PDF
                    </a>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="p-20 text-center bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
              <FileText size={48} className="mx-auto text-gray-200 mb-6" />
              <h3 className="text-xl font-black text-gray-400 uppercase tracking-tight">No records found</h3>
              <p className="text-gray-400 text-sm font-bold mt-2">Try a different search term or check back later.</p>
            </div>
          )}
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">About the Policy</h3>
            <p className="text-lg text-gray-600 font-medium leading-relaxed">
              The Full Disclosure Policy (FDP) requires local government units to fully disclose particular financial transactions to keep their constituents informed of how the local budget is managed, disbursed and used.
            </p>
            <p className="text-lg text-gray-600 font-medium leading-relaxed">
              This promotes honest and efficient governance by allowing citizens to monitor the LGU's financial performance and infrastructure projects.
            </p>
          </div>
          
          <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-600/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <h3 className="text-2xl font-black uppercase tracking-tight mb-6 relative z-10">Our Commitment</h3>
            <ul className="space-y-4 relative z-10">
              {[
                "Regular financial reporting",
                "Public access to procurement data",
                "Open communication on projects",
                "Strict adherence to DILG guidelines"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-bold text-blue-100">
                  <div className="w-2 h-2 bg-blue-300 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FullDisclosurePage;
