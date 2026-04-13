import React, { useState } from 'react';

const blogPosts = [
  {
    filename: 'grpc_microservices.go',
    tags: ['GOLANG', 'GRPC'],
    title: 'Architecting Scalable Microservices with Go and gRPC',
    description: 'A deep dive into designing fault-tolerant, high-throughput service meshes with Protocol Buffers. Covers connection pooling, deadline propagation, and distributed tracing.',
    date: '2024.10.14',
    readTime: '18m',
    featured: true,
  },
  {
    filename: 'linux_kernel.sh',
    tags: ['LINUX', 'LOW LEVEL'],
    title: 'Understanding eBPF for Observability',
    description: 'Leveraging kernel hooks to monitor application behavior without instrumenting code or adding significant overhead.',
    date: '2024.09.02',
    readTime: '20m',
  },
  {
    filename: 'postgre_internals.sql',
    tags: ['DATABASE', 'SQL'],
    title: 'PostgreSQL Indexing: Beyond B-Trees',
    description: 'Exploring GIN, GiST, and BRIN index types for spatial data, full-text search, and time-series performance.',
    date: '2024.08.21',
    readTime: '10m',
  },
];

const BlogCard = ({ post }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#0D1626',
        border: `1px solid ${hovered ? 'rgba(0,255,157,0.2)' : '#1A2840'}`,
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'all 0.25s ease',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
    >
      {/* File Tab */}
      <div style={{
        padding: '10px 16px',
        background: '#111E31',
        borderBottom: '1px solid #1A2840',
      }}>
        <span className="file-tab">{post.filename}</span>
      </div>

      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Tags */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
          {post.tags.map((tag) => (
            <span key={tag} className="tech-tag">{tag}</span>
          ))}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '16px',
          fontWeight: '700',
          color: hovered ? '#00FF9D' : '#E2E8F0',
          marginBottom: '10px',
          lineHeight: '1.35',
          transition: 'color 0.2s',
          flex: 1,
        }}>
          {post.title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: '13.5px',
          color: '#8899AA',
          lineHeight: '1.65',
          marginBottom: '18px',
        }}>
          {post.description}
        </p>

        {/* Footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '14px',
          borderTop: '1px solid #1A2840',
        }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px', color: '#4A5568',
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            READ_TIME: {post.readTime}
          </span>
          <button style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px', fontWeight: '600', color: '#00FF9D',
            background: 'none', border: 'none', cursor: 'pointer',
            letterSpacing: '0.06em', textTransform: 'uppercase',
          }}>
            CAT CONTENT.TXT
            <span style={{
              width: '18px', height: '18px',
              border: '1px solid rgba(0,255,157,0.3)',
              borderRadius: '3px',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '10px',
            }}>↗</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Blog = () => {
  const [email, setEmail] = useState('');
  const featured = blogPosts.find(p => p.featured);
  const secondary = blogPosts.filter(p => !p.featured);

  return (
    <section
      id="blog"
      style={{ padding: '100px 40px', maxWidth: '1200px', margin: '0 auto' }}
    >
      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <div className="badge" style={{ marginBottom: '12px' }}>
          LATEST RELEASE
        </div>
        <h2 style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 'clamp(28px, 3.5vw, 42px)',
          fontWeight: '800',
          color: '#E2E8F0',
          letterSpacing: '-0.02em',
        }}>
          Technical Writeups
        </h2>
      </div>

      {/* Featured post — full width */}
      {featured && (
        <div style={{
          background: '#0D1626',
          border: '1px solid #1A2840',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '20px',
          transition: 'all 0.25s ease',
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0,255,157,0.2)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#1A2840';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div style={{
            padding: '10px 16px',
            background: '#111E31',
            borderBottom: '1px solid #1A2840',
            display: 'flex', alignItems: 'center', gap: '16px',
          }}>
            <span className="file-tab">{featured.filename}</span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px', color: '#00FF9D',
              background: 'rgba(0,255,157,0.1)',
              border: '1px solid rgba(0,255,157,0.2)',
              borderRadius: '3px', padding: '2px 8px',
            }}>FEATURED</span>
          </div>
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
              {featured.tags.map(tag => (
                <span key={tag} className="tech-tag">{tag}</span>
              ))}
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px', color: '#4A5568', marginLeft: 'auto',
              }}>{featured.date}</span>
            </div>
            <h3 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '22px', fontWeight: '700', color: '#E2E8F0',
              marginBottom: '12px', lineHeight: '1.3',
            }}>{featured.title}</h3>
            <p style={{ fontSize: '15px', color: '#8899AA', lineHeight: '1.7', marginBottom: '20px' }}>
              {featured.description}
            </p>
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '16px', borderTop: '1px solid #1A2840',
            }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px', color: '#4A5568', textTransform: 'uppercase',
              }}>READ_TIME: {featured.readTime}</span>
              <button style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px', fontWeight: '600', color: '#060D1A',
                background: '#00FF9D', border: 'none',
                borderRadius: '4px', padding: '8px 16px', cursor: 'pointer',
                letterSpacing: '0.05em', textTransform: 'uppercase',
              }}>
                EXEC READ_POST →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Secondary posts + Newsletter */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '20px',
        alignItems: 'start',
      }} className="blog-grid">
        {secondary.map(post => <BlogCard key={post.filename} post={post} />)}

        {/* Newsletter card */}
        <div style={{
          background: '#0D1626',
          border: '1px solid #1A2840',
          borderRadius: '8px',
          padding: '32px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '16px',
        }}>
          <div style={{
            width: '48px', height: '48px',
            border: '1px solid rgba(0,255,157,0.3)',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '22px', color: '#00FF9D',
          }}>✉</div>
          <div>
            <h4 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px', fontWeight: '700', color: '#00FF9D',
              marginBottom: '8px',
            }}>Weekly Kernel Dump</h4>
            <p style={{ fontSize: '13px', color: '#8899AA', lineHeight: '1.6' }}>
              Get the latest backend engineering patterns and architectural insights delivered to your inbox.
            </p>
          </div>
          <div style={{ display: 'flex', width: '100%', gap: '0' }}>
            <input
              type="email"
              placeholder="root@localhost"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                background: '#060D1A',
                border: '1px solid #1A2840',
                borderRight: 'none',
                borderRadius: '6px 0 0 6px',
                padding: '10px 14px',
                color: '#E2E8F0',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12px', outline: 'none',
              }}
              onFocus={(e) => { e.target.style.borderColor = 'rgba(0,255,157,0.3)'; }}
              onBlur={(e) => { e.target.style.borderColor = '#1A2840'; }}
            />
            <button style={{
              background: '#00FF9D',
              border: '1px solid #00FF9D',
              borderRadius: '0 6px 6px 0',
              padding: '10px 14px',
              color: '#060D1A',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: '700',
            }}>→</button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .blog-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Blog;
