import { motion } from "motion/react";
import { MapPin, Navigation, Globe, Ruler } from "lucide-react";

export default function Location() {
  return (
    <section id="location" className="py-24 bg-blue-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-blue-300 text-sm font-medium tracking-wide">
              <MapPin size={16} />
              <span>Visit Talibon</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">LOCATION</h2>
            
            <div className="space-y-6 text-lg text-blue-100/80 leading-relaxed font-light">
              <p>
                Talibon is a first-class municipality situated in the northernmost part of Bohol, 
                within the Central Visayas region of the Philippines.
              </p>
              <p>
                It is approximately 114.8 kilometers from Tagbilaran City via the north road, 
                about 149.55 kilometers via the east road, and roughly 108.83 kilometers 
                via the interior road.
              </p>
              <p>
                Geographically, Talibon lies at approximately 10.12°N latitude and 124.28°E longitude. 
                The municipality encompasses a land area of 140.46 square kilometers, 
                which constitutes about 2.94% of Bohol’s total area.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                <Globe className="text-blue-400 mb-4" size={24} />
                <p className="text-xs text-blue-300 uppercase tracking-widest font-bold mb-1">Coordinates</p>
                <p className="text-lg font-medium">10.12°N, 124.28°E</p>
              </div>
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                <Ruler className="text-blue-400 mb-4" size={24} />
                <p className="text-xs text-blue-300 uppercase tracking-widest font-bold mb-1">Land Area</p>
                <p className="text-lg font-medium">140.46 km²</p>
              </div>
            </div>

            <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all shadow-xl flex items-center gap-2 group">
              Find GPS Coordinates
              <Navigation size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-[40px] overflow-hidden shadow-2xl border-8 border-white/10 relative">
              {/* Using the map image provided in the request */}
              <img 
                src="https://ais-dev-krbsgax2rnb7khghgiiuev-38007496131.asia-east1.run.app/placeholder-map.png" 
                alt="Talibon Map" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://picsum.photos/seed/talibon-map/800/800";
                }}
              />
              <div className="absolute inset-0 bg-blue-900/10 pointer-events-none" />
              
              {/* Map Controls UI Mockup */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <button className="w-10 h-10 bg-white text-gray-900 rounded-lg shadow-lg flex items-center justify-center font-bold text-xl">+</button>
                <button className="w-10 h-10 bg-white text-gray-900 rounded-lg shadow-lg flex items-center justify-center font-bold text-xl">−</button>
              </div>
              
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded text-[10px] text-gray-600 font-medium">
                Leaflet | © OpenStreetMap
              </div>
            </div>
            
            {/* Decorative Pulse */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500 rounded-full animate-ping opacity-75" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-lg border-2 border-white" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
