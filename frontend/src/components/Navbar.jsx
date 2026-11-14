import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact navigation order requested:
  // 1. Home, 2. About, 3. Skills, 4. Coding, 5. Work, 6. Services, 7. Achievements, 8. Contact Me
  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Coding', href: '#coding', id: 'coding' },
    { name: 'Work', href: '#work', id: 'work' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Achievements', href: '#achievements', id: 'achievements' },
  ];

  // Scroll listener for detecting active section and scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // If user reaches near bottom of page, highlight Contact Me
      const isBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 70;
      if (isBottom) {
        setActiveSection('contact');
        return;
      }

      const sections = ['home', 'about', 'skills', 'coding', 'work', 'services', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll on mobile when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Smooth scroll handler with offset compensation
  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      const topOffset = 85;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      const sectionId = href.replace('#', '');
      setActiveSection(sectionId);
    }
  };

  return (
    <>
      <header className="fixed top-3.5 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between gap-3 md:gap-4 lg:gap-6 px-3.5 sm:px-5 lg:px-6 py-2 sm:py-2.5 rounded-full border transition-all duration-300 max-w-6xl ${
            isScrolled
              ? 'bg-[#101014]/92 backdrop-blur-2xl border-white/[0.12] shadow-[0_12px_36px_rgba(0,0,0,0.85)]'
              : 'bg-[#101014]/75 backdrop-blur-xl border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.6)]'
          }`}
          aria-label="Main Navigation"
        >
          {/* ================= 1. UNIQUE ARJUN BRAND LOGO ================= */}
          <motion.a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            aria-label="Arjun - Developer Portfolio Home"
            className="group flex items-center gap-2.5 rounded-xl px-1 py-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] shrink-0"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Distinctive capital letter "A" inside a small rounded yellow square */}
            <div className="relative flex items-center justify-center w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-[9px] bg-gradient-to-br from-[#FFE033] via-[#FFD600] to-[#E6BE00] text-black shadow-[0_0_14px_rgba(255,214,0,0.4)] transition-all duration-300 group-hover:shadow-[0_0_22px_rgba(255,214,0,0.65)] group-hover:rotate-[-2deg]">
              <svg
                viewBox="0 0 24 24"
                className="w-4.5 h-4.5 text-black"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 3.6L4.8 20H8.3L9.9 15.8H14.1L15.7 20H19.2L12 3.6ZM12 9L13.7 13.5H10.3L12 9Z"
                  fill="#050505"
                />
              </svg>
            </div>

            {/* White "Arjun" typography with yellow accent dot */}
            <div className="flex items-baseline tracking-tight font-bold select-none">
              <span className="text-base sm:text-lg text-white font-bold tracking-tight transition-colors duration-200 group-hover:text-white">
                Arjun
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD600] ml-1 shadow-[0_0_8px_rgba(255,214,0,0.85)] group-hover:scale-125 transition-transform duration-200" />
            </div>
          </motion.a>

          {/* ================= 2. DESKTOP / TABLET NAV LINKS ================= */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2 xl:gap-3 text-xs lg:text-[13px] xl:text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative px-2.5 lg:px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-[#A1A1AA] hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navbarActiveIndicator"
                      className="absolute inset-0 rounded-full bg-[#FFD600]/10 border border-[#FFD600]/50 shadow-[0_0_14px_rgba(255,214,0,0.18)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* ================= 3. RIGHT ACTION: CONTACT ME BUTTON ================= */}
          <div className="hidden md:flex items-center shrink-0">
            <motion.a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              whileHover={{ y: -1.5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Contact Me"
              className={`group relative inline-flex items-center justify-center gap-1.5 px-4 lg:px-5 py-2 rounded-full text-xs lg:text-sm font-bold bg-[#FFD600] text-black transition-all duration-200 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] ${
                activeSection === 'contact'
                  ? 'ring-2 ring-white/60 shadow-[0_0_24px_rgba(255,214,0,0.65)]'
                  : 'shadow-[0_0_18px_rgba(255,214,0,0.35)] hover:bg-[#FFE033] hover:shadow-[0_0_28px_rgba(255,214,0,0.55)]'
              }`}
            >
              <span>Contact Me</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-black transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          </div>

          {/* ================= 4. MOBILE HAMBURGER TOGGLE ================= */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-2 rounded-full text-white/80 hover:text-white hover:bg-white/[0.06] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600]"
          >
            {mobileMenuOpen ? (
              <X size={22} className="text-[#FFD600]" />
            ) : (
              <Menu size={22} />
            )}
          </button>
        </motion.nav>
      </header>

      {/* ================= 5. MOBILE NAVIGATION DRAWER ================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay for outside click */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden pointer-events-auto"
            />

            {/* Mobile Drawer Panel */}
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-4 top-20 z-50 p-5 rounded-3xl bg-[#101014]/95 backdrop-blur-2xl border border-white/[0.1] shadow-[0_20px_50px_rgba(0,0,0,0.95)] md:hidden flex flex-col gap-1.5 max-h-[82vh] overflow-y-auto pointer-events-auto max-w-sm mx-auto"
            >
              <div className="flex items-center justify-between pb-3 mb-1 border-b border-white/[0.08]">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#73737F]">
                  Navigation
                </span>
                <span className="text-[11px] text-[#A1A1AA] bg-white/[0.06] px-2 py-0.5 rounded-full">
                  Menu
                </span>
              </div>

              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#FFD600]/15 text-[#FFD600] font-semibold border-l-2 border-[#FFD600]'
                        : 'text-[#A1A1AA] hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFD600] shadow-[0_0_8px_#FFD600]" />
                    )}
                  </a>
                );
              })}

              {/* Prominent Contact Me in Mobile Drawer */}
              <div className="pt-3 border-t border-white/[0.08] mt-2">
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-bold bg-[#FFD600] text-black shadow-[0_0_20px_rgba(255,214,0,0.4)] hover:bg-[#FFE033] transition-all ${
                    activeSection === 'contact' ? 'ring-2 ring-white/60' : ''
                  }`}
                >
                  <span>Contact Me</span>
                  <ArrowUpRight className="w-4 h-4 text-black" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
