import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(120);

  const words = [
    'Full-Stack Developer'
  ];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setTypedText(
        isDeleting
          ? fullText.substring(0, typedText.length - 1)
          : fullText.substring(0, typedText.length + 1)
      );

      setTypingSpeed(isDeleting ? 40 : 90);

      if (!isDeleting && typedText === fullText) {
        setTimeout(() => setIsDeleting(true), 3500);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(350);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, loopNum, typingSpeed]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Developer Portrait with Double Rotated Frames & Yellow Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center order-2 lg:order-1"
          >
            <div className="relative w-[280px] sm:w-[330px] md:w-[370px] aspect-[4/5] flex items-center justify-center">
              
              {/* Back Rotated Frame 2 (+6deg) */}
              <motion.div
                animate={{ rotate: [6, 8, 6] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-[34px] sm:rounded-[40px] border-[2px] border-[#FFD600]/40 pointer-events-none -z-20"
              />

              {/* Back Rotated Frame 1 (-6deg) */}
              <motion.div
                animate={{ rotate: [-6, -8, -6] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-[34px] sm:rounded-[40px] border-[2px] border-[#FFD600]/70 pointer-events-none -z-10"
              />

              {/* Yellow Ambient Glow around Portrait */}
              <div className="absolute inset-0 rounded-[34px] sm:rounded-[40px] bg-[#FFD600]/25 blur-[35px] -z-10" />

              {/* Main Solid Yellow Card Container */}
              <motion.div
                animate={{ y: [-5, 6, -5] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-full h-full rounded-[34px] sm:rounded-[40px] bg-[#FFD600] overflow-hidden shadow-[0_15px_40px_rgba(255,214,0,0.28)] flex items-end justify-center group"
              >
                {/* Developer Portrait Image */}
                <img
                  src={personalInfo.avatar || "/arjun-cutout.png"}
                  alt="Arjun C. - Creative Software & Full-Stack Developer"
                  className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-[1.02] group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = personalInfo.photo || "/arjun-photo.png";
                  }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Introduction, Headline, Subtext & CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-2"
          >
            {/* Small introduction label */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-lg sm:text-xl font-medium text-white/90">
                Hi! I'm <span className="text-[#FFD600] font-semibold">Arjun</span>
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[52px] font-extrabold tracking-tight text-white leading-[1.2] mb-5">
              Creative Software & <br className="hidden sm:inline" />
              <span className="text-[#FFD600] inline-block max-w-full">
                <span>{typedText}</span>
                <span className="inline-block w-[3px] h-6 sm:h-8 md:h-10 bg-[#FFD600] ml-1.5 align-middle animate-pulse" />
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#A1A1AA] max-w-xl leading-relaxed mb-9">
              {personalInfo.heroSubtext}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-5 w-full sm:w-auto">
              {/* Download Resume Button */}
              <a
                href="/resume.pdf"
                download="Arjun_C_Resume.pdf"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm sm:text-base font-bold bg-[#FFD600] text-black shadow-[0_0_25px_rgba(255,214,0,0.35)] hover:bg-[#FFE033] hover:shadow-[0_0_35px_rgba(255,214,0,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-center group cursor-pointer"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-black group-hover:translate-y-0.5 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download Resume</span>
              </a>

              {/* My Work Button */}
              <a
                href="#work"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm sm:text-base font-semibold border border-[#FFD600] text-white hover:bg-[#FFD600]/10 hover:shadow-[0_0_20px_rgba(255,214,0,0.2)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                My Work
              </a>
            </div>

            {/* Social Quick Links */}
            <div className="flex items-center gap-3 mt-7">
              <span className="text-xs font-bold text-[#73737F] uppercase tracking-wider">
                Connect:
              </span>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-9 h-9 rounded-full bg-[#151519] border border-white/[0.08] flex items-center justify-center text-white/80 hover:text-black hover:bg-[#FFD600] hover:border-[#FFD600] shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all transform hover:-translate-y-0.5"
              >
                <Github size={16} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 rounded-full bg-[#151519] border border-white/[0.08] flex items-center justify-center text-white/80 hover:text-black hover:bg-[#FFD600] hover:border-[#FFD600] shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all transform hover:-translate-y-0.5"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                aria-label="Send Email via Gmail"
                className="w-9 h-9 rounded-full bg-[#151519] border border-white/[0.08] flex items-center justify-center text-white/80 hover:text-black hover:bg-[#FFD600] hover:border-[#FFD600] shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all transform hover:-translate-y-0.5"
              >
                <Mail size={16} />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

