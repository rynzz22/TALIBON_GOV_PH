// Test file existence
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './contexts/SupabaseAuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { ErrorBoundary } from './components/ErrorBoundary';

// Lazy loaded pages
const OrganizationalChart = lazy(() => import('./components/OrganizationalChart'));
const ContentPage = lazy(() => import('./pages/ContentPage'));

const SuspensePage = () => (
  <Suspense fallback={<div className="pt-40 p-20 text-center uppercase font-black tracking-widest animate-pulse font-sans">Loading Page...</div>}>
    <ContentPage />
  </Suspense>
);

function ExecutiveChartPage() {
  return (
    <div className="pt-[180px] bg-white min-h-screen">
      <Suspense fallback={<div className="p-20 text-center uppercase font-black tracking-widest animate-pulse font-sans">Loading Chart...</div>}>
        <OrganizationalChart />
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <LanguageProvider>
          <Router>
            <div className="app-container">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/executive/chart" element={<ExecutiveChartPage />} />
                
                {/* CMS Driven Content Routes */}
                <Route path="/page/:slug" element={<SuspensePage />} />
                <Route path="/about/:slug" element={<SuspensePage />} />
                <Route path="/executive/:slug" element={<SuspensePage />} />
                <Route path="/legislative/:slug" element={<SuspensePage />} />
                <Route path="/transparency/:slug" element={<SuspensePage />} />
                <Route path="/tourism/:slug" element={<SuspensePage />} />
                <Route path="/news/:slug" element={<SuspensePage />} />
                
                <Route path="/login" element={
                  <div className="pt-60 p-20 text-center min-h-screen font-sans">
                    <h2 className="text-2xl font-black uppercase mb-4">Admin Access</h2>
                    <p className="text-brand-muted mb-8">Please use your Supabase credentials to log in.</p>
                    <button className="minimal-button-primary mx-auto">Login with Google</button>
                  </div>
                } />

                <Route path="*" element={
                  <div className="pt-60 p-20 text-center min-h-screen">
                    <h2 className="text-2xl font-black uppercase tracking-tight mb-4 font-display">Under Construction</h2>
                    <p className="text-brand-muted font-medium">This page is currently being migrated to the new CMS structure.</p>
                    <Link to="/" className="inline-block mt-8 text-brand-primary font-black uppercase tracking-widest hover:underline">Return Home</Link>
                  </div>
                } />
              </Routes>
            </div>
          </Router>
        </LanguageProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

