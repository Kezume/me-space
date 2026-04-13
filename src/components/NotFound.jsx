import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="font-mono flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      {/* Error Code */}
      <div className="mb-8">
        <div className="text-[120px] md:text-[180px] font-bold text-slate-800 leading-none select-none">
          404
        </div>
        <div className="text-red-500 border border-red-500/30 bg-red-500/5 px-4 py-2 text-xs uppercase tracking-widest font-bold -mt-6 inline-block">
          ERR_PAGE_NOT_FOUND
        </div>
      </div>

      {/* Terminal Output */}
      <div className="w-full max-w-lg bg-[#030610] border border-slate-800 p-6 text-left mb-10 shadow-[8px_8px_0_0_#1e293b]">
        <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-slate-500 text-[10px] ml-2 uppercase tracking-widest">sys_shell — bash</span>
        </div>
        <div className="space-y-2 text-xs">
          <p className="text-slate-400"><span className="text-primary">root@server</span>:~$ cat /var/log/access.log | tail -1</p>
          <p className="text-slate-500">[{new Date().toISOString()}] GET /this-page HTTP/1.1 <span className="text-red-400">404</span></p>
          <p className="text-slate-400 mt-4"><span className="text-primary">root@server</span>:~$ ls ./pages/</p>
          <p className="text-primary">/ &nbsp; /docs &nbsp; /modules &nbsp; /sys/auth</p>
          <p className="text-slate-400 mt-4"><span className="text-primary">root@server</span>:~$ <span className="animate-pulse">_</span></p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link to="/" className="flex items-center gap-2 px-8 py-4 bg-primary text-[#050A15] font-bold text-sm tracking-widest uppercase hover:bg-white transition-colors">
          <span className="material-symbols-outlined text-sm">home</span>
          [ RETURN_TO_ROOT ]
        </Link>
        <Link to="/modules" className="flex items-center gap-2 px-8 py-4 border border-slate-700 text-slate-300 font-bold text-sm tracking-widest uppercase hover:border-primary hover:text-primary transition-colors">
          [ VIEW_MODULES ]
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
