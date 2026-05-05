import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, ChevronDown, ChevronRight, Users, Shield, Building2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Official {
  id: string;
  name: string;
  role: string;
  level: number;
  display_order: number;
  image_url?: string;
}

const levelColors: Record<number, string> = {
  1: 'bg-brand-primary text-white border-brand-primary shadow-brand-primary/20',
  2: 'bg-brand-secondary text-white border-brand-secondary shadow-brand-secondary/20',
  3: 'bg-white text-brand-text border-brand-accent shadow-brand-accent/10',
};

const levelIcons: Record<number, any> = {
  1: Shield,
  2: Users,
  3: Building2,
};

export default function OrganizationalChart() {
  const [officials, setOfficials] = useState<Official[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLevel, setActiveLevel] = useState<number | null>(null);

  useEffect(() => {
    async function fetchOfficials() {
      try {
        const { data, error } = await supabase
          .from('officials')
          .select('*')
          .order('level', { ascending: true })
          .order('display_order', { ascending: true });

        if (error) throw error;
        if (data) setOfficials(data);
      } catch (err) {
        console.error('Error fetching officials:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchOfficials();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  if (!loading && officials.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-brand-surface rounded-full flex items-center justify-center mx-auto mb-6 text-brand-primary/40">
          <Users size={40} />
        </div>
        <h3 className="text-2xl font-black text-brand-text uppercase mb-4">No Officials Listed</h3>
        <p className="text-brand-muted max-w-md mx-auto font-medium">
          The municipal organizational chart is currently being updated. Please check back later or visit the Municipal Hall for more information.
        </p>
      </div>
    );
  }

  const levels = [1, 2, 3];
  const levelLabels: Record<number, string> = {
    1: 'Executive Leadership',
    2: 'Legislative Council (SB)',
    3: 'Department Heads & Offices',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <span className="section-label mb-4">Governance Structure</span>
        <h2 className="text-4xl font-black text-brand-text font-display uppercase tracking-tight">
          Organizational Hierarchy
        </h2>
        <div className="w-24 h-1.5 bg-brand-primary mx-auto mt-6 rounded-full" />
      </div>

      <div className="space-y-8">
        {levels.map((level) => {
          const levelOfficials = officials.filter(o => o.level === level);
          if (levelOfficials.length === 0) return null;

          const Icon = levelIcons[level];

          return (
            <motion.div 
              key={level}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className={`p-3 rounded-2xl ${levelColors[level]} shadow-xl`}>
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-text font-display uppercase">
                    {levelLabels[level]}
                  </h3>
                  <p className="text-[10px] font-black text-brand-primary tracking-widest uppercase">
                    Level {level} Authority
                  </p>
                </div>
              </div>

              <div className={`grid gap-6 ${
                level === 1 ? 'grid-cols-1' : 
                level === 2 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 
                'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
              }`}>
                {levelOfficials.map((official, idx) => (
                  <motion.div
                    key={official.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`group relative bg-white border border-brand-border rounded-[2rem] p-6 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${
                      level === 1 ? 'max-w-md mx-auto w-full text-center' : ''
                    }`}
                  >
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl group-hover:bg-brand-primary/10 transition-colors" />

                    <div className={`flex items-center ${level === 1 ? 'flex-col' : 'gap-4'}`}>
                      <div className={`relative ${level === 1 ? 'mb-6' : ''}`}>
                        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-brand-primary/20 shadow-lg`}>
                          {official.image_url ? (
                            <img src={official.image_url} alt={official.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-brand-surface flex items-center justify-center text-brand-primary">
                              <User size={32} />
                            </div>
                          )}
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-lg shadow-md border border-brand-border">
                          <Icon size={12} className="text-brand-primary" />
                        </div>
                      </div>

                      <div className={level === 1 ? 'text-center' : ''}>
                        <h4 className="text-sm sm:text-base font-black text-brand-text uppercase tracking-tight line-clamp-1">
                          {official.name}
                        </h4>
                        <p className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] mt-1">
                          {official.role}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-brand-border flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                      <span className="text-[9px] font-bold text-brand-muted uppercase tracking-widest">
                        {official.barangay_id ? 'Barangay Unit' : 'Municipal Unit'}
                      </span>
                      <ChevronRight size={14} className="text-brand-primary transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {level < 3 && levelOfficials.length > 0 && (
                <div className="flex justify-center my-8">
                  <div className="w-px h-12 bg-gradient-to-b from-brand-primary to-transparent" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-20 bg-brand-surface border border-brand-primary/10 rounded-[3rem] p-10 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl" />
        <h3 className="text-xl font-bold text-brand-text mb-4 uppercase tracking-tighter">Information Update Policy</h3>
        <p className="text-sm text-brand-muted max-w-2xl mx-auto font-medium">
          The organizational hierarchy is managed through the Municipal CMS. Updates to roles, photos, and personnel are reflected in real-time as officially enacted by the HR and Administrative Department.
        </p>
      </div>
    </div>
  );
}
