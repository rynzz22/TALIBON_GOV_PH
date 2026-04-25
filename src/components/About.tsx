import { motion } from "motion/react";
import { Quote, History, Target, Eye, ArrowUpRight, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

interface AboutContent {
  description: string;
  vision: string;
  mission: string;
  mayor: {
    name: string;
    title: string;
    image: string;
  };
}

export default function About() {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from('content')
        .select('body')
        .eq('slug', 'about')
        .single();

      if (error || !data) {
        console.error('Error fetching about content:', error || 'No data returned');
      } else {
        setContent(data.body as AboutContent);
      }
      setLoading(false);
    };

    fetchContent();
  }, []);

  if (loading || !content) {
    return (
      <section id="about" className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="aspect-[4/5] bg-gray-300 rounded-[3rem]"></div>
              <div className="space-y-6">
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-[3rem] shadow-2xl">
              <img
                src={content.mayor.image}
                alt={content.mayor.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Minimal Caption */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-brand-text font-display uppercase tracking-tight">{content.mayor.name}</h3>
              <p className="text-brand-primary font-bold uppercase tracking-[0.2em] text-[10px] mt-1">{content.mayor.title}</p>
            </div>
          </motion.div>

          {/* Content */}
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="section-label">Our Story</span>
              <h2 className="section-title">Heritage & Progress</h2>
              <p className="text-xl text-brand-muted font-medium leading-relaxed">
                {content.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "VISION",
                  desc: content.vision,
                  icon: Eye,
                },
                {
                  title: "MISSION",
                  desc: content.mission,
                  icon: Target,
                }
              ].map((item) => (
                <div key={item.title} className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-surface flex items-center justify-center text-brand-primary">
                    <item.icon size={24} />
                  </div>
                  <h3 className="text-xs font-bold text-brand-text tracking-[0.2em] uppercase">{item.title}</h3>
                  <p className="text-brand-muted text-sm font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-12 border-t border-brand-border">
              <Link
                to="/about/history"
                className="minimal-button-primary inline-flex"
              >
                Explore History <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

