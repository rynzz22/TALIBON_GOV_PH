import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, User, ArrowLeft, Loader2, Share2, Bookmark } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  imageUrl: string;
  date: string;
  author?: string;
}

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const unsubscribe = onSnapshot(doc(db, 'news', id), (snapshot) => {
      if (snapshot.exists()) {
        setItem({ id: snapshot.id, ...snapshot.data() } as NewsItem);
      } else {
        setItem(null);
      }
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `news/${id}`);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-44 pb-20 flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="pt-44 pb-20 px-4 max-w-7xl mx-auto min-h-screen text-center">
        <h1 className="text-4xl font-black text-gray-900 mb-4">News Not Found</h1>
        <p className="text-gray-500 mb-8">The news article you are looking for does not exist or has been removed.</p>
        <button 
          onClick={() => navigate(-1)}
          className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs tracking-widest hover:bg-blue-700 transition-all"
        >
          GO BACK
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-44 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-blue-600 transition-colors uppercase tracking-widest mb-12 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to News
        </motion.button>

        <article className="bg-white rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-900/5 border border-gray-100">
          <div className="aspect-video relative overflow-hidden">
            <img
              src={item.imageUrl || `https://picsum.photos/seed/${item.id}/1200/800`}
              alt={item.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <span className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block">
                {item.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                {item.title}
              </h1>
            </div>
          </div>

          <div className="p-8 md:p-16">
            <div className="flex flex-wrap items-center gap-8 mb-12 pb-8 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Published On</p>
                  <p className="text-sm font-bold text-gray-900">{new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Author</p>
                  <p className="text-sm font-bold text-gray-900">{item.author || 'Talibon LGU'}</p>
                </div>
              </div>
              <div className="ml-auto flex gap-2">
                <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all">
                  <Share2 size={18} />
                </button>
                <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all">
                  <Bookmark size={18} />
                </button>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-500 font-bold leading-relaxed mb-12 italic border-l-4 border-blue-600 pl-6">
                {item.summary}
              </p>
              <div className="text-gray-700 leading-relaxed font-medium whitespace-pre-line text-lg">
                {item.content}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default NewsDetailPage;
