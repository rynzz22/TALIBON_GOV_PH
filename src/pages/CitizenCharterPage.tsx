import React from 'react';
import { motion } from 'motion/react';
import { FileText, ArrowUpRight, ShieldCheck } from 'lucide-react';

const CitizenCharterPage: React.FC = () => {
  const pdfUrl = "http://talibon.gov.ph/wp-content/uploads/2026/02/2025-CITIZENS-CHARTER-FINALE.pdf";

  return (
    <div className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-16">
          <h1 className="text-6xl md:text-8xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-8">
            Citizen Charter
          </h1>
          <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100 inline-flex">
            <ShieldCheck className="text-blue-600" size={24} />
            <span className="text-sm font-black text-blue-600 uppercase tracking-widest">Talibon Municipality – Official Documents</span>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 md:p-20 flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 uppercase tracking-tight leading-none">
                Citizen Charter
              </h2>
              <p className="text-xl text-gray-500 font-medium mb-12 leading-relaxed">
                The Citizen's Charter is a document of commitments made by a Government organization to the citizens in relation to the services being provided to them.
              </p>
              
              <a 
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-4 px-12 py-6 bg-blue-600 text-white rounded-[2rem] font-black text-lg tracking-widest hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/30 group w-full md:w-auto"
              >
                VIEW PDF
                <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
            
            <div className="bg-gray-50 p-12 md:p-20 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600 via-transparent to-transparent" />
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="relative z-10 w-full max-w-sm aspect-[3/4] bg-white rounded-[2rem] shadow-2xl border border-gray-100 flex flex-col items-center justify-center p-12 text-center group cursor-pointer"
                onClick={() => window.open(pdfUrl, '_blank')}
              >
                <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-colors">
                  <FileText size={48} className="text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">2025 Edition</h3>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Official Publication</p>
                
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">Click to Open</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4">Transparency</h4>
            <p className="text-gray-600 font-medium">Ensuring open and honest communication between the LGU and the people of Talibon.</p>
          </div>
          <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4">Accountability</h4>
            <p className="text-gray-600 font-medium">Holding our government officials responsible for the quality of services provided.</p>
          </div>
          <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4">Efficiency</h4>
            <p className="text-gray-600 font-medium">Streamlining processes to serve our citizens faster and more effectively.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CitizenCharterPage;
