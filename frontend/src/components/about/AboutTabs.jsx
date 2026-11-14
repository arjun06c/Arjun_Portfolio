import React from 'react';
import { GraduationCap, Briefcase } from 'lucide-react';

export default function AboutTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'education', label: 'EDUCATION', icon: GraduationCap },
    { id: 'experience', label: 'EXPERIENCE', icon: Briefcase },
  ];

  return (
    <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#101014] border border-white/[0.07] shadow-lg w-fit">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              isActive
                ? 'bg-[#FFD600] text-black shadow-[0_0_20px_rgba(255,214,0,0.35)]'
                : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
            }`}
          >
            <Icon size={15} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

