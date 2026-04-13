import React, { useState, useEffect } from 'react';
import { API_URL } from '../config';

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/skills`)
      .then(res => res.json())
      .then(data => setSkills(data || []))
      .catch(() => {});
  }, []);

  // Auto-group skills by category
  const grouped = skills.reduce((acc, skill) => {
    const cat = skill.category.toUpperCase();
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill.name);
    return acc;
  }, {});

  const categories = Object.entries(grouped);

  return (
    <section id="skills" className="font-mono">
      {/* Section Header */}
      <div className="mb-12 border-b border-dashed border-slate-800 pb-6">
        <span className="inline-block px-2 py-1 mb-4 bg-primary text-[#050A15] text-[10px] uppercase font-bold tracking-widest">
          // Tech_Stack
        </span>
        <div className="flex justify-between items-end gap-6">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white uppercase leading-tight">
            System Capabilities
          </h2>
          <span className="text-slate-600 text-xs uppercase tracking-widest hidden md:block">
            kernel: backend_node v2.4
          </span>
        </div>
      </div>

      {/* Tech Grid - dynamic */}
      {categories.length === 0 ? (
        <div className="text-slate-700 text-xs uppercase tracking-widest text-center border border-dashed border-slate-800 py-10">
          NO_SKILLS_CONFIGURED — Add skills via Admin Panel
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(([category, items], i) => (
            <div key={i} className="bg-[#030610] border border-slate-800 p-6 group hover:border-primary transition-colors">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                <div className="w-2 h-2 bg-primary"></div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">
                  {category}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((item, j) => (
                  <span
                    key={j}
                    className="px-3 py-1.5 border border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-widest bg-[#050A15] group-hover:border-slate-600 transition-colors hover:bg-primary/10 hover:text-primary hover:border-primary/50 cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Skills;
