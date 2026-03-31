import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ShieldCheck, Download, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const OfficialSealPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sealUrl = "http://talibon.gov.ph/wp-content/uploads/2025/09/Talibon-Official-Seal-v4-2003-to-2023-.png";

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-blue-600 font-black text-[10px] tracking-widest uppercase mb-12 hover:gap-4 transition-all"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100">
              <ShieldCheck size={14} />
              <span>Heraldry & Symbolism</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 leading-[0.85] tracking-tighter">
              OFFICIAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">SEAL</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-xl">
              The official seal of the Municipality of Talibon represents its rich history, 
              abundant marine resources, and the progressive spirit of its people.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center gap-2 uppercase">
                <Download size={16} />
                Download High-Res
              </button>
              <button className="bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-2xl font-black text-[10px] tracking-widest hover:bg-gray-50 transition-all flex items-center gap-2 uppercase">
                <Share2 size={16} />
                Share
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", damping: 20 }}
            className="relative"
          >
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-blue-400/5 rounded-full blur-[120px] -z-10 animate-pulse" />
            
            <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl shadow-blue-900/5 border border-blue-50 relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img 
                src={sealUrl} 
                alt="Official Seal of Talibon" 
                className="w-full h-auto max-w-[500px] mx-auto transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-blue-50 hidden md:block"
            >
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Authenticated</p>
              <p className="text-xs font-bold text-gray-400">Official LGU Asset</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Symbolism Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100">
            <h3 className="text-lg font-black text-gray-900 mb-4 uppercase tracking-tight">The Shield</h3>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              Represents the protection and preservation of the municipality's heritage and natural treasures.
            </p>
          </div>
          <div className="p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100">
            <h3 className="text-lg font-black text-gray-900 mb-4 uppercase tracking-tight">The Marine Life</h3>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              Symbolizes Talibon as the Seafood Capital of Bohol and its connection to the Danajon Bank.
            </p>
          </div>
          <div className="p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100">
            <h3 className="text-lg font-black text-gray-900 mb-4 uppercase tracking-tight">The Colors</h3>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              Blue represents the vast seas, while the vibrant accents symbolize the energy and optimism of the people.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OfficialSealPage;
