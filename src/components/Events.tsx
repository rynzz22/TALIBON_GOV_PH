import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Calendar, Clock, MapPin, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  image_url: string;
}

export default function Events() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .is('barangay_id', null)
        .order('date', { ascending: false })
        .limit(3);

      if (error) {
        console.error("Error fetching homepage news:", error);
      } else {
        setNews(data as NewsItem[]);
      }
      setLoading(false);
    };

    fetchNews();

    const channel = supabase
      .channel('homepage-news')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'news' }, () => fetchNews())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  if (loading) {
    return (
      <section id="events" className="py-32 bg-white flex flex-col items-center justify-center gap-6">
        <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
        <p className="text-brand-muted font-bold animate-pulse uppercase tracking-[0.2em] text-sm">
          Fetching latest news...
        </p>
      </section>
    );
  }

  if (news.length === 0) {
    return null;
  }

  return (
    <section id="events" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="section-label">Stay Updated</span>
          <h2 className="section-title">Latest News</h2>
          <p className="text-brand-muted font-medium text-lg max-w-2xl mx-auto">
            Don't miss out on the latest happenings in Talibon. Stay informed about our community and government updates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {news.map((item, index) => (
            <Link key={item.id} to={`/news/view/${item.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group space-y-6"
              >
                <div className="aspect-[16/10] relative overflow-hidden rounded-[2.5rem] shadow-xl">
                  <img
                    src={item.image_url || "https://picsum.photos/seed/news/800/600"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6 bg-white px-4 py-2 rounded-2xl shadow-lg">
                    <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">
                      {new Date(item.date).toLocaleDateString('en-US', { month: 'short' })}
                    </p>
                    <p className="text-2xl font-extrabold text-brand-text leading-none">
                      {new Date(item.date).getDate()}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 px-2">
                  <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em]">
                    {item.category}
                  </span>
                  <h4 className="text-2xl font-bold text-brand-text group-hover:text-brand-primary transition-colors font-display tracking-tight leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-brand-muted font-medium leading-relaxed line-clamp-2">
                    {item.summary}
                  </p>
                  <div className="pt-4 flex items-center gap-2 text-[10px] font-bold text-brand-text uppercase tracking-widest group-hover:gap-4 transition-all">
                    Read Story <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="mt-24 text-center">
          <Link to="/news/updates" className="minimal-button-outline inline-flex">
            View All Updates
          </Link>
        </div>
      </div>
    </section>
  );
}
