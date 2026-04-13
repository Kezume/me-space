import React, { useState, useEffect } from 'react';

const codeLines = [
  { indent: 0, text: 'async function handleRequest(', green: false },
  { indent: 1, text: 'ctx: Context,', green: false },
  { indent: 1, text: 'req: IncomingRequest', green: false },
  { indent: 0, text: '): Promise<Response> {', green: false },
  { indent: 1, text: 'const { userId, payload } = await', green: false },
  { indent: 2, text: 'authenticate(req.headers);', green: true },
  { indent: '', text: '', green: false },
  { indent: 1, text: 'const pipeline = new DataPipeline()', green: false },
  { indent: 2, text: '.withBackpressure(50_000)', green: true },
  { indent: 2, text: '.withRetry({ attempts: 3 })', green: false },
  { indent: 2, text: '.withCircuitBreaker();', green: false },
  { indent: '', text: '', green: false },
  { indent: 1, text: 'return pipeline.process(payload);', green: false },
  { indent: 0, text: '}', green: false },
];

const Hero = () => {
  const [displayedLines, setDisplayedLines] = useState(0);

  useEffect(() => {
    if (displayedLines < codeLines.length) {
      const t = setTimeout(() => setDisplayedLines(n => n + 1), 90);
      return () => clearTimeout(t);
    }
  }, [displayedLines]);

  return (
    <section
      id="home"
      className="grid-bg"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '100px 40px 60px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow blobs */}
      <div style={{
        position: 'absolute', top: '20%', left: '-10%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,255,157,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '-5%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,80,200,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center',
        }}
          className="hero-grid"
        >
          {/* Left Column */}
          <div>
            {/* Badge */}
            <div className="badge" style={{ marginBottom: '24px' }}>
              <span className="badge-dot" />
              SYSTEMS ARCHITECTURE // BACKEND
            </div>

            {/* Main heading */}
            <h1 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: '800',
              lineHeight: '1.15',
              color: '#E2E8F0',
              marginBottom: '20px',
              letterSpacing: '-0.02em',
            }}>
              Architecting{' '}
              <span style={{ color: '#00FF9D' }}>Robust</span>
              {' '}Backend Systems
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: '16px',
              color: '#8899AA',
              lineHeight: '1.7',
              marginBottom: '36px',
              maxWidth: '480px',
            }}>
              Junior backend engineer specialized in building scalable, distributed logic
              and high-performance APIs. Bridging the gap between conceptual architecture
              and production-grade execution.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '56px' }}>
              <a href="#projects" className="btn-primary-ba" onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                View Projects <span style={{ fontSize: '16px' }}>→</span>
              </a>
              <a href="#" className="btn-outline-ba">
                Download CV
              </a>
            </div>

            {/* Stats Bar */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
              paddingTop: '24px',
              borderTop: '1px solid #1A2840',
            }}>
              {[
                { label: 'STACK', value: 'Node.js / Go / Rust' },
                { label: 'LATENCY', value: '< 40ms avg' },
                { label: 'EXPERIENCE', value: 'L1 Engineer' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    color: '#4A5568',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}>
                    {stat.label}
                  </div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '13px',
                    color: '#E2E8F0',
                    fontWeight: '500',
                  }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Code Window */}
          <div className="animate-float" style={{ position: 'relative' }}>
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot" style={{ background: '#FF5F57' }} />
                <div className="terminal-dot" style={{ background: '#FFBD2E' }} />
                <div className="terminal-dot" style={{ background: '#28CA41' }} />
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px', color: '#4A5568',
                  marginLeft: '12px',
                }}>
                  data_pipeline.ts
                </span>
              </div>

              <div style={{ padding: '20px 24px', minHeight: '280px' }}>
                {codeLines.slice(0, displayedLines).map((line, i) => (
                  <div key={i} style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '12px',
                    lineHeight: '1.8',
                    color: line.green ? '#00FF9D' : '#8899AA',
                    paddingLeft: `${(line.indent || 0) * 16}px`,
                  }}>
                    {line.text || '\u00A0'}
                  </div>
                ))}
                <span className="cursor-blink" style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12px', color: '#00FF9D',
                }}>█</span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderTop: '1px solid #1A2840',
                background: '#0A1220',
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00FF9D' }} />
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px', color: '#4A5568',
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                }}>
                  ENVIRONMENT: PRODUCTION_READY
                </span>
              </div>
            </div>

            {/* Decorative corner accent */}
            <div style={{
              position: 'absolute', top: '-8px', right: '-8px',
              width: '30px', height: '30px',
              borderTop: '2px solid #00FF9D',
              borderRight: '2px solid #00FF9D',
              borderRadius: '0 4px 0 0',
            }} />
            <div style={{
              position: 'absolute', bottom: '-8px', left: '-8px',
              width: '30px', height: '30px',
              borderBottom: '2px solid #00FF9D',
              borderLeft: '2px solid #00FF9D',
              borderRadius: '0 0 0 4px',
            }} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
