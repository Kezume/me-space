import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('adminToken', data.token);
        navigate('/sys/panel');
      } else {
        setError(data.error || 'Authentication Failed');
      }
    } catch (err) {
      setError('Connection to auth server failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#050A15] flex items-center justify-center font-mono p-4">
      <div className="w-full max-w-md bg-[#030610] border border-primary/30 shadow-[4px_4px_0_0_#4edea3]">
        <div className="flex items-center justify-between px-4 py-2 border-b border-primary/30 bg-primary/5">
          <span className="text-[10px] text-primary uppercase tracking-widest">root@auth_server:~</span>
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-red-400"></div>
            <div className="w-3 h-3 bg-yellow-400"></div>
            <div className="w-3 h-3 bg-primary"></div>
          </div>
        </div>
        
        <div className="p-8 pb-10">
          <div className="text-primary mb-6 animate-pulse">
            [ SECURE LOGIN NODE ]
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
               <label className="block text-slate-500 text-xs mb-2 uppercase tracking-widest">ENTER_PASSPHRASE</label>
               <input 
                 type="password" 
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full bg-[#050A15] border border-slate-700 focus:border-primary text-white p-3 outline-none"
                 autoFocus
               />
            </div>
            
            {error && <div className="text-red-500 text-xs uppercase tracking-widest bg-red-500/10 border border-red-500/30 p-2">{error}</div>}
            
            <button type="submit" className="w-full border border-primary text-primary hover:bg-primary hover:text-[#050A15] py-3 uppercase tracking-widest font-bold transition-colors">
              EXECUTE_AUTH
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
