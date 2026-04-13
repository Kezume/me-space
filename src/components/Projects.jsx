import React, { useState } from 'react';

const projects = [
  {
    filename: 'data_pipeline.go',
    tags: ['POSTGRESQL', 'REDIS'],
    title: 'High-Availability Data Pipeline',
    description: 'Engineered a fault-tolerant ingestion pipeline handling 50k concurrent writes with sub-millisecond latency. Implements backpressure strategies and horizontal scaling metrics.',
    readTime: '12m',
  },
  {
    filename: 'oauth2_service.rs',
    tags: ['SECURITY', 'MIDDLEWARE'],
    title: 'OAuth2 Microservice',
    description: 'Standalone identity provider implementing RFC 6749 with token rotation, PKCE, and multi-tenant isolation. Built for zero-downtime deployment with pre-allocation strategies.',
    readTime: '08m',
  },
  {
    filename: 'graphql_wrapper.ts',
    tags: ['GRAPHQL', 'MIDDLEWARE'],
    title: 'GQL Wrapper Engine',
    description: 'GraphQL translation layer for legacy SOAP APIs. Implements schema stitching and intelligent query batching for distributed databases.',
    readTime: '15m',
  },
  {
    filename: 'k8s_cluster.yaml',
    tags: ['KUBERNETES', 'DOCKER'],
    title: 'Auto-Scaling Cluster Config',
    description: 'Infrastructure-as-code for dynamic resource allocation. Handles burst traffic up to 200k RPM with automated horizontal pod autoscaling and predictive load balancing.',
    readTime: '10m',
  },
];

const ProjectCard = ({ project }) => {
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
        boxShadow: hovered ? '0 12px 30px rgba(0,0,0,0.3)' : 'none',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Card Header / File tab */}
      <div style={{
        padding: '12px 16px',
        background: '#111E31',
        borderBottom: '1px solid #1A2840',
      }}>
        <span className="file-tab">{project.filename}</span>
      </div>

      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Tech tags */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {project.tags.map((tag) => (
            <span key={tag} className="tech-tag">{tag}</span>
          ))}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '17px',
          fontWeight: '700',
          color: hovered ? '#00FF9D' : '#E2E8F0',
          marginBottom: '12px',
          lineHeight: '1.3',
          transition: 'color 0.2s',
        }}>
          {project.title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: '14px',
          color: '#8899AA',
          lineHeight: '1.7',
          marginBottom: '20px',
          flex: 1,
        }}>
          {project.description}
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
            textTransform: 'uppercase', letterSpacing: '0.08em',
          }}>
            READ_TIME: {project.readTime}
          </span>
          <button style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px', fontWeight: '600',
            color: '#00FF9D',
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

const Projects = () => {
  return (
    <section
      id="projects"
      style={{
        padding: '100px 40px',
        background: 'rgba(0,0,0,0.2)',
        borderTop: '1px solid #1A2840',
        borderBottom: '1px solid #1A2840',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '13px', color: '#8899AA',
            }}>Case Studies /</span>
          </div>
          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(28px, 3.5vw, 42px)',
            fontWeight: '800',
            color: '#E2E8F0',
            letterSpacing: '-0.02em',
          }}>
            Core Infrastructure Modules
          </h2>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {projects.map((project) => (
            <ProjectCard key={project.filename} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
