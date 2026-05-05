
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { ChevronRight, FileText, Calendar, Share2, Printer } from 'lucide-react';
import { motion } from 'motion/react';
import Markdown from 'react-markdown';

export default function ContentPage() {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContent() {
      if (!slug) return;
      setLoading(true);
      setError(null);
      try {
        const data = await api.getContent(slug);
        if (data) setContent(data);
        else setError('Content not found');
      } catch (err) {
        console.error('Error fetching content:', err);
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-40 max-w-4xl mx-auto px-4 pb-20">
        <SkeletonLoader count={1} type="text" />
        <SkeletonLoader count={3} type="card" />
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="pt-40 max-w-4xl mx-auto px-4 pb-20 text-center">
        <div className="text-red-500 mb-4 font-bold uppercase tracking-widest">Error 404</div>
        <h2 className="text-3xl font-black uppercase mb-6">{error || 'Page Not Found'}</h2>
        <Link to="/" className="text-brand-primary font-bold uppercase tracking-widest hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  const { title, body } = content;

  return (
    <div className="pt-40 pb-20 bg-brand-surface min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] font-black text-brand-muted uppercase tracking-widest mb-8">
          <Link to="/" className="hover:text-brand-primary transition-colors">Home</Link>
          <ChevronRight size={10} />
          <span className="text-brand-primary">{title}</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-xl border border-brand-border overflow-hidden"
        >
          {/* Header */}
          <div className="p-8 sm:p-12 border-b border-brand-border bg-gradient-to-br from-white to-brand-surface relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 flex gap-4 opacity-20 pointer-events-none sm:pointer-events-auto">
              <button className="hover:text-brand-primary transition-colors"><Share2 size={20} /></button>
              <button className="hover:text-brand-primary transition-colors" onClick={() => window.print()}><Printer size={20} /></button>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-black text-brand-text font-display uppercase tracking-tight leading-[0.9] mb-4">
              {title}
            </h1>
            {body.subtitle && (
              <p className="text-lg text-brand-muted font-medium max-w-2xl">
                {body.subtitle}
              </p>
            )}
            
            <div className="flex items-center gap-4 mt-8">
              <div className="flex items-center gap-2 text-[10px] font-black text-brand-primary uppercase tracking-widest">
                <Calendar size={12} />
                Last Updated: {new Date(content.updated_at).toLocaleDateString()}
              </div>
              <div className="w-1 h-1 bg-brand-border rounded-full" />
              <div className="text-[10px] font-black text-brand-muted uppercase tracking-widest">
                Official Document
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-8 sm:p-12">
            <div className="prose prose-brand max-w-none">
              {typeof body.content === 'string' ? (
                <div className="markdown-body">
                  <Markdown>{body.content}</Markdown>
                </div>
              ) : (
                <div className="space-y-12">
                  {body.sections?.map((section: any) => (
                    <div key={section.id} id={section.id} className="scroll-mt-40">
                      <h2 className="text-2xl font-black text-brand-text uppercase tracking-tight mb-6 flex items-center gap-4">
                        <span className="w-8 h-8 bg-brand-primary/10 text-brand-primary flex items-center justify-center rounded-lg text-sm">
                          {section.id.split('-').pop()}
                        </span>
                        {section.title}
                      </h2>
                      <div className="grid gap-6">
                        {section.content?.map((sub: any, idx: number) => (
                          <div key={idx} className="bg-brand-surface/50 p-6 rounded-2xl border border-brand-border/50">
                            <h3 className="text-sm font-black text-brand-secondary uppercase tracking-widest mb-4">
                              {sub.subTitle}
                            </h3>
                            <ul className="space-y-3">
                              {sub.items?.map((item: string, i: number) => (
                                <li key={i} className="flex gap-3 text-sm text-brand-muted font-medium">
                                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer Info */}
          <div className="px-8 sm:px-12 py-8 bg-brand-surface/30 border-t border-brand-border flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <FileText size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-brand-muted uppercase tracking-widest">Data Source</p>
                <p className="text-xs font-bold text-brand-text">Municipal Information Office</p>
              </div>
            </div>
            <button 
              className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] border-2 border-brand-primary px-6 py-2.5 rounded-full hover:bg-brand-primary hover:text-white transition-all shadow-lg shadow-brand-primary/20"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Back to Top
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
