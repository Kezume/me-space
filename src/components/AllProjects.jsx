import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_URL}/api/projects`)
      .then(res => res.json())
      .then(data => { setProjects(data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const ensureAbsoluteUrl = (url) => {
    if (!url) return '';
    return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
  };

  return (
    <div className="font-mono py-4">
      {/* Breadcrumb */}
      <div className="mb-8 md:mb-12 border-b border-dashed border-slate-800 pb-4 md:pb-6 flex justify-between items-center">
        <Link to="/#projects" className="text-slate-500 hover:text-primary uppercase tracking-widest font-bold flex items-center gap-2 transition-colors text-xs">
          <span className="material-symbols-outlined text-sm">arrow_back</span> cd ..
        </Link>
        <span className="text-[10px] text-slate-600 uppercase tracking-widest hidden sm:block">PATH: /modules/all.index</span>
      </div>

      <div className="mb-8 md:mb-12">
        <span className="inline-block px-2 py-1 mb-4 bg-primary text-[#050A15] text-[10px] uppercase font-bold tracking-widest">
          // All_Modules
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white uppercase">All Projects</h1>
      </div>

      {loading ? (
        <div className="text-primary animate-pulse py-10 uppercase tracking-widest text-center">[ FETCHING_PROJECT_DATA... ]</div>
      ) : projects.length === 0 ? (
        <div className="text-slate-500 py-10 uppercase tracking-widest border border-dashed border-slate-800 text-center">NO_MODULES_DETECTED</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p.id} className="bg-[#030610] border border-slate-800 p-5 md:p-8 flex flex-col justify-between group hover:border-primary transition-colors">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary border border-slate-700 group-hover:border-primary/30 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">api</span>
                  </div>
                  {p.tags && (
                    <div className="flex flex-wrap gap-1 justify-end">
                      {p.tags.split(',').slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] uppercase font-bold tracking-widest border border-slate-700">{tag.trim()}</span>
                      ))}
                    </div>
                  )}
                </div>
                <Link to={`/modules/${p.id}`}>
                  <h3 className="text-lg font-bold text-white uppercase group-hover:text-primary transition-colors line-clamp-2">{p.title}</h3>
                </Link>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{p.description}</p>
              </div>
              <div className="pt-6 mt-6 border-t border-dashed border-slate-800 flex items-center justify-between">
                <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">
                  {p.repo_url ? '[ OPEN_SOURCE ]' : '[ PROPRIETARY ]'}
                </span>
                <div className="flex gap-3">
                  {p.demo_url && (
                    <a href={ensureAbsoluteUrl(p.demo_url)} target="_blank" rel="noreferrer" className="text-primary hover:text-white text-xs uppercase tracking-widest flex items-center gap-1 transition-colors">
                      [Demo] <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </a>
                  )}
                  {p.repo_url && (
                    <a href={ensureAbsoluteUrl(p.repo_url)} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-primary text-xs uppercase tracking-widest flex items-center gap-1 transition-colors">
                      [Repo] <span className="material-symbols-outlined text-sm">arrow_outward</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProjects;
