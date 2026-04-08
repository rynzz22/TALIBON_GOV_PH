import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { User, Users, Loader2 } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const DEPARTMENT_LOGOS: Record<string, string> = {
  "Office Of Municipal Agriculturist": "http://talibon.gov.ph/wp-content/uploads/2025/10/1.png",
  "Municipal Treasury Office": "http://talibon.gov.ph/wp-content/uploads/2025/10/10.png",
  "Municipal Planning And Development Office": "http://talibon.gov.ph/wp-content/uploads/2025/10/7.png",
  "Municipal Accounting Office": "http://talibon.gov.ph/wp-content/uploads/2025/10/3.png",
  "Municipal Economic Development & Investment Promotions Office": "http://talibon.gov.ph/wp-content/uploads/2025/10/3.png",
  "Municipal Public Employment Office": "http://talibon.gov.ph/wp-content/uploads/2025/10/5.png",
  "Municipal Social Welfare And Development Office": "http://talibon.gov.ph/wp-content/uploads/2025/10/8.png",
  "Municipal Market Administration Office": "http://talibon.gov.ph/wp-content/uploads/2025/10/6.png",
  "Talibon Traffic Management Unit": "http://talibon.gov.ph/wp-content/uploads/2025/10/9.png",
  "Municipal Internal Auditing Unit": "http://talibon.gov.ph/wp-content/uploads/2025/10/4.png",
  "Municipal General Services Office": "https://talibon.gov.ph/wp-content/uploads/2022/01/General-Services.png",
  "Municipal Human Resource Management Office": "https://talibon.gov.ph/wp-content/uploads/2022/01/HRMO.png",
  "Office Of The Municipal Civil Registrar": "https://talibon.gov.ph/wp-content/uploads/2022/01/LCR.png",
  "Municipal Assessor's Office": "https://talibon.gov.ph/wp-content/uploads/2022/01/Assessor.png",
  "Municipal Budget Office": "https://talibon.gov.ph/wp-content/uploads/2022/01/Budget-Office.png",
  "Municipal Engineering Office": "https://talibon.gov.ph/wp-content/uploads/2022/01/Engineering-Office.png",
  "Municipal Health Office": "https://talibon.gov.ph/wp-content/uploads/2022/01/Health-Office.png",
  "Municipal Disaster Risk Reduction And Management Office": "https://talibon.gov.ph/wp-content/uploads/2022/01/DRRMO.png",
  "Municipal Information Technology Office": "https://talibon.gov.ph/wp-content/uploads/2022/01/ITO.png",
  "Municipal Tourism Office": "https://talibon.gov.ph/wp-content/uploads/2022/01/Tourism-Office.png",
};

const OrganizationalChartPage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'officials'), orderBy('level', 'asc'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const officials = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      if (officials.length === 0) {
        setData(null);
        setLoading(false);
        return;
      }

      const structuredData = {
        mayor: officials.find((o: any) => o.level === 1) || { name: 'N/A', role: 'Municipal Mayor' },
        level2: officials.filter((o: any) => o.level === 2),
        departments: officials.filter((o: any) => o.level === 3)
      };
      
      setData(structuredData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'officials');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="pt-44 pb-20 flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-44 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl font-bold">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-44 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Liquid UI Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, -45, 0],
            x: [0, -30, 0],
            y: [0, 60, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-24 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-1 bg-gold-500 rounded-full" />
            <span className="text-sm font-black text-gold-500 uppercase tracking-[0.3em]">Executive Structure</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-8">
            Organizational Chart
          </h1>
          <p className="text-xl text-gray-500 font-medium max-w-3xl leading-relaxed">
            The administrative hierarchy of the Municipality of Talibon, showcasing the leadership and departments dedicated to public service.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-12 py-8">
          {/* Level 1: Mayor */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className="p-8 bg-blue-700 text-white rounded-3xl shadow-2xl border-4 border-gold-500 text-center min-w-[300px] relative">
              <div className="w-24 h-24 bg-blue-900/50 rounded-full mx-auto mb-4 border-2 border-white/20 flex items-center justify-center overflow-hidden">
                <User className="w-12 h-12 text-white/40" />
              </div>
              <h3 className="text-2xl font-black mb-1">{data.mayor.name}</h3>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-gold-400">{data.mayor.role}</p>
            </div>
            <div className="w-1 h-12 bg-gray-200" />
          </motion.div>

          {/* Level 2: Admin & SB */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 relative w-full max-w-4xl">
            {/* Horizontal connector */}
            <div className="hidden md:block absolute top-0 left-1/4 right-1/4 h-1 bg-gray-200 -translate-y-12" />
            
            {data.level2.map((item: any, idx: number) => (
              <motion.div 
                key={`${item.role}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className="flex flex-col items-center relative"
              >
                {/* Vertical connector to horizontal line */}
                <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-1 h-12 bg-gray-200 -translate-y-12" />
                
                <div className="p-6 bg-blue-600 text-white rounded-3xl shadow-xl text-center w-full border border-blue-500/50">
                  <div className="w-16 h-16 bg-blue-800/50 rounded-full mx-auto mb-3 border border-white/10 flex items-center justify-center overflow-hidden">
                    {item.role.includes('LEGISLATIVE') ? <Users className="w-8 h-8 text-white/30" /> : <User className="w-8 h-8 text-white/30" />}
                  </div>
                  <h4 className="text-lg font-black mb-1">{item.name}</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-200">{item.role}</p>
                </div>
                <div className="w-1 h-12 bg-gray-200" />
              </motion.div>
            ))}
          </div>

          {/* Level 3: Departments */}
          <div className="w-full relative">
            {/* Horizontal connector for departments */}
            <div className="hidden md:block absolute top-0 left-0 right-0 h-1 bg-gray-200" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
              {data.departments.map((dept: any, idx: number) => (
                  <motion.div 
                    key={`${dept.role}-${idx}`}
                    initial="initial"
                    whileHover="hover"
                    animate="initial"
                    transition={{ delay: 0.4 + idx * 0.05 }}
                    className="flex flex-col items-center relative"
                  >
                    {/* Vertical connector to horizontal line */}
                    <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-1 h-12 bg-gray-200 -translate-y-12" />
                    
                    <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-100 transition-all text-center w-full group h-full flex flex-col items-center justify-center">
                      <motion.div 
                        variants={{
                          initial: { scale: 1, rotate: 0 },
                          hover: { scale: 1.15, rotate: -5, transition: { type: "spring", stiffness: 400, damping: 10 } }
                        }}
                        className="w-12 h-12 bg-gray-50 rounded-full mx-auto mb-3 border border-gray-100 flex items-center justify-center overflow-hidden group-hover:bg-blue-50 transition-colors"
                      >
                        {DEPARTMENT_LOGOS[dept.role] ? (
                          <img 
                            src={DEPARTMENT_LOGOS[dept.role]} 
                            alt={`${dept.role} Logo`} 
                            className="w-full h-full object-contain p-1"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <User className="w-6 h-6 text-gray-300 group-hover:text-blue-400 transition-colors" />
                        )}
                      </motion.div>
                      <h5 className="text-sm font-black text-gray-900 mb-1 leading-tight">{dept.name}</h5>
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 group-hover:text-blue-600 transition-colors">{dept.role}</p>
                    </div>
                  </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationalChartPage;
