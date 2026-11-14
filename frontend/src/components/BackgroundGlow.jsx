import React from 'react';
import { motion } from 'framer-motion';

export default function BackgroundGlow() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top Left Yellow Ambient Glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.18, 0.28, 0.18],
          x: [-20, 15, -20],
          y: [-10, 20, -10]
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-[10%] left-[5%] w-[550px] h-[550px] rounded-full bg-[#FFD600]/20 blur-[130px]"
      />

      {/* Middle Right Ambient Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.12, 0.22, 0.12],
          y: [0, -30, 0]
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] rounded-full bg-[#FFD600]/15 blur-[140px]"
      />

      {/* Bottom Left Ambient Glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.14, 0.24, 0.14],
          x: [0, 25, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -bottom-[10%] left-[10%] w-[600px] h-[600px] rounded-full bg-[#FFD600]/20 blur-[150px]"
      />
    </div>
  );
}

