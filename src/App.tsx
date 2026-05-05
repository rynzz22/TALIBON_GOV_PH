// Test file existence
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/SupabaseAuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import FacebookSection from './components/FacebookSection';
import { SkeletonLoader } from './components/SkeletonLoader';

// Lazy loaded page for Organizational Chart
const OrganizationalChart = lazy(() => import('./components/OrganizationalChart'));

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <FacebookSection />
      {/* Additional landing page sections would go here */}
      <footer className="bg-brand-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm opacity-60 font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} Municipality of Talibon, Bohol. All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

function ExecutiveChartPage() {
  return (
    <div className="pt-[180px] bg-white min-h-screen">
      <Suspense fallback={<div className="p-20 text-center uppercase font-black tracking-widest animate-pulse">Loading Chart...</div>}>
        <OrganizationalChart />
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/executive/chart" element={<ExecutiveChartPage />} />
              {/* Fallback for other routes mentioned in Navbar but not implemented yet */}
              <Route path="*" element={
                <div className="pt-40 p-20 text-center">
                  <h2 className="text-2xl font-black uppercase tracking-tight mb-4">Under Construction</h2>
                  <p className="text-brand-muted">This page is currently being migrated to the new CMS structure.</p>
                </div>
              } />
            </Routes>
          </div>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

