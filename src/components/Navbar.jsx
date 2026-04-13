import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Blog', href: '#blog', id: 'blog' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks.map(l => l.id);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href, id) => {
    e.preventDefault();
    setActiveSection(id);
    setMobileOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-mono ${isScrolled ? 'bg-[#050A15]/95 border-b border-primary/20 backdrop-blur-md shadow-[0_5px_0_rgba(78,222,163,0.05)]' : 'bg-transparent'}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex items-center">
              <a href="#home" onClick={(e) => handleNavClick(e, '#home', 'home')} className="text-lg font-bold tracking-widest text-[#E2E8F0] flex items-center gap-2 group hover:text-primary transition-colors">
                <span className="text-primary group-hover:animate-ping">&gt;_</span>
                ROIHAN_ARRAFLI
              </a>
            </div>
            
            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.id)}
                    className={`px-4 py-2 border transition-colors ${isActive ? "border-primary text-primary bg-primary/10" : "border-transparent text-slate-400 hover:border-primary/30 hover:text-slate-200"}`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <a href="https://github.com/Kezume" target="_blank" rel="noreferrer" className="hidden lg:flex items-center px-3 py-2 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors text-xs uppercase tracking-widest gap-2">
                 <span className="material-symbols-outlined text-[16px]">terminal</span>
                 SOURCE
              </a>

              <button 
                onClick={() => setMobileOpen(!mobileOpen)}
                className="w-10 h-10 border border-primary/30 text-primary md:hidden bg-[#050A15] hover:bg-primary/10 transition-colors flex items-center justify-center uppercase" 
                title="Menu"
              >
                <span className="material-symbols-outlined">
                  {mobileOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="fixed top-20 left-0 right-0 bg-[#050A15] border-b border-primary/20 z-40 md:hidden flex flex-col font-mono text-sm uppercase tracking-widest shadow-xl">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.id)}
                className={`block px-6 py-4 border-l-4 transition-colors ${isActive ? "border-primary text-primary bg-primary/5" : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"}`}
              >
                <span className="opacity-50 mr-2">0{navLinks.indexOf(link) + 1}.</span> {link.name}
              </a>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Navbar;
