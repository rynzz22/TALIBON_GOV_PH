import { motion } from "motion/react";
import { Facebook, Twitter, Instagram, ArrowUpRight, MessageSquare, ShieldCheck, Flame, Camera } from "lucide-react";

export default function SocialMediaUpdates() {
  const channels = [
    { name: "Information Office", icon: MessageSquare, color: "bg-blue-500" },
    { name: "Abante Talibon", icon: Facebook, color: "bg-brand-primary" },
    { name: "SK Federation", icon: Instagram, color: "bg-pink-500" },
    { name: "PESO Talibon", icon: Facebook, color: "bg-blue-600" },
    { name: "PNP Talibon", icon: ShieldCheck, color: "bg-slate-800" },
    { name: "BFP Talibon", icon: Flame, color: "bg-orange-600" },
    { name: "Tourism Office", icon: Camera, color: "bg-emerald-600" },
  ];

  // Using some icons from lucide that match the context
  const getIcon = (name: string) => {
    if (name.includes("PNP")) return <ShieldCheck size={20} />;
    if (name.includes("BFP")) return <Flame size={20} />;
    if (name.includes("Tourism")) return <Camera size={20} />;
    if (name.includes("SK")) return <Instagram size={20} />;
    if (name.includes("Information")) return <MessageSquare size={20} />;
    return <Facebook size={20} />;
  };

  return (
    <section className="py-32 bg-brand-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="section-label">Stay Connected</span>
            <h2 className="section-title">Social Media Updates</h2>
            <p className="text-xl text-brand-muted font-medium leading-relaxed mb-12">
              Stay informed with the latest announcements, events, and updates from Talibon through our official social media channels.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {channels.map((channel, idx) => (
                <motion.a
                  key={channel.name}
                  href="#"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-3 px-6 py-3 bg-white border border-brand-border rounded-2xl hover:border-brand-primary/20 hover:shadow-lg transition-all group"
                >
                  <div className={`w-8 h-8 rounded-xl ${channel.color} flex items-center justify-center text-white transition-transform group-hover:rotate-12`}>
                    {getIcon(channel.name)}
                  </div>
                  <span className="text-[10px] font-bold text-brand-text uppercase tracking-widest">{channel.name}</span>
                </motion.a>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Mock Social Feed UI */}
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <motion.div
                  key={`social-feed-item-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="p-8 bg-white rounded-[2.5rem] border border-brand-border shadow-xl shadow-black/5"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-brand-primary flex items-center justify-center text-white font-black">T</div>
                    <div>
                      <h4 className="text-sm font-bold text-brand-text uppercase tracking-tight">Talibon Information Office</h4>
                      <p className="text-[10px] text-brand-muted font-medium">2 hours ago • Public Advisory</p>
                    </div>
                  </div>
                  <p className="text-sm text-brand-text font-medium leading-relaxed mb-6">
                    Important update regarding the upcoming municipal-wide clean-up drive. Join us this Saturday as we keep Talibon clean and green! 🌿 #AbanteTalibon
                  </p>
                  <div className="aspect-video rounded-3xl bg-brand-surface overflow-hidden border border-brand-border">
                    <img 
                      src={`https://picsum.photos/seed/talibon${i}/800/450`} 
                      alt="Update" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Decorative element */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
