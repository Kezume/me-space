import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/projects`)
      .then(res => res.json())
      .then(data => {
        setProjects(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const ensureAbsoluteUrl = (url) => {
    if (!url) return '';
    return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
  };

  return (
    <section id="projects" className="font-mono">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-dashed border-slate-800 pb-6">
        <div className="max-w-xl">
          <span className="inline-block px-2 py-1 mb-4 bg-primary text-[#050A15] text-[10px] uppercase font-bold tracking-widest">
            // Case_Studies
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white uppercase leading-tight">
            Core Infrastructure Modules
          </h2>
        </div>
        <a className="text-primary text-xs border border-primary px-4 py-2 hover:bg-primary hover:text-[#050A15] transition-colors flex items-center gap-2 uppercase tracking-widest font-bold" href="https://github.com/Kezume" target="_blank" rel="noreferrer">
          [ EXPLORE_ALL_REPOS ]
        </a>
      </div>

      {loading ? (
        <div className="text-primary animate-pulse py-10 uppercase tracking-widest text-center">
           [ FETCHING_PROJECT_DATA... ]
        </div>
      ) : projects.length === 0 ? (
        <div className="text-slate-500 py-10 uppercase tracking-widest border border-dashed border-slate-800 text-center">
           NO_PROJECTS_FOUND
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {projects.slice(0, 3).map((p, i) => {
            const isLarge = (i % 3 === 0);
            return (
              <div key={p.id} className={`${isLarge ? 'md:col-span-2' : ''} bg-[#030610] border border-slate-800 p-8 flex flex-col justify-between group hover:border-primary transition-colors shadow-[${i%2===0 ? '-4px' : '4px'}_4px_0_0_transparent] hover:-translate-y-1 hover:shadow-[${i%2===0 ? '-4px' : '4px'}_4px_0_0_#4edea3]`}>
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary border border-slate-700 group-hover:border-primary/30 transition-colors">
                      <span className="material-symbols-outlined text-[24px]">api</span>
                    </div>
                    {p.tags && (
                       <div className="flex flex-wrap gap-2 justify-end">
                         {p.tags.split(',').map((tag, idx) => (
                           <span key={idx} className="px-2 py-1 bg-slate-800 text-slate-300 text-[10px] uppercase font-bold tracking-widest border border-slate-700">{tag.trim()}</span>
                         ))}
                       </div>
                    )}
                  </div>
                  <div>
                    <Link to={`/modules/${p.id}`}>
                      <h3 className={`${isLarge ? 'text-2xl' : 'text-xl'} font-bold mb-3 text-white uppercase group-hover:text-primary transition-colors line-clamp-2`}>
                        {p.title}
                      </h3>
                    </Link>
                    <p className="text-slate-400 max-w-lg text-sm leading-relaxed line-clamp-3">
                      {p.description}
                    </p>
                  </div>
                </div>
                <div className="pt-6 mt-8 border-t border-dashed border-slate-800 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 group-hover:text-primary transition-colors text-[10px] uppercase tracking-widest flex items-center gap-2 font-bold">
                      {p.repo_url ? '[ OPEN_SOURCE ]' : '[ PROPRIETARY ]'}
                    </span>
                    <Link to={`/modules/${p.id}`} className="text-slate-300 text-xs font-bold flex items-center gap-2 uppercase hover:text-primary transition-colors">
                      [ DETAILS ] <span className="material-symbols-outlined text-[14px]">arrow_right_alt</span>
                    </Link>
                  </div>
                  <div className="flex items-center gap-4 border-t border-slate-800/50 pt-4">
                    {p.demo_url && (
                      <a href={ensureAbsoluteUrl(p.demo_url)} target="_blank" rel="noreferrer" className="text-primary hover:text-white transition-colors text-xs uppercase tracking-widest flex items-center gap-1">
                        [Demo] <span className="material-symbols-outlined text-sm">open_in_new</span>
                      </a>
                    )}
                    {p.repo_url && (
                      <a href={ensureAbsoluteUrl(p.repo_url)} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-primary transition-colors text-xs uppercase tracking-widest flex items-center gap-1">
                        [Repo] <span className="material-symbols-outlined text-sm">arrow_outward</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          </div>
          {/* View All Button */}
          <div className="mt-10 flex justify-center">
            <Link to="/modules" className="flex items-center gap-3 px-8 py-4 border border-slate-700 text-slate-400 font-bold text-sm tracking-widest uppercase hover:border-primary hover:text-primary transition-colors">
              [ LOAD_ALL_MODULES ] <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default Projects;
