import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Activity, Zap, Shield, AlertCircle } from "lucide-react";
import { SolarEvent } from "../types";

export default function SolarMonitor() {
  const [data, setData] = useState<SolarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSolar();
  }, []);

  const fetchSolar = async () => {
    try {
      const resp = await fetch("/api/nasa/donki");
      const json = await resp.json();
      setData(json.slice(0, 10));
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-12">
        <div className="border border-white/5 bg-white/[0.02] p-10">
          <div className="flex justify-between items-center mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-red-500 animate-pulse rounded-full"></span>
                <span className="text-[10px] text-red-400 font-mono uppercase tracking-[0.3em]">Direct Solar Observation</span>
              </div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">CME Telemetry Log</h2>
            </div>
            <div className="p-4 border border-white/5 bg-white/[0.01] flex items-center gap-4">
              <Zap className="w-5 h-5 text-indigo-400" />
              <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">Active Monitoring</div>
            </div>
          </div>

          <div className="space-y-4">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <div key={i} className="h-24 bg-white/[0.02] border border-white/5 animate-pulse" />
              ))
            ) : data.length > 0 ? (
              data.map((event) => (
                <motion.div 
                  key={event.activityID}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 border border-white/5 bg-black hover:bg-white/[0.02] transition-all group"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="text-[10px] font-mono text-indigo-400 mb-1 uppercase tracking-widest">{event.activityID}</div>
                      <div className="text-lg font-black text-white uppercase">{new Date(event.startTime).toLocaleString()}</div>
                    </div>
                    <div className="px-3 py-1 border border-white/10 text-[8px] font-black text-white/30 uppercase tracking-[0.2em]">
                      {event.instruments[0]?.displayName || "Unknown Instrument"}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-3">
                      <Activity className="w-4 h-4 text-white/20" />
                      <div>
                        <div className="text-[8px] font-bold text-white/30 uppercase">Status</div>
                        <div className="text-xs font-black text-indigo-400 uppercase">Detection Confirmed</div>
                      </div>
                    </div>
                    {event.cmeAnalyses?.[0] && (
                      <>
                        <div className="flex items-center gap-3 border-l border-white/5 pl-6">
                          <Zap className="w-4 h-4 text-white/20" />
                          <div>
                            <div className="text-[8px] font-bold text-white/30 uppercase">Velocity</div>
                            <div className="text-xs font-black text-white uppercase">{event.cmeAnalyses[0].speed} KM/S</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 border-l border-white/5 pl-6">
                          <Shield className="w-4 h-4 text-white/20" />
                          <div>
                            <div className="text-[8px] font-bold text-white/30 uppercase">Classification</div>
                            <div className="text-xs font-black text-white uppercase">TYPE_{event.cmeAnalyses[0].type}</div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-[10px] text-white/30 leading-relaxed font-medium uppercase tracking-wider">
                      {event.note.split(' (')[0]}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
                <div className="p-20 text-center border border-white/5 bg-white/[0.01]">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Null Solar Activity Detected</span>
                </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="border border-white/5 bg-white/[0.02] p-10 flex flex-col">
            <div className="flex items-center gap-3 mb-10">
                <AlertCircle className="w-6 h-6 text-red-500" />
                <h3 className="font-black text-white uppercase tracking-tighter text-lg">Solar_Alerts</h3>
            </div>

            <div className="space-y-10 flex-1">
                <div className="p-8 border border-red-500/10 bg-red-500/[0.02]">
                    <div className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-4">Shield_Protocol</div>
                    <p className="text-sm text-white/40 leading-tight font-medium">
                        Coronal Mass Ejections (CMEs) are large expulsions of plasma and magnetic field from the Sun's corona. 
                        Tracking helps protect satellite nodes and terrestrial power grids.
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="text-[10px] font-black text-white/20 uppercase tracking-widest">Global Status</div>
                    <div className="flex justify-between items-center py-4 border-b border-white/5">
                        <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Magnetic Field</span>
                        <span className="text-xs font-black text-green-500 uppercase">STABLE</span>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-white/5">
                        <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Proton Flux</span>
                        <span className="text-xs font-black text-indigo-400 uppercase">NOMINAL</span>
                    </div>
                    <div className="flex justify-between items-center py-4">
                        <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Radio Blackout</span>
                        <span className="text-xs font-black text-white/20 uppercase">NONE</span>
                    </div>
                </div>
            </div>

            <button className="mt-12 w-full py-5 bg-white text-black font-black uppercase text-xs tracking-[0.2em] hover:bg-red-500 transition-colors">
                EMERGENCY_DUMP.PDF
            </button>
        </div>
      </div>
    </div>
  );
}
