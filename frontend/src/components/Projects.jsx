import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronLeft, ChevronRight, Layers, CheckCircle2, X } from 'lucide-react';
import { projectsData } from '../data/portfolioData';

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projectsData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  };

  return (
    <section id="work" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs sm:text-sm font-bold text-[#92929E] uppercase tracking-[0.25em] mb-2"
          >
            MY PORTFOLIO
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Featured <span className="text-[#FFD600]">Projects</span>
          </motion.h2>

          {/* Yellow Accent Bar */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-[#FFD600] rounded-full mx-auto mt-3"
          />
        </div>

        {/* Desktop & Tablet 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative rounded-2xl bg-[#101014] border border-white/[0.07] p-5 flex flex-col justify-between hover:border-[#FFD600]/45 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(255,214,0,0.12)]"
            >
              <div>
                {/* Image Preview Container */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#151519]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Top Left Tech Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#FFD600]/30 text-xs font-medium text-white/95">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFD600]" />
                    <span>{project.badge}</span>
                  </div>

                  {/* Top Right GitHub and Live Demo Links */}
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} source on GitHub`}
                      className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 hover:text-black hover:bg-[#FFD600] transition-all duration-200"
                    >
                      <Github size={15} />
                    </a>
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View live demo of ${project.title}`}
                        className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 hover:text-black hover:bg-[#FFD600] transition-all duration-200"
                      >
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Card Information */}
                <h3 className="text-lg font-bold text-white mt-4 group-hover:text-[#FFD600] transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-[#A1A1AA] mt-2 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Key Features Quick Peek */}
                <button
                  onClick={() => setSelectedProject(project)}
                  className="mt-3 text-xs font-semibold text-[#FFD600] hover:text-[#FFE033] hover:underline flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Explore features & architecture</span>
                  <span>→</span>
                </button>
              </div>

              {/* Bottom Tech Tags */}
              <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/[0.06]">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-full bg-[#151519] text-[11px] font-medium text-[#FFD600] border border-[#FFD600]/25"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carousel Pagination Indicator at Bottom */}
        <div className="flex items-center justify-center gap-2 mt-12">
          {projectsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to project slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === idx
                  ? 'w-8 h-2 bg-[#FFD600]'
                  : 'w-2 h-2 bg-[#2A2A32] hover:bg-white/40'
              }`}
            />
          ))}
        </div>

      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl bg-[#101014] border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
                className="absolute top-5 right-5 p-2 rounded-full bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>

              {/* Modal Header */}
              <div className="pr-8">
                <span className="text-xs font-mono font-semibold text-[#FFD600] uppercase tracking-wider">
                  {selectedProject.badge}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {selectedProject.title}
                </h3>
                <p className="text-sm text-[#A1A1AA] mt-3 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Problem & Architectural Solution */}
              {(selectedProject.problem || selectedProject.solution) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-5">
                  {selectedProject.problem && (
                    <div className="p-3.5 rounded-2xl bg-[#151519] border border-white/[0.06]">
                      <h4 className="text-[11px] font-bold text-[#FFD600] uppercase tracking-wider mb-1.5">
                        Problem Statement
                      </h4>
                      <p className="text-xs text-[#A1A1AA] leading-relaxed">
                        {selectedProject.problem}
                      </p>
                    </div>
                  )}
                  {selectedProject.solution && (
                    <div className="p-3.5 rounded-2xl bg-[#151519] border border-white/[0.06]">
                      <h4 className="text-[11px] font-bold text-[#FFD600] uppercase tracking-wider mb-1.5">
                        Technical Solution
                      </h4>
                      <p className="text-xs text-[#A1A1AA] leading-relaxed">
                        {selectedProject.solution}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Engineering Contribution */}
              {selectedProject.contribution && (
                <div className="mt-4 p-3.5 rounded-2xl bg-[#151519] border border-white/[0.06]">
                  <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFD600]" />
                    My Engineering Contribution
                  </h4>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">
                    {selectedProject.contribution}
                  </p>
                </div>
              )}

              {/* Key Features List */}
              <div className="mt-5">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                  Key Functional Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedProject.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-[#151519] border border-white/[0.06] text-xs text-white/95"
                    >
                      <CheckCircle2 size={15} className="text-[#FFD600] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="mt-5">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-[#FFD600]/10 text-xs font-medium text-[#FFD600] border border-[#FFD600]/30"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mt-7 pt-5 border-t border-white/[0.08]">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm flex items-center justify-center gap-2 border border-white/10 transition-colors"
                >
                  <Github size={17} />
                  <span>View Repository</span>
                </a>
                {selectedProject.liveDemo && (
                  <a
                    href={selectedProject.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-xl bg-[#FFD600] hover:bg-[#FFE033] text-black font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,214,0,0.35)] transition-all"
                  >
                    <ExternalLink size={17} />
                    <span>Launch Live Demo</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

