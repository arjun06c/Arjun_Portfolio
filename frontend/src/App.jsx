import React, { useEffect } from 'react';
import BackgroundGlow from './components/BackgroundGlow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/about/About';
import Skills from './components/Skills';
import CodingDashboard from './components/CodingDashboard';
import Projects from './components/Projects';
import Services from './components/Services';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { checkHealth } from './services/api';

export default function App() {
  useEffect(() => {
    // Check backend connection on mount
    checkHealth().then((res) => {
      if (res) {
        console.log('[Portfolio App]: Backend API connected smoothly:', res.service);
      }
    });
  }, []);

  return (
    <div className="relative bg-[#050505] text-white min-h-screen selection:bg-[#FFD600] selection:text-black">
      {/* Subtle Yellow Radial Glows across sections */}
      <BackgroundGlow />

      {/* Floating Pill Navbar */}
      <Navbar />

      {/* Main Sections in Exact Order */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <CodingDashboard />
        <Projects />
        <Services />
        <Achievements />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
