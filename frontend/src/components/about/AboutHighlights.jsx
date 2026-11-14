import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layers, ShieldCheck } from 'lucide-react';
import { aboutHighlights } from '../../data/aboutData';

export default function AboutHighlights() {
  const getIcon = (type) => {
    switch (type) {
      case 'code':
        return <Code size={20} className="text-[#FFD600]" />;
      case 'layers':
        return <Layers size={20} className="text-[#FFD600]" />;
      case 'shield-check':
      default:
        return <ShieldCheck size={20} className="text-[#FFD600]" />;
    }
  };

  return (
    <div className="space-y-4">
      {aboutHighlights.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          className="flex items-start gap-4 p-4.5 rounded-xl bg-[#101014] border border-white/[0.07] hover:border-[#FFD600]/45 transition-all duration-300 hover:translate-x-1 group"
        >
          {/* Icon Box */}
          <div className="w-11 h-11 rounded-lg bg-[#151519] border border-white/[0.07] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[#FFD600]/45 transition-all">
            {getIcon(item.icon)}
          </div>

          {/* Text Content */}
          <div>
            <h4 className="text-sm font-semibold text-white/95 leading-snug">
              {item.title} <span className="text-[#FFD600]">{item.highlight}</span>
            </h4>
            <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

