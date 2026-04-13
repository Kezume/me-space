import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-24 relative font-mono">
      
      {/* Decorative large background text */}
      <div className="absolute top-10 right-0 text-[#E2E8F0]/[0.02] font-black text-[120px] md:text-[200px] leading-none select-none pointer-events-none uppercase tracking-tighter">
        SYSTEMS
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        
        {/* Left Side: Philosophy */}
        <div className="space-y-8 p-8 border border-primary/20 bg-[#030610] shadow-[-4px_4px_0_0_#4edea3]">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-primary font-bold">&gt;&gt;</span>
            <span className="text-primary text-xs uppercase tracking-[0.2em] font-semibold">THE_PHILOSOPHY</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white uppercase">
            BUILT FOR <br/>
            <span className="bg-primary text-[#050A15] px-2 py-1 inline-block mt-2">RELIABILITY.</span>
          </h2>
          
          <p className="text-slate-400 text-sm md:text-base leading-relaxed mt-6">
            My approach focuses on the <span className="text-white border-b border-primary border-dashed font-bold">"unseen"</span> parts of the application. While others focus on the pixels, I focus on the transactions, the memory allocation, and the load balancing.
          </p>
          
          <div className="space-y-4 pt-6 border-t border-dashed border-slate-800">
            <div className="flex items-center gap-4 group">
              <span className="text-primary">[+]</span>
              <span className="text-sm tracking-widest text-slate-300 group-hover:text-primary transition-colors uppercase">Type-Safe Architectures</span>
            </div>
            
            <div className="flex items-center gap-4 group">
              <span className="text-primary">[+]</span>
              <span className="text-sm tracking-widest text-slate-300 group-hover:text-primary transition-colors uppercase">Test-Driven Logic Blocks</span>
            </div>
            
            <div className="flex items-center gap-4 group">
              <span className="text-primary">[+]</span>
              <span className="text-sm tracking-widest text-slate-300 group-hover:text-primary transition-colors uppercase">Optimized Query Execution</span>
            </div>
          </div>
        </div>

        {/* Right Side: Metrics Dashboard */}
        <div className="bg-[#030610] p-8 border border-slate-800 relative shadow-[4px_4px_0_0_#334155]">
          
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-dashed border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary animate-pulse"></div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active System Metrics</span>
            </div>
          </div>
          
          <div className="space-y-8">
            {/* Metric 1 */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 uppercase">API THROUGHPUT</span>
                <span className="text-primary font-bold">98%</span>
              </div>
              <div className="h-4 bg-[#050A15] border border-slate-800 p-0.5">
                <div className="h-full bg-primary w-[98%] config-striped-bg"></div>
              </div>
            </div>
            
            {/* Metric 2 */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 uppercase">RESOURCE EFFICIENCY</span>
                <span className="text-yellow-400 font-bold">84%</span>
              </div>
              <div className="h-4 bg-[#050A15] border border-slate-800 p-0.5">
                <div className="h-full bg-yellow-400 w-[84%] config-striped-bg"></div>
              </div>
            </div>
            
            {/* Metric 3 */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 uppercase">CACHE HIT RATE</span>
                <span className="text-blue-400 font-bold">92%</span>
              </div>
              <div className="h-4 bg-[#050A15] border border-slate-800 p-0.5">
                <div className="h-full bg-blue-400 w-[92%] config-striped-bg"></div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      <style>{`
        .config-striped-bg {
          background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);
          background-size: 1rem 1rem;
        }
      `}</style>
    </section>
  );
};

export default About;
