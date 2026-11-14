import React from 'react';
import { motion } from 'framer-motion';

export default function AboutIntro() {
  return (
    <div className="mb-8">
      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-xs font-bold text-[#FFD600] uppercase tracking-[0.25em] mb-2.5"
      >
        PERSONAL JOURNEY
      </motion.p>

      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight"
      >
        Engineering <br />
        <span className="text-[#FFD600]">Mindset</span>
      </motion.h2>

      {/* Introduction Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-sm sm:text-base text-[#A1A1AA] mt-5 leading-relaxed max-w-lg"
      >
        Bridging the gap between <strong className="text-white font-semibold">logical precision</strong> and{' '}
        <strong className="text-white font-semibold">creative problem solving</strong>. I don't just write code; I engineer experiences.
      </motion.p>
    </div>
  );
}

