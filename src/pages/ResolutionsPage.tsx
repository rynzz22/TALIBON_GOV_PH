import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, FileText, Calendar, User, ChevronDown, ChevronUp, Download, Filter, ArrowUpDown } from 'lucide-react';

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

type SortKey = 'no' | 'date' | 'title';
type SortOrder = 'asc' | 'desc';

const ResolutionsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('no');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const filteredAndSortedResolutions = useMemo(() => {
    let result = resolutions.filter(res => 
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.no.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    result.sort((a, b) => {
      let valA = a[sortKey];
      let valB = b[sortKey];

      if (sortKey === 'no') {
        const numA = parseInt(a.no);
        const numB = parseInt(b.no);
        return sortOrder === 'asc' ? numA - numB : numB - numA;
      }

      if (sortKey === 'date') {
        const dateA = new Date(a.date.split('/').reverse().join('-')).getTime();
        const dateB = new Date(b.date.split('/').reverse().join('-')).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      }

      if (sortOrder === 'asc') {
        return valA.localeCompare(valB);
      } else {
        return valB.localeCompare(valA);
      }
    });

    return result;
  }, [searchQuery, sortKey, sortOrder]);

  return (
    <div className="pt-32 md:pt-44 pb-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Header Section */}
      <div className="mb-16 relative">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-12 h-1 bg-gold-500 rounded-full" />
          <span className="text-sm font-black text-gold-500 uppercase tracking-[0.3em]">Legislative Archive</span>
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-8">
          Resolutions
        </h1>
        <p className="text-xl text-gray-500 font-medium max-w-3xl leading-relaxed">
          Official resolutions passed by the Sangguniang Bayan of Talibon. Explore our legislative records, search by topic, or filter by date.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-12 flex flex-col md:flex-row gap-6 items-stretch">
        <div className="relative flex-1 group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className="text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
          </div>
          <input
            type="text"
            placeholder="Search by resolution number, title, or author..."
            className="w-full pl-14 pr-8 py-5 bg-white border-2 border-gray-100 rounded-2xl text-base font-bold focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-5 bg-white border-2 border-gray-100 rounded-2xl font-black text-xs uppercase tracking-widest text-gray-500 hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm">
            <Filter size={18} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-6 py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Modern Table Layout */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-blue-900/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th 
                  className="px-8 py-6 cursor-pointer group"
                  onClick={() => handleSort('no')}
                >
                  <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] group-hover:text-blue-600 transition-colors">
                    Resolution No.
                    <ArrowUpDown size={12} className={sortKey === 'no' ? 'text-blue-600' : 'opacity-0 group-hover:opacity-100'} />
                  </div>
                </th>
                <th 
                  className="px-8 py-6 cursor-pointer group"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] group-hover:text-blue-600 transition-colors">
                    Date Approved
                    <ArrowUpDown size={12} className={sortKey === 'date' ? 'text-blue-600' : 'opacity-0 group-hover:opacity-100'} />
                  </div>
                </th>
                <th className="px-8 py-6">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                    Author / Sponsored By
                  </div>
                </th>
                <th 
                  className="px-8 py-6 cursor-pointer group"
                  onClick={() => handleSort('title')}
                >
                  <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] group-hover:text-blue-600 transition-colors">
                    Titles of Resolutions
                    <ArrowUpDown size={12} className={sortKey === 'title' ? 'text-blue-600' : 'opacity-0 group-hover:opacity-100'} />
                  </div>
                </th>
                <th className="px-8 py-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence mode="popLayout">
                {filteredAndSortedResolutions.length > 0 ? (
                  filteredAndSortedResolutions.map((res, idx) => (
                    <motion.tr
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={res.no}
                      className="group hover:bg-blue-50/30 transition-colors"
                    >
                      <td className="px-8 py-8">
                        <span className="text-sm font-black text-gray-900 group-hover:text-blue-600 transition-colors">
                          {res.no}
                        </span>
                      </td>
                      <td className="px-8 py-8">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                          <Calendar size={14} className="text-gray-300" />
                          {res.date}
                        </div>
                      </td>
                      <td className="px-8 py-8 max-w-xs">
                        <div className="text-xs font-bold text-gray-600 leading-relaxed">
                          {res.author || <span className="text-gray-300 italic">N/A</span>}
                        </div>
                      </td>
                      <td className="px-8 py-8 max-w-md">
                        <h3 className="text-sm font-black text-gray-900 leading-snug group-hover:text-blue-600 transition-colors">
                          {res.title}
                        </h3>
                      </td>
                      <td className="px-8 py-8 text-right">
                        <button className="p-3 bg-gray-50 rounded-xl text-gray-300 group-hover:text-blue-600 group-hover:bg-blue-100 transition-all">
                          <FileText size={20} />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-8 py-32 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <Search size={48} className="text-gray-200" />
                        <p className="text-lg font-black text-gray-400 uppercase tracking-widest">
                          No resolutions found matching your search.
                        </p>
                        <button 
                          onClick={() => setSearchQuery('')}
                          className="text-sm font-bold text-blue-600 hover:underline"
                        >
                          Clear all filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile View (Cards) */}
      <div className="lg:hidden mt-8 space-y-4">
        {filteredAndSortedResolutions.map((res) => (
          <div key={res.no} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                No. {res.no}
              </span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {res.date}
              </span>
            </div>
            <h3 className="text-base font-black text-gray-900 mb-4 leading-tight">
              {res.title}
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 truncate max-w-[200px]">
                <User size={12} />
                {res.author || 'N/A'}
              </div>
              <button className="p-2 bg-gray-50 rounded-lg text-blue-600">
                <FileText size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResolutionsPage;
