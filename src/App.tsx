import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, 
  Satellite, 
  Search, 
  Radio, 
  Rocket, 
  Sparkles, 
  Info,
  ChevronRight,
  Moon,
  Globe,
  Cpu,
  Sun,
  Telescope
} from "lucide-react";

import Header from "./components/Header";
import { TabSelector } from "./components/Shared";
import ApodSection from "./components/ApodSection";
import MarsSection from "./components/MarsSection";
import CosmicTracker from "./components/CosmicTracker";
import CosmicSearch from "./components/CosmicSearch";
import { Observatory } from "./components/Observatory";
import { CommandBriefing } from "./components/CommandBriefing";
import EarthSection from "./components/EarthSection";
import TechSection from "./components/TechSection";
import SolarMonitor from "./components/SolarMonitor";
import ExoplanetSection from "./components/ExoplanetSection";

export default function App() {
  const [activeTab, setActiveTab] = useState("apod");
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setCurrentDate(now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.body.classList.toggle('light-theme', newTheme === 'light');
  };

  const tabs = [
    { id: 'briefing', label: 'Briefing', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'apod', label: 'Vision', icon: <Radio className="w-4 h-4" /> },
    { id: 'earth', label: 'Earth', icon: <Globe className="w-4 h-4" /> },
    { id: 'solar', label: 'Solar', icon: <Sun className="w-4 h-4" /> },
    { id: 'observatory', label: 'Observe', icon: <Moon className="w-4 h-4" /> },
    { id: 'mars', label: 'Rovers', icon: <Satellite className="w-4 h-4" /> },
    { id: 'exoplanets', label: 'Worlds', icon: <Telescope className="w-4 h-4" /> },
    { id: 'tech', label: 'Tech', icon: <Cpu className="w-4 h-4" /> },
    { id: 'tracker', label: 'Tracker', icon: <Rocket className="w-4 h-4" /> },
    { id: 'search', label: 'Archives', icon: <Search className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto space-y-12 pb-24">
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme} 
        currentTime={currentTime} 
        currentDate={currentDate} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="px-10">
        <TabSelector 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          tabs={tabs} 
        />

        <main className="min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'briefing' && <CommandBriefing />}
              {activeTab === 'apod' && <ApodSection />}
              {activeTab === 'earth' && <EarthSection />}
              {activeTab === 'solar' && <SolarMonitor />}
              {activeTab === 'observatory' && <Observatory />}
              {activeTab === 'mars' && <MarsSection />}
              {activeTab === 'exoplanets' && <ExoplanetSection />}
              {activeTab === 'tech' && <TechSection />}
              {activeTab === 'tracker' && <CosmicTracker />}
              {activeTab === 'search' && <CosmicSearch />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <footer className="h-14 border-t border-white/5 flex items-center justify-between px-10 text-[10px] font-mono text-white/30">
        <div className="flex gap-8">
          <span>COORD: 34.0522° N, 118.2437° W</span>
          <span>UPTIME: 99.998%</span>
        </div>
        <div className="flex gap-8 uppercase font-bold tracking-widest">
          <span>© 2026 CELESTIAL SYSTEMS</span>
          <span className="text-indigo-400">// ALL SYSTEMS NOMINAL</span>
        </div>
      </footer>
    </div>
  );
}
