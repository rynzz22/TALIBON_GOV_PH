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
          { name: "GOVERNMENT SERVICES", href: "/about/services", isHash: false },
          { name: "TALIBON HYMN", href: "/about/hymn", isHash: false },
          { name: "OFFICIAL FACEBOOK PAGE", href: "https://facebook.com/TalibonLGU", isHash: false, isExternal: true },
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
        name: "FORMS", 
        href: "#",
        subLinks: [
          { name: "BUSINESS PERMIT", href: "/forms/business", isHash: false },
          { name: "BUILDING PERMIT", href: "/forms/building", isHash: false },
          { name: "ZONING CLEARANCE", href: "/forms/zoning", isHash: false },
        ]
      },
    ];

    const officialLogos = [
      { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Seal_of_the_Philippines.svg/1200px-Seal_of_the_Philippines.svg.png", alt: "Republic of the Philippines" },
      { src: "https://www.foi.gov.ph/assets/images/foi-logo.png", alt: "Freedom of Information" },
      { src: "https://www.dbm.gov.ph/images/transparency_seal.png", alt: "Transparency Seal" },
    ];

    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const scrollToTop = (e: React.MouseEvent) => {
      if (location.pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    return (
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
        {/* Top Tier: Utility & Official Logos */}
        <div className={`transition-all duration-500 ${isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-14 opacity-100 bg-black/10 backdrop-blur-sm border-b border-white/10'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="h-8 w-16 bg-white/10 rounded border border-white/20 flex items-center justify-center text-[8px] font-black text-white/40">PH SEAL</div>
              <div className="h-8 w-16 bg-white/10 rounded border border-white/20 flex items-center justify-center text-[8px] font-black text-white/40">FOI</div>
              <div className="h-8 w-16 bg-white/10 rounded border border-white/20 flex items-center justify-center text-[8px] font-black text-white/40">TS</div>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="SEARCH..." 
                  className="bg-white/10 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-[10px] font-bold tracking-widest text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:bg-white/20 focus:border-white/30 transition-all w-40 group-hover:w-56"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={14} />
              </div>
              <button className="flex items-center gap-1.5 text-[10px] font-bold text-white/60 hover:text-white transition-colors uppercase tracking-widest">
                <Globe size={14} />
                English
                <ChevronDown size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Main Navigation */}
        <nav className={`transition-all duration-500 ${isScrolled ? 'crystal-oled py-2 border-b border-white/20' : 'bg-transparent py-4'} backdrop-blur-xl`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo & Branding */}
              <Link 
                to="/" 
                onClick={scrollToTop}
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-2xl p-1 shadow-lg shadow-blue-500/10 group-hover:scale-105 transition-all border ${isScrolled ? 'bg-white/10 border-white/20' : 'bg-white/20 border-white/30 backdrop-blur-md'}`}>
                  <img 
                    src="http://talibon.gov.ph/wp-content/uploads/2025/09/Talibon-Official-Seal-v4-2003-to-2023-.png" 
                    alt="Talibon Official Seal" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="hidden sm:block">
                  <p className={`text-[9px] font-black tracking-[0.3em] leading-none mb-1 transition-colors ${isScrolled ? 'text-blue-400' : 'text-blue-300'}`}>REPUBLIC OF THE PHILIPPINES</p>
                  <h1 className={`text-lg font-black leading-none tracking-tight transition-colors ${isScrolled ? 'text-white' : 'text-white'} group-hover:text-blue-400`}>MUNICIPALITY OF TALIBON</h1>
                  <p className={`text-[9px] font-bold tracking-[0.15em] leading-none mt-1 transition-colors ${isScrolled ? 'text-white/60' : 'text-white/60'}`}>PROVINCE OF BOHOL</p>
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
                          activeDropdown === link.name 
                            ? 'text-blue-400 bg-white/10' 
                            : isScrolled 
                              ? 'text-white/80 hover:text-white hover:bg-white/10' 
                              : 'text-white/80 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {link.name}
                        {link.subLinks && <ChevronDown size={12} className={`transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />}
                      </HashLink>
                    ) : (
                      <Link
                        to={link.href}
                        className={`px-3 py-2 text-[10px] font-black tracking-widest transition-all rounded-xl flex items-center gap-1 ${
                          activeDropdown === link.name 
                            ? 'text-blue-400 bg-white/10' 
                            : isScrolled 
                              ? 'text-white/80 hover:text-white hover:bg-white/10' 
                              : 'text-white/80 hover:text-white hover:bg-white/10'
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
                            className="absolute top-full left-0 mt-2 w-64 crystal-oled rounded-3xl p-3 overflow-hidden"
                          >
                            <div className="grid grid-cols-1 gap-1">
                              {link.subLinks.map((sub) => (
                                sub.isHash ? (
                                  <HashLink
                                    smooth
                                    key={sub.name}
                                    to={sub.href}
                                    className="px-4 py-3 text-[10px] font-bold text-white/70 hover:text-white hover:bg-white/10 rounded-2xl transition-all tracking-wider"
                                  >
                                    {sub.name}
                                  </HashLink>
                                ) : (
                                  <Link
                                    key={sub.name}
                                    to={sub.href}
                                    className="px-4 py-3 text-[10px] font-bold text-white/70 hover:text-white hover:bg-white/10 rounded-2xl transition-all tracking-wider"
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
                <button className={`p-2 rounded-xl transition-colors ${isScrolled ? 'text-white/70 hover:bg-white/10' : 'text-white/70 hover:bg-white/10'}`}>
                  <Search size={22} />
                </button>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`p-2 rounded-xl transition-colors ${isScrolled ? 'text-white hover:bg-white/10' : 'text-white hover:bg-white/10'}`}
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
                    <div className="h-8 w-16 bg-white/10 rounded border border-white/20 flex items-center justify-center text-[8px] font-black text-white/40">PH</div>
                    <div className="h-8 w-16 bg-white/10 rounded border border-white/20 flex items-center justify-center text-[8px] font-black text-white/40">FOI</div>
                    <div className="h-8 w-16 bg-white/10 rounded border border-white/20 flex items-center justify-center text-[8px] font-black text-white/40">TS</div>
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

