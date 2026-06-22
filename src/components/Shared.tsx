import { motion } from "motion/react";
import { ReactNode } from "react";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  subValue?: string;
}

export function StatsCard({ label, value, icon, subValue }: StatsCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="p-6 border border-white/5 bg-white/[0.02] flex flex-col justify-between group basis-[180px] grow transition-colors hover:border-indigo-500/30"
    >
      <div>
        <div className="text-[10px] font-mono text-indigo-400 mb-1 flex items-center gap-2 uppercase tracking-widest">
          {icon}
          {label}
        </div>
        <div className="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tighter">
          {value}
        </div>
      </div>
      {subValue && <div className="text-[10px] font-bold text-white/20 mt-4 uppercase tracking-[0.2em]">{subValue}</div>}
    </motion.div>
  );
}

interface TabSelectorProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: { id: string; label: string; icon: ReactNode }[];
}

export function TabSelector({ activeTab, setActiveTab, tabs }: TabSelectorProps) {
  return (
    <div className="flex border-b border-white/5 mb-12 overflow-x-auto no-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`
            relative px-8 py-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-200 whitespace-nowrap
            ${activeTab === tab.id 
              ? 'text-white' 
              : 'text-white/30 hover:text-white/60'}
          `}
        >
          <div className="flex items-center gap-3">
            {tab.icon}
            {tab.label}
          </div>
          {activeTab === tab.id && (
            <motion.div 
              layoutId="active-tab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" 
            />
          )}
        </button>
      ))}
    </div>
  );
}
