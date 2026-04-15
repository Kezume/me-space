import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_URL } from '../config';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    // Check share support
    setCanNativeShare(!!navigator.share);

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

  const getShareUrl = () => window.location.href;

  const shareToWhatsApp = () => {
    const text = `🛠️ Project: ${project.title}\n\n${getShareUrl()}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareToTwitter = () => {
    const text = `Check out this project: ${project.title}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(getShareUrl())}`, '_blank');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = getShareUrl();
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.title,
          url: getShareUrl(),
        });
      } catch { }
    }
  };

  const btnBase = "flex items-center justify-center gap-2 px-3 py-2.5 border text-[10px] font-bold uppercase tracking-widest transition-all duration-200 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none";

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
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Share Toolbar */}
      <div className="mb-10 border border-slate-800 bg-[#030610] p-4 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-primary/60 via-primary/20 to-transparent"></div>
        <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-sm text-primary/60">share</span>
          SHARE_MODULE &gt;
        </div>
        <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3">
          <button onClick={shareToWhatsApp} className={`${btnBase} border-slate-700 bg-[#030610] text-slate-400 hover:text-green-400 hover:border-green-500/60 hover:bg-green-500/10`}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            <span className="text-[9px] sm:text-[10px]">WhatsApp</span>
          </button>
          <button onClick={shareToTwitter} className={`${btnBase} border-slate-700 bg-[#030610] text-slate-400 hover:text-white hover:border-slate-500/60 hover:bg-slate-500/10`}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            <span className="text-[9px] sm:text-[10px]">Twitter</span>
          </button>
          <button onClick={copyLink} className={`${btnBase} ${copied ? 'border-primary/60 bg-primary/10 text-primary shadow-[2px_2px_0_0_rgba(78,222,163,0.3)]' : 'border-slate-700 bg-[#030610] text-slate-400 hover:text-primary hover:border-primary/60 hover:bg-primary/10'}`}>
            <span className="material-symbols-outlined text-base">{copied ? 'check' : 'content_copy'}</span>
            <span className="text-[9px] sm:text-[10px]">{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </div>
        {canNativeShare && (
          <button onClick={nativeShare} className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-primary/40 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest hover:bg-primary/15 transition-all">
            <span className="material-symbols-outlined text-sm">ios_share</span> SHARE_OTHER_APPS
          </button>
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
