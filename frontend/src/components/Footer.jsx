import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Coding', href: '#coding' },
    { name: 'Work', href: '#work' },
    { name: 'Services', href: '#services' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative bg-[#050505] border-t border-white/[0.07] pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.07]">
          
          {/* Brand & Description */}
          <div className="md:col-span-5">
            <a href="#home" className="inline-flex items-center text-2xl font-bold tracking-tight text-white mb-3">
              <span>Arjun</span>
              <span className="text-[#FFD600] font-black ml-0.5">.</span>
            </a>
            <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-sm mb-5">
              {personalInfo.headline}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#151519] border border-white/[0.07] text-xs text-[#A1A1AA]">
              <span className="w-2 h-2 rounded-full bg-[#FFD600]" />
              <span>{personalInfo.education} • {personalInfo.location}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-sm text-[#A1A1AA]">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-[#FFD600] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Socials */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Connect
            </h4>
            <div className="flex items-center gap-3 mb-5">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-full bg-[#151519] border border-white/[0.08] flex items-center justify-center text-white/80 hover:text-black hover:bg-[#FFD600] hover:border-[#FFD600] transition-all"
              >
                <Github size={18} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-[#151519] border border-white/[0.08] flex items-center justify-center text-white/80 hover:text-black hover:bg-[#FFD600] hover:border-[#FFD600] transition-all"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                aria-label="Email"
                className="w-10 h-10 rounded-full bg-[#151519] border border-white/[0.08] flex items-center justify-center text-white/80 hover:text-black hover:bg-[#FFD600] hover:border-[#FFD600] transition-all"
              >
                <Mail size={18} />
              </a>
            </div>
            <p className="text-xs text-[#A1A1AA]">
              Have a project in mind? Let's build something exceptional together.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs text-[#73737F]">
            © {new Date().getFullYear()} Arjun C. All rights reserved. Crafted with clean code & modern design.
          </p>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-2 text-xs font-semibold text-[#A1A1AA] hover:text-[#FFD600] transition-colors p-2"
          >
            <span>Back to top</span>
            <div className="w-7 h-7 rounded-full bg-[#151519] border border-white/[0.08] flex items-center justify-center text-[#FFD600]">
              <ArrowUp size={13} />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
}

