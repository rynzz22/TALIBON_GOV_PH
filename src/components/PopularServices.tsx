import { motion } from "motion/react";
import { 
  UserCircle, 
  FileText, 
  ShieldCheck, 
  FileCheck, 
  CreditCard, 
  Search,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

export default function PopularServices() {
  const services = [
    { name: "eRBI", desc: "Electronic Real Property Billing Information", icon: UserCircle },
    { name: "ePermits", desc: "Online Business Permit Application", icon: FileText },
    { name: "eClearance", desc: "Request for Mayor's Clearance", icon: ShieldCheck },
    { name: "eCertificate", desc: "Request for Civil Registry Certificates", icon: FileCheck },
    { name: "eCedula", desc: "Online Community Tax Certificate", icon: CreditCard },
    { name: "Document Verification", desc: "Verify official municipal documents", icon: Search },
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-20">
          <div className="max-w-2xl">
            <span className="section-label">Online Portals</span>
            <h2 className="section-title">Popular Services</h2>
            <p className="text-brand-muted font-medium text-lg leading-relaxed">
              Access the most frequently used municipal services online. Fast, secure, and available 24/7.
            </p>
          </div>
          <Link to="/executive/directory" className="minimal-button-outline">
            View All Services <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="p-8 rounded-[2.5rem] bg-brand-surface border border-brand-border hover:bg-white hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 group"
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/5 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
                  <service.icon size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-text mb-1 font-display uppercase tracking-tight">{service.name}</h3>
                  <p className="text-xs text-brand-muted font-medium leading-tight">{service.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Text - Embossment */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-brand-primary/[0.01] select-none pointer-events-none leading-none font-display tracking-tighter">
        TALIBON
      </div>
    </section>
  );
}
