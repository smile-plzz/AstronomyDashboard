import { motion } from "motion/react";
import { Moon, Sun } from "lucide-react";

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  currentTime: string;
  currentDate: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ theme, toggleTheme, currentTime, currentDate, activeTab, setActiveTab }: HeaderProps) {
  const isTelemetry = ['briefing', 'apod', 'tracker', 'solar', 'earth'].includes(activeTab);
  const isLaboratory = ['observatory', 'mars', 'tech'].includes(activeTab);
  const isArchives = ['search', 'exoplanets'].includes(activeTab);

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-20 border-b border-white/5 flex items-center justify-between px-10 mb-12"
    >
      <div className="flex items-center gap-12">
        <div className="flex items-center gap-4">
          <span className="font-black text-2xl tracking-tighter text-white">CELESTIAL.</span>
        </div>
        <div className="hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
          <span 
            onClick={() => setActiveTab('briefing')}
            className={`cursor-pointer transition-all ${isTelemetry ? 'text-indigo-500' : 'hover:text-white'}`}
          >
            Telemetry
          </span>
          <span 
            onClick={() => setActiveTab('observatory')}
            className={`cursor-pointer transition-all ${isLaboratory ? 'text-indigo-500' : 'hover:text-white'}`}
          >
            Laboratory
          </span>
          <span 
            onClick={() => setActiveTab('search')}
            className={`cursor-pointer transition-all ${isArchives ? 'text-indigo-500' : 'hover:text-white'}`}
          >
            Archives
          </span>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-6">
          <div className="text-right font-mono flex flex-col justify-center">
            <div className="text-sm font-bold text-indigo-400">{currentTime}</div>
            <div className="text-[10px] text-white/30 uppercase tracking-widest">{currentDate}</div>
          </div>
          <button 
            onClick={toggleTheme}
            className="p-2 border border-white/10 hover:border-indigo-500 hover:bg-white/[0.02] text-white/50 hover:text-indigo-500 transition-all group"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
        <div className="hidden sm:block">
          <span className="text-[10px] font-mono bg-white/5 border border-white/10 px-2.5 py-1 text-white/40">NODE_V.01-STABLE</span>
        </div>
        <div className="w-8 h-8 rounded-none bg-gradient-to-tr from-indigo-500 to-purple-500 rotate-45"></div>
      </div>
    </motion.header>
  );
}
