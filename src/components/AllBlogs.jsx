import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_URL}/api/blogs`)
      .then(res => res.json())
      .then(data => { setBlogs(data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="font-mono py-4">
      {/* Breadcrumb */}
      <div className="mb-8 md:mb-12 border-b border-dashed border-slate-800 pb-4 md:pb-6 flex justify-between items-center">
        <Link to="/#blog" className="text-slate-500 hover:text-primary uppercase tracking-widest font-bold flex items-center gap-2 transition-colors text-xs">
          <span className="material-symbols-outlined text-sm">arrow_back</span> cd ..
        </Link>
        <span className="text-[10px] text-slate-600 uppercase tracking-widest hidden sm:block">PATH: /docs/all.index</span>
      </div>

      <div className="mb-8 md:mb-12">
        <span className="inline-block px-2 py-1 mb-4 bg-primary text-[#050A15] text-[10px] uppercase font-bold tracking-widest">
          // All_Documentation
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white uppercase">All Blogs</h1>
      </div>

      {loading ? (
        <div className="text-primary animate-pulse py-10 uppercase tracking-widest text-center">[ FETCHING_DOCUMENTATION... ]</div>
      ) : blogs.length === 0 ? (
        <div className="text-slate-500 py-10 uppercase tracking-widest border border-dashed border-slate-800 text-center">NO_DOCUMENTATION_FOUND</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((b) => (
            <article key={b.id} className="bg-[#030610] border border-slate-800 flex flex-col hover:border-primary transition-colors group">
              <div className="px-4 py-2 bg-slate-800/50 border-b border-slate-800 flex items-center gap-2">
                <span className="text-primary text-[10px]">&gt;</span>
                <span className="text-[10px] text-slate-400">{b.slug}.md</span>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  {b.tags && b.tags.split(',').map((tag, idx) => (
                    <span key={idx} className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">#{tag.trim()}</span>
                  ))}
                </div>
                <h3 className="text-lg font-bold mb-3 text-white uppercase group-hover:text-primary transition-colors line-clamp-2">
                  {b.title}
                </h3>
                <p className="text-slate-400 text-xs mb-6 leading-relaxed line-clamp-3">{b.content}</p>
                <div className="mt-auto pt-4 border-t border-dashed border-slate-800 flex items-center justify-between">
                  <Link to={`/docs/${b.id}`} className="text-slate-300 text-xs font-bold flex items-center gap-2 uppercase group-hover:text-primary transition-colors">
                    [ READ ]
                  </Link>
                  <span className="text-[10px] text-slate-600">
                    {new Date(b.created_at).toISOString().split('T')[0]}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
