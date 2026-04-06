import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Search, Globe, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", href: "/", isHash: false },
    { 
      name: "ABOUT TALIBON", 
      href: "#",
      subLinks: [
        { name: "BRIEF PROFILE", href: "/about/profile", isHash: false },
        { name: "OFFICIAL SEAL", href: "/about/seal", isHash: false },
        { name: "BRIEF HISTORY", href: "/about/history", isHash: false },
        { name: "LIST OF MAYORS", href: "/about/mayors", isHash: false },
        { name: "DEPARTMENTS", href: "/about/departments", isHash: false },
        { name: "VICINITY MAP", href: "/about/vicinity", isHash: false },
        { name: "BARANGAYS", href: "/about/barangays", isHash: false },
        { name: "DEMOGRAPHICS", href: "/about/demographics", isHash: false },
        { name: "LOCATION", href: "/about/location", isHash: false },
        { name: "INDUSTRY", href: "/about/industry", isHash: false },
        { name: "GOVERNMENT SERVICES", href: "https://talibon-citizen-stg.multisyscorp.io/e-services", isHash: false, isExternal: true },
        { name: "TALIBON HYMN", href: "/about/hymn", isHash: false },
        { name: "OFFICIAL FACEBOOK PAGE", href: "https://web.facebook.com/TalibonOfficialPage?_rdc=1&_rdr#", isHash: false, isExternal: true },
      ]
    },
    { 
      name: "EXECUTIVE", 
      href: "#",
      subLinks: [
        { name: "MANDATE", href: "/executive/mandate", isHash: false },
        { name: "VISION-MISSION", href: "/executive/vision-mission", isHash: false },
        { name: "ORGANIZATIONAL CHART", href: "/executive/chart", isHash: false },
        { name: "DIRECTORY OF DEPARTMENTS", href: "/executive/directory", isHash: false },
        { name: "TALIBON GAD-IMS", href: "/executive/gad-ims", isHash: false },
      ]
    },
    { 
      name: "LEGISLATIVE", 
      href: "#",
      subLinks: [
        { name: "MANDATE", href: "/legislative/mandate", isHash: false },
        { name: "ORGANIZATIONAL STRUCTURE", href: "/legislative/structure", isHash: false },
        { name: "ENACTED ORDINANCES", href: "/legislative/ordinances", isHash: false },
        { name: "RESOLUTIONS", href: "/legislative/resolutions", isHash: false },
      ]
    },
    { 
      name: "NEWS", 
      href: "#",
      subLinks: [
        { name: "ARTICLES", href: "/news/articles", isHash: false },
        { name: "PUBLIC ADVISORIES", href: "/news/advisories", isHash: false },
        { name: "DISASTER PREPAREDNESS", href: "/news/disaster", isHash: false },
        { name: "UPDATES", href: "/news/updates", isHash: false },
        { name: "GALLERY", href: "/news/gallery", isHash: false },
        { name: "COMMUNITY", href: "/news/community", isHash: false },
        { name: "PUBLIC NOTICES", href: "/news/notices", isHash: false },
        { name: "DOWNLOADABLE FORMS", href: "/news/forms", isHash: false },
      ]
    },
    { 
      name: "TRANSPARENCY", 
      href: "#",
      subLinks: [
        { name: "CITIZEN CHARTER", href: "/transparency/charter", isHash: false },
        { name: "FULL DISCLOSURE POLICY", href: "/transparency/disclosure", isHash: false },
        { name: "INFRASTRUCTURE PROJECTS", href: "/transparency/infrastructure", isHash: false },
        { name: "FINANCE REPORTS", href: "/transparency/finance", isHash: false },
        { name: "EXECUTIVE ORDERS", href: "/transparency/orders", isHash: false },
        { name: "BUDGET AND FINANCES", href: "/transparency/budget", isHash: false },
        { name: "BIDDINGS", href: "/transparency/biddings", isHash: false },
      ]
    },
    { 
      name: "TOURISM", 
      href: "#",
      subLinks: [
        { name: "TOURIST SPOTS", href: "/tourism/spots", isHash: false },
        { name: "FESTIVITIES", href: "/tourism/festivities", isHash: false },
        { name: "LOCAL DELICACIES", href: "/tourism/delicacies", isHash: false },
      ]
    },
    { 
      name: "DOWNLOADABLE FORMS", 
      href: "#",
      subLinks: [
        { name: "BUSINESS PERMIT", href: "/forms/business", isHash: false },
        { name: "BUILDING PERMIT", href: "/forms/building", isHash: false },
        { name: "ZONING CLEARANCE", href: "/forms/zoning", isHash: false },
      ]
    },
  ];

  const officialLogos = [
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Bagong_Pilipinas_logo.png/1920px-Bagong_Pilipinas_logo.png?_=20260215155959", alt: "Bagong Pilipinas" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Seal_of_the_Philippines.svg/1280px-Seal_of_the_Philippines.svg.png?_=20180708013622", alt: "Republika ng Pilipinas" },
    { src: "https://ncda.gov.ph/wp-content/uploads/2023/06/freedom-of-information-logo.jpg", alt: "Freedom of Information" },
    { src: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0d/Philippine_Transparency_Seal.svg/960px-Philippine_Transparency_Seal.svg.png?_=20231028065532", alt: "Transparency Seal" },
  ];

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const scrollToTop = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Tier: Utility & Official Logos */}
      <div className={`bg-white/90 backdrop-blur-md border-b border-blue-50 transition-all duration-500 ${isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-14 opacity-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
          <div className="flex items-center gap-6">
            {officialLogos.map((logo, idx) => (
              <div key={idx} className="h-10 w-20 flex items-center justify-center overflow-hidden">
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="h-full w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
          
            <div className="hidden md:flex items-center gap-6">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="SEARCH..." 
                className="bg-blue-50/50 border border-transparent rounded-full py-1.5 pl-10 pr-4 text-[10px] font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-gold-400/20 focus:bg-white focus:border-gold-200 transition-all w-40 group-hover:w-56"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-400" size={14} />
            </div>
            <button className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 hover:text-gold-500 transition-colors uppercase tracking-widest">
              <Globe size={14} />
              English
              <ChevronDown size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Tier: Main Navigation */}
      <nav className={`transition-all duration-500 ${isScrolled ? 'bg-white/95 shadow-lg shadow-blue-900/5 py-2' : 'bg-white py-4'} border-b border-blue-50 backdrop-blur-xl`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Branding */}
            <Link 
              to="/" 
              onClick={scrollToTop}
              className="flex items-center gap-4 group cursor-pointer"
            >
              <div className="w-14 h-14 bg-white rounded-2xl p-1 shadow-lg shadow-blue-500/10 group-hover:scale-105 transition-transform border border-blue-50">
                <img 
                  src="http://talibon.gov.ph/wp-content/uploads/2025/09/Talibon-Official-Seal-v4-2003-to-2023-.png" 
                  alt="Talibon Official Seal" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="hidden sm:block">
                <p className="text-[9px] font-black text-gold-400 tracking-[0.3em] leading-none mb-1">REPUBLIC OF THE PHILIPPINES</p>
                <h1 className="text-lg font-black text-gray-900 leading-none tracking-tight group-hover:text-blue-600 transition-colors">MUNICIPALITY OF TALIBON</h1>
                <p className="text-[9px] font-bold text-gray-400 tracking-[0.15em] leading-none mt-1">PROVINCE OF BOHOL</p>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div 
                  key={link.name} 
                  className="relative group/nav"
                  onMouseEnter={() => link.subLinks && setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {link.isHash ? (
                    <HashLink
                      smooth
                      to={link.href}
                      className={`px-3 py-2 text-[10px] font-black tracking-widest transition-all rounded-xl flex items-center gap-1 ${
                        activeDropdown === link.name ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50/50'
                      }`}
                    >
                      {link.name}
                      {link.subLinks && <ChevronDown size={12} className={`transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />}
                    </HashLink>
                  ) : (
                    <Link
                      to={link.href}
                      className={`px-3 py-2 text-[10px] font-black tracking-widest transition-all rounded-xl flex items-center gap-1 ${
                        activeDropdown === link.name ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50/50'
                      }`}
                    >
                      {link.name}
                      {link.subLinks && <ChevronDown size={12} className={`transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {link.subLinks && (
                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-3xl shadow-2xl shadow-blue-900/10 border border-blue-50 p-3 overflow-hidden"
                        >
                          <div className="grid grid-cols-1 gap-1">
                            {link.subLinks.map((sub) => (
                              sub.isExternal ? (
                                <a
                                  key={sub.name}
                                  href={sub.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-4 py-3 text-[10px] font-bold text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all tracking-wider"
                                >
                                  {sub.name}
                                </a>
                              ) : sub.isHash ? (
                                <HashLink
                                  smooth
                                  key={sub.name}
                                  to={sub.href}
                                  className="px-4 py-3 text-[10px] font-bold text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all tracking-wider"
                                >
                                  {sub.name}
                                </HashLink>
                              ) : (
                                <Link
                                  key={sub.name}
                                  to={sub.href}
                                  className="px-4 py-3 text-[10px] font-bold text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all tracking-wider"
                                >
                                  {sub.name}
                                </Link>
                              )
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center gap-3">
              <button className="text-gray-400 p-2 hover:bg-blue-50 rounded-xl transition-colors">
                <Search size={22} />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-900 p-2 hover:bg-blue-50 rounded-xl transition-colors"
              >
                {isOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-blue-900 lg:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-6 border-b border-blue-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full p-1 flex items-center justify-center">
                    <img 
                      src="http://talibon.gov.ph/wp-content/uploads/2025/09/Talibon-Official-Seal-v4-2003-to-2023-.png" 
                      alt="Talibon Seal" 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-white font-bold tracking-tight">TALIBON LGU</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white p-2">
                  <X size={32} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-2">
                {navLinks.map((link) => (
                  link.isHash ? (
                    <HashLink
                      smooth
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-4 text-xl font-black text-white border-b border-blue-800/50 hover:text-blue-300 transition-colors"
                    >
                      {link.name}
                    </HashLink>
                  ) : (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-4 text-xl font-black text-white border-b border-blue-800/50 hover:text-blue-300 transition-colors"
                    >
                      {link.name}
                    </Link>
                  )
                ))}
              </div>

              <div className="p-8 bg-blue-950 space-y-6">
                <div className="flex justify-center gap-8">
                  {officialLogos.map((logo, idx) => (
                    <div key={idx} className="h-10 w-20 flex items-center justify-center overflow-hidden">
                      <img 
                        src={logo.src} 
                        alt={logo.alt} 
                        className="h-full w-full object-contain brightness-0 invert opacity-50"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
                <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl">
                  GOVERNMENT PORTAL
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

