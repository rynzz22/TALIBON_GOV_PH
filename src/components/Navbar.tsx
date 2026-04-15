import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X, Globe, ChevronDown, ArrowUpRight, Phone, Mail, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { db, handleFirestoreError, OperationType } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dynamicNavLinks, setDynamicNavLinks] = useState<any[]>([]);
  const location = useLocation();
  
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    const q = query(collection(db, 'navigation'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setDynamicNavLinks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'navigation');
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const getSubLinks = (sectionName: string, defaultLinks: any[]) => {
    const dynamicLinks = dynamicNavLinks.filter(l => l.section === sectionName);
    return dynamicLinks.length > 0 ? dynamicLinks : defaultLinks;
  };

  const navLinks = [
    { name: "HOME", href: "/", isHash: false },
    { 
      name: "ABOUT TALIBON", 
      href: "#",
      subLinks: getSubLinks("ABOUT", [
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
      ])
    },
    { 
      name: "EXECUTIVE", 
      href: "#",
      subLinks: getSubLinks("EXECUTIVE", [
        { name: "MANDATE", href: "/executive/mandate", isHash: false },
        { name: "VISION-MISSION", href: "/executive/vision-mission", isHash: false },
        { name: "ORGANIZATIONAL CHART", href: "/executive/chart", isHash: false },
        { name: "DIRECTORY OF DEPARTMENTS", href: "/executive/directory", isHash: false },
        { name: "TALIBON GAD-IMS", href: "/executive/gad-ims", isHash: false },
      ])
    },
    { 
      name: "LEGISLATIVE", 
      href: "#",
      subLinks: getSubLinks("LEGISLATIVE", [
        { name: "MANDATE", href: "/legislative/mandate", isHash: false },
        { name: "ORGANIZATIONAL STRUCTURE", href: "/legislative/structure", isHash: false },
        { name: "ENACTED ORDINANCES", href: "/legislative/ordinances", isHash: false },
        { name: "RESOLUTIONS", href: "/legislative/resolutions", isHash: false },
      ])
    },
    { 
      name: "NEWS", 
      href: "#",
      subLinks: getSubLinks("NEWS", [
        { name: "ARTICLES", href: "/news/articles", isHash: false },
        { name: "PUBLIC ADVISORIES", href: "/news/advisories", isHash: false },
        { name: "DISASTER PREPAREDNESS", href: "/news/disaster", isHash: false },
        { name: "UPDATES", href: "/news/updates", isHash: false },
        { name: "GALLERY", href: "/news/gallery", isHash: false },
        { name: "COMMUNITY", href: "/news/community", isHash: false },
        { name: "PUBLIC NOTICES", href: "/news/notices", isHash: false },
        { name: "DOWNLOADABLE FORMS", href: "/news/forms", isHash: false },
      ])
    },
    { 
      name: "TRANSPARENCY", 
      href: "#",
      subLinks: getSubLinks("TRANSPARENCY", [
        { name: "CITIZEN CHARTER", href: "/transparency/charter", isHash: false },
        { name: "FULL DISCLOSURE POLICY", href: "/transparency/disclosure", isHash: false },
        { name: "INFRASTRUCTURE PROJECTS", href: "/transparency/infrastructure", isHash: false },
        { name: "FINANCE REPORTS", href: "/transparency/finance", isHash: false },
        { name: "EXECUTIVE ORDERS", href: "/transparency/orders", isHash: false },
        { name: "BUDGET AND FINANCES", href: "/transparency/budget", isHash: false },
        { name: "BIDDINGS", href: "/transparency/biddings", isHash: false },
      ])
    },
    { 
      name: "TOURISM", 
      href: "#",
      subLinks: getSubLinks("TOURISM", [
        { name: "TOURIST SPOTS", href: "/tourism/spots", isHash: false },
        { name: "FESTIVITIES", href: "/tourism/festivities", isHash: false },
        { name: "LOCAL DELICACIES", href: "/tourism/delicacies", isHash: false },
      ])
    },
    { 
      name: "FORMS", 
      href: "#",
      subLinks: getSubLinks("FORMS", [
        { name: "BUSINESS PERMIT", href: "/forms/business", isHash: false },
        { name: "BUILDING PERMIT", href: "/forms/building", isHash: false },
        { name: "ZONING CLEARANCE", href: "/forms/zoning", isHash: false },
      ])
    },
  ];

  const officialLogos = [
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Bagong_Pilipinas_logo.png/1920px-Bagong_Pilipinas_logo.png?_=20260215155959", alt: "Bagong Pilipinas" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Seal_of_the_Philippines.svg/1280px-Seal_of_the_Philippines.svg.png?_=20180708013622", alt: "Republika ng Pilipinas" },
    { src: "https://ncda.gov.ph/wp-content/uploads/2023/06/freedom-of-information-logo.jpg", alt: "Freedom of Information" },
    { src: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0d/Philippine_Transparency_Seal.svg/960px-Philippine_Transparency_Seal.svg.png?_=20231028065532", alt: "Transparency Seal" },
  ];

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileSubMenu, setMobileSubMenu] = useState<string | null>(null);

  const scrollToTop = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.header 
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
    >
      {/* Top Bar */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div 
            initial={{ height: "auto", opacity: 1 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-brand-primary text-white py-2 hidden md:block pointer-events-auto overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-2"><Globe size={12} className="text-brand-accent" /> Republic of the Philippines</span>
                <span className="flex items-center gap-2"><MapPin size={12} className="text-brand-accent" /> Talibon, Bohol</span>
              </div>
              <div className="flex items-center gap-6">
                <a href="tel:0384222895" className="hover:text-brand-accent transition-colors flex items-center gap-2"><Phone size={12} className="text-brand-accent" /> (038) 422-2895</a>
                <a href="mailto:talibonofficial@gmail.com" className="hover:text-brand-accent transition-colors flex items-center gap-2"><Mail size={12} className="text-brand-accent" /> talibonofficial@gmail.com</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navigation */}
      <nav className={`flex justify-center px-4 transition-all duration-500 pointer-events-auto ${isScrolled ? 'pt-2' : 'pt-6'}`}>
        <div 
          className={`w-full max-w-7xl px-6 flex justify-between items-center transition-all duration-500 ${
            isScrolled 
              ? 'h-16 glass-panel rounded-2xl shadow-xl bg-white/95 dark:bg-dark-surface/95' 
              : 'h-20 glass-panel rounded-[2rem]'
          }`}
        >
          {/* Logo & Branding */}
          <Link 
            to="/" 
            onClick={scrollToTop}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-10 h-10 transition-transform group-hover:scale-110 duration-500">
              <img 
                src="http://talibon.gov.ph/wp-content/uploads/2025/09/Talibon-Official-Seal-v4-2003-to-2023-.png" 
                alt="Talibon Official Seal" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-extrabold text-brand-primary leading-none tracking-tight group-hover:text-brand-accent transition-colors font-display">TALIBON</h1>
              <p className="text-[8px] font-bold text-brand-muted tracking-[0.2em] leading-none mt-0.5 uppercase">Municipal Government</p>
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
                {link.subLinks ? (
                  <button
                    className={`px-4 py-2 text-xs font-bold tracking-widest transition-all flex items-center gap-1 rounded-full ${
                      activeDropdown === link.name ? 'text-brand-primary bg-brand-primary/5' : 'text-brand-text hover:text-brand-primary hover:bg-brand-primary/5'
                    }`}
                  >
                    {link.name}
                    <ChevronDown size={10} className={`transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    className="px-4 py-2 text-xs font-bold tracking-widest text-brand-text hover:text-brand-primary hover:bg-brand-primary/5 rounded-full transition-all"
                  >
                    {link.name}
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
                        className="absolute top-full left-0 mt-2 w-72 bg-white/90 backdrop-blur-3xl border border-white/30 p-2 shadow-2xl rounded-3xl overflow-hidden"
                      >
                        <div className="grid grid-cols-1 gap-1">
                          {link.subLinks.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.href}
                              target={sub.isExternal ? "_blank" : undefined}
                              rel={sub.isExternal ? "noopener noreferrer" : undefined}
                              className="px-4 py-3 text-xs font-bold text-brand-text hover:text-brand-primary hover:bg-brand-primary/5 rounded-2xl transition-all tracking-widest flex items-center justify-between group/sub"
                            >
                              {sub.name}
                              <ArrowUpRight size={14} className="opacity-0 group-hover/sub:opacity-100 transition-all text-brand-accent" />
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <a 
              href="https://talibon-citizen-stg.multisyscorp.io/e-services"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-brand-primary text-white text-[10px] font-bold tracking-widest rounded-full hover:bg-brand-accent transition-all duration-300 uppercase shadow-lg shadow-brand-primary/20 flex items-center gap-2"
            >
              Pay Online <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-3">
            <ThemeToggle />
            <a 
              href="https://talibon-citizen-stg.multisyscorp.io/e-services"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-brand-primary text-white text-[8px] font-bold tracking-widest rounded-full hover:bg-brand-accent transition-all duration-300 uppercase shadow-lg shadow-brand-primary/20"
            >
              Pay Online
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-primary p-2 rounded-2xl bg-brand-primary/5 hover:bg-brand-primary/10 transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
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
            className="fixed inset-0 z-[60] bg-white lg:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-6 border-b border-brand-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12">
                    <img 
                      src="http://talibon.gov.ph/wp-content/uploads/2025/09/Talibon-Official-Seal-v4-2003-to-2023-.png" 
                      alt="Talibon Seal" 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-brand-primary font-black tracking-tight uppercase font-display">TALIBON</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-brand-primary p-2 bg-brand-primary/5 rounded-xl">
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-2">
                {navLinks.map((link) => (
                  <div key={link.name} className="border-b border-brand-border/50">
                    {link.subLinks ? (
                      <div>
                        <button
                          onClick={() => setMobileSubMenu(mobileSubMenu === link.name ? null : link.name)}
                          className="w-full flex justify-between items-center py-4 text-sm font-extrabold text-brand-text hover:text-brand-primary transition-colors uppercase tracking-widest"
                        >
                          {link.name}
                          <ChevronDown size={18} className={`transition-transform duration-300 ${mobileSubMenu === link.name ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {mobileSubMenu === link.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden bg-white/90 backdrop-blur-3xl border border-brand-primary/10 rounded-2xl mb-4"
                            >
                              <div className="p-4 space-y-4">
                                {link.subLinks.map((sub) => (
                                  <Link
                                    key={sub.name}
                                    to={sub.href}
                                    target={sub.isExternal ? "_blank" : undefined}
                                    rel={sub.isExternal ? "noopener noreferrer" : undefined}
                                    onClick={() => setIsOpen(false)}
                                    className="block text-xs font-bold text-brand-text hover:text-brand-primary transition-colors tracking-widest uppercase"
                                  >
                                    {sub.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className="block py-4 text-sm font-extrabold text-brand-text hover:text-brand-primary transition-colors uppercase tracking-widest"
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-8 bg-brand-bg">
                <a 
                  href="https://talibon-citizen-stg.multisyscorp.io/e-services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-brand-primary text-white py-4 rounded-2xl font-black tracking-widest uppercase shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-2"
                >
                  GOVERNMENT PORTAL <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

