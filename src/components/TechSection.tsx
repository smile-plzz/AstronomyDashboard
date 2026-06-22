import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Cpu, ExternalLink, Search, Zap } from "lucide-react";
import { TechProject } from "../types";

export default function TechSection() {
  const [projects, setProjects] = useState<TechProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchTech();
  }, []);

  const fetchTech = async () => {
    try {
      const resp = await fetch("/api/nasa/techport");
      const json = await resp.json();
      setProjects(json.projects.projects || []);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const filtered = projects.filter(p => p.id.toString().includes(query) || query === "").slice(0, 20);

  return (
    <div className="space-y-12">
      <div className="border border-white/5 bg-white/[0.02] p-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-indigo-400" />
                <span className="text-[10px] text-indigo-400 font-mono uppercase tracking-widest">Innovation Registry</span>
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Technology Audit</h2>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input 
              type="text"
              placeholder="Search by ID..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full bg-black border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-14 py-4 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            [...Array(8)].map((_, i) => <div key={i} className="h-40 bg-white/[0.02] border border-white/5 animate-pulse" />)
          ) : filtered.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group"
            >
              <div className="text-[9px] font-mono text-white/20 mb-4 uppercase tracking-widest">PROJECT_{project.id}</div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 border border-indigo-500/30 bg-indigo-500/5">
                    <Cpu className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="text-sm font-black text-white uppercase tracking-tighter">Unit_Status</div>
              </div>
              <div className="mt-auto flex justify-between items-end">
                <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Updated: {project.lastUpdated}</div>
                <a 
                  href={`https://techport.nasa.gov/view/${project.id}`} 
                  target="_blank" 
                  rel="noopener"
                  className="p-2 border border-white/10 text-white/20 hover:text-indigo-400 hover:border-indigo-500 transition-all"
                >
                    <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
