import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Users, BarChart3, MapPin, Building2, TrendingUp, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { BARANGAYS } from '../constants/barangayConfig';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const CensusPage: React.FC = () => {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('barangay_stats')
        .select('*');
      
      if (!error && data) {
        // Merge with config to ensure all 25 barangays are represented even if no stats in DB
        const merged = BARANGAYS.map(b => {
          const s = data.find(stat => stat.slug === b.slug);
          return {
            ...b,
            population: s?.population || b.population,
            captain: s?.captain || b.captain,
            // Clean population string to number for chart
            popValue: parseInt((s?.population || b.population).replace(/,/g, ''))
          };
        }).sort((a, b) => b.popValue - a.popValue);
        
        setStats(merged);
      }
      setLoading(false);
    };

    fetchStats();
  }, []);

  const filteredStats = stats.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPopulation = stats.reduce((acc, curr) => acc + curr.popValue, 0);

  return (
    <div className="pt-32 md:pt-44 pb-24 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-1 bg-brand-primary rounded-full" />
            <span className="text-sm font-black text-brand-primary uppercase tracking-[0.3em]">Municipal Data Portal</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-8">
            Census & Demographic Reports
          </h1>
          <p className="text-xl text-gray-500 font-medium max-w-3xl leading-relaxed">
            The official population statistics and community data for the 25 barangays of Talibon.
          </p>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
           <div className="p-10 bg-gray-900 text-white rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <Users size={80} className="absolute -right-8 -top-8 opacity-10 rotate-12 group-hover:scale-110 transition-transform" />
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Total Municipal Population</p>
              <h2 className="text-5xl font-black tracking-tighter leading-none">{totalPopulation.toLocaleString()}</h2>
              <p className="mt-4 text-xs font-bold text-green-400 flex items-center gap-2">
                <TrendingUp size={14} /> Based on 2020-2023 Statistics
              </p>
           </div>
           <div className="p-10 bg-blue-600 text-white rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <Building2 size={80} className="absolute -right-8 -top-8 opacity-10 rotate-12 group-hover:scale-110 transition-transform" />
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-4">Administrative Coverage</p>
              <h2 className="text-5xl font-black tracking-tighter leading-none">25</h2>
              <p className="mt-4 text-xs font-bold text-blue-100 italic">Official Barangays</p>
           </div>
           <div className="p-10 bg-white border border-gray-100 rounded-[3rem] shadow-2xl shadow-blue-900/5 relative overflow-hidden group">
              <BarChart3 size={80} className="absolute -right-8 -top-8 opacity-5 rotate-12 group-hover:scale-110 transition-transform" />
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Most Populous</p>
              <h2 className="text-5xl font-black tracking-tighter leading-none text-gray-900">{stats[0]?.name || '...'}</h2>
              <p className="mt-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Leading Administrative Unit</p>
           </div>
        </div>

        {/* Data Visualization */}
        <section className="mb-20">
           <div className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-gray-100 shadow-2xl shadow-blue-900/5">
              <div className="flex items-center justify-between mb-12">
                 <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Population Distribution</h3>
                 <div className="hidden md:flex gap-4">
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                       <div className="w-3 h-3 bg-blue-600 rounded-full" /> High Population
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                       <div className="w-3 h-3 bg-blue-300 rounded-full" /> Mainland / Average
                    </div>
                 </div>
              </div>
              
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.slice(0, 10)}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }}
                    />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                    <Tooltip 
                      cursor={{ fill: '#f8fafc' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-gray-900 text-white p-4 rounded-2xl shadow-2xl text-xs font-black border border-white/10 uppercase tracking-widest">
                              {payload[0].payload.name}: {payload[0].value?.toLocaleString()} Residents
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="popValue" radius={[8, 8, 0, 0]}>
                      {stats.slice(0, 10).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index < 3 ? '#2563eb' : '#93c5fd'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-8 text-center text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Top 10 Barangays by Population</p>
           </div>
        </section>

        {/* Search and Table */}
        <section>
           <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
              <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Full List by Barangay</h3>
              <div className="relative w-full md:w-96 group">
                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                 <input 
                   type="text" 
                   placeholder="Filter by name..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 pl-16 pr-8 font-bold text-sm focus:outline-none focus:border-blue-600 transition-all shadow-sm"
                 />
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredStats.map((item, idx) => (
                <div key={item.slug} className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 hover:border-blue-600/30 transition-all hover:shadow-2xl hover:shadow-blue-900/5">
                   <div className="flex items-center justify-between mb-6">
                      <div className="p-3 bg-gray-50 rounded-xl text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                         <MapPin size={20} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-gray-300">#{idx + 1}</span>
                   </div>
                   <h4 className="text-lg font-black text-gray-800 uppercase tracking-tight mb-1 group-hover:text-blue-600 transition-all">{item.name}</h4>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Capt. {item.captain}</p>
                   <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Residents</span>
                        <span className="text-xl font-black text-gray-900">{item.population}</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[10px] font-black text-blue-600">
                         {Math.round((item.popValue / totalPopulation) * 100)}%
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </section>
      </motion.div>
    </div>
  );
};

export default CensusPage;
