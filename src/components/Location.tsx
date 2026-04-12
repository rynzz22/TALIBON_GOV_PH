import { motion } from "motion/react";
import { MapPin, Navigation, Globe, Ruler } from "lucide-react";

export default function Location() {
  return (
    <section id="location" className="py-32 bg-brand-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <span className="section-label">Geography</span>
              <h2 className="section-title">Location</h2>
              <p className="text-xl text-brand-muted font-medium leading-relaxed">
                Talibon is a first-class municipality situated in the northernmost part of Bohol, approximately 114.8 kilometers from Tagbilaran City.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-brand-primary shadow-sm">
                  <Globe size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-brand-muted uppercase tracking-widest font-bold mb-1">Coordinates</p>
                  <p className="text-lg font-bold text-brand-text">10.12°N, 124.28°E</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-brand-primary shadow-sm">
                  <Ruler size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-brand-muted uppercase tracking-widest font-bold mb-1">Land Area</p>
                  <p className="text-lg font-bold text-brand-text">140.46 km²</p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button className="minimal-button-primary inline-flex">
                Find GPS Coordinates <Navigation size={18} />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="https://picsum.photos/seed/talibon-map/800/800" 
                alt="Talibon Map" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Minimal Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-8 bg-brand-primary rounded-full animate-ping opacity-20" />
              <div className="absolute top-0 left-0 w-8 h-8 bg-brand-primary rounded-full border-4 border-white shadow-xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
