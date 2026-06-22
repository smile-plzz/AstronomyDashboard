import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Loader2, PlayCircle, ImageIcon, Mic2, Tag, Calendar, Building2 } from "lucide-react";

interface NasaImageItem {
  data: Array<{
    title: string;
    description: string;
    nasa_id: string;
    media_type: string;
    date_created: string;
    center: string;
    keywords?: string[];
  }>;
  links?: Array<{
    href: string;
    rel: string;
  }>;
}

export default function CosmicSearch() {
  const [query, setQuery] = useState("Andromeda");
  const [results, setResults] = useState<NasaImageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<NasaImageItem | null>(null);

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch(`https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&page_size=20`);
      const data = await resp.json();
      setResults(data.collection.items || []);
    } catch {
      setError("Failed to query the Galactic Archives.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <div className="border border-white/5 bg-white/[0.02] p-10">
        <div className="flex gap-4">
          <div className="relative grow">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="SEARCH DATA REGISTRY..."
              className="w-full bg-black border border-white/10 text-white text-xs font-bold uppercase tracking-widest pl-16 pr-6 py-5 outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <button 
            onClick={handleSearch}
            disabled={loading}
            className="px-12 bg-white hover:bg-indigo-400 text-black font-black uppercase text-xs tracking-[0.2em] transition-colors flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "SEARCH"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-24 gap-6">
          <div className="w-12 h-12 border-2 border-indigo-500/10 border-t-indigo-500 rounded-none animate-spin" />
          <p className="text-indigo-400/50 font-black text-[10px] uppercase tracking-[0.3em]">Querying Archive Nodes...</p>
        </div>
      ) : error ? (
        <div className="p-24 text-center text-red-500 font-bold uppercase tracking-widest">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {results.map((item, i) => {
            const data = item.data[0];
            const thumb = item.links?.[0]?.href;
            return (
              <motion.div
                key={data.nasa_id + i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                className="group border border-white/5 bg-white/[0.01] hover:border-indigo-500/30 transition-all flex flex-col"
              >
                <div 
                  className="aspect-square relative overflow-hidden bg-black cursor-crosshair"
                  onClick={() => setSelectedItem(item)}
                >
                  {thumb ? (
                    <img src={thumb} alt={data.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] font-mono text-white/10 uppercase">Null_Visual</div>
                  )}
                  {data.media_type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <PlayCircle className="w-12 h-12 text-white/50" />
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col grow">
                  <div className="text-[8px] font-mono text-indigo-400 mb-2 uppercase tracking-widest">{data.nasa_id}</div>
                  <h3 className="text-xs font-black text-white uppercase tracking-tighter mb-4 line-clamp-1">{data.title}</h3>
                  
                  <div className="mt-auto pt-4 border-t border-white/5 flex flex-wrap gap-2">
                    <span className="text-[8px] font-black uppercase text-white/20 tracking-widest">{data.media_type}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {selectedItem && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-[#0F0F11]/98 backdrop-blur-xl"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-6xl w-full h-[80vh] border border-white/10 bg-[#161619] flex flex-col md:flex-row shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <div className="md:w-1/2 bg-black flex items-center justify-center min-h-[300px] border-r border-white/5">
                {selectedItem.links?.[0]?.href && (
                  <img src={selectedItem.links[0].href} alt="NASA Archive" className="max-w-full max-h-full object-contain" />
                )}
              </div>
              <div className="md:w-1/2 p-16 flex flex-col overflow-y-auto no-scrollbar">
                <div className="mb-12">
                  <div className="text-[10px] font-mono text-indigo-400 mb-2 uppercase tracking-widest">Registry_Detail: {selectedItem.data[0].nasa_id}</div>
                  <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-6">{selectedItem.data[0].title}</h3>
                  <div className="flex gap-4">
                    <span className="text-[10px] font-black uppercase bg-indigo-500 text-black px-2 py-0.5">{selectedItem.data[0].media_type}</span>
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{selectedItem.data[0].center}</span>
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-white/40 text-sm leading-relaxed font-medium mb-12">
                    {selectedItem.data[0].description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-12">
                    <div className="p-6 border border-white/5 bg-white/[0.01]">
                      <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest mb-1">Observation</div>
                      <div className="text-lg font-black text-white">{selectedItem.data[0].date_created.split('T')[0]}</div>
                    </div>
                    <div className="p-6 border border-white/5 bg-white/[0.01]">
                      <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest mb-1">Source Node</div>
                      <div className="text-lg font-black text-white">{selectedItem.data[0].center}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedItem.data[0].keywords?.map((k, i) => (
                      <div key={i} className="px-3 py-1.5 border border-white/10 text-[9px] font-black text-white/40 uppercase tracking-widest">
                        {k}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12 space-y-4">
                  <button className="w-full py-5 bg-white text-black font-black uppercase text-xs tracking-widest transition-colors hover:bg-indigo-400">
                    PULL_FULL_ASSET
                  </button>
                  <button 
                    onClick={() => setSelectedItem(null)}
                    className="w-full py-4 border border-white/10 text-white/30 font-black uppercase text-[10px] tracking-widest hover:text-white transition-all text-center"
                  >
                    CLOSE_LINK
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
