import { motion } from "motion/react";
import { Camera, MapPin, Anchor, Waves } from "lucide-react";
import { Link } from "react-router-dom";

export default function Tourism() {
  const destinations = [
    {
      title: "Danajon Bank",
      category: "Double Barrier Reef",
      description: "One of only six double barrier reefs in the world and the only one in Southeast Asia.",
      image: "https://scontent.fceb8-1.fna.fbcdn.net/v/t39.30808-6/515210121_1160056812829592_2860987244901239199_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeGKlbFLpI91Umq89OhLdQZIC0eTEzBI_McLR5MTMEj8x_LA7351Kwmy3VsRio7QBOrXYdzLEqVB-Dn6FYh462lc&_nc_ohc=mPfZXpqq_44Q7kNvwFw1_2x&_nc_oc=AdoSqK_dwueE1mFUgTmbUmq1Lkm3jhFHbf9rWIWiWBWHtt_RShtK1FFAWha6sBi53j0&_nc_zt=23&_nc_ht=scontent.fceb8-1.fna&_nc_gid=BZzd4547digyOqAp-MBQ4A&_nc_ss=7a3a8&oh=00_Af3KotQ-zSQYKX0_MFgTR69n7tr2J15UstgFynEpTO4nbA&oe=69D8E182",
      icon: Anchor,
      href: "/tourism/spots"
    },
    {
      title: "Talibon Cathedral",
      category: "Historical Site",
      description: "The Most Holy Trinity Cathedral, a beautiful landmark of faith and history.",
      image: "https://scontent.fceb8-1.fna.fbcdn.net/v/t39.30808-6/667740534_1277647481168991_7857431279534299933_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=dd6889&_nc_eui2=AeHT1FEMpH6CbscAmAQK7NNmXtnW4m4vNIFe2dbibi80gUJ7zeWxxgH-d5SdWb5h5TAa_JeABEjpa1KmwVWX8MeT&_nc_ohc=aSKHGoSOdIwQ7kNvwFoCV-p&_nc_oc=AdowBLU6SqSMhGXtnJegRHGSw3C3vlGZ_e7nRZS3i-iUj30RQmC3GmM5_Mza9m-bvCQ&_nc_zt=23&_nc_ht=scontent.fceb8-1.fna&_nc_gid=zVwSwzZ9Yd_AU34sTYlfkw&_nc_ss=7a3a8&oh=00_Af2YHp2-giTY8FpmLqnEf1IRSOR4EkRQwpSjXflAWU6sbg&oe=69D90688",
      icon: Camera,
      href: "/tourism/spots"
    },
    {
      title: "Islands & Sandbars",
      category: "Nature & Beach",
      description: "Explore the pristine islands and sandbars scattered across the Danajon Bank.",
      image: "https://scontent.fceb8-1.fna.fbcdn.net/v/t39.30808-6/515210121_1160056812829592_2860987244901239199_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeGKlbFLpI91Umq89OhLdQZIC0eTEzBI_McLR5MTMEj8x_LA7351Kwmy3VsRio7QBOrXYdzLEqVB-Dn6FYh462lc&_nc_ohc=mPfZXpqq_44Q7kNvwFw1_2x&_nc_oc=AdoSqK_dwueE1mFUgTmbUmq1Lkm3jhFHbf9rWIWiWBWHtt_RShtK1FFAWha6sBi53j0&_nc_zt=23&_nc_ht=scontent.fceb8-1.fna&_nc_gid=BZzd4547digyOqAp-MBQ4A&_nc_ss=7a3a8&oh=00_Af3KotQ-zSQYKX0_MFgTR69n7tr2J15UstgFynEpTO4nbA&oe=69D8E182",
      icon: Waves,
      href: "/tourism/spots"
    },
  ];

  return (
    <section id="tourism" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest">Visit Talibon</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Discover the <br />
              <span className="text-blue-600 italic">Hidden Gems</span> of Bohol
            </h3>
            <p className="text-lg text-gray-600 font-light leading-relaxed">
              From the rare double barrier reef to historical landmarks, Talibon 
              offers a unique blend of nature, history, and culture.
            </p>
          </div>
          <Link to="/tourism/spots">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-500/20">
              Tourism Guide
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {destinations.map((dest, index) => (
            <Link key={dest.title} to={dest.href}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden mb-8 shadow-2xl shadow-gray-200">
                  <img
                    src={dest.image}
                    alt={dest.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                    <dest.icon size={20} />
                  </div>

                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <p className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-2">
                      {dest.category}
                    </p>
                    <h4 className="text-2xl font-bold mb-2">{dest.title}</h4>
                    <p className="text-sm text-white/80 font-light leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {dest.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Map Section */}
        <div className="mt-32 relative rounded-[40px] overflow-hidden h-[400px] shadow-2xl shadow-gray-200">
          <div className="absolute inset-0 bg-blue-100 flex items-center justify-center">
            <div className="text-center space-y-4">
              <MapPin size={48} className="text-blue-600 mx-auto" />
              <h4 className="text-2xl font-bold text-gray-900">Find Us in Northern Bohol</h4>
              <p className="text-gray-600">Talibon is approximately 114 km from Tagbilaran City.</p>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold shadow-md hover:shadow-lg transition-all">
                Get Directions
              </button>
            </div>
          </div>
          {/* Placeholder for actual map or interactive graphic */}
          <div className="absolute inset-0 bg-blue-600/5 backdrop-blur-[2px]" />
        </div>
      </div>
    </section>
  );
}
