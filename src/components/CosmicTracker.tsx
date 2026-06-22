import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MapPin, Users, Zap, AlertTriangle, Crosshair, ArrowRight } from "lucide-react";
import { IssPosition, CrewData, NeoData, NeoObject } from "../types";
import { StatsCard } from "./Shared";

export default function CosmicTracker() {
  const [iss, setIss] = useState<IssPosition | null>(null);
  const [crew, setCrew] = useState<CrewData | null>(null);
  const [neo, setNeo] = useState<NeoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchIss, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchIss(), fetchCrew(), fetchNeo()]);
    setLoading(false);
  };

  const fetchIss = async () => {
    try {
      const resp = await fetch('https://api.open-notify.org/iss-now.json');
      setIss(await resp.json());
    } catch {}
  };

  const fetchCrew = async () => {
    try {
      const resp = await fetch('https://api.open-notify.org/astros.json');
      setCrew(await resp.json());
    } catch {}
  };

  const fetchNeo = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const apiKey = "DEMO_KEY";
      const resp = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${apiKey}`);
      setNeo(await resp.json());
    } catch {}
  };

  if (loading) return <div className="animate-pulse space-y-8"><div className="h-48 bg-slate-900 rounded-[32px]" /><div className="h-64 bg-slate-900 rounded-[32px]" /></div>;

  const neoList = (Object.values(neo?.near_earth_objects || {}).flat() as NeoObject[]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
      {/* ISS TRACKER */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="border border-white/5 bg-white/[0.02] p-10 flex flex-col h-full">
          <div className="flex justify-between items-center mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="status-pulse" />
                <span className="text-[10px] text-indigo-400 font-mono uppercase tracking-widest">Live Signal Active</span>
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                Orbital Beacon
              </h2>
            </div>
            <div className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-1 text-white/30">ISS.01</div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="border border-white/5 bg-white/[0.01] p-6">
              <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-1">LATITUDE</div>
              <div className="text-3xl font-black text-white leading-none">{iss?.iss_position.latitude}°</div>
            </div>
            <div className="border border-white/5 bg-white/[0.01] p-6">
              <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-1">LONGITUDE</div>
              <div className="text-3xl font-black text-white leading-none">{iss?.iss_position.longitude}°</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-6 border border-white/5 bg-indigo-500/5 group hover:border-indigo-500/30 transition-colors">
              <div className="flex items-center gap-4">
                <Users className="w-5 h-5 text-indigo-400" />
                <span className="text-xs font-black uppercase tracking-widest text-white">Active Registry</span>
              </div>
              <span className="text-3xl font-black text-white">{crew?.number}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {crew?.people.slice(0, 4).map((p, i) => (
                <div key={i} className="flex items-center gap-4 p-5 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
                  <div className="w-10 h-10 border border-indigo-500/30 bg-indigo-500/5 flex items-center justify-center text-indigo-400 font-black text-xs">
                    {p.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-black text-white uppercase tracking-tight truncate w-32">{p.name}</div>
                    <div className="text-[9px] font-mono text-white/20 uppercase tracking-widest">{p.craft}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* NEO ASTEROIDS */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="border border-white/5 bg-white/[0.02] p-10 flex flex-col h-full">
          <div className="flex justify-between items-center mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                <span className="text-[10px] text-red-400/60 font-mono uppercase tracking-widest">Impact Sensors Scanning</span>
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                Proximity Audit
              </h2>
            </div>
            <div className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-1 text-white/30">NEO.B</div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-10">
            <div className="p-4 border border-white/5 text-center">
              <div className="text-[9px] text-white/20 uppercase tracking-widest font-bold mb-1">SCANNING</div>
              <div className="text-xl font-black text-white leading-none">{neo?.element_count}</div>
            </div>
            <div className="p-4 border border-white/5 text-center bg-red-500/5 border-red-500/20">
              <div className="text-[9px] text-red-400/50 uppercase tracking-widest font-bold mb-1">CRITICAL</div>
              <div className="text-xl font-black text-red-500 leading-none">
                {neoList.filter(o => o.is_potentially_hazardous_asteroid).length}
              </div>
            </div>
            <div className="p-4 border border-white/5 text-center bg-indigo-500/5">
              <div className="text-[9px] text-indigo-400/50 uppercase tracking-widest font-bold mb-1">STATUS</div>
              <div className="text-xs font-black text-white leading-none">ACTIVE</div>
            </div>
          </div>

          <div className="space-y-4 overflow-y-auto max-h-[300px] pr-4 no-scrollbar">
            {neoList.slice(0, 5).map((ast, i) => (
              <div key={i} className="group p-6 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-indigo-500/20 transition-all">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <Crosshair className="w-4 h-4 text-indigo-400" />
                    <span className="font-black text-white text-xs uppercase tracking-widest">{ast.name.replace(/[()]/g, '')}</span>
                  </div>
                  {ast.is_potentially_hazardous_asteroid && (
                    <span className="text-[8px] font-black text-red-500 border border-red-500/30 px-2 py-0.5 uppercase tracking-widest">Hazardous</span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-8 text-[9px] font-bold uppercase tracking-widest">
                  <div className="text-white/20">
                    DIAMETER / <span className="text-white font-mono">{Math.round(ast.estimated_diameter.meters.estimated_diameter_max)}M</span>
                  </div>
                  <div className="text-white/20">
                    MISS_DIST / <span className="text-white font-mono">{Math.round(Number(ast.close_approach_data[0].miss_distance.kilometers)).toLocaleString()} KM</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-10 py-5 bg-white text-black font-black uppercase text-xs tracking-[0.2em] transition-colors hover:bg-indigo-400 shadow-xl">
            INITIALIZE_FULL_SCAN.
          </button>
        </div>
      </motion.div>
    </div>
  );
}
