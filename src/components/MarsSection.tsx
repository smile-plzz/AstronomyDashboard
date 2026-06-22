import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Satellite, RefreshCcw, Box } from "lucide-react";
import { MarsRoverData, MarsPhoto } from "../types";
import { StatsCard } from "./Shared";

const ROVERS = [
  { id: 'curiosity', label: 'Curiosity', cameras: ['FHAZ', 'RHAZ', 'MAST', 'CHEMCAM', 'MAHLI', 'MARDI', 'NAVCAM'] },
  { id: 'perseverance', label: 'Perseverance', cameras: ['EDL_RUCAM', 'EDL_RDCAM', 'EDL_DDCAM', 'EDL_PUCAM', 'NAVCAM_LEFT', 'NAVCAM_RIGHT', 'MCZ_LEFT', 'MCZ_RIGHT', 'FRONT_HAZCAM_LEFT_A', 'FRONT_HAZCAM_RIGHT_A', 'REAR_HAZCAM_LEFT', 'REAR_HAZCAM_RIGHT', 'SKYCAM', 'SHERLOC_WATSON'] },
  { id: 'opportunity', label: 'Opportunity', cameras: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES'] },
];

export default function MarsSection() {
  const [photos, setPhotos] = useState<MarsPhoto[]>([]);
  const [rover, setRover] = useState('curiosity');
  const [camera, setCamera] = useState('');
  const [sol, setSol] = useState(1000);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<MarsPhoto | null>(null);

  useEffect(() => {
    fetchPhotos();
  }, [rover, sol, camera]);

  const fetchPhotos = async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch(`/api/nasa/mars-rover?rover=${rover}&sol=${sol}${camera ? `&camera=${camera}` : ''}`);
      const data: MarsRoverData = await resp.json();
      if (!data.photos || data.photos.length === 0) {
        setError(`No evidence found for ${rover} on sol ${sol}. The planet is quiet today.`);
        setPhotos([]);
      } else {
        setPhotos(data.photos.slice(0, 24));
      }
    } catch (err) {
      setError("Communication link with Mars is unstable.");
    } finally {
      setLoading(false);
    }
  };

  const activeRover = ROVERS.find(r => r.id === rover);

  return (
    <div className="space-y-8">
      <div className="border border-white/5 bg-white/[0.02] p-8">
        <div className="flex flex-wrap items-end gap-10">
          <div className="space-y-4 grow">
            <div className="flex items-center gap-2">
              <span className="status-pulse"></span>
              <label className="text-[10px] text-white/40 font-black tracking-widest uppercase ml-2">Target Platform</label>
            </div>
            <div className="flex gap-2">
              {ROVERS.map(r => (
                <button
                  key={r.id}
                  onClick={() => { setRover(r.id); setCamera(''); }}
                  className={`px-6 py-2 border text-[10px] font-black uppercase tracking-widest transition-all ${rover === r.id ? 'border-indigo-500 bg-indigo-500 text-black' : 'border-white/10 text-white/50 hover:border-white/30'}`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 grow">
            <label className="text-[10px] text-white/40 font-black tracking-widest uppercase block ml-2">Optical Module</label>
            <select 
              value={camera}
              onChange={(e) => setCamera(e.target.value)}
              className="w-full bg-black border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-3 outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="">Operational Mode: Standard</option>
              {activeRover?.cameras.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] text-white/40 font-black tracking-widest uppercase block ml-2">Temporal Marker (SOL)</label>
            <input 
              type="number"
              value={sol}
              onChange={(e) => setSol(Number(e.target.value))}
              className="w-32 bg-black border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-3 outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <button 
            onClick={fetchPhotos}
            className="px-8 py-3 bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-indigo-400 transition-colors"
          >
            REFRESH.
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="aspect-square bg-white/[0.02] border border-white/5" />
          ))}
        </div>
      ) : error ? (
        <div className="p-20 text-center border border-white/5 bg-white/[0.01]">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">{error}</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          <AnimatePresence>
            {photos.map((photo, i) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.01 }}
                onClick={() => setSelectedPhoto(photo)}
                className="aspect-square relative group bg-black cursor-crosshair border border-white/5 overflow-hidden"
              >
                <img src={photo.img_src} alt="Mars" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0 duration-500" loading="lazy" />
                <div className="absolute top-0 right-0 p-2 bg-black border-l border-b border-white/10 text-[8px] font-mono text-white/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  {photo.camera.name}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-[#0F0F11]/95 backdrop-blur-md"
          onClick={() => setSelectedPhoto(null)}
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-6xl w-full h-[80vh] border border-white/10 bg-[#161619] flex flex-col md:flex-row relative"
            onClick={e => e.stopPropagation()}
          >
            <div className="md:w-[60%] bg-black flex items-center justify-center border-r border-white/5">
              <img src={selectedPhoto.img_src} alt="Mars Rover" className="max-w-full max-h-full object-contain" />
            </div>
            <div className="md:w-[40%] p-12 flex flex-col">
              <div className="mb-12">
                <div className="text-[10px] font-mono text-indigo-400 mb-2 uppercase tracking-widest">Target_Manifest</div>
                <h3 className="text-5xl font-black text-white uppercase tracking-tighter leading-none mb-4">{selectedPhoto.rover.name}</h3>
                <div className="flex gap-4">
                  <span className="text-[10px] font-black uppercase bg-white/10 px-2 py-0.5 text-white/60">ID: {selectedPhoto.id}</span>
                  <span className="text-[10px] font-black uppercase text-indigo-500">Active Status</span>
                </div>
              </div>

              <div className="space-y-8 flex-1">
                <div className="p-6 border border-white/5 bg-white/[0.02]">
                  <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest mb-2">Optical Subsystem</div>
                  <div className="text-lg font-bold text-white uppercase">{selectedPhoto.camera.full_name}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 border border-white/5">
                    <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest mb-1">Temporal</div>
                    <div className="text-xl font-black text-white">SOL {selectedPhoto.sol}</div>
                  </div>
                  <div className="p-6 border border-white/5">
                    <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest mb-1">Earth Ref</div>
                    <div className="text-lg font-bold text-white leading-none">{selectedPhoto.earth_date}</div>
                  </div>
                </div>
              </div>

              <div className="mt-auto space-y-4">
                <button className="w-full py-5 bg-white text-black font-black uppercase text-xs tracking-widest transition-colors hover:bg-indigo-400">
                  EXPORT_DATA
                </button>
                <button 
                  onClick={() => setSelectedPhoto(null)}
                  className="w-full py-4 border border-white/20 text-white/50 font-black uppercase text-[10px] tracking-widest hover:text-white transition-all"
                >
                  CLOSE_MODULE
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
