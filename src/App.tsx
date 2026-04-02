/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ContentPage from "./pages/ContentPage";
import OfficialSealPage from "./pages/OfficialSealPage";
import Footer from "./components/Footer";
import { aboutApi, executiveApi, legislativeApi, newsApi, transparencyApi, tourismApi, formsApi } from "./services/api";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* About Talibon */}
          <Route path="/about/profile" element={<ContentPage title="Brief Profile" fetchData={aboutApi.getProfile} renderContent={(data) => <p className="text-xl text-gray-700 leading-relaxed font-medium">{data.content}</p>} />} />
          <Route path="/about/seal" element={<OfficialSealPage />} />
          <Route path="/about/history" element={<ContentPage title="Brief History" fetchData={aboutApi.getHistory} renderContent={(data) => <p className="text-xl text-gray-700 leading-relaxed font-medium">{data.content}</p>} />} />
          <Route path="/about/mayors" element={<ContentPage title="List of Mayors" fetchData={aboutApi.getMayors} renderContent={(data) => (
            <div className="space-y-16">
              {Array.isArray(data) && data.length > 0 ? (
                data.map((section: any, idx: number) => (
                  <div key={idx} className="space-y-8">
                    <div className="border-b-4 border-blue-600 pb-4">
                      <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter leading-none">
                        {section.section}
                      </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {section.mayors.map((mayor: any, mIdx: number) => (
                        <div key={mIdx} className="p-6 bg-white border-2 border-gray-100 rounded-2xl shadow-sm hover:border-blue-200 transition-all group">
                          <h3 className="text-xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">{mayor.name}</h3>
                          {mayor.term && (
                            <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mt-2">
                              TERM: {mayor.term}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    {section.commentary && (
                      <div className="p-8 bg-amber-50 border-l-8 border-amber-400 rounded-r-3xl space-y-4">
                        <p className="text-xs font-black text-amber-800 uppercase tracking-widest">
                          Historical Commentary
                        </p>
                        <p className="text-lg text-amber-900 font-medium leading-relaxed italic">
                          {section.commentary.content}
                        </p>
                        <p className="text-sm font-bold text-amber-700 text-right">
                          — {section.commentary.source}
                        </p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500 font-bold">
                  No data available.
                </div>
              )}
            </div>
          )} />} />
          <Route path="/about/departments" element={<ContentPage title="Departments" fetchData={aboutApi.getDepartments} renderContent={(data) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array.isArray(data) && data.length > 0 ? (
                data.map((dept: any) => (
                  <div key={dept.name} className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all group">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">{dept.name}</h3>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">{dept.officialName}</p>
                      </div>
                      <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                        {dept.type}
                      </span>
                    </div>
                    <p className="text-gray-600 font-medium leading-relaxed">{dept.description}</p>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-500 font-bold">
                  No departments found.
                </div>
              )}
            </div>
          )} />} />
          <Route path="/about/barangays" element={<ContentPage title="Barangays" fetchData={aboutApi.getBarangays} renderContent={(data) => (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.isArray(data) && data.length > 0 ? (
                data.map((brgy: string) => (
                  <div key={brgy} className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center font-black text-gray-700 uppercase tracking-widest text-xs">
                    {brgy}
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-500 font-bold">
                  No barangays found.
                </div>
              )}
            </div>
          )} />} />
          <Route path="/about/vicinity" element={<ContentPage title="Vicinity Map" fetchData={aboutApi.getVicinityMap} renderContent={(data) => (
            <div className="space-y-8">
              <div className="aspect-video bg-gray-50 rounded-[3rem] overflow-hidden border border-gray-100 shadow-2xl flex items-center justify-center">
                <img src={data.url} alt={data.title} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </div>
              <p className="text-xl text-gray-700 leading-relaxed font-medium">{data.description}</p>
            </div>
          )} />} />
          <Route path="/about/industry" element={<ContentPage title="Industry" fetchData={aboutApi.getIndustry} renderContent={(data) => <p className="text-xl text-gray-700 leading-relaxed font-medium">{data.content}</p>} />} />
          <Route path="/about/services" element={<ContentPage title="Government Services" fetchData={aboutApi.getServices} renderContent={(data) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.isArray(data) && data.map((service: any) => (
                <div key={service.name} className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">
                  <h3 className="text-2xl font-black text-gray-900 mb-4">{service.name}</h3>
                  <p className="text-lg text-gray-600 font-medium">{service.description}</p>
                </div>
              ))}
            </div>
          )} />} />
          <Route path="/about/hymn" element={<ContentPage title="Talibon Hymn" fetchData={aboutApi.getHymn} renderContent={(data) => (
            <div className="max-w-2xl mx-auto text-center">
              <pre className="text-xl text-gray-700 leading-relaxed font-medium whitespace-pre-wrap italic bg-blue-50 p-12 rounded-[3rem] border border-blue-100">
                {data.lyrics}
              </pre>
            </div>
          )} />} />

          {/* Executive */}
          <Route path="/executive/mandate" element={<ContentPage title="Executive Mandate" fetchData={executiveApi.getMandate} renderContent={(data) => <p className="text-xl text-gray-700 leading-relaxed font-medium">{data.content}</p>} />} />
          <Route path="/executive/vision-mission" element={<ContentPage title="Vision & Mission" fetchData={executiveApi.getVisionMission} renderContent={(data) => (
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-black text-blue-600 mb-4 uppercase tracking-widest">Vision</h3>
                <p className="text-xl text-gray-700 leading-relaxed font-medium italic">"{data.vision}"</p>
              </div>
              <div>
                <h3 className="text-2xl font-black text-blue-600 mb-4 uppercase tracking-widest">Mission</h3>
                <p className="text-xl text-gray-700 leading-relaxed font-medium italic">"{data.mission}"</p>
              </div>
            </div>
          )} />} />
          <Route path="/executive/chart" element={<ContentPage title="Organizational Chart" fetchData={executiveApi.getChart} renderContent={(data) => (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.isArray(data.structure) && data.structure.map((item: any) => (
                  <div key={item.role} className="p-8 bg-blue-600 text-white rounded-3xl shadow-xl">
                    <p className="text-xs font-black uppercase tracking-widest mb-2 opacity-80">{item.role}</p>
                    <h3 className="text-2xl font-black">{item.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          )} />} />
          <Route path="/executive/directory" element={<ContentPage title="Directory of Departments" fetchData={executiveApi.getDirectory} renderContent={(data) => (
            <div className="space-y-4">
              {Array.isArray(data) && data.length > 0 ? (
                data.map((dept: any) => (
                  <div key={dept.department} className="flex justify-between items-center p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
                    <h3 className="text-xl font-black text-gray-900">{dept.department}</h3>
                    <p className="text-lg font-bold text-blue-600">{dept.contact}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500 font-bold">
                  No directory entries found.
                </div>
              )}
            </div>
          )} />} />
          <Route path="/executive/gad-ims" element={<ContentPage title="Talibon GAD-IMS" fetchData={executiveApi.getGadIms} renderContent={(data) => <p className="text-xl text-gray-700 leading-relaxed font-medium">{data.content}</p>} />} />

          {/* Legislative */}
          <Route path="/legislative/mandate" element={<ContentPage title="Legislative Mandate" fetchData={legislativeApi.getMandate} renderContent={(data) => <p className="text-xl text-gray-700 leading-relaxed font-medium">{data.content}</p>} />} />
          <Route path="/legislative/structure" element={<ContentPage title="Organizational Structure" fetchData={legislativeApi.getStructure} renderContent={(data) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.isArray(data.members) && data.members.map((member: any) => (
                <div key={member.name} className="p-8 bg-gray-900 text-white rounded-3xl shadow-xl">
                  <p className="text-xs font-black uppercase tracking-widest mb-2 text-blue-400">{member.role}</p>
                  <h3 className="text-2xl font-black">{member.name}</h3>
                </div>
              ))}
            </div>
          )} />} />
          <Route path="/legislative/ordinances" element={<ContentPage title="Enacted Ordinances" fetchData={legislativeApi.getOrdinances} renderContent={(data) => (
            <div className="space-y-6">
              {Array.isArray(data) && data.map((ord: any) => (
                <div key={ord.id} className="p-8 bg-blue-50 rounded-3xl border border-blue-100">
                  <h3 className="text-2xl font-black text-gray-900 mb-4">{ord.title}</h3>
                  <p className="text-lg text-gray-600 font-medium">{ord.description}</p>
                </div>
              ))}
            </div>
          )} />} />
          <Route path="/legislative/resolutions" element={<ContentPage title="Resolutions" fetchData={legislativeApi.getResolutions} renderContent={(data) => (
            <div className="space-y-6">
              {Array.isArray(data) && data.map((res: any) => (
                <div key={res.id} className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">
                  <h3 className="text-2xl font-black text-gray-900 mb-4">{res.title}</h3>
                  <p className="text-lg text-gray-600 font-medium">{res.date}</p>
                </div>
              ))}
            </div>
          )} />} />

          {/* News */}
          <Route path="/news/articles" element={<ContentPage title="News Articles" fetchData={newsApi.getArticles} renderContent={(data) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array.isArray(data) && data.map((article: any) => (
                <div key={article.id} className="group cursor-pointer">
                  <div className="aspect-video bg-gray-100 rounded-3xl mb-6 overflow-hidden border border-gray-100 shadow-sm">
                    <img src={`https://picsum.photos/seed/news${article.id}/800/600`} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">{article.date}</p>
                  <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{article.title}</h3>
                  <p className="text-gray-600 font-medium line-clamp-2">{article.content}</p>
                </div>
              ))}
            </div>
          )} />} />
          <Route path="/news/advisories" element={<ContentPage title="Public Advisories" fetchData={newsApi.getAdvisories} renderContent={(data) => (
            <div className="space-y-6">
              {Array.isArray(data) && data.map((adv: any) => (
                <div key={adv.id} className="p-8 bg-amber-50 rounded-3xl border border-amber-100">
                  <p className="text-xs font-black text-amber-600 uppercase tracking-widest mb-2">{adv.date}</p>
                  <h3 className="text-2xl font-black text-gray-900 mb-4">{adv.title}</h3>
                  <p className="text-lg text-gray-600 font-medium">{adv.content}</p>
                </div>
              ))}
            </div>
          )} />} />
          <Route path="/news/disaster" element={<ContentPage title="Disaster Preparedness" fetchData={newsApi.getDisasterPreparedness} renderContent={(data) => (
            <div className="space-y-12">
              <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100">
                <p className="text-xl text-gray-700 leading-relaxed font-medium">{data.content}</p>
              </div>
              
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tight">Emergency Hotlines</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.isArray(data.hotlines) && data.hotlines.map((hotline: any) => (
                    <div key={hotline.name} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col justify-center items-center text-center group hover:border-blue-600 transition-all">
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-2">{hotline.name}</p>
                      <p className="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">{hotline.number}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-gray-900 text-white rounded-[2.5rem] shadow-2xl">
                  <h3 className="text-xl font-black uppercase tracking-widest text-blue-400 mb-6">Official Email</h3>
                  <p className="text-3xl font-black tracking-tight">{data.socials?.email}</p>
                </div>
                <div className="p-8 bg-blue-600 text-white rounded-[2.5rem] shadow-2xl">
                  <h3 className="text-xl font-black uppercase tracking-widest text-blue-100 mb-6">Office of the Mayor</h3>
                  <p className="text-3xl font-black tracking-tight">{data.socials?.mayorOffice}</p>
                </div>
              </div>
            </div>
          )} />} />
          <Route path="/news/updates" element={<ContentPage title="LGU Updates" fetchData={newsApi.getUpdates} renderContent={(data) => (
            <div className="space-y-6">
              {Array.isArray(data) && data.map((update: any) => (
                <div key={update.id} className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">
                  <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">{update.date}</p>
                  <h3 className="text-2xl font-black text-gray-900">{update.title}</h3>
                </div>
              ))}
            </div>
          )} />} />
          <Route path="/news/gallery" element={<ContentPage title="Gallery" fetchData={newsApi.getGallery} renderContent={(data) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(data) && data.map((item: any) => (
                <div key={item.id} className="aspect-square bg-gray-100 rounded-3xl overflow-hidden border border-gray-100 shadow-sm group">
                  <img src={item.url} alt={item.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          )} />} />
          <Route path="/news/community" element={<ContentPage title="Community News" fetchData={newsApi.getCommunity} renderContent={(data) => <p className="text-xl text-gray-700 leading-relaxed font-medium">{data.content}</p>} />} />
          <Route path="/news/notices" element={<ContentPage title="Public Notices" fetchData={newsApi.getPublicNotices} renderContent={(data) => (
            <div className="space-y-6">
              {Array.isArray(data) && data.map((notice: any) => (
                <div key={notice.id} className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">
                  <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">{notice.date}</p>
                  <h3 className="text-2xl font-black text-gray-900">{notice.title}</h3>
                </div>
              ))}
            </div>
          )} />} />
          <Route path="/news/forms" element={<ContentPage title="Downloadable Forms" fetchData={newsApi.getDownloadable} renderContent={(data) => (
            <div className="space-y-4">
              {Array.isArray(data) && data.map((form: any) => (
                <a key={form.id} href={form.url} className="flex items-center justify-between p-6 bg-blue-50 border border-blue-100 rounded-2xl hover:bg-blue-100 transition-all">
                  <span className="font-black text-gray-900 uppercase tracking-tight">{form.title}</span>
                  <span className="text-xs font-black text-blue-600">DOWNLOAD</span>
                </a>
              ))}
            </div>
          )} />} />

          {/* Transparency */}
          <Route path="/transparency/charter" element={<ContentPage title="Citizen's Charter" fetchData={transparencyApi.getCitizenCharter} renderContent={(data) => <p className="text-xl text-gray-700 leading-relaxed font-medium">{data.content}</p>} />} />
          <Route path="/transparency/disclosure" element={<ContentPage title="Full Disclosure Policy" fetchData={transparencyApi.getFullDisclosure} renderContent={(data) => <p className="text-xl text-gray-700 leading-relaxed font-medium">{data.content}</p>} />} />
          <Route path="/transparency/infrastructure" element={<ContentPage title="Infrastructure Projects" fetchData={transparencyApi.getInfrastructure} renderContent={(data) => (
            <div className="space-y-6">
              {Array.isArray(data) && data.map((project: any) => (
                <div key={project.id} className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-black text-gray-900">{project.title}</h3>
                    <span className="px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-gray-400">BUDGET: {project.budget}</p>
                </div>
              ))}
            </div>
          )} />} />
          <Route path="/transparency/finance" element={<ContentPage title="Finance Reports" fetchData={transparencyApi.getFinanceReports} renderContent={(data) => (
            <div className="space-y-4">
              {Array.isArray(data) && data.map((report: any) => (
                <a key={report.id} href={report.url} className="flex items-center justify-between p-6 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-gray-100 transition-all">
                  <span className="font-black text-gray-900 uppercase tracking-tight">{report.title}</span>
                  <span className="text-xs font-black text-blue-600">VIEW REPORT</span>
                </a>
              ))}
            </div>
          )} />} />
          <Route path="/transparency/orders" element={<ContentPage title="Executive Orders" fetchData={transparencyApi.getExecutiveOrders} renderContent={(data) => (
            <div className="space-y-6">
              {Array.isArray(data) && data.map((order: any) => (
                <div key={order.id} className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">
                  <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2">{order.date}</p>
                  <h3 className="text-2xl font-black text-gray-900">{order.title}</h3>
                </div>
              ))}
            </div>
          )} />} />
          <Route path="/transparency/budget" element={<ContentPage title="Budget and Finances" fetchData={transparencyApi.getBudget} renderContent={(data) => (
            <div className="space-y-12">
              <div className="p-8 bg-blue-600 text-white rounded-[2.5rem] shadow-2xl">
                <h3 className="text-xl font-black uppercase tracking-widest text-blue-100 mb-4">Annual Budget</h3>
                <p className="text-5xl font-black tracking-tighter">{data.annualBudget}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Array.isArray(data.breakdown) && data.breakdown.map((item: any) => (
                  <div key={item.category} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{item.category}</p>
                    <p className="text-2xl font-black text-gray-900">{item.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          )} />} />
          <Route path="/transparency/biddings" element={<ContentPage title="Biddings" fetchData={transparencyApi.getBiddings} renderContent={(data) => (
            <div className="space-y-6">
              {Array.isArray(data) && data.map((bid: any) => (
                <div key={bid.id} className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">
                  <h3 className="text-2xl font-black text-gray-900 mb-4">{bid.title}</h3>
                  <p className="text-lg font-bold text-blue-600 uppercase tracking-widest">DEADLINE: {bid.deadline}</p>
                </div>
              ))}
            </div>
          )} />} />

          {/* Tourism */}
          <Route path="/tourism/spots" element={<ContentPage title="Tourist Spots" fetchData={tourismApi.getSpots} renderContent={(data) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {Array.isArray(data) && data.map((spot: any) => (
                <div key={spot.id} className="group">
                  <div className="aspect-square bg-gray-100 rounded-[3rem] mb-8 overflow-hidden border border-gray-100 shadow-2xl shadow-blue-900/10">
                    <img src={`https://picsum.photos/seed/spot${spot.id}/800/800`} alt={spot.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter">{spot.name}</h3>
                  <p className="text-lg text-gray-600 font-medium leading-relaxed">{spot.description}</p>
                </div>
              ))}
            </div>
          )} />} />
          <Route path="/tourism/festivities" element={<ContentPage title="Festivities" fetchData={tourismApi.getFestivities} renderContent={(data) => (
            <div className="space-y-12">
              {Array.isArray(data) && data.map((fest: any) => (
                <div key={fest.name} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="aspect-square bg-gray-100 rounded-[3rem] overflow-hidden border border-gray-100 shadow-2xl">
                    <img src={`https://picsum.photos/seed/${fest.name}/800/800`} alt={fest.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4">{fest.date}</p>
                    <h3 className="text-4xl font-black text-gray-900 mb-6">{fest.name}</h3>
                    <p className="text-xl text-gray-700 leading-relaxed font-medium">{fest.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )} />} />
          <Route path="/tourism/delicacies" element={<ContentPage title="Local Delicacies" fetchData={tourismApi.getDelicacies} renderContent={(data) => (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.isArray(data) && data.map((item: any) => (
                <div key={item.name} className="p-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-shadow">
                  <div className="aspect-square bg-gray-50 rounded-3xl mb-6 overflow-hidden">
                    <img src={`https://picsum.photos/seed/${item.name}/400/400`} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4">{item.name}</h3>
                  <p className="text-gray-600 font-medium">{item.description}</p>
                </div>
              ))}
            </div>
          )} />} />

          {/* Forms */}
          <Route path="/forms/business" element={<ContentPage title="Business Permit" fetchData={formsApi.getBusinessPermits} renderContent={(data) => (
            <div className="space-y-6">
              <p className="text-xl text-gray-600 font-medium mb-8">Download the necessary forms for your business permit application below.</p>
              {Array.isArray(data) && data.map((form: any) => (
                <a key={form.id} href={form.url} className="flex items-center justify-between p-8 bg-white border-2 border-dashed border-blue-200 rounded-3xl hover:border-blue-600 hover:bg-blue-50 transition-all group">
                  <h3 className="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{form.title}</h3>
                  <div className="px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-xs tracking-widest">DOWNLOAD PDF</div>
                </a>
              ))}
            </div>
          )} />} />
          <Route path="/forms/building" element={<ContentPage title="Building Permits" fetchData={formsApi.getBuildingPermits} renderContent={(data) => (
            <div className="space-y-4">
              {Array.isArray(data) && data.map((form: any) => (
                <a key={form.id} href={form.url} className="flex items-center justify-between p-6 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-gray-100 transition-all">
                  <span className="font-black text-gray-900 uppercase tracking-tight">{form.title}</span>
                  <span className="text-xs font-black text-blue-600">DOWNLOAD</span>
                </a>
              ))}
            </div>
          )} />} />
          <Route path="/forms/zoning" element={<ContentPage title="Zoning Clearance" fetchData={formsApi.getZoningClearance} renderContent={(data) => (
            <div className="space-y-4">
              {Array.isArray(data) && data.map((form: any) => (
                <a key={form.id} href={form.url} className="flex items-center justify-between p-6 bg-blue-50 border border-blue-100 rounded-2xl hover:bg-blue-100 transition-all">
                  <span className="font-black text-gray-900 uppercase tracking-tight">{form.title}</span>
                  <span className="text-xs font-black text-blue-600">DOWNLOAD</span>
                </a>
              ))}
            </div>
          )} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

