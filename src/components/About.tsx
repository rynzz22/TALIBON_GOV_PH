import { motion } from "motion/react";
import { History, Target, Eye, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { SkeletonLoader } from "./SkeletonLoader";

interface AboutData {
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
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: contentData, error } = await supabase
          .from("content")
          .select("body")
          .eq("slug", "about")
          .maybeSingle();

        if (error) throw error;
        if (contentData) {
          setData(contentData.body as any);
        }
      } catch (error) {
        console.error("Error fetching about content:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <section id="about" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SkeletonLoader count={1} type="card" />
        </div>
      </section>
    );
  }

  const aboutContent = data || {
    description: "Talibon is a testament to resilience and the bounty of the sea. As the Seafood Capital of Bohol, we bridge our rich history with a digital-first future.",
    vision: "To be a premier center of commerce and eco-tourism in Northern Bohol.",
    mission: "Empowering citizens through sustainable development and digital governance.",
    mayor: {
      name: "Hon. Janette Aurestila-Garcia",
      title: "Municipal Mayor",
      image: "https://talibon.gov.ph/wp-content/themes/yootheme/cache/28/MUNICIPAL-Mayoe2-28d8fb46.webp"
    }
  };

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
                src={aboutContent.mayor.image} 
                alt={aboutContent.mayor.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Minimal Caption */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-brand-text font-display uppercase tracking-tight">{aboutContent.mayor.name}</h3>
              <p className="text-brand-primary font-bold uppercase tracking-[0.2em] text-[10px] mt-1">{aboutContent.mayor.title}</p>
            </div>
          </motion.div>

          {/* Content */}
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="section-label">Our Story</span>
              <h2 className="section-title">Heritage & Progress</h2>
              <p className="text-xl text-brand-muted font-medium leading-relaxed">
                {aboutContent.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { 
                  title: "VISION", 
                  desc: aboutContent.vision,
                  icon: Eye,
                },
                { 
                  title: "MISSION", 
                  desc: aboutContent.mission,
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

