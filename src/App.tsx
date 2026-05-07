// Test file existence
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './contexts/SupabaseAuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { ErrorBoundary } from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import ContentManager from './pages/admin/ContentManager';
import ContentEditor from './pages/admin/ContentEditor';

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
                
                {/* Admin Auth Route */}
                <Route path="/login" element={<AdminLogin />} />

                {/* Protected Admin Routes */}
                <Route path="/admin" element={<ProtectedRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="content" element={<ContentManager />} />
                    <Route path="content/:slug" element={<ContentEditor />} />
                    <Route path="news" element={<div className="p-8 text-2xl font-black uppercase tracking-tight">News Manager Coming Soon</div>} />
                  </Route>
                </Route>

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

