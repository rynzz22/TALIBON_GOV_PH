import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, FileText, Calendar, User, ChevronRight } from 'lucide-react';

interface Resolution {
  no: string;
  date: string;
  author: string;
  title: string;
}

const resolutions: Resolution[] = [
  {
    no: "209",
    date: "12/08/2025",
    author: "Hon. Mary May B. Evangelista, Hon. Edwin P. Crescencio, Hon. Raul C. Austria, Hon. Jocelyn A. Amba & Hon. Rocel Y. Cutarra",
    title: "Accrediting the San Carlos Overseas Filipino Workers (OFW) Family Circle as a legitimate organization in the Municipality of Talibon."
  },
  {
    no: "208",
    date: "12/08/2025",
    author: "Hon. Mary May B. Evangelista",
    title: "Requesting Hon. Mayor Janette A. Garcia to appropriate funds for the conduct of livelihood training programs for Talibon women."
  },
  {
    no: "207",
    date: "12/08/2025",
    author: "",
    title: "Approving the appropriation of honoraria for the Municipal Local Government Performance Management System (MLGPMS) Technical Working Group."
  },
  {
    no: "206",
    date: "12/08/2025",
    author: "",
    title: "Authorizing the conduct of Mid-Year Assessment and Benchmarking activities of the Sangguniang Bayan of Talibon."
  },
  {
    no: "205",
    date: "12/08/2025",
    author: "Hon. Raul C. Austria",
    title: "Approving the Contract of Service of personnel hired in the Talibon Productivity Center (TPC)."
  },
  {
    no: "178",
    date: "15/07/2025",
    author: "Hon. Maximo G. Garcia",
    title: "Endorsing the Digital Empowerment Project of the Department of Trade and Industry under the Cities and Municipalities Competitiveness Index (CMCI) Program."
  },
  {
    no: "160",
    date: "15/07/2025",
    author: "Hon. Edwin P. Crescencio",
    title: "Approving the reclassification of a parcel of agricultural land located at Barangay Bagacay to non-agricultural use for commercial purposes."
  },
  {
    no: "159",
    date: "15/07/2025",
    author: "Hon. Edwin P. Crescencio",
    title: "Reclassifying agricultural land located in Barangay Burgos to residential use, in accordance with zoning regulations of the municipality."
  },
  {
    no: "156",
    date: "15/07/2025",
    author: "Hon. Maximo G. Garcia",
    title: "Adopting the Capacity Development Agenda of the Municipality of Talibon for FY 2025–2027 as required under the Department of the Interior and Local Government (DILG)."
  },
  {
    no: "155",
    date: "15/07/2025",
    author: "Hon. Jocelyn A. Amba",
    title: "Authorizing Mayor Janette A. Garcia to sign a Memorandum of Agreement (MOA) with the Department of Agriculture for the implementation of the Rice Competitiveness Enhancement Fund (RCEF) Program."
  },
  {
    no: "151",
    date: "15/07/2025",
    author: "En Masse",
    title: "Requesting the General Services Office (GSO) to assign the Isuzu Sportivo vehicle for the official use of the Sangguniang Bayan Members."
  },
  {
    no: "150",
    date: "15/07/2025",
    author: "En Masse",
    title: "Appointing Engr. Gerry V. Araneta as Focal Person of the Municipality of Talibon for the implementation of the Seal of Good Local Governance (SGLG) Program."
  },
  {
    no: "149",
    date: "08/07/2025",
    author: "En Masse",
    title: "Expressing full support to the proposed projects of the Department of Public Works and Highways (DPWH) in the Municipality of Talibon."
  },
  {
    no: "148",
    date: "08/07/2025",
    author: "En Masse",
    title: "Expressing full support to the proposed Ipil River Rehabilitation and Flood Control Project of the DPWH."
  },
  {
    no: "144",
    date: "08/07/2025",
    author: "Hon. Jocelyn A. Amba",
    title: "Supporting the LGU Talibon’s partnership with San Carlos P. Garcia Park for cultural and tourism development."
  },
  {
    no: "141",
    date: "08/07/2025",
    author: "Hon. Raul C. Austria",
    title: "Authorizing Mayor Janette A. Garcia to enter into contracts of service with various municipal employees for CY 2025."
  },
  {
    no: "139",
    date: "24/06/2025",
    author: "Hon. Placidito O. Doroy",
    title: "Endorsing the proposed Talibon Reclamation Project covering forty (40) hectares of foreshore land in Poblacion."
  },
  {
    no: "138",
    date: "24/06/2025",
    author: "Hon. Jocelyn A. Amba, Hon. Restituto B. Auxtero, Hon. Nomie T. Valmoria, Hon. Imelda B. Artiaga, Hon. Raul C. Austria",
    title: "Declaring the current batch of Sangguniang Bayan Scholars as official beneficiaries of the Municipality of Talibon for SY 2025–2026."
  },
  {
    no: "135",
    date: "24/06/2025",
    author: "Hon. Placidito O. Doroy, Hon. Jerald P. Taneo, Hon. Frix T. Libres",
    title: "Approving the reclassification of a parcel of agricultural land located at Barangay San Jose into residential use."
  },
  {
    no: "131",
    date: "17/06/2025",
    author: "Hon. Maximo G. Garcia",
    title: "Authorizing Mayor Janette A. Garcia to sign a Memorandum of Understanding with four barangays for solid waste management cooperation."
  },
  {
    no: "115",
    date: "10/06/2025",
    author: "Hon. Maximo G. Garcia",
    title: "Authorizing Mayor Janette A. Garcia to sign a Memorandum of Understanding with twenty-one barangays regarding environmental protection programs."
  },
  {
    no: "113",
    date: "27/05/2025",
    author: "Hon. Nomie T. Valmoria",
    title: "Requesting the Department of Environment and Natural Resources (DENR) to declassify timberland areas located in Barangay Magsaysay."
  },
  {
    no: "112",
    date: "27/05/2025",
    author: "Hon. Placidito O. Doroy",
    title: "Approving the reclassification of Lot No. 611-A in Barangay Burgos from agricultural to residential land use."
  },
  {
    no: "110",
    date: "27/05/2025",
    author: "",
    title: "Authorizing the Mayor of Talibon to sign a Memorandum of Understanding with the Provincial Government of Bohol for infrastructure development."
  },
  {
    no: "108",
    date: "27/05/2025",
    author: "Hon. Restituto B. Auxtero, CPA",
    title: "Approving MDC-Executive Committee Resolution No. 01, Series of 2025 adopting the Municipal Development Council investment priorities."
  },
  {
    no: "67",
    date: "04/03/2025",
    author: "Hon. Placidito O. Doroy",
    title: "Authorizing the utilization of available data of the DevLIVE+ Monitoring System for the updating of the Comprehensive Development Plan."
  },
  {
    no: "64",
    date: "25/02/2025",
    author: "Hon. Imelda B. Artiaga",
    title: "Approving the Memorandum of Understanding with the Department of Social Welfare and Development (DSWD) Field Office VII on social protection programs."
  },
  {
    no: "62",
    date: "18/02/2025",
    author: "Hon. Jocelyn A. Amba",
    title: "Requesting a site inspection of the Ipil River mangroves as part of the river rehabilitation program of Talibon."
  },
  {
    no: "8",
    date: "07/01/2025",
    author: "Hon. Restituto B. Auxtero, CPA",
    title: "Authorizing the Local Finance Committee to review barangay budgets for compliance with statutory requirements."
  },
  {
    no: "7",
    date: "07/01/2025",
    author: "En Masse",
    title: "Approving the Mutual Partnership Agreement with Suba OFW Family Circle for livelihood and community development projects."
  },
  {
    no: "2",
    date: "07/01/2025",
    author: "Hon. Raul C. Austria",
    title: "Authorizing the Municipal Mayor to sign contracts of service for the year 2025 to ensure continuous delivery of services."
  }
];

const ResolutionsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResolutions = resolutions.filter(res => 
    res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    res.no.toLowerCase().includes(searchQuery.toLowerCase()) ||
    res.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-16">
        <h1 className="text-6xl md:text-8xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-8">
          Resolutions
        </h1>
        <p className="text-xl text-gray-500 font-medium max-w-3xl">
          Official resolutions passed by the Sangguniang Bayan of Talibon.
        </p>
      </div>

      <div className="mb-12 relative">
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
          <Search className="text-gray-400" size={24} />
        </div>
        <input
          type="text"
          placeholder="Search resolutions by number, title, or author..."
          className="w-full pl-16 pr-8 py-6 bg-gray-50 border-2 border-gray-100 rounded-[2rem] text-lg font-bold focus:outline-none focus:border-blue-600 transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredResolutions.length > 0 ? (
          filteredResolutions.map((res, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={res.no}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-blue-50 rounded-3xl flex flex-col items-center justify-center border border-blue-100 group-hover:bg-blue-600 transition-colors">
                    <span className="text-[10px] font-black text-blue-600 group-hover:text-blue-100 uppercase tracking-widest leading-none mb-1">NO.</span>
                    <span className="text-2xl font-black text-blue-600 group-hover:text-white leading-none">{res.no}</span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-50 rounded-full border border-gray-100">
                      <Calendar size={14} className="text-gray-400" />
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{res.date}</span>
                    </div>
                    {res.author && (
                      <div className="flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full border border-blue-100">
                        <User size={14} className="text-blue-600" />
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{res.author}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                    {res.title}
                  </h3>
                </div>

                <div className="flex-shrink-0 self-center">
                  <div className="p-4 bg-gray-50 rounded-2xl text-gray-300 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all">
                    <FileText size={24} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
            <p className="text-xl font-black text-gray-400 uppercase tracking-widest">No resolutions found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResolutionsPage;
