import React, { useState } from 'react';
import { API_URL } from '../config';

const Contact = () => {
  const [focusedField, setFocusedField] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState('IDLE'); // IDLE, SENDING, SUCCESS, ERROR
  const [validationError, setValidationError] = useState(null); // null or string message

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
    // Clear validation error when user starts typing
    if (validationError) setValidationError(null);
  };

  const getMissingFields = () => {
    const missing = [];
    if (!formData.name) missing.push('name');
    if (!formData.email) missing.push('email');
    if (!formData.message) missing.push('message');
    return missing;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const missing = getMissingFields();
    if (missing.length > 0) {
      setValidationError(`ERR_EMPTY_FIELD: [${missing.join(', ').toUpperCase()}] required`);
      setTimeout(() => setValidationError(null), 4000);
      return;
    }

    setStatus('SENDING');
    
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStatus('SUCCESS');
        setFormData({ name: '', email: '', message: '' });
        
        // Reset after 3 seconds
        setTimeout(() => setStatus('IDLE'), 3000);
      } else {
        setStatus('ERROR');
        console.error("Transmission Error:", data.error);
        setTimeout(() => setStatus('IDLE'), 3000);
      }
    } catch (error) {
       setStatus('ERROR');
       console.error("Network Error:", error);
       setTimeout(() => setStatus('IDLE'), 3000);
    }
  };

  const isFieldMissing = (fieldName) => {
    if (!validationError) return false;
    return !formData[fieldName];
  };

  return (
    <section id="contact" className="relative py-8 md:py-10 font-mono">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        {/* Left Side: Copy & Info */}
        <div className="lg:col-span-5 space-y-10">
          <header className="border-l-4 border-primary pl-6">
            <div className="text-primary text-xs uppercase tracking-[0.2em] font-bold mb-4">
              &gt;&gt; SECURE_CHANNEL_OPEN
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white uppercase leading-tight mb-6">
              ESTABLISH <br/> <span className="bg-primary text-[#050A15] px-2 py-1 inline-block mt-2">CONNECTION.</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Ready to architect your next system or discuss backend optimization strategies? Reach out through the secure terminal below.
            </p>
          </header>
          
          {/* Technical Metadata Labels */}
          <div className="space-y-4">
            <div className="flex border-b border-dashed border-slate-800 pb-2">
              <span className="w-40 text-[10px] text-slate-500 uppercase font-bold">LATENCY_PROTOCOL</span>
              <span className="text-xs text-primary font-bold">RESP_EXP &lt; 24H</span>
            </div>
            <div className="flex border-b border-dashed border-slate-800 pb-2">
              <span className="w-40 text-[10px] text-slate-500 uppercase font-bold">ENCRYPTION</span>
              <span className="text-xs text-primary font-bold">TLS 1.3 / AES-256</span>
            </div>
            <div className="flex border-b border-dashed border-slate-800 pb-2">
              <span className="w-40 text-[10px] text-slate-500 uppercase font-bold">ROUTING</span>
              <span className="text-xs text-primary font-bold">DIRECT_TO_DEV</span>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex gap-4 pt-4">
             <a className="text-xs text-slate-400 hover:text-primary transition-colors uppercase font-bold tracking-widest border border-slate-700 hover:border-primary px-4 py-2" href="https://www.linkedin.com/in/roihanarrafli" target="_blank" rel="noreferrer">
              [ LINKEDIN ]
             </a>
             <a className="text-xs text-slate-400 hover:text-primary transition-colors uppercase font-bold tracking-widest border border-slate-700 hover:border-primary px-4 py-2" href="https://github.com/Kezume" target="_blank" rel="noreferrer">
              [ GITHUB ]
             </a>
          </div>
        </div>

        {/* Right Side: Contact Form Container */}
        <div className="lg:col-span-7 bg-[#030610] border border-slate-800 p-6 md:p-8 lg:p-12 shadow-[-8px_8px_0_0_#4edea3]">
          <div className="text-primary text-xs uppercase tracking-widest mb-8 border-b border-primary/20 pb-4 flex justify-between">
             <span>root@roihan-arrafli:~/mail_client $</span>
             {status === 'SENDING' && <span className="text-yellow-400 animate-pulse">TRANSMITTING...</span>}
             {status === 'SUCCESS' && <span className="text-primary">OK</span>}
             {status === 'ERROR' && <span className="text-red-500">ERR_CONNECTION</span>}
          </div>

          {/* Inline Validation Error Banner */}
          {validationError && (
            <div className="bg-red-500/10 border border-red-500/50 px-4 py-3 mb-2 flex items-center gap-3 animate-pulse">
              <span className="text-red-500 text-xs font-bold tracking-widest">⚠ {validationError}</span>
            </div>
          )}

          <form action="#" className="space-y-6" onSubmit={handleSubmit}>
            {/* Input Field: Name */}
            <div className="group">
              <label className={`block text-[10px] font-bold tracking-widest uppercase mb-1 ${isFieldMissing('name') ? 'text-red-500' : focusedField === 'name' ? 'text-primary' : 'text-slate-500'}`} htmlFor="name">
                <span className="opacity-50">&gt;</span> Source_Identity
              </label>
              <input 
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                onChange={handleChange}
                value={formData.name}
                disabled={status === 'SENDING'}
                className={`w-full bg-[#050A15] border px-4 py-3 text-white text-sm placeholder:text-slate-700 outline-none transition-colors disabled:opacity-50 ${isFieldMissing('name') ? 'border-red-500' : 'border-slate-700 focus:border-primary'}`}
                id="name" name="name" placeholder="Who is sending?" type="text"
              />
            </div>
            
            {/* Input Field: Email */}
            <div className="group">
              <label className={`block text-[10px] font-bold tracking-widest uppercase mb-1 ${isFieldMissing('email') ? 'text-red-500' : focusedField === 'email' ? 'text-primary' : 'text-slate-500'}`} htmlFor="email">
                <span className="opacity-50">&gt;</span> Return_Address
              </label>
              <input 
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                onChange={handleChange}
                value={formData.email}
                disabled={status === 'SENDING'}
                className={`w-full bg-[#050A15] border px-4 py-3 text-white text-sm placeholder:text-slate-700 outline-none transition-colors disabled:opacity-50 ${isFieldMissing('email') ? 'border-red-500' : 'border-slate-700 focus:border-primary'}`}
                id="email" name="email" placeholder="user@provider.com" type="email"
              />
            </div>
            
            {/* Input Field: Message */}
            <div className="group">
              <label className={`block text-[10px] font-bold tracking-widest uppercase mb-1 ${isFieldMissing('message') ? 'text-red-500' : focusedField === 'message' ? 'text-primary' : 'text-slate-500'}`} htmlFor="message">
                <span className="opacity-50">&gt;</span> Transmission_Payload
              </label>
              <textarea 
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                onChange={handleChange}
                value={formData.message}
                disabled={status === 'SENDING'}
                className={`w-full bg-[#050A15] border px-4 py-3 text-white text-sm placeholder:text-slate-700 outline-none transition-colors resize-none disabled:opacity-50 ${isFieldMissing('message') ? 'border-red-500' : 'border-slate-700 focus:border-primary'}`}
                id="message" name="message" placeholder="Input string payload..." rows="4"
              ></textarea>
            </div>
            
            {/* Submit Button */}
            <div className="pt-4">
              <button 
                disabled={status === 'SENDING' || status === 'SUCCESS'}
                className={`w-full py-4 font-bold tracking-widest uppercase flex justify-center items-center gap-2 transition-colors
                  ${status === 'SUCCESS' ? 'bg-emerald-500 text-white' : 
                    status === 'ERROR' ? 'bg-red-500 text-white' : 
                    'bg-primary text-[#050A15] hover:bg-white hover:text-black'}`
                } 
                type="submit"
              >
                 {status === 'SUCCESS' ? '[ TRANSMISSION_SUCCESS ]' : 
                  status === 'ERROR' ? '[ TRANSMISSION_FAILED ]' : 
                  status === 'SENDING' ? '[ EXECUTING... ]' : '[ EXECUTE_SEND ]'}
              </button>
            </div>
          </form>
          
          {/* Form Footer Branding */}
          <div className="mt-8 pt-4 border-t border-dashed border-slate-800 flex justify-between items-center text-[10px] text-slate-600">
             <span>SYS_READY</span>
             <span className="text-primary animate-pulse">_</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
