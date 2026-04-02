import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const OfficialSealPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sealUrl = "http://talibon.gov.ph/wp-content/uploads/2025/09/Talibon-Official-Seal-v4-2003-to-2023-.png";

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 flex flex-col items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-blue-600 font-black text-[10px] tracking-widest uppercase mb-12 hover:gap-4 transition-all"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="flex flex-col items-center justify-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter mb-4">
              OFFICIAL <span className="text-blue-600">SEAL</span>
            </h1>
            <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-xs">Municipality of Talibon</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", damping: 20 }}
            className="relative w-full max-w-2xl"
          >
            <div className="absolute inset-0 bg-blue-400/10 rounded-full blur-[120px] -z-10" />
            <div className="bg-white p-8 md:p-16 rounded-[4rem] shadow-2xl shadow-blue-900/5 border border-blue-50">
              <img 
                src={sealUrl} 
                alt="Official Seal of Talibon" 
                className="w-full h-auto max-w-[600px] mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OfficialSealPage;
