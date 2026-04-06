import React from 'react';
import { motion } from 'motion/react';
import { HardHat, Download, ShieldCheck, Zap, Ruler, Droplets, FileCheck, FileText } from 'lucide-react';

const BuildingPermitPage: React.FC = () => {
  const permitCategories = [
    {
      category: "Primary Application",
      title: "Unified Application Form for Building Permit",
      description: "The main application form required for all building permit requests.",
      url: "http://talibon.gov.ph/wp-content/uploads/2025/10/UNIFIED-APPLICATION-FORM-FOR-BUILDING-PERMIT.pdf",
      icon: <FileCheck className="text-white" size={24} />,
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      category: "Electrical",
      title: "Application for Electrical Permit",
      description: "Required for all electrical installations and modifications.",
      url: "http://talibon.gov.ph/wp-content/uploads/2025/10/APPLICATION-FOR-ELECTRICAL-PERMIT.pdf",
      icon: <Zap className="text-white" size={24} />,
      gradient: "from-amber-500 to-orange-600"
    },
    {
      category: "Architecture",
      title: "Architectural Permit",
      description: "Required for architectural designs and plans approval.",
      url: "http://talibon.gov.ph/wp-content/uploads/2025/10/ARCHITECTURAL-PERMIT.pdf",
      icon: <Ruler className="text-white" size={24} />,
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      category: "Civil Engineering",
      title: "Civil/Structural Permit",
      description: "Required for structural integrity and engineering designs.",
      url: "http://talibon.gov.ph/wp-content/uploads/2025/10/CIVIL_STRUCTURAL-PERMIT.pdf",
      icon: <HardHat className="text-white" size={24} />,
      gradient: "from-orange-500 to-red-600"
    },
    {
      category: "Plumbing",
      title: "Plumbing Permit",
      description: "Required for all plumbing and sanitary system installations.",
      url: "http://talibon.gov.ph/wp-content/uploads/2025/10/PLUMBING-PERMIT.pdf",
      icon: <Droplets className="text-white" size={24} />,
      gradient: "from-blue-400 to-cyan-600"
    }
  ];

  return (
    <div className="pt-32 md:pt-44 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100"
      >
        {/* Modern Gradient Header */}
        <div className="bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 p-16 md:p-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
          </div>
          
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
              Building Permit
            </h1>
            <p className="text-blue-100 text-lg md:text-xl font-bold uppercase tracking-[0.3em] opacity-80">
              Talibon Municipality – Building & Engineering Documents
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-20 bg-gray-50/50">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-4">Construction Permits & Applications</h2>
            <p className="text-xl text-gray-500 font-medium max-w-3xl">
              Download the official forms required for building and engineering projects in the Municipality of Talibon.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {permitCategories.map((permit, idx) => (
              <motion.div
                key={permit.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:border-blue-100 transition-all group overflow-hidden"
              >
                <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center">
                  <div className={`w-20 h-20 bg-gradient-to-br ${permit.gradient} rounded-3xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    {permit.icon}
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">{permit.category}</span>
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                      {permit.title}
                    </h3>
                    
                    <a 
                      href={permit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs tracking-widest hover:bg-blue-600 transition-all shadow-lg group/btn"
                    >
                      DOWNLOAD FORM
                      <Download size={16} className="group-hover/btn:translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Assistance Section */}
          <div className="mt-20 p-12 bg-gray-900 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-black uppercase tracking-tight mb-6">Need Assistance?</h3>
                <p className="text-blue-100/70 text-lg font-medium leading-relaxed mb-8">
                  For inquiries regarding building permits and engineering requirements, you may visit the Municipal Engineer's Office or contact us through our official channels.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="px-6 py-3 bg-white/10 rounded-xl border border-white/10 backdrop-blur-md">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Office Hours</p>
                    <p className="font-bold">Mon - Fri, 8:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Engineering Dept</p>
                  <p className="text-xl font-black">(038) 422-2895</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Official Email</p>
                  <p className="text-sm font-black truncate">talibonofficial@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BuildingPermitPage;
