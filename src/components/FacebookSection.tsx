import React from 'react';
import { motion } from 'motion/react';
import { Facebook, ExternalLink, Calendar, MessageCircle, Share2, Heart, Shield } from 'lucide-react';

export default function FacebookSection() {
  return (
    <section id="facebook-updates" className="py-20 bg-brand-surface relative overflow-hidden">
      {/* Decorative background logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
        <Facebook size={600} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Header & Description */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="section-label group inline-flex items-center gap-2">
                <Facebook size={12} className="text-blue-600" />
                Live Updates
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-brand-text font-display leading-[0.9] tracking-tight">
                STAY CONNECTED <br />
                <span className="text-blue-600">ON FACEBOOK</span>
              </h2>
              <p className="text-lg text-brand-muted font-medium leading-relaxed max-w-md">
                Get the latest news, emergency advisories, and community highlights directly from our official social media channel.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Followers', value: '45K+', icon: Heart },
                { label: 'Daily Posts', value: '3-5', icon: Calendar },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-brand-border shadow-sm">
                  <stat.icon size={20} className="text-blue-600 mb-3" />
                  <div className="text-2xl font-black text-brand-text">{stat.value}</div>
                  <div className="text-[10px] font-black text-brand-muted uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <a 
                href="https://web.facebook.com/TalibonOfficialPage" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest flex items-center gap-3 w-fit shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all hover:scale-105 active:scale-95"
              >
                Go to official Page <ExternalLink size={18} />
              </a>
            </div>
          </div>

          {/* Facebook Plugin Container */}
          <div className="lg:col-span-7 h-full min-h-[600px] bg-white rounded-[2.5rem] shadow-2xl border-4 border-white overflow-hidden relative group">
            {/* Custom Iframe implementation for Facebook Page Plugin */}
            <iframe 
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fweb.facebook.com%2FTalibonOfficialPage&tabs=timeline&width=500&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" 
              width="100%" 
              height="600" 
              style={{ border: 'none', overflow: 'hidden' }} 
              scrolling="no" 
              frameBorder="0" 
              allowFullScreen={true} 
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              className="w-full h-full min-h-[600px] rounded-2xl"
              title="Talibon Facebook Feed"
            />
            
            {/* Overlay Gradient to blend with rounded corners */}
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          </div>

        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            { 
              title: "Digital Engagement", 
              desc: "Comment and engage with municipal initiatives in real-time.",
              icon: MessageCircle
            },
            { 
              title: "Easy Sharing", 
              desc: "Spread community news and advisories with your network with one click.",
              icon: Share2
            },
            { 
              title: "Verified Info", 
              desc: "Get information straight from the source with our verified official page.",
              icon: Shield
            }
          ].map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-white border border-brand-border rounded-3xl hover:border-blue-600/30 transition-colors"
            >
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <feature.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-brand-text uppercase mb-2">{feature.title}</h3>
              <p className="text-sm text-brand-muted font-medium">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
