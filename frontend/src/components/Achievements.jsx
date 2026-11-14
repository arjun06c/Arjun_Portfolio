import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Code2, Lightbulb, ArrowUpRight } from 'lucide-react';
import { technicalAchievements } from '../data/portfolioData';

export default function Achievements() {
  const getIcon = (iconType) => {
    switch (iconType) {
      case 'code':
        return <Code2 size={22} className="text-[#FFD600]" />;
      case 'lightbulb':
        return <Lightbulb size={22} className="text-[#FFD600]" />;
      case 'trophy':
      default:
        return <Trophy size={22} className="text-[#FFD600]" />;
    }
  };

  return (
    <section id="achievements" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Heading matching Reference Screenshot */}
        <div className="mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase"
          >
            TECHNICAL <span className="text-[#FFD600]">ACHIEVEMENTS</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm sm:text-base text-[#A1A1AA] mt-3 max-w-2xl leading-relaxed"
          >
            Participating in technical events and hackathons to apply programming skills, collaborate, and solve real-world problems.
          </motion.p>
        </div>

        {/* 6-Card Grid: 3-col desktop, 2-col tablet, 1-col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technicalAchievements.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative rounded-2xl bg-[#101014] border border-white/[0.07] p-7 flex flex-col justify-between hover:border-[#FFD600]/45 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_15px_35px_rgba(255,214,0,0.12)] cursor-default"
            >
              <div>
                {/* Top Row: Icon on left, Year badge on right */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#151519] border border-white/[0.07] flex items-center justify-center group-hover:scale-105 group-hover:border-[#FFD600]/45 transition-all">
                    {getIcon(item.iconType)}
                  </div>
                  <span className="text-xs font-mono font-bold text-[#FFD600]">
                    {item.year}
                  </span>
                </div>

                {/* Achievement Title */}
                <h3 className="text-lg font-bold text-white mt-5 mb-1.5 group-hover:text-[#FFD600] transition-colors">
                  {item.title}
                </h3>

                {/* Subtitle / Category Badge */}
                <p className="text-[11px] font-semibold text-[#73737F] uppercase tracking-wider mb-4">
                  {item.badge}
                </p>

                {/* Description */}
                <p className="text-sm text-[#A1A1AA] leading-relaxed line-clamp-3 mb-6">
                  {item.description}
                </p>
              </div>

              {/* Action Link: PARTICIPATED or Certificate Link */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                {item.verificationUrl ? (
                  <a
                    href={item.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#FFD600] tracking-wider uppercase flex items-center gap-1 hover:underline w-full justify-between"
                  >
                    <span>View Credential</span>
                    <ArrowUpRight size={14} className="text-[#FFD600] opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-bold text-[#FFD600] tracking-wider uppercase flex items-center gap-1">
                      {item.actionText}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#73737F] bg-white/[0.04] px-2 py-0.5 rounded">
                      Verified
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

