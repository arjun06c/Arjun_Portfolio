import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AboutIntro from './AboutIntro';
import AboutHighlights from './AboutHighlights';
import AboutTabs from './AboutTabs';
import EducationTimeline from './EducationTimeline';
import ExperienceTimeline from './ExperienceTimeline';

export default function About() {
  const [activeTab, setActiveTab] = useState('education');

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Two-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ================= LEFT COLUMN: Journey, Mindset & Highlights (~40%) ================= */}
          <div className="lg:col-span-5">
            <AboutIntro />
            <AboutHighlights />
          </div>

          {/* ================= RIGHT COLUMN: Interactive Timeline & Tabs (~60%) ================= */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Top Switcher Tabs */}
            <div className="mb-8 self-start sm:self-auto">
              <AboutTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            {/* Timeline Cards with AnimatePresence */}
            <div className="min-h-[420px]">
              <AnimatePresence mode="wait">
                {activeTab === 'education' ? (
                  <motion.div
                    key="education"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35 }}
                  >
                    <EducationTimeline />
                  </motion.div>
                ) : (
                  <motion.div
                    key="experience"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35 }}
                  >
                    <ExperienceTimeline />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

