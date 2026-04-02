import { motion } from "motion/react";
import { Quote, History, Target, Eye, ArrowUpRight, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl -z-10 opacity-50" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] -z-10 opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mayor's Message */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl relative z-10 border-8 border-white bg-gray-100 group">
              <img
                src="https://talibon.gov.ph/wp-content/themes/yootheme/cache/28/MUNICIPAL-Mayoe2-28d8fb46.webp"
                alt="Hon. Janette Aurestila-Garcia"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 right-12 text-white">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-3xl font-black tracking-tight mb-1">Hon. Janette Aurestila-Garcia</h3>
                  <p className="text-blue-200 font-bold uppercase tracking-[0.2em] text-[10px]">Municipal Mayor</p>
                </motion.div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -right-8 w-32 h-32 bg-white rounded-3xl shadow-xl flex items-center justify-center z-20 border border-blue-50 p-4"
            >
              <img 
                src="http://talibon.gov.ph/wp-content/uploads/2025/09/Talibon-Official-Seal-v4-2003-to-2023-.png" 
                alt="Talibon Official Seal" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full -z-0 blur-3xl opacity-40 animate-pulse" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-400 rounded-full -z-0 blur-[100px] opacity-20" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100">
                <Quote size={14} />
                <span>Welcome Message</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1] tracking-tighter">
                A Legacy of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Greatness</span>
              </h2>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-0 text-blue-50 -z-10">
                <Quote size={100} fill="currentColor" />
              </div>
              <div className="space-y-8 text-xl text-gray-500 leading-relaxed font-medium">
                <p className="first-letter:text-6xl first-letter:font-black first-letter:text-blue-600 first-letter:mr-4 first-letter:float-left">
                  As the home of the late President Carlos P. Garcia, we carry a legacy of greatness, 
                  and as Bohol’s Seafood Capital, we invite you to experience the bounty of our seas 
                  and the warmth of our community.
                </p>
                <p className="text-gray-900">
                  Together, let us continue to build a brighter, more prosperous future for every Talibongnon.
                </p>
                <p className="text-3xl font-black text-blue-600 tracking-tight">
                  Dajon kamo sa atong matahum nga Talibon!
                </p>
              </div>
            </div>

            <div className="pt-6 flex flex-wrap items-center gap-6">
              <Link 
                to="/about/mayors"
                className="bg-blue-600 text-white px-10 py-5 rounded-[2rem] font-black text-xs tracking-widest shadow-2xl shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center gap-2 group"
              >
                <Users size={18} />
                LIST OF MAYORS
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">OFFICIALLY POWERED BY</span>
                <div className="flex items-center gap-4">
                  <div className="h-6 w-20 bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center text-[8px] font-black text-gray-300">DICT</div>
                  <div className="h-6 w-20 bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center text-[8px] font-black text-gray-300">MULTISYS</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Historical Background Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 glass-card p-12 rounded-[3.5rem]"
        >
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                <History size={28} />
              </div>
              <div>
                <h3 className="text-4xl font-black text-gray-900 tracking-tight">History of Talibon</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">A Legacy Through Time</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 text-lg text-gray-500 leading-relaxed font-medium">
              <p>
                From its early contact with Ferdinand Magellan’s expedition in 1521 to its recognition as the <span className="text-blue-600 font-bold">Seafood Capital of Bohol</span>, Talibon’s history is a rich tapestry of faith, resilience, and progress.
              </p>
              <p>
                Today, it stands as a thriving 1st class municipality, home to the unique <span className="text-blue-600 font-bold">Danajon Bank</span> and a community that carries the legacy of greatness into the future.
              </p>
              <div className="pt-4">
                <Link 
                  to="/about/history"
                  className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center gap-2 w-fit group"
                >
                  EXPLORE FULL HISTORY
                  <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
            
            <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-gray-100 flex items-center justify-center relative group">
              <div className="text-gray-300 flex flex-col items-center gap-2">
                <History size={48} />
                <span className="text-[10px] font-black uppercase tracking-widest">History Photo Frame</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </motion.div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600 to-blue-700 p-12 rounded-[3.5rem] text-white space-y-8 shadow-2xl shadow-blue-600/20 relative overflow-hidden group"
          >
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Eye size={32} />
            </div>
            <h3 className="text-4xl font-black tracking-tight">Our Vision</h3>
            <p className="text-blue-50/90 text-xl leading-relaxed font-medium">
              “To enrich Bohol’s social, economic, cultural, political, and environmental resources 
              through good governance and effective partnerships with stakeholders for increased 
              global competitiveness.”
            </p>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-12 rounded-[3.5rem] text-gray-900 space-y-8 shadow-2xl shadow-blue-900/5 border border-blue-50 relative overflow-hidden group"
          >
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
              <Target size={32} />
            </div>
            <h3 className="text-4xl font-black tracking-tight">Our Mission</h3>
            <p className="text-gray-500 text-xl leading-relaxed font-medium">
              “To enrich Bohol’s social, economic, cultural, political, and environmental resources 
              through good governance and effective partnerships with stakeholders for increased 
              global competitiveness.”
            </p>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/5 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
