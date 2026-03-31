import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Users, Briefcase, Award, Anchor, Waves, Ship, Landmark } from 'lucide-react';

const BriefProfile: React.FC = () => {
  const stats = [
    { label: "Land Area", value: "140.46 sq km", icon: MapPin },
    { label: "Population", value: "71,272", icon: Users },
    { label: "Barangays", value: "25", icon: Landmark },
    { label: "CMCI Rank", value: "17th", icon: Award },
  ];

  return (
    <section id="profile" className="py-24 bg-blue-50/30 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-[10px] font-black tracking-[0.2em] mb-4 border border-blue-200">
            <Landmark size={14} />
            MUNICIPAL PROFILE
          </div>
          <h2 className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tighter mb-6">
            Brief <span className="text-blue-600">Profile</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto font-medium">
            Talibon is a 1st class municipality that lies in the northernmost part of the island Province of Bohol in Central Visayas, Philippines.
          </p>
        </motion.div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-blue-50 text-center group hover:scale-105 transition-transform"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <stat.icon size={24} />
              </div>
              <p className="text-2xl font-black text-gray-900">{stat.value}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: General & Geography */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="glass-card p-10 rounded-[3rem] space-y-6">
              <div className="flex items-center gap-3 text-blue-600 mb-2">
                <Waves size={24} />
                <h3 className="text-2xl font-black tracking-tight">Geography & Resources</h3>
              </div>
              <p className="text-gray-600 leading-relaxed font-medium">
                Its coastline has significant patches of the <span className="text-blue-600 font-bold">Danajon Bank</span>, the only documented double barrier reef in the Philippines that is teeming with bountiful natural marine resources. Hence, Talibon is considered as the official <span className="text-blue-600 font-bold">Seafood Capital of Bohol</span>.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                The municipality is bounded on the North by the Camotes Sea, South by Trinidad, East by Bien Unido, West by Getafe, and Southwest by Buenavista. It is located within 10° 09′ 06″ North longitude 124° 17′ 25″ East latitude.
              </p>
            </div>

            <div className="glass-card p-10 rounded-[3rem] space-y-6">
              <div className="flex items-center gap-3 text-blue-600 mb-2">
                <Navigation size={24} />
                <h3 className="text-2xl font-black tracking-tight">Accessibility</h3>
              </div>
              <p className="text-gray-600 leading-relaxed font-medium">
                Located approximately 114.8 km North of Tagbilaran City, 611.28 km Southeast of Manila, and 49.01 km Southeast of Cebu City.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                    <Ship size={16} />
                  </div>
                  <p className="text-sm text-gray-500">Directly accessible to Cebu City by boat (approx. 4 hours) and Southern Leyte via Bato (approx. 3 hours).</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                    <Navigation size={16} />
                  </div>
                  <p className="text-sm text-gray-500">Accessible via RORO ferries or high-speed catamaran via Tubigon or Getafe ports.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Economy & Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="glass-card p-10 rounded-[3rem] space-y-6">
              <div className="flex items-center gap-3 text-blue-600 mb-2">
                <Briefcase size={24} />
                <h3 className="text-2xl font-black tracking-tight">Economy & Industry</h3>
              </div>
              <p className="text-gray-600 leading-relaxed font-medium">
                Major industries are farming and fishing with products such as bangus, shrimp, tilapia, banana, coconut, oyster, rice, seaweeds, and more.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                A leading commercial hub with 1,409+ registered retailers. Home to a shipyard in Sitio Tabon since 2024 and Alturas Group mall since 2003. Minerals like Silica, limestone, and iron ore are also a large industry.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Farming', 'Fishing', 'Shipyard', 'Mining', 'Commerce'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">{tag}</span>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-10 rounded-[3rem] text-white space-y-6 shadow-2xl shadow-blue-600/20">
              <div className="flex items-center gap-3 mb-2">
                <Award size={24} />
                <h3 className="text-2xl font-black tracking-tight">2024 Achievements</h3>
              </div>
              <p className="text-blue-50 leading-relaxed font-medium">
                Ranked <span className="text-white font-black">17th</span> among 1st & 2nd class municipalities nationwide in the Cities and Municipalities Competitiveness Index (CMCI) 2024.
              </p>
              <p className="text-blue-100/80 text-sm leading-relaxed">
                A massive leap from 336th in 2023 to 178th in 2024 among all LGUs, showcasing significant improvement in economic dynamism, efficiency, and innovation.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Demographics Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 glass-card p-12 rounded-[3.5rem] border-2 border-blue-100"
        >
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1">
              <h3 className="text-3xl font-black text-gray-900 mb-4">Demographics</h3>
              <p className="text-gray-500 font-medium">
                With a population of 71,272, Talibon is the second-most populous town in Bohol.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
                <p className="text-xs font-black text-blue-400 uppercase tracking-widest mb-2">DENSITY</p>
                <p className="text-gray-600 text-sm">507 people per square kilometer. Home to some of the world's most densely populated islands: Nocnocan, Guindacpan, Calituban, and Cataban.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
                <p className="text-xs font-black text-blue-400 uppercase tracking-widest mb-2">BARANGAY GROUPS</p>
                <p className="text-gray-600 text-sm">25 Barangays: 8 Island, 9 Coastal, and 8 Inland. Major urban hubs include Poblacion, San Jose, and San Francisco.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BriefProfile;
