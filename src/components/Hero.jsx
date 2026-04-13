import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

const Hero = () => {
  const [displayedLines, setDisplayedLines] = useState(0);

  const codeLines = [
    <div className="flex gap-4" key="l1"><span className="text-slate-600 select-none w-6 text-right">01</span><span className="text-primary">import</span><span className="text-slate-300"> {'{System}'} </span><span className="text-primary">from</span><span className="text-yellow-300">"@core/architect"</span></div>,
    <div className="flex gap-4" key="l2"><span className="text-slate-600 select-none w-6 text-right">02</span><span>&nbsp;</span></div>,
    <div className="flex gap-4" key="l3"><span className="text-slate-600 select-none w-6 text-right">03</span><span className="text-primary">const</span><span className="text-slate-300"> project = </span><span className="text-primary">new</span><span className="text-slate-300"> System({'{'}</span></div>,
    <div className="flex gap-4" key="l4"><span className="text-slate-600 select-none w-6 text-right">04</span><span className="text-slate-400">&nbsp;&nbsp;scale: </span><span className="text-yellow-300">"unlimited"</span><span className="text-slate-500">,</span></div>,
    <div className="flex gap-4" key="l5"><span className="text-slate-600 select-none w-6 text-right">05</span><span className="text-slate-400">&nbsp;&nbsp;integrity: </span><span className="text-yellow-300">"verified"</span><span className="text-slate-500">,</span></div>,
    <div className="flex gap-4" key="l6"><span className="text-slate-600 select-none w-6 text-right">06</span><span className="text-slate-400">&nbsp;&nbsp;latency: </span><span className="text-emerald-400">0.02ms</span></div>,
    <div className="flex gap-4" key="l7"><span className="text-slate-600 select-none w-6 text-right">07</span><span className="text-slate-300">{'}'});</span></div>,
    <div className="flex gap-4" key="l8"><span className="text-slate-600 select-none w-6 text-right">08</span><span>&nbsp;</span></div>,
    <div className="flex gap-4" key="l9"><span className="text-slate-600 select-none w-6 text-right">09</span><span className="text-slate-300">project</span><span className="text-slate-400">.deploy().then(() =&gt; {'{'}</span></div>,
    <div className="flex gap-4" key="l10"><span className="text-slate-600 select-none w-6 text-right">10</span><span className="text-slate-400">&nbsp;&nbsp;console.log(</span><span className="text-yellow-300">"System Online"</span><span className="text-slate-300">);</span></div>,
    <div className="flex gap-4" key="l11"><span className="text-slate-600 select-none w-6 text-right">11</span><span className="text-slate-300">{'}'});</span></div>,
  ];

  useEffect(() => {
    if (displayedLines < codeLines.length) {
      const t = setTimeout(() => setDisplayedLines(n => n + 1), 100);
      return () => clearTimeout(t);
    }
  }, [displayedLines, codeLines.length]);

  return (
    <section id="home" className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative min-h-[85vh] font-mono">

      {/* Left Content */}
      <div className="lg:col-span-7 space-y-6 lg:space-y-10 relative z-10 pt-4 lg:pt-10">

        <div className="inline-flex items-center gap-3 border border-primary/30 bg-primary/5 px-4 py-1">
          <span className="text-primary font-bold animate-pulse">&gt;</span>
          <span className="text-primary text-xs tracking-widest uppercase">SYS_ARCH // BACKEND_NODE</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tighter text-[#E2E8F0] uppercase">
          ROIHAN <br/>
          <span className="text-primary underline decoration-4 underline-offset-8">ARRAFLI</span>
        </h1>

        <p className="text-sm md:text-base lg:text-lg text-slate-400 max-w-xl leading-relaxed">
          Junior backend engineer specialized in building scalable, distributed logic and high-performance APIs. Bridging the gap between conceptual architecture and <span className="text-primary bg-primary/10 px-1">production-grade execution</span>.
        </p>

        <div className="flex flex-wrap gap-3 pt-2 text-sm font-bold uppercase tracking-widest">
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 md:px-8 md:py-4 bg-primary text-[#050A15] border-2 border-primary hover:bg-[#050A15] hover:text-primary transition-colors"
          >
            [ VIEW_PROJECTS ]
          </button>
          <a
            href={`${API_URL}/api/cv`}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 md:px-8 md:py-4 bg-transparent border-2 border-slate-600 text-slate-300 hover:border-slate-400 hover:text-white transition-colors"
          >
            [ DOWNLOAD_CV ]
          </a>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800">
          <div>
            <span className="block text-slate-600 uppercase mb-1 text-[10px]">Stack</span>
            <span className="text-slate-300 text-xs md:text-sm">Go / Node.js</span>
          </div>
          <div>
            <span className="block text-slate-600 uppercase mb-1 text-[10px]">Latency</span>
            <span className="text-slate-300 text-xs md:text-sm">&lt; 40ms</span>
          </div>
          <div>
            <span className="block text-slate-600 uppercase mb-1 text-[10px]">Level</span>
            <span className="text-slate-300 text-xs md:text-sm">L1 Eng</span>
          </div>
        </div>
      </div>

      {/* Right: Terminal — desktop only */}
      <div className="lg:col-span-5 relative z-10 w-full hidden lg:flex items-center justify-end">
        <div className="w-full max-w-lg bg-[#030610] border border-primary/30 shadow-[4px_4px_0_0_#4edea3]">
          <div className="flex items-center justify-between px-4 py-2 border-b border-primary/30 bg-primary/5">
            <span className="text-[10px] text-primary uppercase tracking-widest">root@roihan-arrafli:~</span>
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-slate-700"></div>
              <div className="w-3 h-3 bg-slate-700"></div>
              <div className="w-3 h-3 bg-primary"></div>
            </div>
          </div>
          <div className="p-6 md:p-8 text-[13px] leading-loose min-h-[380px]">
            <div className="space-y-1">
              <div className="text-slate-500 mb-4">$ ./engine_v1.sh</div>
              {codeLines.slice(0, displayedLines).map((line, i) => (
                <React.Fragment key={i}>{line}</React.Fragment>
              ))}
              {displayedLines < codeLines.length && (
                <div className="flex gap-4">
                  <span className="text-slate-600 select-none w-6 text-right">{(displayedLines + 1).toString().padStart(2, '0')}</span>
                  <span className="text-primary font-bold animate-pulse">_</span>
                </div>
              )}
            </div>
            {displayedLines === codeLines.length && (
              <div className="mt-8 pt-4 border-t border-dashed border-slate-800">
                <div className="text-primary flex items-center gap-2">
                  <span className="font-bold">[SUCCESS]</span>
                  <span className="text-slate-300">Environment: Production_Ready</span>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-primary">root@roihan-arrafli:~ $</span>
                  <span className="text-primary font-bold animate-pulse">_</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
