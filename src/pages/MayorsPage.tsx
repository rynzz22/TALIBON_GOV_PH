import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Users, Landmark, History, Quote, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const MayorsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const eras = [
    {
      title: "Capitanes Municipales",
      subtitle: "Spanish Colonial Regime",
      period: "1733 to 1898",
      mayors: [
        { name: "Nicolas Calagan", term: "1733 – ?", note: "First Elected Mayor" },
        { name: "Mateo Auxtero", term: "1854 – ?" },
        { name: "Francisco Auxtero", term: "" },
        { name: "Feliciano Evangelista", term: "" },
        { name: "Anatalio Orjaleza", term: "" },
        { name: "Maximo Evangelista", term: "" },
        { name: "Pablo Gurrea", term: "" },
        { name: "Maximino Mumar", term: "" },
        { name: "Cipriano Tabigue", term: "" },
        { name: "Santiago Evangelista", term: "" },
        { name: "Gregorio Evangelista", term: "" },
        { name: "Modesto Evangelista", term: "" },
        { name: "Quiterio Garcia", term: "" },
        { name: "Eugenio Evangelista", term: "" },
        { name: "Maximo Rosales", term: "" },
      ]
    },
    {
      title: "Alcaldes Mayores",
      subtitle: "Republic of Bohol and Early American Occupation",
      period: "1898 to 1912",
      mayors: [
        { name: "Eufemio Mumar", term: "" },
        { name: "Miguel Valmoria", term: "" },
        { name: "Pedro Valmoria", term: "" },
        { name: "Fortunato Boncales", term: "" },
        { name: "Marcelino Avergonzado", term: "" },
      ]
    },
    {
      title: "Municipal Presidents",
      subtitle: "Jones Law / Insular Government / Commonwealth",
      period: "1912 to 1946",
      mayors: [
        { name: "Policronio Garcia, Sr.", term: "1912-1916" },
        { name: "Gregorio G. Valmoria", term: "1916-1919" },
        { name: "Longino Avergonzado", term: "1919-1922" },
        { name: "Rosendo Evangelista", term: "1922-1925" },
        { name: "Policronio Garcia, Sr.", term: "1925-1933" },
        { name: "Ernesto B. Flores", term: "1934-1937" },
        { name: "Maximino A. Garcia, Sr.", term: "1938-1946" },
      ]
    },
    {
      title: "Municipal Mayors",
      subtitle: "Japanese Occupation",
      period: "1942 to 1945",
      mayors: [
        { name: "Maximino Boiser, Sr.", term: "1942-1943", note: "Died in office; execution" },
        { name: "Luis B. Goyeneche", term: "1944", note: "Appointed Mayor" },
        { name: "Frederico Aguhar", term: "1946", note: "Acting Mayor" },
        { name: "Eulalio Revilles", term: "1946-1948" },
      ]
    },
    {
      title: "Municipal Mayors",
      subtitle: "Postwar Philippines",
      period: "1946 to 1972",
      mayors: [
        { name: "Pio Mabanag", term: "1948-1951", note: "Appointed Mayor" },
        { name: "Deogracias Mumar", term: "1951", note: "Acting Mayor" },
        { name: "Maximino A. Garcia, Sr.", term: "1952-1957" },
        { name: "Lazaro Evardo", term: "1957-1963" },
        { name: "Catalino Y. Casoyla", term: "1964-1971" },
      ]
    },
    {
      title: "Municipal Mayors",
      subtitle: "Martial Law Period",
      period: "1972 to 1986",
      mayors: [
        { name: "Vidal V. Crescencio, Sr.", term: "1972-1979" },
        { name: "Aureliano Evardo", term: "1979-1986" },
      ]
    },
    {
      title: "Municipal Mayors",
      subtitle: "Fifth Philippine Republic",
      period: "1986 to present",
      mayors: [
        { name: "Sergio E. Credo", term: "1986", note: "OIC" },
        { name: "Esperanza E. Cañete", term: "1986-1987", note: "OIC" },
        { name: "Samuel T. Turtoga", term: "1987-1988", note: "OIC" },
        { name: "Flordelis A. Garcia", term: "1988-1988", note: "OIC" },
        { name: "Gaudencio A. Artiaga", term: "1988-1995" },
        { name: "Juanario A. Item", term: "1995-2001" },
        { name: "Marcos Q. Aurestila", term: "2001-2004" },
        { name: "Juanario A. Item", term: "2004-2010" },
        { name: "Restituto B. Auxtero", term: "2010-2019" },
        { name: "Janette A. Garcia", term: "2019-present" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-blue-600 font-black text-[10px] tracking-widest uppercase mb-12 hover:gap-4 transition-all"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 mb-8">
              <Landmark size={14} />
              <span>Leadership Timeline</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 leading-[0.85] tracking-tighter mb-8">
              MAYORS OF <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">TALIBON</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-2xl">
              Honoring the leaders who shaped the history and progress of our beloved municipality through different eras of our nation's history.
            </p>
          </motion.div>
        </div>

        {/* eras list */}
        <div className="space-y-24">
          {eras.map((era, eraIdx) => (
            <motion.section
              key={eraIdx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex flex-col lg:flex-row gap-12">
                <div className="lg:w-1/3">
                  <div className="sticky top-40 space-y-4">
                    <div className="text-blue-600 font-black text-[10px] tracking-[0.3em] uppercase">{era.period}</div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">
                      {era.title} <br />
                      <span className="text-blue-500 text-lg font-bold">{era.subtitle}</span>
                    </h2>
                    <div className="w-12 h-1 bg-blue-600 rounded-full" />
                  </div>
                </div>

                <div className="lg:w-2/3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {era.mayors.map((mayor, mIdx) => (
                      <div 
                        key={mIdx}
                        className="p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all group"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">{mayor.name}</h3>
                          <Users size={16} className="text-gray-300 group-hover:text-blue-400 transition-colors" />
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          <Calendar size={12} />
                          {mayor.term || "Term Not Recorded"}
                        </div>
                        {mayor.note && (
                          <div className="mt-3 text-[10px] font-black text-blue-400 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full w-fit">
                            {mayor.note}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Commentary for specific eras */}
                  {eraIdx === 1 && (
                    <div className="mt-12 p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 relative overflow-hidden">
                      <div className="absolute top-4 right-4 text-blue-100">
                        <Quote size={64} fill="currentColor" />
                      </div>
                      <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4 relative z-10">Historical Commentary</h4>
                      <div className="text-sm text-gray-600 leading-relaxed space-y-4 relative z-10 font-medium">
                        <p>
                          Recent research by Prof. Emmanuel Luis A. Romanillos reveals that Talibon became a separate municipality from Inabanga in 1733, with Nicolas Calagan elected as its first mayor. This finding, based on primary sources, contrasted with the existing ordinance that officially recognizes Talibon’s founding year as April 22, 1854.
                        </p>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Apawan, Y. A. (2024)</p>
                      </div>
                    </div>
                  )}

                  {eraIdx === 4 && (
                    <div className="mt-12 p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 relative overflow-hidden">
                      <div className="absolute top-4 right-4 text-blue-100">
                        <Quote size={64} fill="currentColor" />
                      </div>
                      <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4 relative z-10">WWII Historical Events</h4>
                      <div className="text-sm text-gray-600 leading-relaxed space-y-4 relative z-10 font-medium">
                        <p>
                          On April 13, 1942, Japanese soldiers invaded Talibon. They forced the townspeople to form a new government under Atty. Maximino C. Boiser, Sr. From 1942 to 1944, Boiser acted as the de facto mayor while Mayor Garcia represented the Commonwealth government-in-exile.
                        </p>
                        <p>
                          Boiser was later unfairly tried and executed in 1943. Historian Gregorio C. Eronico argued that Boiser was a misunderstood patriot who sacrificed himself to save the town from further harm.
                        </p>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Apawan, Y. A. (2024)</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MayorsPage;
