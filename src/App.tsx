/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ContentPage from "./pages/AboutTalibon/ContentPage";
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
          <Route path="/about/seal" element={<ContentPage title="Official Seal" fetchData={aboutApi.getSeal} renderContent={(data) => <p className="text-xl text-gray-700 leading-relaxed font-medium">{data.description}</p>} />} />
          <Route path="/about/history" element={<ContentPage title="Brief History" fetchData={aboutApi.getHistory} renderContent={(data) => <p className="text-xl text-gray-700 leading-relaxed font-medium">{data.content}</p>} />} />
          <Route path="/about/mayors" element={<ContentPage title="List of Mayors" fetchData={aboutApi.getMayors} renderContent={(data) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.map((mayor: any) => (
                <div key={mayor.name} className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                  <h3 className="text-2xl font-black text-gray-900 mb-2">{mayor.name}</h3>
                  <p className="text-lg font-bold text-blue-600 uppercase tracking-widest">{mayor.term}</p>
                </div>
              ))}
            </div>
          )} />} />
          <Route path="/about/barangays" element={<ContentPage title="Barangays" fetchData={aboutApi.getBarangays} renderContent={(data) => (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.map((brgy: string) => (
                <div key={brgy} className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-center font-black text-gray-700 uppercase tracking-widest text-xs">
                  {brgy}
                </div>
              ))}
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
          <Route path="/executive/directory" element={<ContentPage title="Directory of Departments" fetchData={executiveApi.getDirectory} renderContent={(data) => (
            <div className="space-y-4">
              {data.map((dept: any) => (
                <div key={dept.department} className="flex justify-between items-center p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
                  <h3 className="text-xl font-black text-gray-900">{dept.department}</h3>
                  <p className="text-lg font-bold text-blue-600">{dept.contact}</p>
                </div>
              ))}
            </div>
          )} />} />

          {/* Legislative */}
          <Route path="/legislative/mandate" element={<ContentPage title="Legislative Mandate" fetchData={legislativeApi.getMandate} renderContent={(data) => <p className="text-xl text-gray-700 leading-relaxed font-medium">{data.content}</p>} />} />
          <Route path="/legislative/ordinances" element={<ContentPage title="Enacted Ordinances" fetchData={legislativeApi.getOrdinances} renderContent={(data) => (
            <div className="space-y-6">
              {data.map((ord: any) => (
                <div key={ord.id} className="p-8 bg-blue-50 rounded-3xl border border-blue-100">
                  <h3 className="text-2xl font-black text-gray-900 mb-4">{ord.title}</h3>
                  <p className="text-lg text-gray-600 font-medium">{ord.description}</p>
                </div>
              ))}
            </div>
          )} />} />

          {/* News */}
          <Route path="/news/articles" element={<ContentPage title="News Articles" fetchData={newsApi.getArticles} renderContent={(data) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.map((article: any) => (
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

          {/* Tourism */}
          <Route path="/tourism/spots" element={<ContentPage title="Tourist Spots" fetchData={tourismApi.getSpots} renderContent={(data) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {data.map((spot: any) => (
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

          {/* Forms */}
          <Route path="/forms/business" element={<ContentPage title="Business Permit" fetchData={formsApi.getDownloadable} renderContent={(data) => (
            <div className="space-y-6">
              <p className="text-xl text-gray-600 font-medium mb-8">Download the necessary forms for your business permit application below.</p>
              {data.map((form: any) => (
                <a key={form.id} href={form.url} className="flex items-center justify-between p-8 bg-white border-2 border-dashed border-blue-200 rounded-3xl hover:border-blue-600 hover:bg-blue-50 transition-all group">
                  <h3 className="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{form.title}</h3>
                  <div className="px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-xs tracking-widest">DOWNLOAD PDF</div>
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

