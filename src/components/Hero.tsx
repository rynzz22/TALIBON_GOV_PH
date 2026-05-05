import React, { useState, useEffect } from 'react';
import { motion } from "motion/react";
import { ArrowRight, Play, Globe, Shield, Smartphone, Search, Video, VideoOff } from "lucide-react";
import { Link } from "react-router-dom";

import { useLanguage } from "../contexts/LanguageContext";

interface HeroProps {
  overrideTitle?: string;
  overrideSubtitle?: string;
}

const Hero: React.FC<HeroProps> = ({ overrideTitle, overrideSubtitle }) => {
  const { t, language } = useLanguage();
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [videoError, setVideoError] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    const savedPreference = localStorage.getItem('hero-video-enabled');
    if (savedPreference !== null) {
      setVideoEnabled(savedPreference === 'true');
    }
  }, []);

  const toggleVideo = () => {
    const newValue = !videoEnabled;
    setVideoEnabled(newValue);
    localStorage.setItem('hero-video-enabled', String(newValue));
  };

  const handleVideoError = () => {
    console.error("Hero video failed to load, falling back to static image.");
    setVideoError(true);
    setVideoEnabled(false);
  };

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden flex flex-col items-start justify-start pt-[130px] lg:pt-[180px] pb-10 px-0">
      {/* Background Image / Video Overlay */}
      <div className="absolute inset-0 z-0 bg-neutral-900">
        {videoEnabled && !videoError ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            crossOrigin="anonymous"
            onError={handleVideoError}
            poster="https://upload.wikimedia.org/wikipedia/commons/e/e0/Talibon_Municipal_Hall.jpg"
            className="w-full h-full object-cover transition-opacity duration-1000"
          >
            <source 
              src="https://player.vimeo.com/external/370331493.sd.mp4?s=7b23158f118c7c9783f98c8c279a32c2a07c39b8&profile_id=139&oauth2_token_id=57447761" 
              type="video/mp4" 
            />
          </video>
        ) : (
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Talibon_Municipal_Hall.jpg" 
            className="w-full h-full object-cover transition-opacity duration-1000"
            alt="Talibon Bohol Background"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Video Control Toggle */}
      <div className="absolute top-28 right-10 z-20 flex flex-col items-end gap-2">
        <button
          onClick={toggleVideo}
          className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full text-white transition-all group relative"
          title={videoEnabled ? "Disable cinematic video" : "Enable cinematic video"}
        >
          {videoEnabled ? <Video size={18} /> : <VideoOff size={18} />}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/50 text-[10px] text-white whitespace-nowrap rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {videoEnabled ? "Switch to Static" : "Switch to Video"}
          </span>
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-10 w-full text-left">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start"
        >
          <div className="flex items-center gap-4 mt-2 mb-3">
            <h2 className="text-xl sm:text-3xl font-black text-white leading-none tracking-tighter drop-shadow-2xl">
              #TALIBOOM!
            </h2>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.85] tracking-tighter mb-5 drop-shadow-2xl">
            {overrideTitle || (
              <>
                {language === 'en' ? (
                  <>
                    Bohol's <br />
                    Seafood <br />
                    Capital.
                  </>
                ) : (
                  <>
                    Kaulohan <br />
                    sa Isda <br />
                    sa Bohol.
                  </>
                )}
              </>
            )}
          </h1>
          
          <div className="p-1 px-4 bg-[#ffb703] inline-block mb-4">
            <p className="text-black text-[10px] sm:text-xs font-black tracking-[0.25em] uppercase">
              {overrideSubtitle || (language === 'en' ? "Experience Bohol's Premier Destination" : "Masinati ang Kinamaayohang Destinasyon sa Bohol")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
            <a 
              href="https://talibon-citizen-stg.multisyscorp.io/e-services"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#00a852] text-white font-black text-[10px] tracking-[0.15em] rounded-xl hover:bg-[#008c44] transition-all flex items-center justify-center gap-3 uppercase shadow-xl hover:scale-105 active:scale-95"
            >
              <ArrowRight size={18} className="stroke-[3]" /> eGovSuite Portal
            </a>
            
            <Link 
              to="/about/profile"
              className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-black text-[10px] tracking-[0.15em] rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-3 uppercase shadow-lg hover:scale-105 active:scale-95"
            >
              <Smartphone size={18} className="stroke-[3]" /> Municipal Profile
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Quick Services Bottom Bar */}
      <div className="absolute bottom-10 left-0 right-0 z-10 hidden lg:block">
        <div className="max-w-screen-2xl mx-auto px-10 flex items-center gap-3">
          <div className="h-0.5 w-10 bg-[#ffb703] mr-4 opacity-50" />
          {[
            { name: 'Permit', path: '/forms/business', color: 'blue' },
            { name: 'Charter', path: '/transparency/charter', color: 'green' },
            { name: 'IMS', path: '/executive/gad-ims', color: 'orange' },
            { name: 'News', path: '/news/articles', color: 'purple' }
          ].map((item) => (
            <Link 
              key={item.name}
              to={item.path} 
              className={`px-6 py-2 bg-white/5 backdrop-blur-2xl border border-white/10 text-white hover:bg-white/20 hover:border-white/30 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:-translate-y-1 shadow-lg`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

