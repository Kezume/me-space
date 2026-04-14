import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [viewMode, setViewMode] = useState('list');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [data, setData] = useState({ blogs: [], projects: [], messages: [], skills: [] });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Custom confirm modal — no more ugly browser alerts
  const [confirmModal, setConfirmModal] = useState({ open: false, text: '', onConfirm: null });
  const showConfirm = (text, onConfirm) => setConfirmModal({ open: true, text, onConfirm });
  const closeConfirm = () => setConfirmModal({ open: false, text: '', onConfirm: null });

  // Forms
  const [blogForm, setBlogForm] = useState({ title: '', slug: '', tags: '', content: '' });
  const [projectForm, setProjectForm] = useState({ title: '', description: '', repo_url: '', tags: '', demo_url: '' });
  
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/sys/auth');
      return;
    }
    fetchData();
  }, [token, navigate]);

  const fetchData = async (silent = false) => {
    if (silent) setRefreshing(true);
    else setLoading(true);
    try {
      const [bRes, pRes, mRes, sRes] = await Promise.all([
        fetch(`${API_URL}/api/blogs`),
        fetch(`${API_URL}/api/projects`),
        fetch(`${API_URL}/api/admin/messages`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_URL}/api/skills`)
      ]);
      const blogs = await bRes.json();
      const projects = await pRes.json();
      const messages = await mRes.json();
      const skills = await sRes.json();
      
      setData({ 
        blogs: blogs || [], 
        projects: projects || [], 
        messages: messages || [],
        skills: skills || []
      });
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/admin/blogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(blogForm)
      });
      if (res.ok) {
        setBlogForm({ title: '', slug: '', tags: '', content: '' });
        setViewMode('list');
        fetchData();
      }
    } catch(err) { console.error(err); }
  };
  
  const handleDeleteBlog = (id) => {
    showConfirm('Hapus record blog ini? Tindakan ini tidak dapat dibatalkan.', async () => {
      try {
        await fetch(`${API_URL}/api/admin/blogs/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchData();
      } catch(err) { console.error(err); }
    });
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/admin/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(projectForm)
      });
      if (res.ok) {
        setProjectForm({ title: '', description: '', repo_url: '', tags: '', demo_url: '' });
        setViewMode('list');
        fetchData();
      }
    } catch(err) { console.error(err); }
  };

  const handleDeleteProject = (id) => {
    showConfirm('Hapus project ini? Tindakan ini tidak dapat dibatalkan.', async () => {
      try {
        await fetch(`${API_URL}/api/admin/projects/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchData();
      } catch(err) { console.error(err); }
    });
  };

  const [skillForm, setSkillForm] = useState({ category: '', name: '' });

  const handleCreateSkill = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/admin/skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(skillForm)
      });
      if (res.ok) {
        setSkillForm({ category: '', name: '' });
        fetchData();
      }
    } catch(err) { console.error(err); }
  };

  const handleDeleteSkill = (id) => {
    showConfirm('Hapus skill ini dari registry?', async () => {
      try {
        await fetch(`${API_URL}/api/admin/skills/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchData();
      } catch(err) { console.error(err); }
    });
  };

  const [cvStatus, setCvStatus] = useState(null); // null | 'uploading' | 'success' | 'error'
  const [cvError, setCvError] = useState('');

  const handleDeleteMessage = (id) => {
    showConfirm('Hapus pesan ini dari system logs? Tindakan ini tidak dapat dibatalkan.', async () => {
      try {
        await fetch(`${API_URL}/api/admin/messages/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchData();
      } catch(err) { console.error(err); }
    });
  };

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: 'space_dashboard' },
    { id: 'blogs', label: 'Blog Archive', icon: 'article' },
    { id: 'projects', label: 'Project Repos', icon: 'integration_instructions' },
    { id: 'skills', label: 'Skills / Tech', icon: 'code' },
    { id: 'messages', label: 'System Logs (Msg)', icon: 'mail' },
    { id: 'cv', label: 'CV / Resume', icon: 'description' },
  ];

  return (
    <div className="h-screen flex bg-[#050A15] text-white font-mono overflow-hidden">

      {/* Custom Confirm Modal */}
      {confirmModal.open && (
        <div className="fixed inset-0 bg-black/75 z-[100] flex items-center justify-center p-4">
          <div className="bg-[#030610] border border-red-500/50 p-8 max-w-sm w-full shadow-[0_0_60px_rgba(239,68,68,0.15)] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-red-400 text-lg">warning</span>
              <span className="text-red-400 text-[10px] font-bold uppercase tracking-widest">CONFIRM_ACTION</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-8">{confirmModal.text}</p>
            <div className="flex gap-3">
              <button
                onClick={() => { confirmModal.onConfirm(); closeConfirm(); }}
                className="flex-1 bg-red-500 text-white py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-red-400 transition-colors"
              >
                CONFIRM_DELETE
              </button>
              <button
                onClick={closeConfirm}
                className="flex-1 bg-slate-800 text-slate-300 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-slate-700 transition-colors border border-slate-700"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile overlay */}
      {mobileNavOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setMobileNavOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:relative z-50 md:z-auto inset-y-0 left-0 w-64 border-r border-slate-800 bg-[#030610] flex flex-col shrink-0 transition-transform duration-300
        ${mobileNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
         <div className="h-16 flex items-center px-6 border-b border-primary/30">
            <span className="text-primary font-bold tracking-widest flex items-center gap-2">
              <span className="animate-pulse">&gt;_</span> SYS_ADMIN
            </span>
         </div>
         
         <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
            {navigation.map(nav => (
              <button 
                key={nav.id} 
                onClick={() => { setActiveMenu(nav.id); setViewMode('list'); setMobileNavOpen(false); }}
                className={`flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-widest font-bold text-left transition-colors
                  ${activeMenu === nav.id 
                    ? 'bg-primary/10 text-primary border-l-2 border-primary' 
                    : 'text-slate-400 border-l-2 border-transparent hover:bg-slate-800 hover:text-white'}`}
              >
                <span className="material-symbols-outlined text-[18px]">{nav.icon}</span>
                {nav.label}
              </button>
            ))}
         </nav>
         
         <div className="p-4 border-t border-slate-800 space-y-2">
            <a
              href="/"
              className="w-full flex justify-center items-center gap-2 text-xs text-slate-400 hover:text-primary border border-slate-700 hover:border-primary/50 py-2 transition-colors uppercase tracking-widest font-bold"
            >
              <span className="material-symbols-outlined text-sm">home</span> View_Site
            </a>
            <button onClick={handleLogout} className="w-full flex justify-center items-center gap-2 text-xs text-slate-500 hover:text-red-400 py-2 transition-colors uppercase tracking-widest font-bold">
               <span className="material-symbols-outlined text-sm">power_settings_new</span> Terminate_Session
            </button>
         </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
         {/* Decorative Grid */}
         <div className="absolute inset-0 pointer-events-none opacity-5" style={{
            backgroundImage: `linear-gradient(rgba(78, 222, 163, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(78, 222, 163, 0.5) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
         }}></div>

         {/* Header */}
         <header className="h-14 md:h-16 border-b border-slate-800 flex items-center justify-between px-4 md:px-8 bg-[#050A15]/80 backdrop-blur z-10 shrink-0">
            <div className="flex items-center gap-3">
              {/* Mobile hamburger */}
              <button
                className="md:hidden text-slate-400 hover:text-primary transition-colors"
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
              <div className="text-xs text-slate-500 tracking-widest uppercase">
                root <span className="text-primary mx-1">/</span> <span className="hidden sm:inline">admin /</span> <span className="text-primary">{activeMenu}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
               <span className="text-[10px] text-slate-400 hidden sm:inline">CLUSTER_ONLINE</span>
            </div>
         </header>

         {/* Scrollable Content Area */}
         <div className="flex-1 overflow-y-auto p-4 md:p-8 z-10">
            {loading ? (
              <div className="flex items-center gap-3 text-primary uppercase text-sm font-bold animate-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                [ INIT_DATA_SEQUENCE... ]
              </div>
            ) : (
              <>
                {/* ---------------- DASHBOARD VIEW ---------------- */}
                {activeMenu === 'dashboard' && (
                  <div className="space-y-8 animate-in fade-in duration-500">
                    <h2 className="text-2xl font-bold uppercase tracking-widest">System_Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-[#030610] border border-slate-800 p-6 flex items-center justify-between shadow-[4px_4px_0_0_#4edea3]">
                         <div>
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Total_Blogs</p>
                            <p className="text-4xl text-white font-bold">{data.blogs.length}</p>
                         </div>
                         <span className="material-symbols-outlined text-4xl text-slate-700">article</span>
                      </div>
                      <div className="bg-[#030610] border border-slate-800 p-6 flex items-center justify-between hover:border-primary transition-colors">
                         <div>
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Total_Projects</p>
                            <p className="text-4xl text-white font-bold">{data.projects.length}</p>
                         </div>
                         <span className="material-symbols-outlined text-4xl text-slate-700">integration_instructions</span>
                      </div>
                      <div className="bg-[#030610] border border-slate-800 p-6 flex items-center justify-between hover:border-primary transition-colors">
                         <div>
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Inbox_Messages</p>
                            <p className="text-4xl text-white font-bold">{data.messages.length}</p>
                         </div>
                         <span className="material-symbols-outlined text-4xl text-slate-700">mail</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ---------------- BLOGS VIEW ---------------- */}
                {activeMenu === 'blogs' && viewMode === 'list' && (
                  <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#030610] p-4 border border-slate-800">
                       <h2 className="text-base md:text-lg font-bold uppercase tracking-widest flex items-center gap-2">
                         <span className="w-2 h-2 bg-primary"></span> Blog_Archive Registry
                       </h2>
                       <div className="flex gap-2 w-full sm:w-auto">
                         <button onClick={() => fetchData(true)} disabled={refreshing} className="flex items-center gap-1.5 border border-slate-600 hover:border-primary text-slate-400 hover:text-primary px-3 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors disabled:opacity-50">
                           <span className={`material-symbols-outlined text-[14px] ${refreshing ? 'animate-spin' : ''}`}>refresh</span> Sync
                         </button>
                         <button onClick={() => setViewMode('create_blog')} className="flex-1 sm:flex-none bg-primary text-[#050A15] px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                           + New_Record
                         </button>
                       </div>
                     </div>
                     
                     <div className="border border-slate-800 bg-[#030610] overflow-x-auto">
                       <table className="min-w-[600px] w-full text-left border-collapse">
                         <thead>
                           <tr className="border-b border-slate-800 bg-slate-900/50">
                             <th className="p-3 text-slate-500 text-[10px] font-bold uppercase tracking-widest w-16">ID</th>
                             <th className="p-3 text-slate-500 text-[10px] font-bold uppercase tracking-widest">TITLE</th>
                             <th className="p-3 text-slate-500 text-[10px] font-bold uppercase tracking-widest">TAGS</th>
                             <th className="p-3 text-slate-500 text-[10px] font-bold uppercase tracking-widest">DATE</th>
                             <th className="p-3 text-slate-500 text-[10px] font-bold uppercase tracking-widest text-right">ACTION</th>
                           </tr>
                         </thead>
                         <tbody>
                           {data.blogs.length === 0 && (
                             <tr><td colSpan="5" className="p-8 text-center text-slate-500 text-xs">NO_RECORDS_FOUND</td></tr>
                           )}
                           {data.blogs.map(b => (
                             <tr key={b.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors group">
                               <td className="p-3 text-slate-400 text-xs">0x{String(b.id).split('-')[0].toUpperCase()}</td>
                               <td className="p-3 text-white text-sm font-bold">{b.title}</td>
                               <td className="p-3 text-slate-400 text-xs">{b.tags}</td>
                               <td className="p-3 text-slate-500 text-xs">{new Date(b.created_at).toISOString().split('T')[0]}</td>
                               <td className="p-3 text-right">
                                 <button onClick={() => handleDeleteBlog(b.id)} className="text-red-500 hover:text-white hover:bg-red-500 border border-red-500/30 px-3 py-1 text-[10px] font-bold tracking-widest transition-colors">
                                   DEL
                                 </button>
                               </td>
                             </tr>
                           ))}
                         </tbody>
                       </table>
                     </div>
                  </div>
                )}

                {activeMenu === 'blogs' && viewMode === 'create_blog' && (
                  <div className="space-y-6 animate-in slide-in-from-left-4 duration-300 max-w-3xl">
                     <button onClick={() => setViewMode('list')} className="text-slate-500 hover:text-white text-xs uppercase tracking-widest font-bold flex items-center gap-2 mb-4">
                        &lt; Return_To_Registry
                     </button>
                     <div className="bg-[#030610] p-5 md:p-8 border border-slate-800 shadow-[-8px_8px_0_0_#4edea3]">
                       <h2 className="text-primary text-lg md:text-xl font-bold uppercase tracking-widest border-b border-primary/20 pb-4 mb-6">
                         Input_Blog_Payload
                       </h2>
                       <form onSubmit={handleCreateBlog} className="space-y-6">
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                           <div>
                             <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-2">TITLE</label>
                             <input required value={blogForm.title} onChange={e=>setBlogForm({...blogForm, title: e.target.value})} className="w-full bg-[#050A15] border border-slate-700 p-3 text-sm text-white outline-none focus:border-primary transition-colors" />
                           </div>
                           <div>
                             <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-2">SLUG / PATH</label>
                             <input required value={blogForm.slug} onChange={e=>setBlogForm({...blogForm, slug: e.target.value})} className="w-full bg-[#050A15] border border-slate-700 p-3 text-sm text-white outline-none focus:border-primary transition-colors" />
                           </div>
                         </div>
                         <div>
                           <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-2">TAGS (COMMA SEPARATED)</label>
                           <input value={blogForm.tags} onChange={e=>setBlogForm({...blogForm, tags: e.target.value})} className="w-full bg-[#050A15] border border-slate-700 p-3 text-sm text-white outline-none focus:border-primary transition-colors" placeholder="golang, aws, tutorial" />
                         </div>
                         <div>
                           <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-2">CONTENT_BLOB</label>
                           <textarea required rows="10" value={blogForm.content} onChange={e=>setBlogForm({...blogForm, content: e.target.value})} className="w-full bg-[#050A15] border border-slate-700 p-3 text-sm text-white outline-none focus:border-primary transition-colors resize-none"></textarea>
                         </div>
                         <button type="submit" className="bg-primary text-[#050A15] w-full py-4 font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors">
                           EXECUTE_INSERT
                         </button>
                       </form>
                     </div>
                  </div>
                )}

                {/* ---------------- PROJECTS VIEW ---------------- */}
                {activeMenu === 'projects' && viewMode === 'list' && (
                  <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
                     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#030610] p-4 border border-slate-800">
                       <h2 className="text-base md:text-lg font-bold uppercase tracking-widest flex items-center gap-2">
                         <span className="w-2 h-2 bg-primary"></span> Project_Modules
                       </h2>
                       <div className="flex gap-2 w-full sm:w-auto">
                         <button onClick={() => fetchData(true)} disabled={refreshing} className="flex items-center gap-1.5 border border-slate-600 hover:border-primary text-slate-400 hover:text-primary px-3 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors disabled:opacity-50">
                           <span className={`material-symbols-outlined text-[14px] ${refreshing ? 'animate-spin' : ''}`}>refresh</span> Sync
                         </button>
                         <button onClick={() => setViewMode('create_project')} className="flex-1 sm:flex-none bg-primary text-[#050A15] px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                           + New_Project
                         </button>
                       </div>
                     </div>
                     
                     <div className="border border-slate-800 bg-[#030610] overflow-x-auto">
                       <table className="min-w-[500px] w-full text-left border-collapse">
                         <thead>
                           <tr className="border-b border-slate-800 bg-slate-900/50">
                             <th className="p-3 text-slate-500 text-[10px] font-bold uppercase tracking-widest w-16">ID</th>
                             <th className="p-3 text-slate-500 text-[10px] font-bold uppercase tracking-widest">TITLE</th>
                             <th className="p-3 text-slate-500 text-[10px] font-bold uppercase tracking-widest">REPO</th>
                             <th className="p-3 text-slate-500 text-[10px] font-bold uppercase tracking-widest text-right">ACTION</th>
                           </tr>
                         </thead>
                         <tbody>
                           {data.projects.length === 0 && (
                             <tr><td colSpan="4" className="p-8 text-center text-slate-500 text-xs">NO_MODULES_DETECTED</td></tr>
                           )}
                           {data.projects.map(p => (
                             <tr key={p.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors group">
                               <td className="p-3 text-slate-400 text-xs">0x{String(p.id).split('-')[0].toUpperCase()}</td>
                               <td className="p-3 text-white text-sm font-bold">{p.title}</td>
                               <td className="p-3 text-slate-400 text-xs truncate max-w-[120px]">{p.repo_url || 'NONE'}</td>
                               <td className="p-3 text-right">
                                 <button onClick={() => handleDeleteProject(p.id)} className="text-red-500 hover:text-white hover:bg-red-500 border border-red-500/30 px-3 py-1 text-[10px] font-bold tracking-widest transition-colors">
                                   DEL
                                 </button>
                               </td>
                             </tr>
                           ))}
                         </tbody>
                       </table>
                     </div>
                  </div>
                )}

                {activeMenu === 'projects' && viewMode === 'create_project' && (
                  <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-300 max-w-3xl">
                     <button onClick={() => setViewMode('list')} className="text-slate-500 hover:text-white text-xs uppercase tracking-widest font-bold flex items-center gap-2 mb-4">
                        &lt; Cancel_Mount
                     </button>
                     <div className="bg-[#030610] p-5 md:p-8 border border-slate-800 shadow-[8px_8px_0_0_#4edea3]">
                       <h2 className="text-primary text-lg md:text-xl font-bold uppercase tracking-widest border-b border-primary/20 pb-4 mb-6">
                         Module_Configuration
                       </h2>
                       <form onSubmit={handleCreateProject} className="space-y-6">
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                           <div>
                             <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-2">MODULE TITLE</label>
                             <input required value={projectForm.title} onChange={e=>setProjectForm({...projectForm, title: e.target.value})} className="w-full bg-[#050A15] border border-slate-700 p-3 text-sm text-white outline-none focus:border-primary transition-colors" />
                           </div>
                           <div>
                             <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-2">GIT_REMOTE_URL</label>
                             <input value={projectForm.repo_url} onChange={e=>setProjectForm({...projectForm, repo_url: e.target.value})} className="w-full bg-[#050A15] border border-slate-700 p-3 text-sm text-white outline-none focus:border-primary transition-colors" />
                           </div>
                         </div>
                         <div className="grid grid-cols-2 gap-6">
                           <div>
                             <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-2">LIVE_DEMO_URL</label>
                             <input value={projectForm.demo_url} onChange={e=>setProjectForm({...projectForm, demo_url: e.target.value})} className="w-full bg-[#050A15] border border-slate-700 p-3 text-sm text-white outline-none focus:border-primary transition-colors" placeholder="https://" />
                           </div>
                           <div>
                             <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-2">TECH_STACK TAGS</label>
                             <input value={projectForm.tags} onChange={e=>setProjectForm({...projectForm, tags: e.target.value})} className="w-full bg-[#050A15] border border-slate-700 p-3 text-sm text-white outline-none focus:border-primary transition-colors" placeholder="Docker, Kubernetes, Go" />
                           </div>
                         </div>
                         <div>
                           <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-2">MODULE_DESCRIPTION</label>
                           <textarea required rows="6" value={projectForm.description} onChange={e=>setProjectForm({...projectForm, description: e.target.value})} className="w-full bg-[#050A15] border border-slate-700 p-3 text-sm text-white outline-none focus:border-primary transition-colors resize-none"></textarea>
                         </div>
                         <button type="submit" className="bg-primary text-[#050A15] w-full py-4 font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors">
                           ALLOCATE_AND_MOUNT
                         </button>
                       </form>
                     </div>
                  </div>
                )}

                {/* ---------------- MESSAGES VIEW ---------------- */}
                {activeMenu === 'messages' && (
                  <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
                     <div className="flex justify-between items-center bg-[#030610] p-4 border border-slate-800">
                       <h2 className="text-lg font-bold uppercase tracking-widest flex items-center gap-2 text-white">
                         <span className="material-symbols-outlined text-primary">mail</span> Communication_Logs
                         <span className="text-slate-600 text-xs font-normal">({data.messages.length})</span>
                       </h2>
                       <button onClick={() => fetchData(true)} disabled={refreshing} className="flex items-center gap-1.5 border border-slate-600 hover:border-primary text-slate-400 hover:text-primary px-3 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors disabled:opacity-50">
                         <span className={`material-symbols-outlined text-[14px] ${refreshing ? 'animate-spin' : ''}`}>refresh</span> Sync
                       </button>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.messages.length === 0 && (
                          <div className="col-span-full py-12 text-center text-slate-500 border border-dashed border-slate-800">NO_TRANSMISSIONS_INTERCEPTED</div>
                        )}
                        {data.messages.map(m => (
                          <div key={m.id} className="bg-[#030610] border border-slate-800 relative group overflow-hidden">
                             <div className="absolute top-0 left-0 w-1 h-full bg-slate-800 group-hover:bg-primary transition-colors"></div>
                             <div className="p-6">
                                <div className="flex justify-between items-start border-b border-slate-800 pb-4 mb-4">
                                   <div>
                                     <p className="text-white font-bold text-sm">{m.name}</p>
                                     <p className="text-slate-500 text-[10px] font-bold"><a href={`mailto:${m.email}`} className="hover:text-primary transition-colors">{m.email}</a></p>
                                   </div>
                                   <span className="text-[10px] text-slate-600 font-bold uppercase">
                                     {new Date(m.created_at).toISOString().split('T')[0]}
                                   </span>
                                </div>
                                <p className="text-slate-400 text-xs leading-relaxed font-sans mb-5">{m.message}</p>
                                <button
                                  onClick={() => handleDeleteMessage(m.id)}
                                  className="w-full text-red-500 hover:text-white hover:bg-red-500 border border-red-500/30 px-3 py-1.5 text-[10px] font-bold tracking-widest transition-colors flex items-center justify-center gap-1.5"
                                >
                                  <span className="material-symbols-outlined text-[14px]">delete</span> DEL_TRANSMISSION
                                </button>
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>
                )}

                {/* ---------------- SKILLS VIEW ---------------- */}
                {activeMenu === 'skills' && (
                  <div className="space-y-8 animate-in fade-in duration-300">
                    <div className="flex justify-between items-center bg-[#030610] p-4 border border-slate-800">
                      <h2 className="text-base font-bold uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary"></span> Skills_Registry
                      </h2>
                      <button onClick={() => fetchData(true)} disabled={refreshing} className="flex items-center gap-1.5 border border-slate-600 hover:border-primary text-slate-400 hover:text-primary px-3 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors disabled:opacity-50">
                        <span className={`material-symbols-outlined text-[14px] ${refreshing ? 'animate-spin' : ''}`}>refresh</span> Sync
                      </button>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Add Skill Form */}
                      <div className="bg-[#030610] p-8 border border-slate-800 shadow-[-8px_8px_0_0_#4edea3]">
                        <h2 className="text-primary text-lg font-bold uppercase tracking-widest border-b border-primary/20 pb-4 mb-6">
                          Add_Skill_Entry
                        </h2>
                        <form onSubmit={handleCreateSkill} className="space-y-4">
                          <div>
                            <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-2">CATEGORY</label>
                            <input required placeholder="e.g. BACKEND, FRONTEND, DATABASE" value={skillForm.category} onChange={e=>setSkillForm({...skillForm, category: e.target.value})} className="w-full bg-[#050A15] border border-slate-700 p-3 text-sm text-white outline-none focus:border-primary transition-colors" />
                          </div>
                          <div>
                            <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-2">SKILL NAME</label>
                            <input required placeholder="e.g. Golang, PostgreSQL, React" value={skillForm.name} onChange={e=>setSkillForm({...skillForm, name: e.target.value})} className="w-full bg-[#050A15] border border-slate-700 p-3 text-sm text-white outline-none focus:border-primary transition-colors" />
                          </div>
                          <button type="submit" className="bg-primary text-[#050A15] w-full py-3 font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors">
                            INJECT_SKILL
                          </button>
                        </form>
                      </div>

                      {/* Skills List grouped by category */}
                      <div className="bg-[#030610] border border-slate-800 overflow-hidden">
                        <div className="p-4 bg-slate-900/50 border-b border-slate-800">
                          <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">REGISTERED_SKILLS ({data.skills.length})</h3>
                        </div>
                        <div className="overflow-y-auto max-h-[400px]">
                          {data.skills.length === 0 ? (
                            <div className="p-8 text-center text-slate-600 text-xs uppercase tracking-widest">NO_SKILLS_REGISTERED</div>
                          ) : (
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="border-b border-slate-800">
                                  <th className="p-3 text-slate-500 text-[10px] uppercase tracking-widest">CATEGORY</th>
                                  <th className="p-3 text-slate-500 text-[10px] uppercase tracking-widest">SKILL</th>
                                  <th className="p-3 text-right"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.skills.map(s => (
                                  <tr key={s.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                                    <td className="p-3 text-primary text-[10px] font-bold uppercase tracking-widest">{s.category}</td>
                                    <td className="p-3 text-slate-300 text-sm">{s.name}</td>
                                    <td className="p-3 text-right">
                                      <button onClick={() => handleDeleteSkill(s.id)} className="text-red-500 hover:text-white hover:bg-red-500 border border-red-500/30 px-2 py-0.5 text-[10px] font-bold tracking-widest transition-colors">DEL</button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ---------------- CV VIEW ---------------- */}
                {activeMenu === 'cv' && (
                  <div className="space-y-8 animate-in fade-in duration-300 max-w-2xl">
                    <div className="bg-[#030610] p-8 border border-slate-800 shadow-[8px_8px_0_0_#4edea3]">
                      <h2 className="text-primary text-xl font-bold uppercase tracking-widest border-b border-primary/20 pb-4 mb-6 flex items-center gap-3">
                        <span className="material-symbols-outlined">description</span>
                        Upload_CV_Payload
                      </h2>
                      <p className="text-slate-400 text-xs mb-6 uppercase tracking-widest">Upload file PDF CV Anda. File lama akan otomatis diganti. Pengunjung dapat mengunduh via tombol [ DOWNLOAD_CV ] di halaman utama.</p>

                      {/* Status inline notification */}
                      {cvStatus === 'success' && (
                        <div className="mb-6 flex items-center gap-3 border border-primary/50 bg-primary/5 px-4 py-3 text-primary text-xs font-bold uppercase tracking-widest">
                          <span className="material-symbols-outlined text-sm">check_circle</span>
                          CV_UPLOADED_SUCCESSFULLY — Deployment complete.
                        </div>
                      )}
                      {cvStatus === 'error' && (
                        <div className="mb-6 flex items-center gap-3 border border-red-500/50 bg-red-500/5 px-4 py-3 text-red-400 text-xs font-bold uppercase tracking-widest">
                          <span className="material-symbols-outlined text-sm">error</span>
                          ERR_UPLOAD_FAILED — {cvError}
                        </div>
                      )}

                      <form onSubmit={async (e) => {
                        e.preventDefault();
                        const file = e.target.cv.files[0];
                        if (!file) return;
                        setCvStatus('uploading');
                        setCvError('');
                        const formData = new FormData();
                        formData.append('cv', file);
                        try {
                          const res = await fetch(`${API_URL}/api/admin/cv`, {
                            method: 'POST',
                            headers: { 'Authorization': `Bearer ${token}` },
                            body: formData
                          });
                          const data = await res.json();
                          if (res.ok) {
                            setCvStatus('success');
                            e.target.reset();
                            setTimeout(() => setCvStatus(null), 5000);
                          } else {
                            setCvStatus('error');
                            setCvError(data.error || 'Unknown error');
                          }
                        } catch(err) {
                          setCvStatus('error');
                          setCvError(err.message);
                        }
                      }} className="space-y-6">
                        <div>
                          <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-3">SELECT_FILE (.pdf only)</label>
                          <input name="cv" type="file" accept=".pdf" required
                            className="w-full bg-[#050A15] border border-slate-700 p-3 text-sm text-slate-300 outline-none focus:border-primary transition-colors file:mr-4 file:py-1 file:px-4 file:border file:border-primary/50 file:text-primary file:bg-primary/10 file:text-xs file:font-bold file:uppercase file:tracking-widest" />
                        </div>
                        <button
                          type="submit"
                          disabled={cvStatus === 'uploading'}
                          className="bg-primary text-[#050A15] w-full py-4 font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {cvStatus === 'uploading' ? (
                            <><span className="material-symbols-outlined text-sm animate-spin">progress_activity</span> UPLOADING...</>
                          ) : 'UPLOAD_AND_DEPLOY'}
                        </button>
                      </form>
                    </div>
                    <div className="bg-[#030610] border border-slate-800 p-6">
                      <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-3">Current Download Endpoint:</p>
                      <a href={`${API_URL}/api/cv`} target="_blank" rel="noreferrer" className="text-primary text-xs hover:underline">
                        {API_URL}/api/cv
                      </a>
                    </div>
                  </div>
                )}

              </>
            )}
         </div>
      </main>
    </div>
  );
};

export default AdminPanel;
