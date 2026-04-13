import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('http://localhost:8080/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      style={{
        padding: '100px 40px',
        background: 'rgba(0,0,0,0.15)',
        borderTop: '1px solid #1A2840',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: '80px',
          alignItems: 'start',
        }} className="contact-grid">

          {/* Left Column */}
          <div>
            <div className="badge" style={{ marginBottom: '24px' }}>
              OPEN_TO_CONNECT
            </div>
            <h2 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              fontWeight: '800',
              color: '#E2E8F0',
              lineHeight: '1.2',
              letterSpacing: '-0.02em',
              marginBottom: '12px',
            }}>
              Let's Build Something Together
            </h2>
            <div className="section-line" />

            <p style={{
              fontSize: '15px', color: '#8899AA',
              lineHeight: '1.75', marginBottom: '36px',
            }}>
              Looking for a backend engineer who thinks in systems and ships in production? 
              I'm available for full-time roles, contract work, and technical consulting.
            </p>

            {/* Contact Info Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: '📍', label: 'LOCATION', value: 'San Francisco, CA' },
                { icon: '⚡', label: 'RESPONSE', value: '< 24 hours' },
                { icon: '🔒', label: 'SECURITY', value: 'End-to-end encrypted' },
              ].map((item) => (
                <div key={item.label} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '14px 16px',
                  background: '#0D1626',
                  border: '1px solid #1A2840',
                  borderRadius: '8px',
                }}>
                  <span style={{ fontSize: '18px' }}>{item.icon}</span>
                  <div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '10px', color: '#4A5568',
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                      marginBottom: '2px',
                    }}>
                      {item.label}
                    </div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '13px', color: '#E2E8F0', fontWeight: '500',
                    }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              {['GitHub', 'LinkedIn', 'Twitter'].map((social) => (
                <a key={social} href="#" style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px', color: '#8899AA',
                  background: '#0D1626',
                  border: '1px solid #1A2840',
                  borderRadius: '6px', padding: '8px 14px',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  letterSpacing: '0.04em',
                }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#00FF9D';
                    e.target.style.borderColor = 'rgba(0,255,157,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#8899AA';
                    e.target.style.borderColor = '#1A2840';
                  }}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column — Form */}
          <div style={{
            background: '#0D1626',
            border: '1px solid #1A2840',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            {/* Terminal Header */}
            <div style={{
              padding: '12px 20px',
              background: '#111E31',
              borderBottom: '1px solid #1A2840',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F57' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#28CA41' }} />
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px', color: '#4A5568', marginLeft: '12px',
              }}>
                send_message.sh
              </span>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px', color: '#00FF9D',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                    marginBottom: '8px',
                  }}>--name</label>
                  <input
                    type="text" required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-ba"
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px', color: '#00FF9D',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                    marginBottom: '8px',
                  }}>--email</label>
                  <input
                    type="email" required
                    placeholder="you@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-ba"
                  />
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px', color: '#00FF9D',
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                  marginBottom: '8px',
                }}>--subject</label>
                <input
                  type="text" required
                  placeholder="Project collaboration / Job offer / Consulting"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="input-ba"
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px', color: '#00FF9D',
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                  marginBottom: '8px',
                }}>--message</label>
                <textarea
                  rows={5} required
                  placeholder="Describe your project, timeline, and requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="input-ba"
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary-ba"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {status === 'loading' ? (
                  <><span style={{ animation: 'pulse-dot 1s infinite', marginRight: '8px' }}>⬤</span> TRANSMITTING...</>
                ) : (
                  <>EXEC SEND_MESSAGE <span>→</span></>
                )}
              </button>

              {status === 'success' && (
                <div style={{
                  textAlign: 'center', padding: '12px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12px', color: '#00FF9D',
                  background: 'rgba(0,255,157,0.06)',
                  border: '1px solid rgba(0,255,157,0.2)',
                  borderRadius: '6px',
                }}>
                  ✓ MESSAGE_TRANSMITTED // HANDSHAKE_COMPLETE
                </div>
              )}
              {status === 'error' && (
                <div style={{
                  textAlign: 'center', padding: '12px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12px', color: '#FF5F57',
                  background: 'rgba(255,95,87,0.06)',
                  border: '1px solid rgba(255,95,87,0.2)',
                  borderRadius: '6px',
                }}>
                  ✗ CONNECTION_REFUSED // SYSTEM_ERROR
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
