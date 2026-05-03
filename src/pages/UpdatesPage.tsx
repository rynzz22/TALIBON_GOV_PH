import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Facebook, Info, ShieldAlert, Newspaper, Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

const UpdatesPage: React.FC = () => {
  const [activeFeed, setActiveFeed] = useState<'pio' | 'main'>('pio');
  const [news, setNews] = useState<any[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  
  const feeds = {
    pio: {
      name: "Public Info Office",
      url: "https://www.facebook.com/PioTalibon",
      handle: "@PioTalibon"
    },
    main: {
      name: "Official LGU Page",
      url: "https://www.facebook.com/TalibonOfficialPage",
      handle: "@TalibonOfficialPage"
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      setLoadingNews(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .is('barangay_id', null) // Only macro news
        .order('date', { ascending: false })
        .limit(6);
      
      if (!error) {
        setNews(data || []);
      }
      setLoadingNews(false);
    };

    fetchNews();

    const channel = supabase
      .channel('news-public')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'news' }, () => fetchNews())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-24 pb-24 px-4 md:px-8">
      {/* Hero Header */}
      <div className="pt-32 md:pt-44">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-gray-900 text-white p-16 rounded-[4rem] shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md text-blue-400">
              <Newspaper size={14} /> NEWS & UPDATES CENTER
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none font-display uppercase">Stay Informed.</h1>
            <p className="text-gray-400 font-medium text-xl max-w-md leading-relaxed">
              The official portal for municipal advisories, articles, and community announcements.
            </p>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10"
          >
             <div className="w-64 h-64 bg-blue-600 rounded-[3rem] rotate-12 flex items-center justify-center p-8 shadow-2xl shadow-blue-600/40">
                <Facebook size={120} className="-rotate-12 text-white" />
             </div>
          </motion.div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        </div>
      </div>

      {/* Internal News Section */}
      <section>
        <div className="flex items-center justify-between gap-8 mb-12">
           <div>
             <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Recent Announcements</h2>
             <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mt-1">Official Municipal Articles & Advisories</p>
           </div>
           <Link to="/news/all" className="flex items-center gap-2 text-sm font-black text-blue-600 hover:gap-4 transition-all uppercase tracking-widest group">
             View All News <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>

        {loadingNews ? (
           <div className="flex items-center justify-center py-20">
             <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
           </div>
        ) : news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <Link key={item.id} to={`/news/${item.id}`} className="group bg-white rounded-[3rem] border border-gray-100 p-4 hover:border-blue-600/20 hover:shadow-2xl hover:shadow-blue-900/10 transition-all flex flex-col h-full">
                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden mb-8 bg-gray-100">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <Newspaper size={64} />
                    </div>
                  )}
                  <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-900">
                    {item.category}
                  </div>
                </div>
                <div className="px-4 pb-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
                    <Calendar size={14} className="text-blue-600/50" /> {new Date(item.date).toLocaleDateString()}
                  </div>
                  <h3 className="text-xl font-black text-gray-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 font-medium text-sm line-clamp-3 mb-8">
                    {item.summary || item.content.substring(0, 150) + '...'}
                  </p>
                  <div className="mt-auto flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">
                    Read Full Article <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-20 text-center bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
             <Info size={48} className="mx-auto text-gray-200 mb-6" />
             <p className="text-gray-400 font-bold uppercase tracking-widest">No articles published yet.</p>
          </div>
        )}
      </section>

      {/* Social Media Wall Section */}
      <section>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-blue-100 rounded-[2rem] flex items-center justify-center text-blue-600 shadow-xl shadow-blue-600/10">
                <Facebook size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Social Media Wall</h2>
                <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mt-1">Real-time updates from our official channels</p>
              </div>
           </div>
           
           <div className="flex p-1.5 bg-gray-100 rounded-2xl border border-gray-200">
             {(['pio', 'main'] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveFeed(key)}
                  className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                    activeFeed === key 
                      ? 'bg-white text-blue-600 shadow-lg shadow-gray-900/5' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {feeds[key].name}
                </button>
             ))}
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              key={activeFeed}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[4rem] border border-gray-100 shadow-2xl p-4 overflow-hidden"
            >
              <div className="w-full">
                <iframe 
                  src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(feeds[activeFeed].url)}&tabs=timeline&width=800&height=1000&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`} 
                  width="100%" 
                  height="1000" 
                  style={{ border: 'none', overflow: 'hidden', borderRadius: '3rem' }} 
                  scrolling="no" 
                  frameBorder="0" 
                  allowFullScreen={true} 
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title={`Talibon Facebook Feed - ${feeds[activeFeed].name}`}
                />
              </div>
            </motion.div>
          </div>

          <div className="space-y-8">
            <div className="p-10 bg-blue-600 rounded-[3rem] text-white shadow-2xl shadow-blue-600/20 relative overflow-hidden">
              <h3 className="text-[10px] font-black text-blue-200 uppercase tracking-[0.3em] mb-6">Channel Focus</h3>
              <div className="flex items-center gap-6 mb-8">
                 <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center text-white font-black text-2xl border border-white/20">
                   {activeFeed === 'pio' ? 'PIO' : 'LGU'}
                 </div>
                 <div>
                    <h4 className="text-xl font-black tracking-tight">{feeds[activeFeed].name}</h4>
                    <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mt-1">{feeds[activeFeed].handle}</p>
                 </div>
              </div>
              <p className="text-sm text-blue-100 leading-relaxed font-medium mb-8">
                Official real-time updates directly from the <span className="text-white font-bold">{feeds[activeFeed].name}</span>. 
                Follow our official page to stay engaged with local initiatives.
              </p>
              <a 
                href={feeds[activeFeed].url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-5 bg-white text-blue-600 rounded-2xl font-black text-[10px] tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] transition-all"
              >
                VISIT ON FACEBOOK <ExternalLink size={16} />
              </a>
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            </div>

            <div className="p-10 bg-orange-50 rounded-[3rem] border border-orange-100">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-8">
                <ShieldAlert size={32} />
              </div>
              <h3 className="text-xs font-black text-orange-600 uppercase tracking-widest mb-4 font-display">Communication Safety</h3>
              <p className="text-sm text-orange-700/80 leading-relaxed font-medium">
                Talibon prioritizes accurate communication. Always verify advisories through these official digital channels to prevent the spread of misinformation during emergencies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpdatesPage;
