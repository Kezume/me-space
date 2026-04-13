import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_URL } from '../config';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    
    fetch(`${API_URL}/api/projects/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Module not found");
        return res.json();
      })
      .then(data => {
        setProject(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const ensureAbsoluteUrl = (url) => {
    if (!url) return '';
    return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-primary uppercase font-mono tracking-widest animate-pulse">
        [ ALLOCATING_MODULE_BUFFER 0x{String(id).split('-')[0].toUpperCase()}... ]
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] space-y-6 font-mono">
        <div className="text-red-500 uppercase tracking-widest bg-red-500/10 border border-red-500/30 p-4">ERR_MODULE_NOT_FOUND: {error}</div>
        <Link to="/" className="text-slate-400 hover:text-primary uppercase tracking-widest border border-slate-700 px-4 py-2 hover:border-primary transition-colors">
          &lt;&lt; RETURN_TO_ROOT
        </Link>
      </div>
    );
  }

  return (
    <div className="font-mono max-w-4xl mx-auto py-10 animate-in fade-in duration-500">
      
      {/* Navigation Breadcrumb */}
      <div className="mb-8 md:mb-12 border-b border-dashed border-slate-800 pb-4 md:pb-6 flex justify-between items-center">
        <Link to="/modules" className="text-slate-500 hover:text-primary uppercase tracking-widest font-bold flex items-center gap-2 transition-colors text-xs">
          <span className="material-symbols-outlined text-sm">arrow_back</span> cd ..
        </Link>
        <span className="text-[10px] text-slate-600 uppercase tracking-widest hidden sm:block">PATH: /modules/{project.title.replace(/\s+/g, '-').toLowerCase()}.exe</span>
      </div>

      {/* Header Info */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-primary/10 flex items-center justify-center text-primary border border-primary/30">
            <span className="material-symbols-outlined text-[24px]">api</span>
          </div>
          <div>
             <span className="text-slate-500 text-[10px] tracking-widest uppercase block mb-1">
               PTR_0x{String(project.id).split('-')[0].toUpperCase()}
             </span>
             <span className="bg-[#050A15] text-primary border border-primary/30 px-2 py-1 text-[10px] font-bold uppercase tracking-widest">
               {project.demo_url ? 'PRODUCTION_READY' : 'STAGING_ENVIRONMENT'}
             </span>
          </div>
        </div>
        
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white uppercase leading-tight mb-6 md:mb-8">
          {project.title}
        </h1>

        {project.tags && (
          <div className="flex flex-wrap gap-3">
            {project.tags.split(',').map((tag, idx) => (
              <span key={idx} className="px-3 py-1 border border-slate-700 text-slate-400 text-xs font-bold uppercase tracking-widest bg-[#030610] shadow-[2px_2px_0_0_#334155]">
                {tag.trim()}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-10 md:mb-16 pb-8 md:pb-10 border-b border-slate-800">
         {project.demo_url && (
            <a href={ensureAbsoluteUrl(project.demo_url)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 px-5 py-3 md:px-8 md:py-4 bg-primary text-[#050A15] font-bold text-sm tracking-widest uppercase hover:bg-white transition-colors">
              [ LIVE_DEMO ] <span className="material-symbols-outlined text-sm animate-pulse">open_in_new</span>
            </a>
         )}
         {project.repo_url && (
            <a href={ensureAbsoluteUrl(project.repo_url)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 px-5 py-3 md:px-8 md:py-4 bg-[#030610] text-slate-300 border border-slate-700 font-bold text-sm tracking-widest uppercase hover:text-white hover:border-primary transition-colors">
              [ SOURCE_CODE ] <span className="material-symbols-outlined text-sm">integration_instructions</span>
            </a>
         )}
      </div>

      {/* Content Canvas */}
      <h3 className="text-slate-500 uppercase tracking-widest text-xs font-bold mb-6">MODULE_DESCRIPTION_PAYLOAD</h3>
      <article className="bg-[#030610] border border-slate-800 p-5 md:p-8 lg:p-12 relative group hover:border-primary/50 transition-colors">
        <div className="absolute top-0 left-0 w-1 h-full bg-slate-800 group-hover:bg-primary transition-colors"></div>
        
        <div className="whitespace-pre-wrap text-slate-300 leading-relaxed max-w-3xl">
          {project.description}
        </div>
      </article>

      {/* File Footer */}
      <div className="mt-16 flex items-center justify-between border-t border-dashed border-slate-800 pt-6">
        <div className="text-[10px] text-slate-500 tracking-widest uppercase">
          INIT_DATE: {new Date(project.created_at).toISOString().split('T')[0]}
        </div>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-primary hover:text-white transition-colors text-xs uppercase font-bold tracking-widest flex items-center gap-2">
          [ SCROLL_TO_TOP ] <span className="material-symbols-outlined text-sm">arrow_upward</span>
        </button>
      </div>
      
    </div>
  );
};

export default ProjectDetail;
