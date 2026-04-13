import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
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
          if (rect.top <= 100) {
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
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        backgroundColor: isScrolled ? 'rgba(6, 13, 26, 0.92)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid #1A2840' : '1px solid transparent',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
          
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home', 'home')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
          >
            <div style={{
              width: '10px', height: '10px', borderRadius: '50%',
              background: '#00FF9D',
              boxShadow: '0 0 10px #00FF9D',
            }} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '16px', fontWeight: '600',
              color: '#E2E8F0', letterSpacing: '0.02em',
            }}>
              Binary Architect
            </span>
          </a>

          {/* Desktop Nav */}
          <ul style={{ display: 'flex', alignItems: 'center', gap: '32px', listStyle: 'none' }} className="hidden-mobile">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.id)}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '13px',
                      fontWeight: '500',
                      color: isActive ? '#00FF9D' : '#8899AA',
                      textDecoration: 'none',
                      letterSpacing: '0.03em',
                      paddingBottom: '4px',
                      borderBottom: isActive ? '2px solid #00FF9D' : '2px solid transparent',
                      transition: 'all 0.2s ease',
                      textTransform: 'uppercase',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.target.style.color = '#E2E8F0';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.target.style.color = '#8899AA';
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Terminal icon button */}
          <button
            style={{
              width: '38px', height: '38px',
              border: '1px solid #1A2840',
              borderRadius: '6px',
              background: 'rgba(13, 22, 38, 0.8)',
              color: '#00FF9D',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '14px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,255,157,0.08)';
              e.currentTarget.style.borderColor = 'rgba(0,255,157,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(13, 22, 38, 0.8)';
              e.currentTarget.style.borderColor = '#1A2840';
            }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? '✕' : '>_'}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div style={{
          position: 'absolute',
          top: '70px', right: '20px', width: '220px',
          background: '#0D1626',
          border: '1px solid #1A2840',
          borderRadius: '8px',
          padding: '16px 0',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        }}>
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.id)}
                style={{
                  display: 'block',
                  padding: '10px 20px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '13px',
                  color: isActive ? '#00FF9D' : '#8899AA',
                  textDecoration: 'none',
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                  borderLeft: isActive ? '2px solid #00FF9D' : '2px solid transparent',
                }}
              >
                {link.name}
              </a>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
