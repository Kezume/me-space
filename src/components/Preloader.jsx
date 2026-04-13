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
    "SYSTEM READY.",
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
    }, 250);
    return () => clearInterval(interval);
  }, []);

  const progress = bootSequence.length > 0
    ? Math.round((logs.length / bootSequence.length) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-[100] bg-[#050A15] flex flex-col items-center justify-center font-mono px-4">

      {/* Branding */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-primary text-4xl md:text-6xl font-bold animate-pulse">&gt;_</span>
          <div className="text-left">
            <div className="text-slate-500 text-[10px] uppercase tracking-widest">root@sys ~ %</div>
            <div className="text-white text-lg md:text-2xl font-bold uppercase tracking-widest">./portfolio.exe</div>
          </div>
        </div>
        <p className="text-primary text-[10px] uppercase tracking-widest animate-pulse mt-1">
          Initializing Virtual Interface...
        </p>
      </div>

      {/* Boot Log Box */}
      <div className="w-full max-w-lg bg-[#030610] border border-slate-800 relative shadow-[4px_4px_0_0_#4edea3]">
        {/* Terminal bar */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-800 bg-slate-900/50">
          <div className="w-2.5 h-2.5 bg-red-500/50 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-yellow-500/50 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-primary/50 rounded-full"></div>
          <span className="text-slate-600 text-[10px] ml-2 uppercase tracking-widest">boot.log</span>
        </div>

        {/* Left accent bar */}
        <div className="absolute top-9 left-0 w-0.5 h-[calc(100%-2.25rem)] bg-primary animate-pulse"></div>

        {/* Log content */}
        <div className="p-4 h-40 md:h-52 overflow-hidden">
          <div className="flex flex-col gap-1.5">
            {logs.map((log, i) => (
              <div key={i} className="flex gap-2 items-start min-w-0">
                <span className="text-slate-600 text-[10px] shrink-0 pt-0.5">
                  [{(i * 0.134).toFixed(2)}s]
                </span>
                <span className={`text-[11px] leading-tight break-words min-w-0 ${i === bootSequence.length - 1 ? 'text-primary font-bold' : 'text-slate-300'}`}>
                  {log}
                </span>
              </div>
            ))}
            {logs.length < bootSequence.length && (
              <div className="w-2 h-3.5 bg-primary animate-ping mt-0.5"></div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-lg mt-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-slate-600 text-[10px] uppercase tracking-widest">Loading...</span>
          <span className="text-primary text-[10px] font-bold">{progress}%</span>
        </div>
        <div className="h-0.5 bg-slate-800 w-full relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-primary transition-all duration-[2400ms] ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

    </div>
  );
};

export default Preloader;
