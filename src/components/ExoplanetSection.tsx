import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Telescope, Map, Navigation, Box } from "lucide-react";
import { Exoplanet } from "../types";

export default function ExoplanetSection() {
  const [data, setData] = useState<Exoplanet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExoplanets();
  }, []);

  const fetchExoplanets = async () => {
    try {
      const resp = await fetch("/api/nasa/exoplanets");
      const json = await resp.json();
      setData(json);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <div className="border border-white/5 bg-white/[0.02] p-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
                <Telescope className="w-4 h-4 text-indigo-400" />
                <span className="text-[10px] text-indigo-400 font-mono uppercase tracking-widest">Discovery Registry 2024</span>
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Deep Space Exoplanets</h2>
          </div>
          <div className="p-4 border border-white/5 bg-indigo-500/5 flex items-center gap-4">
            <Navigation className="w-5 h-5 text-indigo-400" />
            <div className="text-[10px] font-black text-white uppercase tracking-widest">Archive Link: ACTIVE</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-white/[0.02] border border-white/5 animate-pulse" />
            ))
          ) : data.map((planet, i) => (
            <motion.div
              key={planet.pl_name}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="p-8 border border-white/5 bg-white/[0.01] hover:border-indigo-500/30 transition-all flex flex-col group cursor-crosshair"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 border border-white/10 flex items-center justify-center bg-black">
                   <Box className="w-6 h-6 text-white/20 group-hover:text-indigo-400 transition-colors" />
                </div>
                <div className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">{planet.disc_year} discovery</div>
              </div>

              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2 group-hover:text-indigo-400 transition-colors">
                {planet.pl_name}
              </h3>
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-10 flex items-center gap-2">
                <span className="w-1 h-1 bg-indigo-500 rounded-full"></span>
                System: {planet.hostname}
              </div>

              <div className="mt-auto space-y-4 pt-8 border-t border-white/5">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-white/30">
                   <span>Orbital Period</span>
                   <span className="text-white font-mono">{planet.pl_orbper?.toFixed(2) || "N/A"} DAYS</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-white/30">
                   <span>Metodology</span>
                   <span className="text-indigo-400">{planet.discoverymethod}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-10 border border-white/5 bg-white/[0.01] flex items-center justify-between">
              <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">Catalogue Sync</h4>
                  <p className="text-[10px] font-mono text-white/30 uppercase">NASA Exoplanet Archive (IPAC)</p>
              </div>
              <div className="flex items-center gap-4">
                  <div className="w-32 h-1 bg-white/5 overflow-hidden">
                      <div className="w-full h-full bg-indigo-500 origin-left animate-pulse"></div>
                  </div>
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Locked</span>
              </div>
          </div>
          <button className="p-10 bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-indigo-400 transition-colors text-center">
              ACCESS_FULL_ARCHIVE.DB
          </button>
      </div>
    </div>
  );
}
