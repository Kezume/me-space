import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/blogs`)
      .then(res => res.json())
      .then(data => {
        setBlogs(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const latestBlog = blogs.length > 0 ? blogs[0] : null;
  const recentBlogs = blogs.slice(1, 4); // max 3 additional

  return (
    <section id="blog" className="font-mono">
      
      {/* Hero / Latest Article */}
      {latestBlog && (
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-slate-800 bg-[#030610] shadow-[8px_8px_0_0_#0f172a] hover:border-primary transition-colors duration-500">
            <div className="lg:col-span-7 p-6 md:p-8 lg:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-dashed border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-8">
                <span className="bg-primary text-[#050A15] px-2 py-1 text-[10px] font-bold uppercase tracking-widest">
                  [LATEST_RELEASE]
                </span>
                <span className="text-slate-500 text-[10px] tracking-widest uppercase">
                  {new Date(latestBlog.created_at).toISOString().split('T')[0]}
                </span>
              </div>
              
              <h3 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white leading-tight uppercase mb-6 hover:text-primary transition-colors cursor-pointer line-clamp-2">
                {latestBlog.title}
              </h3>
              
              <p className="text-slate-400 text-sm mb-10 max-w-xl leading-relaxed line-clamp-3">
                {latestBlog.content}
              </p>
              
              <div className="flex flex-wrap gap-3 mb-10">
                {latestBlog.tags && latestBlog.tags.split(',').map((tag, idx) => (
                  <span key={idx} className="px-2 py-1 border border-slate-700 text-slate-400 text-[10px] font-bold uppercase hover:bg-slate-800 transition-colors">{tag.trim()}</span>
                ))}
              </div>
              
              <div>
                <Link to={`/docs/${latestBlog.id}`} className="inline-flex items-center gap-3 px-6 py-4 border border-primary text-primary hover:bg-primary hover:text-[#050A15] font-bold text-sm tracking-widest uppercase transition-all">
                  <span>exec read_mem 0x{String(latestBlog.id).split('-')[0].toUpperCase()}</span>
                  <span className="material-symbols-outlined">arrow_right_alt</span>
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-5 bg-[#050A15] relative flex items-center justify-center p-8 lg:p-12">
              <div className="w-full h-full border border-slate-700 p-6 flex flex-col justify-center gap-6 relative group">
                <div className="absolute top-0 left-0 bg-slate-800 px-2 text-[10px] text-slate-400 -mt-2 ml-4">SYS_DUMP_VIEW</div>
                
                <div className="border border-dashed border-primary p-2 flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                   <span className="text-xs text-primary font-bold tracking-widest uppercase truncate">{latestBlog.slug}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Articles Grid Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-dashed border-slate-800 pb-4 gap-4">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white uppercase leading-tight">Tech_Docs</h2>
        </div>
        <div className="flex gap-6 font-mono text-xs font-bold uppercase tracking-widest text-slate-500">
           <span className="flex items-center gap-2"><span className="text-primary">[+]</span> PUBLISHED</span>
        </div>
      </div>

      {loading ? (
         <div className="text-primary animate-pulse py-10 uppercase tracking-widest text-center">
            [ FETCHING_DOCUMENTATION... ]
         </div>
      ) : blogs.length === 0 ? (
         <div className="text-slate-500 py-10 uppercase tracking-widest border border-dashed border-slate-800 text-center">
            NO_DOCUMENTATION_FOUND
         </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentBlogs.map((b) => (
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
                <h3 className="text-lg font-bold mb-4 text-white uppercase group-hover:text-primary transition-colors line-clamp-2">
                  {b.title}
                </h3>
                <p className="text-slate-400 text-xs mb-8 leading-relaxed line-clamp-3">
                  {b.content}
                </p>
                <div className="mt-auto pt-4 border-t border-dashed border-slate-800 flex items-center justify-between">
                  <Link to={`/docs/${b.id}`} className="text-slate-300 text-xs font-bold flex items-center gap-2 uppercase group-hover:text-primary transition-colors">
                    [ READ_MEMORY_BLOCK ]
                  </Link>
                  <span className="text-[10px] text-slate-600">PTR_0x{String(b.id).split('-')[0].toUpperCase()}</span>
                </div>
              </div>
            </article>
          ))}

          {/* Decorative Newsletter inside Grid */}
          <div className="bg-primary/5 border border-primary/30 p-6 flex flex-col text-center shadow-[4px_4px_0_0_#4edea3]">
            <div className="mb-4">
              <span className="text-primary text-2xl font-bold">@</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white uppercase">Weekly Dump</h3>
            <p className="text-slate-400 text-xs mb-6">Backend engineering patterns delivered to your root inbox.</p>
            <div className="mt-auto flex flex-col gap-2">
              <input className="bg-[#050A15] border border-primary/50 text-white text-xs px-3 py-2 outline-none focus:border-primary text-center" placeholder="USER@LOCALHOST" type="email"/>
              <button className="bg-primary text-[#050A15] font-bold text-xs px-3 py-2 uppercase hover:bg-white transition-colors">
                [ SUBSCRIBE ]
              </button>
            </div>
          </div>

        </div>
      )}

      {/* View All Blogs Button */}
      {blogs.length > 0 && (
        <div className="mt-12 flex justify-center">
          <Link
            to="/docs"
            className="inline-flex flex-wrap items-center justify-center gap-2 px-5 py-4 sm:px-8 border border-slate-700 text-slate-400 font-bold text-xs sm:text-sm tracking-widest uppercase hover:border-primary hover:text-primary transition-colors text-center"
          >
            <span>[ LOAD_ALL_DOCUMENTATION ]</span>
            <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
          </Link>
        </div>
      )}
    </section>
  );
};

export default Blog;
