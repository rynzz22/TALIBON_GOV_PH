import React from 'react';
import { motion } from "motion/react";
import { ArrowRight, Play, Globe, Shield, Smartphone, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-brand-text">
      {/* Full Screen Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60 scale-105"
        >
          <source 
            src="http://talibon.gov.ph/wp-content/uploads/2025/11/AQNfA76VxqBsdOkCQGUI91qEDtBLVfxVALb-H9LBY6HdxHPZYsDhTPqmq4uncItBA1u5CUFmq7KAQA3usI2om9XI_dJCwqeJLyINzeVU7fug1A.mp4" 
            type="video/mp4" 
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-text/40 via-transparent to-brand-text/80" />
      </div>

      {/* Minimal Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl"
        >
          <div className="flex flex-col items-center justify-center gap-4 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-white/30" />
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-secondary">Abante Talibon!</span>
              <div className="w-12 h-[1px] bg-white/30" />
            </div>
          </div>

          <h1 className="text-7xl md:text-9xl font-extrabold text-white leading-[0.9] tracking-tighter mb-12 font-display">
            TALIBON <br />
            <span className="text-brand-secondary">BOHOL</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 font-medium max-w-2xl mx-auto leading-relaxed mb-16">
            A legacy of resilience, a future of innovation. Experience the heart of northern Bohol through modern governance and timeless beauty.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="https://talibon-citizen-stg.multisyscorp.io/e-services"
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-5 bg-white text-brand-text font-bold text-xs tracking-[0.2em] rounded-full hover:bg-brand-secondary hover:text-brand-text transition-all duration-500 uppercase"
            >
              Access Portal
            </a>
            
            <Link 
              to="/about/history"
              className="px-12 py-5 border border-white/20 text-white font-bold text-xs tracking-[0.2em] rounded-full hover:bg-white/10 transition-all duration-500 uppercase backdrop-blur-sm"
            >
              Our Story
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Background Text - Embossment */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-white/[0.03] select-none pointer-events-none leading-none font-display tracking-tighter">
        TALIBON
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent" />
        <span className="text-[8px] font-bold text-white/40 uppercase tracking-[0.4em]">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;

