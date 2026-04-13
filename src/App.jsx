import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';
import TerminalMascot from './components/TerminalMascot';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import BlogDetail from './components/BlogDetail';
import ProjectDetail from './components/ProjectDetail';
import Preloader from './components/Preloader';
import Skills from './components/Skills';
import NotFound from './components/NotFound';
import AllProjects from './components/AllProjects';
import AllBlogs from './components/AllBlogs';

function SharedLayout({ children }) {
  return (
    <div className="relative min-h-screen bg-[#050A15] text-on-surface font-body overflow-x-hidden selection:bg-primary/30 selection:text-primary">
      
      {/* Strict Pixel/Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(78, 222, 163, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(78, 222, 163, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px'
      }}></div>

      {/* Decorative vertical guide lines */}
      <div className="fixed top-0 bottom-0 left-[5%] w-px bg-primary/5 pointer-events-none z-0"></div>
      <div className="fixed top-0 bottom-0 right-[5%] w-px bg-primary/5 pointer-events-none z-0"></div>

      <div className="relative z-10">
        <Navbar />
        <main className="pt-32 pb-8 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen">
          {children}
        </main>
        
        {/* Strict Coding Footer */}
        <footer className="w-full border-t border-primary/20 bg-[#050A15] relative z-20 mt-8">
          <div className="flex flex-col items-center gap-6 py-8 px-6 md:px-12 max-w-[1400px] mx-auto md:flex-row md:justify-between">

            {/* Left: Branding */}
            <div className="text-center md:text-left">
              <div className="text-primary font-mono font-bold text-base mb-1 flex items-center justify-center md:justify-start gap-3 uppercase tracking-widest">
                <span className="w-2.5 h-2.5 bg-primary animate-pulse"></span>
                Roihan_Arrafli
              </div>
              <p className="text-slate-500 font-mono text-[10px] tracking-widest uppercase">
                <span className="text-primary/50">/*</span> © 2024. All systems operational. <span className="text-primary/50">*/</span>
              </p>
            </div>

            {/* Right: Links */}
            <div className="flex flex-wrap justify-center gap-3 font-mono text-xs tracking-widest uppercase">
              <a className="text-slate-400 hover:text-primary hover:bg-primary/10 px-3 py-1.5 border border-transparent hover:border-primary/30 transition-colors" href="https://github.com/Kezume" target="_blank" rel="noreferrer">
                [GitHub]
              </a>
              <a className="text-slate-400 hover:text-primary hover:bg-primary/10 px-3 py-1.5 border border-transparent hover:border-primary/30 transition-colors" href="https://www.linkedin.com/in/roihanarrafli" target="_blank" rel="noreferrer">
                [LinkedIn]
              </a>
              <a className="text-slate-400 hover:text-primary hover:bg-primary/10 px-3 py-1.5 border border-transparent hover:border-primary/30 transition-colors" href="#blog">
                [Docs]
              </a>
              <a className="text-slate-400 hover:text-primary hover:bg-primary/10 px-3 py-1.5 border border-transparent hover:border-primary/30 transition-colors flex items-center gap-1.5" href="#">
                <span className="w-1.5 h-1.5 bg-primary animate-pulse"></span> [Status]
              </a>
            </div>

          </div>
        </footer>
      </div>

      {/* Roaming Mascot */}
      <TerminalMascot />
    </div>
  );
}

function PublicHome() {
  return (
    <div className="space-y-24">
      <Hero />
      <Skills />
      <Projects />
      <About />
      <Blog />
      <Contact />
    </div>
  )
}

function App() {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    // 250ms * 8 logs = 2000ms + some buffer
    const timer = setTimeout(() => {
      setBooting(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  if (booting) {
    return <Preloader />;
  }

  return (
    <Routes>
      <Route path="/" element={<SharedLayout><PublicHome /></SharedLayout>} />
      <Route path="/docs/:id" element={<SharedLayout><BlogDetail /></SharedLayout>} />
      <Route path="/docs" element={<SharedLayout><AllBlogs /></SharedLayout>} />
      <Route path="/modules/:id" element={<SharedLayout><ProjectDetail /></SharedLayout>} />
      <Route path="/modules" element={<SharedLayout><AllProjects /></SharedLayout>} />
      <Route path="/sys/panel" element={<AdminPanel />} />
      <Route path="/sys/auth" element={<Login />} />
      <Route path="*" element={<SharedLayout><NotFound /></SharedLayout>} />
    </Routes>
  );
}

export default App;
