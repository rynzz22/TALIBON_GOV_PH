import React, { useState, useEffect } from 'react';
import { BARANGAYS, BarangayOfficial } from '../constants/barangayConfig';
import { motion, AnimatePresence } from 'motion/react';
import { Users, ChevronRight, Search, Landmark, ShieldCheck, User, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { aboutApi } from '../services/api';

const BarangayOfficialsPage: React.FC = () => {
  const [selectedBrgyId, setSelectedBrgyId] = useState(BARANGAYS[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [liveOfficials, setLiveOfficials] = useState<BarangayOfficial[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const selectedBrgy = BARANGAYS.find(b => b.id === selectedBrgyId);
  
  const filteredBarangays = BARANGAYS.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchOfficials = async () => {
      if (!selectedBrgyId) return;
      setIsLoading(true);
      try {
        const data = await aboutApi.getBarangayOfficials(selectedBrgyId);
        if (data && (data as any).officials) {
          setLiveOfficials((data as any).officials);
        } else if (Array.isArray(data) && data.length > 0) {
          setLiveOfficials(data as any);
        } else {
          setLiveOfficials(null);
        }
      } catch (e) {
        setLiveOfficials(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOfficials();
  }, [selectedBrgyId]);

  const displayedOfficials = liveOfficials || selectedBrgy?.officials;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar: Barangay Selection */}
        <aside className="w-full md:w-80 shrink-0 space-y-6">
          <div className="bg-brand-text text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-md">
                  <Landmark size={20} className="text-brand-accent animate-pulse" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent">DIRECTORIES</span>
              </div>
              <h1 className="text-2xl font-black leading-tight uppercase tracking-tighter mb-2">Barangay Hall</h1>
              <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest leading-relaxed">
                Connect with your local community leaders
              </p>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <Users size={120} />
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" size={16} />
            <input 
              type="text" 
              placeholder="Filter barangays..."
              className="w-full bg-gray-50 border border-brand-border rounded-2xl py-3 pl-12 pr-4 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <nav className="flex flex-col gap-1 p-2 bg-gray-50 rounded-[2rem] border border-brand-border/50 max-h-[500px] overflow-y-auto custom-scrollbar">
            {filteredBarangays.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedBrgyId(b.id)}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all text-left relative group ${
                  selectedBrgyId === b.id 
                    ? 'bg-white text-brand-text shadow-md border border-brand-border' 
                    : 'text-brand-muted hover:text-brand-text hover:bg-white/50'
                }`}
              >
                <div className={`w-2 h-2 rounded-full transition-all ${selectedBrgyId === b.id ? 'bg-brand-primary scale-125' : 'bg-gray-200 group-hover:bg-brand-primary/40'}`} 
                     style={{ backgroundColor: selectedBrgyId === b.id ? b.theme.primary : undefined }}
                />
                <span className="text-[10px] font-black uppercase tracking-widest">{b.name}</span>
                {selectedBrgyId === b.id && <ChevronRight size={14} className="ml-auto text-brand-primary" />}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content: Officials List */}
        <main className="flex-1 space-y-8">
          <AnimatePresence mode="wait">
            {selectedBrgy && (
              <motion.div
                key={selectedBrgy.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-12"
              >
                {/* Header Card */}
                <div 
                  className="p-12 rounded-[3rem] text-white relative overflow-hidden shadow-2xl"
                  style={{ backgroundColor: selectedBrgy.theme.primary }}
                >
                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
                          <ShieldCheck size={20} className="text-white" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Official Directory</span>
                      </div>
                      <h2 className="text-5xl font-black tracking-tighter uppercase leading-none mb-4">{selectedBrgy.name}</h2>
                      <p className="text-white/80 font-medium text-lg leading-relaxed max-w-md">
                        The leadership team dedicated to the service and development of {selectedBrgy.name}.
                      </p>
                    </div>
                    <div className="flex flex-col items-center md:items-end justify-center text-center md:text-right">
                      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/20 inline-block">
                        <span className="text-[10px] font-bold text-white/60 uppercase tracking-[0.3em] mb-3 block">Current Barangay Captain</span>
                        <h4 className="text-3xl font-black tracking-tight uppercase leading-none">{selectedBrgy.captain}</h4>
                        <div className="mt-6 flex gap-3 justify-center md:justify-end">
                           <Link to={`/brgy/${selectedBrgy.slug}`} className="px-6 py-3 bg-white text-brand-text rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">Visit Portal</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Decorative */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-black opacity-5 pointer-events-none select-none italic tracking-tighter leading-none whitespace-nowrap">
                    {selectedBrgy.name.toUpperCase()}
                  </div>
                </div>

                {/* Officials Grid */}
                <div className="space-y-8">
                   <div className="flex items-center justify-between border-b-2 border-brand-border pb-4">
                      <h3 className="text-sm font-black text-brand-text uppercase tracking-widest">Sangguniang Barangay Members</h3>
                      <span className="text-[10px] font-mono font-bold text-brand-primary px-3 py-1 bg-brand-primary/5 rounded-full uppercase">Term: 2023-2025</span>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {isLoading ? (
                        <div className="col-span-full py-20 flex flex-col items-center justify-center text-brand-muted gap-4">
                           <RefreshCcw size={40} className="animate-spin text-brand-primary" />
                           <p className="text-[10px] font-black uppercase tracking-widest">Checking secure database...</p>
                        </div>
                      ) : (
                        <>
                          {displayedOfficials?.map((official, idx) => (
                            <motion.div 
                              key={`${selectedBrgy.id}-official-${idx}`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="bg-white p-8 rounded-[2rem] border border-brand-border hover:border-brand-primary/30 transition-all hover:shadow-xl group"
                            >
                               <div className="flex items-center gap-4 mb-6">
                                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-brand-muted group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-colors">
                                     <User size={24} />
                                  </div>
                                  <div>
                                     <p className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] mb-1">{official.position}</p>
                                     <h4 className="text-sm font-black text-brand-text uppercase tracking-tight group-hover:text-brand-primary transition-colors">{official.name}</h4>
                                  </div>
                               </div>
                               <div className="pt-6 border-t border-gray-50 flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                                  <span className="text-[8px] font-mono font-bold tracking-tighter uppercase">ID_REF: TAL_{selectedBrgy.id.slice(0,3).toUpperCase()}_{idx.toString().padStart(2, '0')}</span>
                                  <div className="w-4 h-4 rounded-full border border-brand-border flex items-center justify-center">
                                     <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                                  </div>
                               </div>
                            </motion.div>
                          ))}
                          {!displayedOfficials && (
                            <div className="col-span-full py-20 text-center bg-gray-50 rounded-[2rem] border-2 border-dashed border-brand-border">
                               <p className="text-sm font-bold text-brand-muted uppercase tracking-widest">
                                 Directory expansion for {selectedBrgy.name} in progress...
                               </p>
                            </div>
                          )}
                        </>
                      )}
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default BarangayOfficialsPage;
