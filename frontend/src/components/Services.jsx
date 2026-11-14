import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Layers, Smartphone, Check } from 'lucide-react';
import { servicesData } from '../data/portfolioData';

export default function Services() {
  const [activeSlide, setActiveSlide] = useState(0);

  const getServiceIcon = (type) => {
    switch (type) {
      case 'code':
        return <Code2 size={36} className="text-[#FFD600]" />;
      case 'server':
        return <Server size={36} className="text-[#FFD600]" />;
      case 'layers':
        return <Smartphone size={36} className="text-[#FFD600]" />;
      default:
        return <Layers size={36} className="text-[#FFD600]" />;
    }
  };

  return (
    <section id="services" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs sm:text-sm font-bold text-[#A1A1AA] uppercase tracking-[0.25em] mb-2"
          >
            WHAT I DO
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            My <span className="text-[#FFD600]">Services</span>
          </motion.h2>

          {/* Yellow Accent Line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 bg-[#FFD600] rounded-full mx-auto mt-3 mb-4"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-sm sm:text-base text-[#A1A1AA] max-w-xl mx-auto"
          >
            Delivering modern digital solutions through thoughtful design and reliable engineering.
          </motion.p>
        </div>

        {/* 3 Large Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative rounded-2xl bg-[#101014] border border-white/[0.07] p-8 flex flex-col justify-between hover:border-[#FFD600]/45 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(255,214,0,0.14)] cursor-pointer"
            >
              <div>
                {/* Large Icon Container */}
                <div className="w-16 h-16 rounded-2xl bg-[#151519] border border-white/[0.07] flex items-center justify-center group-hover:scale-110 group-hover:border-[#FFD600]/45 transition-all duration-300">
                  {getServiceIcon(service.iconType)}
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold text-white mt-6 mb-3 group-hover:text-[#FFD600] transition-colors">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="space-y-2.5 pt-4 border-t border-white/[0.06]">
                {service.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-white/90">
                    <span className="w-4 h-4 rounded-full bg-[#FFD600]/15 text-[#FFD600] flex items-center justify-center shrink-0">
                      <Check size={11} />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carousel Pagination Dots at Bottom */}
        <div className="flex items-center justify-center gap-2 mt-12">
          {servicesData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              aria-label={`Service dot ${idx + 1}`}
              className={`transition-all duration-300 rounded-full ${
                activeSlide === idx
                  ? 'w-8 h-2 bg-[#FFD600]'
                  : 'w-2 h-2 bg-[#2A2A32] hover:bg-white/40'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

