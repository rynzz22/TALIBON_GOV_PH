import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Anchor, Fish, Waves } from 'lucide-react';

const BACKGROUND_IMAGES = [
  "https://scontent.fceb2-2.fna.fbcdn.net/v/t39.30808-6/503266855_1095310069285852_3589177506267010769_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=dd6889&_nc_eui2=AeErNG3znwQctfTwQP8Ybmi0yTF8fMRb74HJMXx8xFvvgdyN_8lSFbQLd_Gb7PUvoJf59bcpT-o3E4RJGDYSRUSc&_nc_ohc=S4PWw3uNBCoQ7kNvwHBO-YJ&_nc_oc=Adrx8DN4EL8wSyvSWOEZjAMP1Hu_eCClMYoWuDYiUo1_zknuC3we8lhdaoMgxpDhkd0&_nc_zt=23&_nc_ht=scontent.fceb2-2.fna&_nc_gid=arlcNJozz9JuFVdFHXuizg&_nc_ss=7a3a8&oh=00_AfzVj64EE2yrtQO84PEbys_PO-uofjIA6596mo4FCCQbEA&oe=69D1011E",
  "https://scontent.fceb6-1.fna.fbcdn.net/v/t39.30808-6/502915839_1095311819285677_5091851901568921766_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=dd6889&_nc_eui2=AeFJ5Q75bHxzywvwMr4pyIGIm7yTYkB9_AebvJNiQH38B-fDmG_jhpHZulUG3DqXDfu-xtT5RPycNeUUPhQA3Wpe&_nc_ohc=sYORF9WD-q0Q7kNvwGxdGKj&_nc_oc=AdoJJdD33Ams87z7YbrLt9v99C71-FD7cZkAejOsium6VVZR7jcn1CA2PvgKY_LFOAw&_nc_zt=23&_nc_ht=scontent.fceb6-1.fna&_nc_gid=v7K4myP4fe3H3IOJ43XtFA&_nc_ss=7a3a8&oh=00_AfzpJyhi77uXpNevTIFtl_dXoxXejfunZ4J1_iCBlP6DEA&oe=69D0FDB4",
  "https://scontent.fceb2-1.fna.fbcdn.net/v/t39.30808-6/502714154_1095311095952416_5004365439819000423_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=dd6889&_nc_eui2=AeFrwX1jHHyYXIapF7dzjVBuc022KtjKIz9zTbYq2MojPyAdhAZr08DT6iyOgPkJELsLv_XDfq8fAatJkiBIVEGr&_nc_ohc=I8dnOGD6rGAQ7kNvwHNMFZ_&_nc_oc=AdrbRCI-ZK1qvOWY6BoPNH7QcVm3cSEApmbjPGcaPxUx0UAXmW5cbf4-3D9s3VfqjjY&_nc_zt=23&_nc_ht=scontent.fceb2-1.fna&_nc_gid=tBO14Jp3wl4VIPiJI6S2ow&_nc_ss=7a3a8&oh=00_AfyG2xpgF3euhxVrah35xLrKNSlrzE0V8QRxbMto9raDnA&oe=69D108C1",
  "https://scontent.fceb2-2.fna.fbcdn.net/v/t39.30808-6/502845499_1095312322618960_997939339364680833_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=dd6889&_nc_eui2=AeFtiVqeecORugy5iE4tu0RdGIZxawzacu8YhnFrDNpy7x0JkYGvB5sVRWvV8xq1kC3GVdbl4IbyMtFhZ06QTKDT&_nc_ohc=zK4BGL2LXQkQ7kNvwH-G0DU&_nc_oc=AdpSmO6C45JmLTC-73XXVk6QB_P2KEJa17iq8xX0Dzs_DwsAaSiepv8ev7cQ5TXByJ4&_nc_zt=23&_nc_ht=scontent.fceb2-2.fna&_nc_gid=OqvnqEpTIhlaVUaEhPOAWQ&_nc_ss=7a3a8&oh=00_AfzI4fPhWuvUmFewtKhSvQ-Z_EwmXecrM5yTpa8cvK6ZYg&oe=69D0ECE6"
];

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % BACKGROUND_IMAGES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-32 md:pt-44 overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] scale-110"
              style={{ backgroundImage: `url(${BACKGROUND_IMAGES[currentImageIndex]})` }}
            />
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-transparent to-blue-900/60" />
          </motion.div>
        </AnimatePresence>
        
        {/* Waves SVG Animation */}
        <div className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden leading-none z-10">
          <motion.svg 
            animate={{ x: [0, -100, 0] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 w-[200%] h-full opacity-20" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
          </motion.svg>
        </div>

        {/* Floating Boat Animation */}
        <motion.div 
          animate={{ 
            x: [-100, 1200],
            y: [0, -10, 0],
            rotate: [-2, 2, -2]
          }}
          transition={{ 
            x: { duration: 70, repeat: Infinity, ease: "linear" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-32 left-0 z-10 opacity-60"
        >
          <div className="relative">
            <Anchor className="text-white w-12 h-12" />
            <div className="absolute -top-4 -left-2 w-16 h-8 bg-blue-400/30 rounded-b-full rounded-tr-full backdrop-blur-sm" />
          </div>
        </motion.div>

        {/* Floating Fish */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: -100, y: 200 + i * 50 }}
            animate={{ 
              x: 1400,
              y: [200 + i * 50, 180 + i * 50, 200 + i * 50]
            }}
            transition={{ 
              x: { duration: 40 + i * 10, repeat: Infinity, ease: "linear", delay: i * 2 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute z-10 opacity-30"
          >
            <Fish className="text-white" size={20 + i * 4} />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] font-black tracking-[0.2em] mb-8 shadow-xl border border-white/20">
              <Waves size={14} />
              DISCOVER THE COASTAL GEM
            </div>
            
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white leading-[0.85] mb-8 tracking-tighter drop-shadow-2xl">
              BOHOL'S <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                SEAFOOD CAPITAL
              </span>
            </h1>
            
            <div className="space-y-6 mb-12">
              <p className="text-xl md:text-2xl text-white/90 font-bold tracking-tight">
                Home of the late President Carlos P. Garcia
              </p>
              <div className="h-px w-24 bg-blue-400/50 mx-auto" />
              <p className="text-lg text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">
                Experience the bounty of our seas and the warmth of a community built on a legacy of greatness. 
                Talibon is home to the <span className="text-blue-400 font-black">Danajon Bank</span>, the only documented double barrier reef in the Philippines.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-10 py-5 bg-blue-500 text-white rounded-2xl font-black text-xs tracking-widest hover:bg-blue-600 transition-all shadow-2xl shadow-blue-500/40 flex items-center gap-2 group">
                EXPLORE TALIBON
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a 
                href="https://talibon-citizen-stg.multisyscorp.io/e-services" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-10 py-5 bg-white/10 backdrop-blur-md text-white rounded-2xl font-black text-xs tracking-widest hover:bg-white/20 transition-all border border-white/20 shadow-xl inline-block"
              >
                GOVERNMENT SERVICES
              </a>
            </div>

            <div className="mt-16 flex flex-col items-center gap-4">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-2xl border-4 border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center shadow-xl overflow-hidden">
                    <img 
                      src={`https://picsum.photos/seed/talibon${i}/100/100`} 
                      alt="Resident" 
                      className="w-full h-full object-cover opacity-80"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
              <div className="text-center">
                <p className="text-sm font-black text-white">50,000+</p>
                <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Happy Residents & Visitors</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
