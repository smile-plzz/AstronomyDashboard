import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Moon, Calendar, Eye, Compass } from 'lucide-react';

const getMoonPhase = (date: Date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 3) {
    year--;
    month += 12;
  }

  const c = 365.25 * year;
  const e = 30.6 * month;
  const jd = c + e + day - 694039.09; // Julian Day
  const b = jd / 29.53059; // Lunar cycle
  const phase = b - Math.floor(b); // Fraction of current cycle

  let phaseName = "";
  if (phase < 0.03) phaseName = "New Moon";
  else if (phase < 0.22) phaseName = "Waxing Crescent";
  else if (phase < 0.28) phaseName = "First Quarter";
  else if (phase < 0.47) phaseName = "Waxing Gibbous";
  else if (phase < 0.53) phaseName = "Full Moon";
  else if (phase < 0.72) phaseName = "Waning Gibbous";
  else if (phase < 0.78) phaseName = "Last Quarter";
  else phaseName = "Waning Crescent";

  return {
    phase,
    name: phaseName,
    illumination: Math.round(100 * (1 - Math.cos(phase * 2 * Math.PI)) / 2)
  };
};

const UPCOMING_EVENTS = [
  { id: 1, title: 'Perseid Meteor Shower', date: '2026-08-12', detail: 'Peak visibility at 02:00 UTC' },
  { id: 2, title: 'Total Solar Eclipse', date: '2026-08-12', detail: 'Path through Spain and Iceland' },
  { id: 3, title: 'Saturn at Opposition', date: '2026-09-21', detail: 'Prime ring inspection opportunity' },
  { id: 4, title: 'NASA Mars Sample Return', date: '2026-10-15', detail: 'Mission briefing status Alpha' },
];

export const Observatory = () => {
  const [lunar, setLunar] = useState(getMoonPhase(new Date()));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border border-white/5 bg-white/[0.02] p-10 flex flex-col"
      >
        <div className="flex justify-between items-start mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
              <span className="text-[10px] text-indigo-400 font-mono uppercase tracking-widest">Lunar Sensor Node</span>
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Moon Phase Analysis</h2>
          </div>
          <Moon className="w-8 h-8 text-white/10" />
        </div>

        <div className="flex flex-col items-center justify-center py-12 border-y border-white/5 mb-10">
          <div className="relative w-48 h-48 mb-8">
            <div className="absolute inset-0 rounded-full bg-white opacity-5 blur-2xl"></div>
            <div 
              className="w-full h-full rounded-full border border-white/10 shadow-[inset_0_0_50px_rgba(255,255,255,0.05)] flex items-center justify-center relative overflow-hidden"
            >
              {/* Simple moon phase visual representation */}
              <div 
                className="absolute inset-0 bg-white/20 transition-all duration-700"
                style={{
                  clipPath: lunar.phase < 0.5 
                    ? `inset(0 0 0 ${100 - lunar.illumination}%)` 
                    : `inset(0 ${100 - lunar.illumination}% 0 0)`
                }}
              />
              <div className="text-[10px] font-black text-white uppercase tracking-widest z-10">{lunar.illumination}%</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-white uppercase tracking-widest mb-1">{lunar.name}</div>
            <div className="text-[10px] font-mono text-indigo-500 uppercase tracking-[0.3em]">Cycle Progress: {(lunar.phase * 100).toFixed(1)}%</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 border border-white/5 text-center">
            <div className="text-[8px] text-white/30 uppercase font-bold mb-1">Gravity</div>
            <div className="text-xs font-black text-white">1.622 m/s²</div>
          </div>
          <div className="p-4 border border-white/5 text-center">
            <div className="text-[8px] text-white/30 uppercase font-bold mb-1">Distance</div>
            <div className="text-xs font-black text-white">384,400 KM</div>
          </div>
          <div className="p-4 border border-white/5 text-center">
            <div className="text-[8px] text-white/30 uppercase font-bold mb-1">Sync</div>
            <div className="text-xs font-black text-indigo-400">LOGGED</div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="border border-white/5 bg-white/[0.02] p-10 flex flex-col"
      >
        <div className="flex justify-between items-start mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Compass className="w-4 h-4 text-white/30" />
              <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest">Temporal Log</span>
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Observatory Calendar</h2>
          </div>
        </div>

        <div className="space-y-4 flex-1">
          {UPCOMING_EVENTS.map(event => (
            <div key={event.id} className="p-6 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group">
              <div className="flex justify-between items-center mb-4">
                <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{event.date}</div>
                <Calendar className="w-3 h-3 text-white/20 group-hover:text-indigo-500 transition-colors" />
              </div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2">{event.title}</h3>
              <p className="text-[10px] text-white/40 font-medium uppercase tracking-wider">{event.detail}</p>
            </div>
          ))}
        </div>

        <button className="w-full mt-10 py-5 bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-indigo-400 transition-colors">
          EXPORT_EVENTS.XML
        </button>
      </motion.div>
    </div>
  );
};
