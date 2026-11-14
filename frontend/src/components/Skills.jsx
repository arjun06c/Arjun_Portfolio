import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '../data/portfolioData';
import SkillIcon from './SkillIcon';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('Frontend');
  const [hoveredSkill, setHoveredSkill] = useState('HTML5'); // Matches reference screenshot where HTML5 is highlighted

  const categories = ['Frontend', 'Backend', 'Language', 'Database', 'Tools'];

  const handleTabChange = (category) => {
    setActiveCategory(category);
    const categorySkills = skillsData[category];
    if (categorySkills && categorySkills.length > 0) {
      setHoveredSkill(categorySkills[0].name);
    }
  };

  const currentSkills = skillsData[activeCategory] || [];

  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">

        {/* Section Heading */}
        <div className="text-center mb-12">
          <p className="text-xs sm:text-sm font-bold text-[#A1A1AA] uppercase tracking-[0.25em] mb-2">
            MY EXPERTISE
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Skills & <span className="text-[#FFD600]">Technologies</span>
          </h2>

          {/* Yellow Horizontal Accent Line */}
          <div className="h-1 w-16 bg-[#FFD600] rounded-full mx-auto mt-3" />
        </div>

        {/* Five Category Tabs */}
        <div className="flex justify-center mb-14 overflow-x-auto max-w-full px-2 scrollbar-none">
          <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-[#101014] border border-white/[0.07] shadow-[0_4px_20px_rgba(0,0,0,0.5)] shrink-0">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => handleTabChange(category)}
                  className={`relative px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap ${isActive
                      ? 'text-black bg-[#FFD600] shadow-[0_0_20px_rgba(255,214,0,0.35)]'
                      : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
                    }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Cards Grid - Centered & Animated */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={`mx-auto grid gap-5 sm:gap-6 ${currentSkills.length === 2
              ? 'grid-cols-2 max-w-xl'
              : currentSkills.length === 3
                ? 'grid-cols-2 sm:grid-cols-3 max-w-3xl'
                : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 max-w-5xl'
            }`}
        >
          {currentSkills.map((skill) => {
            const isHovered = hoveredSkill === skill.name;
            return (
              <div
                key={skill.name}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                className={`group relative rounded-2xl bg-[#101014] border p-8 flex flex-col items-center justify-center min-h-[190px] transition-all duration-300 cursor-pointer overflow-hidden ${isHovered
                    ? 'border-[#FFD600] shadow-[0_0_35px_rgba(255,214,0,0.18)] -translate-y-1.5'
                    : 'border-white/[0.07] hover:border-[#FFD600]/45'
                  }`}
              >
                {/* Top Glowing Dot with Ring Indicator */}
                {isHovered && (
                  <div className="absolute top-3.5 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none transition-all">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD600] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FFD600] ring-4 ring-[#FFD600]/20" />
                    </span>
                  </div>
                )}

                {/* Centered Technology Icon */}
                <div className="my-auto flex flex-col items-center">
                  <SkillIcon
                    name={skill.name}
                    className="w-14 h-14 object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-md"
                  />

                  {/* Skill Label */}
                  <span className="text-white/90 group-hover:text-white font-medium text-sm sm:text-base mt-4 transition-colors text-center">
                    {skill.name}
                  </span>
                </div>

                {/* Bottom Accent Underline Bar */}
                {isHovered && (
                  <div className="absolute bottom-0 inset-x-0 mx-auto w-14 h-1 bg-[#FFD600] rounded-full shadow-[0_0_10px_#FFD600] pointer-events-none" />
                )}
              </div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
