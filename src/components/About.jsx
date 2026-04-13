import React from 'react';

const About = () => {
  return (
    <section
      id="about"
      style={{ padding: '100px 40px', maxWidth: '1200px', margin: '0 auto' }}
    >
      {/* Section Badge */}
      <div className="badge" style={{ marginBottom: '48px' }}>
        SYSTEM_INIT // ABOUT_ME
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.4fr',
        gap: '80px',
        alignItems: 'start',
      }} className="about-grid">
        {/* Left Column */}
        <div>
          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(28px, 3.5vw, 42px)',
            fontWeight: '800',
            color: '#E2E8F0',
            lineHeight: '1.2',
            marginBottom: '12px',
            letterSpacing: '-0.02em',
          }}>
            Architecting Scalable Logic
          </h2>
          <div className="section-line" />

          {/* History tag */}
          <div style={{ marginBottom: '20px' }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px', color: '#00FF9D', fontStyle: 'italic',
              marginRight: '8px',
            }}>history</span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px', color: '#4A5568', letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>2018 — PRESENT</span>
          </div>

          {/* Quote */}
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '13px',
            color: '#8899AA',
            fontStyle: 'italic',
            lineHeight: '1.7',
            marginBottom: '32px',
            borderLeft: '2px solid #1A2840',
            paddingLeft: '16px',
          }}>
            "The beauty of backend is not what the user sees, but how the system breathes under pressure."
          </p>

          {/* Status Card */}
          <div className="card" style={{ padding: '20px' }}>
            {[
              { key: 'STATUS', value: 'ACTIVE', accent: true },
              { key: 'CURRENT_LOC', value: 'San Francisco, CA', accent: false },
              { key: 'UPTIME', value: '14,200+ hours code', accent: false },
            ].map((item) => (
              <div key={item.key} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 0',
                borderBottom: '1px solid #1A2840',
              }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px', color: '#4A5568',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>
                  {item.key}
                </span>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12px',
                  color: item.accent ? '#00FF9D' : '#E2E8F0',
                  fontWeight: '500',
                }}>
                  {item.accent && <span style={{ marginRight: '6px', fontSize: '8px' }}>●</span>}
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div>
          <p style={{ fontSize: '16px', color: '#8899AA', lineHeight: '1.8', marginBottom: '20px' }}>
            My journey began with a fascination for how data moves through wires. While most were captivated by pixels, I was drawn to the efficiency of SQL queries and the elegance of concurrent processes in Go.
          </p>
          <p style={{ fontSize: '16px', color: '#8899AA', lineHeight: '1.8', marginBottom: '36px' }}>
            Over the past five years, I've transitioned from building simple REST APIs to architecting complex microservices environments. I believe that good engineering is about making trade-offs visible and ensuring that every millisecond of latency is accounted for.
          </p>

          {/* Core Philosophy Card */}
          <div style={{
            background: '#0D1626',
            border: '1px solid #1A2840',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            {/* Card header */}
            <div style={{
              padding: '14px 20px',
              background: '#111E31',
              borderBottom: '1px solid #1A2840',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12px', color: '#00FF9D',
              }}>architecture</span>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px', fontWeight: '600', color: '#E2E8F0',
              }}>Core Philosophy</span>
            </div>

            <div style={{ padding: '24px 20px' }}>
              {[
                { num: '01', title: 'Simplicity over Cleverness', desc: 'Code should be easy to delete and easier to reason about.' },
                { num: '02', title: 'Observability First', desc: "If it's not monitored, it doesn't exist in production." },
                { num: '03', title: 'Type Safety', desc: 'Let the compiler do the heavy lifting so humans can do the creative work.' },
              ].map((item) => (
                <div key={item.num} style={{
                  display: 'flex',
                  gap: '16px',
                  marginBottom: '20px',
                }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px', color: '#00FF9D',
                    fontWeight: '600', flexShrink: 0, paddingTop: '2px',
                  }}>
                    {item.num}
                  </span>
                  <div>
                    <span style={{
                      fontSize: '14px', fontWeight: '600', color: '#E2E8F0',
                    }}>{item.title}: </span>
                    <span style={{
                      fontSize: '14px', color: '#8899AA',
                    }}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
