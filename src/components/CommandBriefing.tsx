import React from 'react';
import { motion } from 'motion/react';
import { Terminal, Newspaper, ArrowUpRight, ShieldCheck } from 'lucide-react';

const NEWS_MOCK = [
  { id: 1, title: 'NASA Perseverance rover finds new rock clues in ancient river delta', source: 'NASA JPL', date: '2026-06-20', tags: ['MARS', 'GEOLOGY'] },
  { id: 2, title: 'James Webb detects atmosphere around rocky exoplanet 55 Cancri e', source: 'ESA/NASA', date: '2026-06-18', tags: ['DEEP SPACE', 'JWST'] },
  { id: 3, title: 'Voyager 1 resumes normal engineering data transmission', source: 'DSN', date: '2026-06-15', tags: ['DEEP SPACE', 'VOYAGER'] },
  { id: 4, title: 'Commercial lunar lander mission prepares for Shackleton Crater touchdown', source: 'SpaceX/NASA', date: '2026-06-12', tags: ['LUNAR', 'ARTEMIS'] },
  { id: 5, title: 'Solar Cycle 25 reaches peak: Increased auroral activity expected', source: 'NOAA', date: '2026-06-10', tags: ['SOLAR', 'EARTH'] },
];

export const CommandBriefing = () => {
  return (
    <div className="space-y-12">
      <div className="border border-white/5 bg-white/[0.02] p-10">
        <div className="flex items-center gap-4 mb-8">
          <Terminal className="w-6 h-6 text-indigo-400" />
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Command Briefing</h2>
          <div className="ml-auto flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <span className="text-[10px] text-green-500 font-black uppercase tracking-[0.2em]">Secure Feed</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEWS_MOCK.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="border border-white/5 bg-white/[0.01] p-8 hover:bg-white/[0.03] hover:border-indigo-500/30 transition-all flex flex-col group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">{item.date}</span>
                <Newspaper className="w-4 h-4 text-white/10 group-hover:text-indigo-400 transition-colors" />
              </div>
              
              <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6 leading-tight group-hover:text-indigo-400 transition-colors">
                {item.title}
              </h3>

              <div className="mt-auto space-y-4">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-[8px] font-black border border-white/10 px-2 py-0.5 text-white/40 uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
                <div className="pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-bold text-white/20 uppercase tracking-widest">
                  <span>Source: {item.source}</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Signal Quality', value: '100%', color: 'text-green-500' },
          { label: 'Neural Link', value: 'ACTIVE', color: 'text-indigo-400' },
          { label: 'Archive Depth', value: '4PB', color: 'text-white' },
          { label: 'Node Count', value: '128', color: 'text-white' },
        ].map((stat, i) => (
          <div key={i} className="p-6 border border-white/5 bg-white/[0.01] flex flex-col items-center gap-1">
            <span className="text-[8px] font-bold text-white/30 uppercase tracking-[0.3em]">{stat.label}</span>
            <span className={`text-xl font-black uppercase ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
