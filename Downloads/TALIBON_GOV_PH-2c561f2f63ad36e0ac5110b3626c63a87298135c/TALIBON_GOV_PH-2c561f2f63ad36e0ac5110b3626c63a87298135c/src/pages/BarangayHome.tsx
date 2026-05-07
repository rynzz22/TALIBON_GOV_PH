import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { BARANGAYS, BarangayOfficial } from "../constants/barangayConfig";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Tourism from "../components/Tourism";
import Location from "../components/Location";
import PopularServices from "../components/PopularServices";
import TransparencyGovernance from "../components/TransparencyGovernance";
import MunicipalOffices from "../components/MunicipalOffices";
import { motion } from "motion/react";
import { aboutApi } from "../services/api";

const BarangayHome: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const brgy = BARANGAYS.find((b) => b.slug === slug);
  const [liveOfficials, setLiveOfficials] = useState<BarangayOfficial[] | null>(null);
  const [liveStats, setLiveStats] = useState<any>(null);

  useEffect(() => {
    if (brgy) {
      document.documentElement.style.setProperty("--primary", brgy.theme.primary);
      document.documentElement.style.setProperty("--secondary", brgy.theme.secondary);
      document.documentElement.style.setProperty("--accent", brgy.theme.accent);
      
      // Update title
      document.title = `${brgy.name} | Talibon, Bohol`;

      // Fetch dynamic stats
      aboutApi.getBarangayStatsBySlug(brgy.slug).then(data => {
        if (data && (data as any).population) {
          setLiveStats(data);
        }
      }).catch(() => {});
 
      // Fetch dynamic officials
      aboutApi.getBarangayOfficials(brgy.id).then(data => {
        if (data && (data as any).officials) {
          setLiveOfficials((data as any).officials);
        } else if (Array.isArray(data) && data.length > 0) {
          setLiveOfficials(data as any);
        }
      }).catch(() => {});
    }

    return () => {
      // Reset to defaults on unmount
      document.documentElement.style.removeProperty("--primary");
      document.documentElement.style.removeProperty("--secondary");
      document.documentElement.style.removeProperty("--accent");
      document.title = "Talibon | Official Gateway";
    };
  }, [brgy]);

  if (!brgy) {
    return <Navigate to="/" replace />;
  }

  const displayedOfficials = liveOfficials || brgy.officials;

  return (
    <main className="barangay-site">
      {/* Barangay Banner / Hero Overlay */}
      <section className="relative z-50 pointer-events-none">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 px-6 py-2 bg-brand-primary text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-full shadow-2xl backdrop-blur-md opacity-80 border border-white/20">
          Official {brgy.name} Portal
        </div>
      </section>

      {/* We reuse the main sections but they will now use the new CSS variables */}
      <Hero 
        overrideTitle={brgy.name} 
        overrideSubtitle={brgy.description}
      />
            <div className="bg-white dark:bg-dark-bg py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
           >
             <div className="minimal-card p-12 text-center">
               <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-4 block">Barangay Captain</span>
               <h3 className="text-2xl font-black">{liveStats?.captain || brgy.captain}</h3>
             </div>
             <div className="minimal-card p-12 text-center">
               <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-4 block">Population</span>
               <h3 className="text-2xl font-black">{liveStats?.population || brgy.population}</h3>
             </div>
             <div className="minimal-card p-12 text-center border-2 border-brand-primary/10">
               <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-4 block">Status</span>
               <h3 className="text-2xl font-black">Active Site</h3>
             </div>
           </motion.div>

           {displayedOfficials && (
             <motion.section 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               className="space-y-12"
             >
               <div className="flex flex-col items-center text-center gap-4 mb-16">
                 <span className="section-label">Leadership</span>
                 <h2 className="section-title">Sangguniang Barangay</h2>
                 <div className="w-12 h-1 bg-brand-primary rounded-full" />
               </div>
 
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                 {displayedOfficials.map((official, idx) => (
                   <div key={idx} className="bg-brand-surface p-6 rounded-2xl border border-brand-border hover:border-brand-primary/20 transition-all text-center">
                     <p className="text-[8px] font-black text-brand-primary uppercase tracking-widest mb-1">{official.position}</p>
                     <h4 className="text-xs font-black text-brand-text uppercase italic">{official.name}</h4>
                   </div>
                 ))}
               </div>
             </motion.section>
           )}
        </div>
      </div>

      <PopularServices />
      <Services />
      <Tourism />
      <Location />
      <TransparencyGovernance />
    </main>
  );
};

export default BarangayHome;
