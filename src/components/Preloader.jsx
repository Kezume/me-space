import React, { useState, useEffect } from 'react';

const Preloader = () => {
  const [logs, setLogs] = useState([]);
  
  const bootSequence = [
    "BIOS CHECKING RAM... 64GB OK",
    "LOADING MACAN KERNEL V2.4.0...",
    "ESTABLISHING DATABASE CONNECTION... [OK]",
    "FETCHING ROOT NODE DATA... [OK]",
    "MOUNTING REACT DOM... [PENDING]",
    "INITIALIZING SYSTEM STYLES... [OK]",
    "STARTING USER INTERFACE...",
    "SYSTEM READY."
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < bootSequence.length) {
        setLogs(prev => [...prev, bootSequence[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 250); // 250ms per line

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-[#050A15] flex flex-col items-center justify-center font-mono">
      {/* Visual Glitch Branding */}
      <div className="text-center mb-12">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-primary text-5xl md:text-7xl font-bold font-mono animate-pulse">&gt;_</span>
          <div className="text-left">
            <div className="text-slate-500 text-[10px] uppercase tracking-[0.4em] font-bold">root@sys ~ %</div>
            <div className="text-white text-xl md:text-3xl font-bold uppercase tracking-widest">./portfolio.exe</div>
          </div>
        </div>
        <p className="text-primary text-xs uppercase tracking-[0.3em] font-bold animate-pulse mt-2">
          Initializing Virtual Interface...
        </p>
      </div>
      
      {/* Boot Logs */}
      <div className="w-full max-w-xl bg-[#030610] border border-slate-800 p-6 h-64 overflow-hidden relative shadow-[8px_8px_0_0_#4edea3]">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary animate-pulse"></div>
        <div className="flex flex-col gap-2 text-xs uppercase tracking-widest">
           {logs.map((log, i) => (
             <div key={i} className="flex gap-4">
               <span className="text-slate-500">[{(i * 0.134).toFixed(3)}]</span>
               <span className={i === bootSequence.length - 1 ? "text-primary font-bold" : "text-slate-300"}>{log}</span>
             </div>
           ))}
           {/* Blinking Cursor */}
           {logs.length < bootSequence.length && (
             <div className="w-3 h-4 bg-primary animate-ping mt-1"></div>
           )}
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full max-w-xl h-1 bg-slate-800 mt-6 relative overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-primary transition-all duration-[2400ms] ease-out"
          style={{ width: logs.length === bootSequence.length ? '100%' : `${(logs.length / bootSequence.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Preloader;
