import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_URL } from '../config';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    
    fetch(`${API_URL}/api/blogs/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Document not found");
        return res.json();
      })
      .then(data => {
        setBlog(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-primary uppercase font-mono tracking-widest animate-pulse">
        [ ALLOCATING_MEMORY_BUFFER 0x{String(id).split('-')[0].toUpperCase()}... ]
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] space-y-6 font-mono">
        <div className="text-red-500 uppercase tracking-widest bg-red-500/10 border border-red-500/30 p-4">ERR_FILE_NOT_FOUND: {error}</div>
        <Link to="/" className="text-slate-400 hover:text-primary uppercase tracking-widest border border-slate-700 px-4 py-2 hover:border-primary transition-colors">
          &lt;&lt; RETURN_TO_ROOT
        </Link>
      </div>
    );
  }

  return (
    <div className="font-mono max-w-4xl mx-auto py-10 animate-in fade-in duration-500">
      
      {/* Navigation Breadcrumb */}
      <div className="mb-12 border-b border-dashed border-slate-800 pb-6 flex justify-between items-end">
        <Link to="/docs" className="text-slate-500 hover:text-primary uppercase tracking-widest font-bold flex items-center gap-2 transition-colors text-xs">
          <span className="material-symbols-outlined text-sm">arrow_back</span> cd ..
        </Link>
        <span className="text-[10px] text-slate-600 uppercase tracking-widest">PATH: /blogs/{blog.slug}.md</span>
      </div>

      {/* Header Info */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <span className="bg-primary text-[#050A15] px-2 py-1 text-[10px] font-bold uppercase tracking-widest">
            PTR_0x{String(blog.id).split('-')[0].toUpperCase()}
          </span>
          <span className="text-slate-500 text-xs tracking-widest uppercase">
            {new Date(blog.created_at).toISOString().split('T')[0]}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white uppercase leading-tight mb-8">
          {blog.title}
        </h1>

        {blog.tags && (
          <div className="flex flex-wrap gap-3">
            {blog.tags.split(',').map((tag, idx) => (
              <span key={idx} className="px-3 py-1 border border-slate-700 text-slate-400 text-xs font-bold uppercase tracking-widest bg-[#030610] shadow-[2px_2px_0_0_#334155]">
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content Canvas */}
      <article className="bg-[#030610] border border-slate-800 p-8 md:p-12 shadow-[-8px_8px_0_0_#0f172a] relative group hover:border-primary/50 transition-colors">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-50"></div>
        
        <div className="prose prose-invert prose-slate max-w-none prose-p:leading-relaxed prose-p:text-slate-300 prose-headings:text-white prose-headings:uppercase prose-a:text-primary prose-a:no-underline hover:prose-a:underline focus:outline-none whitespace-pre-wrap">
          {blog.content}
        </div>
      </article>

      {/* File Footer */}
      <div className="mt-16 flex items-center justify-between border-t border-dashed border-slate-800 pt-6">
        <div className="text-[10px] text-slate-500 tracking-widest uppercase">
          EOF_REACHED
        </div>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-primary hover:text-white transition-colors text-xs uppercase font-bold tracking-widest flex items-center gap-2">
          [ SCROLL_TO_TOP ] <span className="material-symbols-outlined text-sm">arrow_upward</span>
        </button>
      </div>
      
    </div>
  );
};

export default BlogDetail;
