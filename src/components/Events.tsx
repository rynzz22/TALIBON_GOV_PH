import { motion } from "motion/react";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Events() {
  const events = [
    {
      title: "The Official Dalagang Talibongnon Facebook Page",
      date: "April 10, 2025",
      time: "All Day",
      location: "Online",
      description: "Stay updated with the latest news and announcements from the official Dalagang Talibongnon page.",
      image: "https://picsum.photos/seed/dalaga/800/600",
      href: "/news/updates"
    },
    {
      title: "Holy Week Schedule",
      date: "April 15, 2025",
      time: "Various Times",
      location: "Most Holy Trinity Cathedral",
      description: "Join us in observing the solemnity of the Holy Week with our community.",
      image: "https://picsum.photos/seed/holyweek/800/600",
      href: "/news/advisories"
    },
    {
      title: "14th Talibon Foundation Day",
      date: "April 17, 2025",
      time: "8:00 AM - 10:00 PM",
      location: "Municipal Plaza",
      description: "Celebrating our rich history and vibrant culture with a series of activities and performances.",
      image: "https://picsum.photos/seed/foundation/800/600",
      href: "/news/updates"
    },
  ];

  return (
    <section id="events" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest">Stay Updated</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Upcoming Events <br />
            <span className="text-gray-400">& Announcements</span>
          </h3>
          <p className="text-lg text-gray-600 font-light leading-relaxed">
            Don't miss out on the latest happenings in Talibon. Join us in 
            celebrating our community and culture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <Link key={event.title} to={event.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-[40px] overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/5 transition-all h-full"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-center shadow-lg">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                      {event.date.split(' ')[0]}
                    </p>
                    <p className="text-xl font-black text-gray-900 leading-none">
                      {event.date.split(' ')[1].replace(',', '')}
                    </p>
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-gray-600 font-light leading-relaxed line-clamp-2">
                      {event.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <Clock size={16} className="text-blue-600" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <MapPin size={16} className="text-blue-600" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className="w-full py-4 rounded-2xl bg-gray-50 text-gray-900 font-bold flex items-center justify-center gap-2 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    Event Details <ArrowRight size={18} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="text-blue-600 font-bold flex items-center gap-2 mx-auto hover:gap-3 transition-all">
            View All Events <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
