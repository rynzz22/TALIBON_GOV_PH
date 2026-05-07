import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, User, ArrowLeft, Loader2, Share2, Bookmark } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  image_url: string;
  date: string;
  author?: string;
}

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error("Error fetching news detail:", error);
      } else {
        setItem(data as NewsItem);
      }
      setLoading(false);
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="pb-20 flex items-center justify-center min-h-screen bg-brand-bg">
        <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="pb-20 px-4 max-w-7xl mx-auto min-h-screen text-center bg-brand-bg">
        <h1 className="text-4xl font-extrabold text-brand-text mb-4 font-display">News Not Found</h1>
        <p className="text-brand-muted mb-8 font-medium">The news article you are looking for does not exist or has been removed.</p>
        <button 
          onClick={() => navigate(-1)}
          className="pro-button px-8 py-4"
        >
          GO BACK
        </button>
      </div>
    );
  }

  return (
    <div className="pb-20 min-h-screen bg-brand-bg relative overflow-hidden">
      {/* Professional UI Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-[40rem] h-[40rem] bg-brand-primary/5 rounded-full blur-[120px]"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-bold text-brand-muted hover:text-brand-primary transition-colors uppercase tracking-widest mb-12 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to News
        </motion.button>

        <article className="pro-card overflow-hidden">
          <div className="aspect-video relative overflow-hidden">
            <img
              src={item.image_url || `https://picsum.photos/seed/${item.id}/1200/800`}
              alt={item.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-text/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <span className="px-4 py-1.5 bg-brand-primary text-white rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">
                {item.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight font-display">
                {item.title}
              </h1>
            </div>
          </div>

          <div className="p-8 md:p-16">
            <div className="flex flex-wrap items-center gap-8 mb-12 pb-8 border-b border-brand-bg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Published On</p>
                  <p className="text-sm font-extrabold text-brand-text">{new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Author</p>
                  <p className="text-sm font-extrabold text-brand-text">{item.author || 'Talibon LGU'}</p>
                </div>
              </div>
              <div className="ml-auto flex gap-3">
                <button className="w-12 h-12 bg-brand-bg text-brand-muted rounded-2xl flex items-center justify-center hover:bg-brand-primary/10 hover:text-brand-primary transition-all">
                  <Share2 size={20} />
                </button>
                <button className="w-12 h-12 bg-brand-bg text-brand-muted rounded-2xl flex items-center justify-center hover:bg-brand-primary/10 hover:text-brand-primary transition-all">
                  <Bookmark size={20} />
                </button>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-brand-muted font-medium leading-relaxed mb-12 italic border-l-4 border-brand-primary pl-6">
                {item.summary}
              </p>
              <div className="text-brand-text leading-relaxed font-medium whitespace-pre-line text-lg">
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
