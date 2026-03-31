import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { History, ArrowLeft, MapPin, Users, Anchor, Fish, Waves, TrendingUp, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';

const HistoryPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-blue-600 font-black text-[10px] tracking-widest uppercase mb-12 hover:gap-4 transition-all"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 mb-8">
              <History size={14} />
              <span>Historical Profile</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 leading-[0.85] mb-8 tracking-tighter">
              HISTORY OF <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">TALIBON</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-xl">
              A journey through time, from an early Christian mission to becoming Bohol's thriving Seafood Capital.
            </p>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-6">By Yvux A. Apawan</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="aspect-video rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white bg-gray-100 flex items-center justify-center relative group"
          >
            <div className="text-gray-300 flex flex-col items-center gap-2">
              <History size={64} />
              <span className="text-[10px] font-black uppercase tracking-widest">Historical Photo Frame</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg prose-blue max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <section className="space-y-6">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <MapPin size={20} />
                </div>
                Geographic Profile
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Talibon, officially the Municipality of Talibon (Cebuano: Lungsod sa Talibon; Tagalog: Bayan ng Talibon), is a 1st class municipality that lies in the northernmost part of the island Province of Bohol in Central Visayas, Philippines. It is located approximately 114.8 km North of Tagbilaran City, 611.28 km Southeast of Manila, and 49.01 km Southeast of Cebu City.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100/50">
                  <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Boundaries</h4>
                  <ul className="text-sm text-gray-500 space-y-1 font-bold">
                    <li>North: Camotes Sea</li>
                    <li>South: Trinidad</li>
                    <li>East: Bien Unido</li>
                    <li>West: Getafe</li>
                    <li>Southwest: Buenavista</li>
                  </ul>
                </div>
                <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100/50">
                  <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Coordinates</h4>
                  <p className="text-sm text-gray-500 font-bold">10° 09’ 06” North longitude 124° 17’ 25” East latitude</p>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <Waves size={20} />
                </div>
                The Seafood Capital
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Its coastline has significant patches of the <span className="text-blue-600 font-bold">Danajon Bank</span>, the only documented double barrier reef in the Philippines that is teeming with bountiful natural marine resources. Hence, Talibon is considered as the official <span className="text-blue-600 font-bold">Seafood Capital of Bohol</span>.
              </p>
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-[2.5rem] text-white">
                <div className="flex items-center gap-4 mb-4">
                  <Fish size={24} className="text-blue-200" />
                  <h4 className="font-black tracking-tight">Marine Bounty</h4>
                </div>
                <p className="text-blue-50 leading-relaxed">
                  Major products include fishculture (bangus, shrimp, and tilapia), coconut, oyster, rice, seaweeds, swine, cassava, corn, and native chicken.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <Users size={20} />
                </div>
                Demographics & Land Area
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                The municipality possesses a total land area of 140.46 sq km, of which about 7.97 sq km or 5.7% is classified as urban, while the remaining 132.49 sq km is rural. It has twenty-five (25) barangays divided into three (3) groups of eight (8) island barangays, nine (9) coastal barangays, and eight (8) inland barangays.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                According to the 2020 Philippine Statistics Authority Population Census, it has a population of <span className="text-gray-900 font-bold">71,272 people</span> and a population density of 507 people per square kilometer, making it the second-most populous town in Bohol, behind Ubay. It is also the home of some of the world’s most densely populated islands, namely, Nocnocan, Guindacpan, Calituban, and Cataban.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <TrendingUp size={20} />
                </div>
                Economic Progress
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Talibon is becoming a leading commercial hub for at least 1,409 registered retailers, wholesalers, and traders. The municipality is also home to one of the branches of Alturas Group of Companies since 2003 and a shipyard in Sitio Tabon, Barangay San Francisco since 2024.
              </p>
              <div className="bg-blue-50 p-8 rounded-[2.5rem] border border-blue-100">
                <h4 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-4">CMCI Recognition 2024</h4>
                <p className="text-gray-600 leading-relaxed">
                  Talibon achieved a significant milestone, securing the <span className="text-gray-900 font-bold">17th position</span> among 1st and 2nd class municipalities in the entire country on the Cities and Municipalities Competitiveness Index (CMCI) 2024 by the DTI. It made a huge leap from ranking 336th in 2023 to 178th in 2024 among all local government units.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <Landmark size={20} />
                </div>
                Artisanal Industries
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                The locals are also into making artisanal fish traps, hats, and pottery. Silica, limestone, diorites, sand, iron ore, and gravel are also a large industry at present. These minerals are shipped to Cebu and Iligan aboard bulk carriers and barges as these locations are known for cement production and mineral processing.
              </p>
            </section>

            <div className="pt-12 border-t border-gray-100">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">References</h4>
              <ul className="text-xs text-gray-400 space-y-4 leading-relaxed italic">
                <li>Talibon, Bohol Profile. (n.d.). PhilAtlas. Retrieved August 27, 2024, from https://www.philatlas.com/visayas/r07/bohol/talibon.html</li>
                <li>Highlights of the Population of the Municipality of Talibon (Based on the Results of 2020 Census of Population and Housing) (No. 2022-SR12-050). (2022). Philippine Statistics Authority.</li>
                <li>Agriculture and Fishery Modernization Plan 2024-2028. (n.d.). Local Government Unit of Talibon – Municipal Agriculturist’s Office.</li>
                <li>Business Permit Listing Database (as of 19 August 2024). (n.d.). Local Government Unit of Talibon – Municipal Treasurer’s Office.</li>
                <li>Cities and Municipalities Competitiveness Index (CMCI) 2024. (n.d.). Department of Trade and Industry.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
