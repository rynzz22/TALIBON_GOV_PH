import { motion } from "motion/react";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, ArrowUpRight, Globe, ArrowRight } from "lucide-react";

export default function Footer() {
  const hotlines = [
    { name: "BFP Talibon", number: "09506329025" },
    { name: "PNP Talibon", number: "09985986442" },
    { name: "MDRRMO (TESaRU)", number: "09105035390" },
    { name: "RHU Talibon (DOH)", number: "09175620239" },
    { name: "PCG Talibon", number: "09096938871" },
    { name: "TARSIER", number: "117/09497955530/09175101490" },
    { name: "RHU Birthing Center", number: "(0919) 767 0072" },
    { name: "RHU Main", number: "(0963) 347 6355" },
  ];

  const govLinks = [
    { name: "Office of The President", href: "https://op-proper.gov.ph/" },
    { name: "Office of The Vice President", href: "https://ovp.gov.ph/" },
    { name: "Senate of the Philippines", href: "https://legacy.senate.gov.ph/" },
    { name: "House of Representatives", href: "https://www.congress.gov.ph/" },
    { name: "Supreme Court", href: "https://sc.judiciary.gov.ph/" },
    { name: "Court of Appeals", href: "https://ca.judiciary.gov.ph/" },
    { name: "Sandiganbayan", href: "https://sb.judiciary.gov.ph/" },
  ];

  const govPhLinks = [
    { name: "GOV.PH", href: "https://www.gov.ph/" },
    { name: "Open Data Portal", href: "https://data.gov.ph/" },
    { name: "Official Gazette", href: "https://www.officialgazette.gov.ph/" },
  ];

  return (
    <footer id="contact" className="bg-gray-900 text-white pt-16 pb-8 overflow-hidden relative">
      {/* Decorative Ocean Elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-gold-400 to-blue-600" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Branding & Contact */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-2xl p-2 shadow-xl flex items-center justify-center overflow-hidden">
                <img 
                  src="http://talibon.gov.ph/wp-content/uploads/2025/09/Talibon-Official-Seal-v4-2003-to-2023-.png" 
                  alt="Official Seal" 
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tight">TALIBON</h2>
                <p className="text-[10px] font-bold text-gold-400 tracking-widest uppercase">Province of Bohol</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-400 hover:text-gold-400 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Email Address</p>
                  <p className="text-sm font-bold">talibonofficial@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-gold-400 transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">Office of Mayor</p>
                  <p className="text-sm font-bold">(038) 422-2895</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a href="https://web.facebook.com/TalibonOfficialPage?_rdc=1&_rdr#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all">
                <Facebook size={18} />
              </a>
              {[Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Emergency Hotlines */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-black tracking-[0.2em] uppercase mb-8 text-gold-400">Emergency Hotlines</h3>
            <div className="grid grid-cols-1 gap-4">
              {hotlines.map((hotline, i) => (
                <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2 hover:border-gold-500/30 transition-colors group">
                  <span className="text-xs font-bold text-gray-400 group-hover:text-gray-200 transition-colors">{hotline.name}</span>
                  <span className="text-xs font-black text-gold-400">{hotline.number}</span>
                </div>
              ))}
            </div>
          </div>

          {/* About GOVPH */}
          <div>
            <h3 className="text-sm font-black tracking-[0.2em] uppercase mb-8 text-gold-400">About GOVPH</h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-6 font-medium">
              Learn more about the Philippine government, its structure, how government works and the people behind it.
            </p>
            <div className="space-y-3">
              {govPhLinks.map((link, i) => (
                <a key={i} href={link.href} className="block text-xs font-bold text-gray-400 hover:text-gold-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Government Links */}
          <div>
            <h3 className="text-sm font-black tracking-[0.2em] uppercase mb-8 text-gold-400">Government Links</h3>
            <div className="space-y-3">
              {govLinks.map((link, i) => (
                <a key={i} href={link.href} className="block text-xs font-bold text-gray-400 hover:text-gold-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-[10px] font-black text-gold-400 tracking-[0.3em] uppercase mb-2">
              REPUBLIC OF THE PHILIPPINES
            </p>
            <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">
              Copyright © 2024. Municipality of Talibon, Province of Bohol.
            </p>
            <p className="text-[10px] font-bold text-gray-600 mt-1">
              All content is in the public domain unless otherwise stated.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <p className="text-[10px] font-black text-gray-500 tracking-widest uppercase">Powered By:</p>
              <span className="text-xs font-black text-blue-500 tracking-tighter">Felji</span>
            </div>
            <div className="h-4 w-px bg-gray-200" />
            <a 
              href="/admin" 
              className="text-[10px] font-black text-gray-400 hover:text-blue-600 tracking-widest uppercase transition-colors"
            >
              Admin Login
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
