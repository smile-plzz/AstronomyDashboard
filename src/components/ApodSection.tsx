import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Bot, Share2, Download, Info } from "lucide-react";
import { ApodData } from "../types";
import { StatsCard } from "./Shared";

export default function ApodSection() {
  const [data, setData] = useState<ApodData | null>(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAI, setShowAI] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    fetchApod();
  }, [date]);

  const fetchApod = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/nasa/apod?date=${date}`);
      const json = await response.json();
      if (json.error) throw new Error(json.error);
      setData(json);
      setAiAnalysis(null);
    } catch (err) {
      setError("Failed to fetch celestial vision. Cosmic interference?");
    } finally {
      setLoading(false);
    }
  };

  const getAIAdvice = async () => {
    if (!data) return;
    setAnalyzing(true);
    try {
      const resp = await fetch("/api/ai/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: `Explain this astronomical image in simple but poetic detail: "${data.title}". Description context: ${data.explanation}`,
        }),
      });
      const resJson = await resp.json();
      setAiAnalysis(resJson.text);
      setShowAI(true);
    } catch (err) {
      setAiAnalysis("Unable to reach the Galactic Archives at this time.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-12">
        <motion.div 
          layout
          className="border border-white/5 bg-white/[0.02]"
        >
          <div className="p-8 flex flex-wrap justify-between items-center bg-white/[0.03] border-b border-white/5 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Optical Acquisition</span>
              </div>
              <h2 className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-2">
                Vision Registry
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <input 
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-black border border-white/10 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 outline-none focus:border-indigo-500 transition-colors"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="p-8">
            {loading ? (
              <div className="aspect-video bg-white/[0.02] flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-2 border-indigo-500/10 border-t-indigo-500 rounded-none animate-spin" />
                <span className="text-indigo-400 text-[10px] font-black tracking-widest uppercase">Syncing Data...</span>
              </div>
            ) : error ? (
              <div className="aspect-video bg-red-500/5 border border-red-500/20 flex items-center justify-center text-red-500 font-bold uppercase text-xs tracking-widest">
                {error}
              </div>
            ) : data && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="relative group border border-white/5 bg-black">
                  {data.media_type === "image" ? (
                    <img src={data.url} alt={data.title} className="w-full h-auto object-cover max-h-[70vh]" />
                  ) : (
                    <iframe src={data.url} className="w-full aspect-video" frameBorder="0" allowFullScreen title={data.title} />
                  )}
                  <div className="absolute top-0 right-0 flex border-l border-b border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-4 bg-black/80 text-white hover:bg-indigo-500 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                    {data.hdurl && (
                      <a href={data.hdurl} target="_blank" rel="noreferrer" className="p-4 bg-black/80 text-white border-l border-white/10 hover:bg-indigo-500 transition-colors">
                        <Download className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <StatsCard label="Observation Date" value={data.date} icon={<Calendar className="w-3 h-3" />} />
                  <StatsCard label="Media Protocol" value={data.media_type} />
                  <StatsCard label="Version Control" value={data.service_version} />
                  {data.copyright && <StatsCard label="Registry Source" value={data.copyright.slice(0, 15)} />}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {data && !loading && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="p-10 border-l-4 border-indigo-500 bg-white/[0.02]"
          >
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">{data.title}</h3>
            <p className="text-white/40 leading-relaxed text-lg font-medium">{data.explanation}</p>
          </motion.div>
        )}
      </div>

      <div className="space-y-8">
        <div className="border border-white/5 bg-white/[0.02] p-10 flex flex-col h-full">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-500/10 border border-indigo-500/20">
                <Bot className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="font-black text-white uppercase tracking-widest text-xs">AI ADVISOR</h3>
                <p className="text-[9px] font-mono text-indigo-400 uppercase">Module_01.A</p>
              </div>
            </div>

            <p className="text-white/40 text-sm mb-10 leading-tight font-medium">
              Initialize cosmic analysis engine for this visual registry. 
              The system will perform a deep-layer audit on the captured data.
            </p>

            <button 
              onClick={getAIAdvice}
              disabled={analyzing || !data}
              className="w-full py-5 bg-white hover:bg-indigo-400 text-black font-black uppercase text-xs tracking-[0.2em] transition-colors flex items-center justify-center gap-3"
            >
              {analyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-none animate-spin" />
                  Analyzing
                </>
              ) : (
                <>
                  <Bot className="w-4 h-4" />
                  INIT_UPGRADE
                </>
              )}
            </button>
          </div>

          <AnimatePresence>
            {showAI && aiAnalysis && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-10 pt-10 border-t border-white/5"
              >
                <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4">Audit Manifest</div>
                <div className="space-y-4 text-xs font-bold text-white/60 leading-relaxed max-h-[500px] overflow-y-auto no-scrollbar pr-2 whitespace-pre-wrap uppercase tracking-wider">
                  {aiAnalysis}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-auto pt-10 border-t border-white/5 flex justify-between items-end">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">System Status</span>
            <span className="text-[10px] font-mono text-indigo-400 animate-pulse">ACTIVE.A</span>
          </div>
        </div>
      </div>
    </div>
  );
}
