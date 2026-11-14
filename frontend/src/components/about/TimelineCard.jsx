import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

export default function TimelineCard({
  duration,
  title,
  subtitle,
  description,
  score,
  typeBadge,
  technologies = [],
  index = 0
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative pl-7 sm:pl-9 pb-8 last:pb-2 group"
    >
      {/* Vertical Yellow Timeline Line */}
      <div className="absolute left-[7px] sm:left-[9px] top-4 bottom-0 w-[2px] bg-[#FFD600]/25 group-last:hidden" />

      {/* Yellow Circular Timeline Node Marker */}
      <div className="absolute left-0 top-3.5 w-4 h-4 rounded-full border-2 border-[#FFD600] bg-[#050505] shadow-[0_0_10px_rgba(255,214,0,0.45)] group-hover:scale-125 transition-transform duration-300" />

      {/* Main Card Content */}
      <div className="rounded-2xl bg-[#101014] border border-white/[0.07] p-6 sm:p-7 hover:border-[#FFD600]/45 transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_35px_rgba(255,214,0,0.12)]">
        
        {/* Top Badges Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          {/* Duration Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD600]/10 border border-[#FFD600]/30 text-xs font-mono font-semibold text-[#FFD600]">
            <Calendar size={13} />
            <span>{duration}</span>
          </div>

          {/* Right Badge: Score or Type (Internship) */}
          {typeBadge && (
            <span className="text-[11px] font-mono font-semibold text-[#FFD600] bg-[#FFD600]/10 border border-[#FFD600]/30 px-3 py-1 rounded-full uppercase tracking-wider">
              {typeBadge}
            </span>
          )}
          {score && (
            <span className="text-xs font-mono font-semibold text-white/90 bg-white/[0.04] border border-white/10 px-3 py-1 rounded-full">
              {score}
            </span>
          )}
        </div>

        {/* Card Title */}
        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#FFD600] transition-colors">
          {title}
        </h3>

        {/* Subtitle: Institution or Company */}
        {subtitle && (
          <p className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mt-1.5">
            — {subtitle}
          </p>
        )}

        {/* Description */}
        <p className="text-sm text-[#A1A1AA] leading-relaxed mt-3.5">
          {description}
        </p>

        {/* Technology Badges (if present) */}
        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/[0.06]">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-full bg-[#151519] text-xs font-medium text-[#FFD600] border border-[#FFD600]/25 hover:border-[#FFD600]/45 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

      </div>
    </motion.div>
  );
}

