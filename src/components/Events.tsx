import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Calendar, Clock, MapPin, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { db, handleFirestoreError, OperationType } from "../firebase";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  imageUrl: string;
}

export default function Events() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'news'), orderBy('date', 'desc'), limit(3));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsItem));
      setNews(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'news');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <section id="events" className="py-24 bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </section>
    );
  }

  if (news.length === 0) {
    return null; // Or show a default message
  }

  return (
    <section id="events" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest">Stay Updated</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Latest News <br />
            <span className="text-gray-400">& Announcements</span>
          </h3>
          <p className="text-lg text-gray-600 font-light leading-relaxed">
            Don't miss out on the latest happenings in Talibon. Stay informed about our community and government updates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <Link key={item.id} to={`/news/view/${item.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-[40px] overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/5 transition-all h-full"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={item.imageUrl || "https://picsum.photos/seed/news/800/600"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-center shadow-lg">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                      {new Date(item.date).toLocaleDateString('en-US', { month: 'short' })}
                    </p>
                    <p className="text-xl font-black text-gray-900 leading-none">
                      {new Date(item.date).getDate()}
                    </p>
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-black uppercase tracking-widest">
                        {item.category}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 font-light leading-relaxed line-clamp-2">
                      {item.summary}
                    </p>
                  </div>

                  <div className="w-full py-4 rounded-2xl bg-gray-50 text-gray-900 font-bold flex items-center justify-center gap-2 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    Read More <ArrowRight size={18} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/news/updates" className="text-blue-600 font-bold flex items-center gap-2 mx-auto hover:gap-3 transition-all w-fit">
            View All Updates <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
