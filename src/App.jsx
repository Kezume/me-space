import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';

function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#060D1A' }}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Blog />
        <Contact />
      </main>
      <footer style={{
        padding: '32px 40px',
        borderTop: '1px solid #1A2840',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        margin: '0 auto',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: '#00FF9D', boxShadow: '0 0 8px #00FF9D',
          }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '13px', fontWeight: '600', color: '#E2E8F0',
          }}>
            Binary Architect
          </span>
        </div>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px', color: '#4A5568', letterSpacing: '0.04em',
        }}>
          © 2024 — roihanarr.dev // SYSTEMS_ONLINE
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          {['GitHub', 'LinkedIn', 'RSS'].map(link => (
            <a key={link} href="#" style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px', color: '#4A5568',
              textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.06em',
              transition: 'color 0.2s',
            }}
              onMouseEnter={(e) => { e.target.style.color = '#00FF9D'; }}
              onMouseLeave={(e) => { e.target.style.color = '#4A5568'; }}
            >
              {link}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}

export default App;
