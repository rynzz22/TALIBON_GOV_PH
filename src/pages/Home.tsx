
import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import FacebookSection from '../components/FacebookSection';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FacebookSection />
      {/* Additional sections would go here */}
      <footer className="bg-brand-secondary text-white py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm opacity-60 font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} Municipality of Talibon, Bohol. All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
