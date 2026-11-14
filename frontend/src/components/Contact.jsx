import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { sendContactMessage } from '../services/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: null,
    error: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (status.error || status.success) {
      setStatus({ loading: false, success: null, error: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validations
    if (!formData.name.trim()) {
      setStatus({ loading: false, success: null, error: 'Please enter your name.' });
      return;
    }
    if (!formData.email.trim()) {
      setStatus({ loading: false, success: null, error: 'Please enter your email address.' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ loading: false, success: null, error: 'Please enter a valid email address.' });
      return;
    }
    if (!formData.message.trim()) {
      setStatus({ loading: false, success: null, error: 'Please enter your message.' });
      return;
    }

    setStatus({ loading: true, success: null, error: null });

    try {
      const response = await sendContactMessage(formData);
      setStatus({
        loading: false,
        success: response.message || 'Message sent successfully! Arjun will respond shortly.',
        error: null
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      setStatus({
        loading: false,
        success: null,
        error: err.message || 'Failed to send message. Please try again later.'
      });
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
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
            GET IN TOUCH
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            Contact <span className="text-[#FFD600]">Me</span>
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

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start max-w-6xl mx-auto">
          
          {/* LEFT SIDE: Contact Information Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col gap-5"
          >
            {/* Email Card - Displayed once, clickable mailto */}
            <a
              href="mailto:arjun06c@gmail.com"
              className="bg-[#101014] border border-white/[0.07] rounded-2xl p-6 flex items-center gap-4 hover:border-[#FFD600]/45 transition-all duration-300 hover:translate-x-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#151519] border border-[#FFD600]/30 text-[#FFD600] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,214,0,0.15)]">
                <svg
                  className="w-5 h-5 text-[#FFD600]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">
                  Email
                </p>
                <p className="text-sm sm:text-base font-semibold text-white truncate group-hover:text-[#FFD600] transition-colors mt-0.5">
                  arjun06c@gmail.com
                </p>
              </div>
            </a>

            {/* Location Card */}
            <div className="bg-[#101014] border border-white/[0.07] rounded-2xl p-6 flex items-center gap-4 hover:border-[#FFD600]/45 transition-all duration-300 hover:translate-x-1 group">
              <div className="w-12 h-12 rounded-xl bg-[#151519] border border-[#FFD600]/30 text-[#FFD600] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,214,0,0.15)]">
                <svg
                  className="w-5 h-5 text-[#FFD600]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider">
                  Location
                </p>
                <p className="text-sm sm:text-base font-semibold text-white group-hover:text-[#FFD600] transition-colors mt-0.5">
                  Tamil Nadu, India
                </p>
              </div>
            </div>

            {/* Working Hours & Reach Card */}
            <div className="p-6 rounded-2xl bg-[#101014] border border-white/[0.07] hover:border-[#FFD600]/45 transition-all duration-300">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD600] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FFD600]" />
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
                  Let's Work Together
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mb-4">
                Open to full-time Full-Stack Developer roles, freelance opportunities, and collaborative engineering projects. Feel free to reach out!
              </p>
              <div className="pt-3.5 border-t border-white/[0.06] flex items-center gap-2 text-xs text-[#FFD600]/95">
                <svg className="w-4 h-4 shrink-0 text-[#FFD600]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Typically responds within 12–24 hours.</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="bg-[#101014] border border-white/[0.07] rounded-2xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.7)] relative">
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Your Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Arjun"
                    required
                    className="w-full bg-[#0A0A0D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#73737F] focus:border-[#FFD600] focus:ring-1 focus:ring-[#FFD600] focus:outline-none transition-all"
                  />
                </div>

                {/* Your Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="w-full bg-[#0A0A0D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#73737F] focus:border-[#FFD600] focus:ring-1 focus:ring-[#FFD600] focus:outline-none transition-all"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Opportunity"
                    className="w-full bg-[#0A0A0D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#73737F] focus:border-[#FFD600] focus:ring-1 focus:ring-[#FFD600] focus:outline-none transition-all"
                  />
                </div>

                {/* Your Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell Me About Your project ...."
                    required
                    className="w-full bg-[#0A0A0D] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#73737F] focus:border-[#FFD600] focus:ring-1 focus:ring-[#FFD600] focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Status Feedback Messages */}
                {status.success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm flex items-center gap-2"
                  >
                    <CheckCircle2 size={16} className="shrink-0" />
                    <span>{status.success}</span>
                  </motion.div>
                )}

                {status.error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm flex items-center gap-2"
                  >
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{status.error}</span>
                  </motion.div>
                )}

                {/* Send Message Button */}
                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full py-3.5 rounded-xl bg-[#FFD600] hover:bg-[#FFE033] text-black font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(255,214,0,0.35)] hover:shadow-[0_0_35px_rgba(255,214,0,0.55)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                >
                  {status.loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

