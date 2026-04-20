import React from 'react';
import { motion } from "motion/react";
import { ArrowRight, Play, Globe, Shield, Smartphone, Search } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroProps {
  overrideTitle?: string;
  overrideSubtitle?: string;
}

const Hero: React.FC<HeroProps> = ({ overrideTitle, overrideSubtitle }) => {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden flex flex-col items-start justify-center px-4 sm:px-12 lg:px-24">
      {/* Background Image / Video Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source 
            src="http://talibon.gov.ph/wp-content/uploads/2025/11/AQNfA76VxqBsdOkCQGUI91qEDtBLVfxVALb-H9LBY6HdxHPZYsDhTPqmq4uncItBA1u5CUFmq7KAQA3usI2om9XI_dJCwqeJLyINzeVU7fug1A.mp4" 
            type="video/mp4" 
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-left space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-4xl sm:text-7xl font-black text-white leading-none tracking-tight">
              #TALIBOOM!
            </h2>
            <div className="px-4 py-1 bg-brand-secondary text-white text-sm font-black rounded-full rotate-3 animate-bounce">NEW</div>
          </div>
          <h1 className="text-5xl sm:text-8xl font-black text-white leading-tight tracking-tight">
            {overrideTitle || (
              <>
                Bohol's <br />
                Seafood Capital.
              </>
            )}
          </h1>
          <p className="text-[#ffb703] text-xl sm:text-3xl font-black tracking-tight mt-4 uppercase">
            {overrideSubtitle || "Experience Bohol's Premier Destination in the Philippines"}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-12">
            <a 
              href="https://talibon-citizen-stg.multisyscorp.io/e-services"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-[#00a852] text-white font-black text-sm tracking-widest rounded-xl hover:bg-[#008c44] transition-all flex items-center gap-3 uppercase shadow-xl"
            >
              <ArrowRight size={20} /> eGovSuite Portal
            </a>
            
            <Link 
              to="/about/profile"
              className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black text-sm tracking-widest rounded-xl hover:bg-white/20 transition-all flex items-center gap-3 uppercase"
            >
              <Smartphone size={20} /> Municipal Profile
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Quick Services Bottom Bar (Mock matching screenshot tags) */}
      <div className="absolute bottom-12 left-0 right-0 z-10 px-4 sm:px-12 lg:px-24 hidden lg:block">
        <div className="flex items-center gap-4">
          <Link to="/forms/business" className="px-6 py-3 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-blue-200 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-500/30 transition-all">Permit</Link>
          <Link to="/transparency/charter" className="px-6 py-3 bg-green-500/20 backdrop-blur-md border border-green-400/30 text-green-200 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-green-500/30 transition-all">Charter</Link>
          <Link to="/executive/gad-ims" className="px-6 py-3 bg-orange-500/20 backdrop-blur-md border border-orange-400/30 text-orange-200 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-orange-500/30 transition-all">IMS</Link>
          <Link to="/news/articles" className="px-6 py-3 bg-purple-500/20 backdrop-blur-md border border-purple-400/30 text-purple-200 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-purple-500/30 transition-all">News</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

