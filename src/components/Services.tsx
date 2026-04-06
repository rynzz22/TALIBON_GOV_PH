import { motion } from "motion/react";
import { FileText, CreditCard, Users, HeartPulse, GraduationCap, Building2, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Services() {
  const services = [
    {
      icon: FileText,
      title: "Business Permits",
      description: "Apply or renew your business permits online with our streamlined process.",
      color: "bg-blue-50 text-blue-600",
      href: "/forms/business"
    },
    {
      icon: CreditCard,
      title: "Real Property Tax",
      description: "Pay your RPT online and avoid long queues at the municipal hall.",
      color: "bg-emerald-50 text-emerald-600",
      href: "/transparency/finance"
    },
    {
      icon: Users,
      title: "Civil Registry",
      description: "Request birth, marriage, and death certificates with ease.",
      color: "bg-amber-50 text-amber-600",
      href: "/executive/directory"
    },
    {
      icon: HeartPulse,
      title: "Health Services",
      description: "Access information on public health programs and medical assistance.",
      color: "bg-rose-50 text-rose-600",
      href: "/executive/directory"
    },
    {
      icon: GraduationCap,
      title: "Scholarships",
      description: "Educational assistance programs for deserving Talibon students.",
      color: "bg-indigo-50 text-indigo-600",
      href: "/executive/directory"
    },
    {
      icon: Building2,
      title: "Building Permits",
      description: "Apply for building permits and structural clearances online.",
      color: "bg-slate-50 text-slate-600",
      href: "/forms/building"
    },
  ];

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest">E-Governance</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Municipal Services <br />
            <span className="text-gray-400">at Your Fingertips</span>
          </h3>
          <p className="text-lg text-gray-600 font-light leading-relaxed">
            We are digitizing our services to provide a more efficient and 
            transparent experience for all Talibon residents and business owners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link key={service.title} to={service.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white p-6 md:p-8 rounded-3xl border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all cursor-pointer relative overflow-hidden h-full"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${service.color}`}>
                  <service.icon size={28} />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h4>
                <p className="text-gray-600 leading-relaxed font-light mb-6">
                  {service.description}
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Access Service <ArrowUpRight size={16} />
                </div>
                
                {/* Decorative background shape */}
                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-gray-50 rounded-full -z-0 group-hover:bg-blue-50 transition-colors" />
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-gold-400 text-blue-900 px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-gold-500 transition-all shadow-2xl shadow-gold-500/20">
            View All Online Services
          </button>
        </div>
      </div>
    </section>
  );
}
