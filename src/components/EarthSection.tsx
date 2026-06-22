import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Globe, Crosshair, RefreshCw } from "lucide-react";
import { EpicImage } from "../types";
import { StatsCard } from "./Shared";

export default function EarthSection() {
  const [data, setData] = useState<EpicImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEpic();
  }, []);

  const fetchEpic = async () => {
    setLoading(true);
    try {
      const resp = await fetch("/api/nasa/epic");
      const json = await resp.json();
      setData(json);
    } catch {
      setError("Earth telemetry link failed.");
    } finally {
      setLoading(false);
    }
  };

  const current = data[0];
  const dateFormatted = current?.date.split(" ")[0].replace(/-/g, "/");
  const imageUrl = current ? `https://epic.gsfc.nasa.gov/archive/natural/${dateFormatted}/png/${current.image}.png` : "";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-12">
        <div className="border border-white/5 bg-white/[0.02]">
          <div className="p-8 border-b border-white/5 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="status-pulse"></span>
                <span className="text-[10px] text-indigo-400 font-mono uppercase tracking-widest">DSCOVR LIVE</span>
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Polychromatic Camera</h2>
            </div>
            <button onClick={fetchEpic} className="p-4 bg-white/[0.05] hover:bg-white/[0.1] transition-colors">
                <RefreshCw className={`w-4 h-4 text-white/50 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="p-8">
            {loading ? (
              <div className="aspect-square bg-black flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-indigo-500/10 border-t-indigo-500 animate-spin" />
              </div>
            ) : current ? (
              <div className="space-y-8">
                <div className="aspect-square bg-black border border-white/10 flex items-center justify-center overflow-hidden">
                  <motion.img 
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    src={imageUrl} 
                    alt="Earth from Space" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-wrap gap-4">
                    <StatsCard label="Registry" value={current.identifier} />
                    <StatsCard label="Lat_Centroid" value={current.centroid_coordinates.lat.toFixed(4)} />
                    <StatsCard label="Lon_Centroid" value={current.centroid_coordinates.lon.toFixed(4)} />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="border border-white/5 bg-white/[0.02] p-10 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-10">
                <Globe className="w-6 h-6 text-indigo-400" />
                <h3 className="font-black text-white uppercase tracking-tighter text-lg">System_Log</h3>
            </div>

            <div className="space-y-8 flex-1">
                <p className="text-white/40 text-sm leading-tight font-medium">
                    Telemetry from the Deep Space Climate Observatory (DSCOVR) satellite mission. 
                    Captured by NASA's Earth Polychromatic Imaging Camera (EPIC) from a million miles away.
                </p>

                {current && (
                    <div className="p-8 border border-white/5 bg-white/[0.01] space-y-4">
                        <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Metadata_Dump</div>
                        <p className="text-xs text-white/60 leading-relaxed font-mono uppercase">
                            {current.caption}
                        </p>
                        <div className="pt-4 border-t border-white/5 text-[10px] text-white/20 font-bold uppercase tracking-widest">
                            Time: {current.date}
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-auto pt-10 border-t border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Crosshair className="w-3 h-3 text-indigo-400" />
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">L1 Point Locked</span>
                </div>
                <span className="text-[9px] font-mono text-indigo-400 animate-pulse">SYNC_OK</span>
            </div>
        </div>
      </div>
    </div>
  );
}
