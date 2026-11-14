import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, ExternalLink, GitBranch, Terminal, Award, Flame, AlertCircle } from 'lucide-react';
import { codingProfiles } from '../data/portfolioData';
import { getCodingSummary } from '../services/api';
import CodingHeatmap from './CodingHeatmap';

export default function CodingDashboard() {
  const [data, setData] = useState({
    leetcode: null,
    github: null,
    lastSynchronized: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [timeAgo, setTimeAgo] = useState('just now');

  const lastFetchTimeRef = useRef(Date.now());

  // Format relative time helper
  const updateRelativeTime = useCallback((timestamp) => {
    if (!timestamp) return 'just now';
    const elapsedSec = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
    if (elapsedSec < 30) return 'just now';
    if (elapsedSec < 60) return `${elapsedSec}s ago`;
    const mins = Math.floor(elapsedSec / 60);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    return `${hours}h ago`;
  }, []);

  // Fetch data function
  const fetchData = useCallback(async (force = false) => {
    if (force) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const response = await getCodingSummary(force);
      if (response && response.data) {
        setData(response.data);
        lastFetchTimeRef.current = Date.now();
        setTimeAgo('just now');
      }
    } catch (err) {
      console.error('Failed to synchronize coding metrics:', err);
      setError('Unable to fetch live coding metrics. Retrying automatically.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchData(false);
  }, [fetchData]);

  // Periodic 15-minute sync & visibility tab handling
  useEffect(() => {
    const FIFTEEN_MINUTES = 15 * 60 * 1000;

    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchData(false);
      }
    }, FIFTEEN_MINUTES);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const timeSinceLastFetch = Date.now() - lastFetchTimeRef.current;
        if (timeSinceLastFetch > FIFTEEN_MINUTES) {
          fetchData(false);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Update relative time display every 30 seconds
    const timeInterval = setInterval(() => {
      if (data.lastSynchronized) {
        setTimeAgo(updateRelativeTime(data.lastSynchronized));
      }
    }, 30000);

    return () => {
      clearInterval(interval);
      clearInterval(timeInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchData, data.lastSynchronized, updateRelativeTime]);

  // Determine aggregate status
  const getOverallStatus = () => {
    if (isLoading) return { label: 'Syncing...', color: 'text-[#FFD600] bg-[#FFD600]/10 border-[#FFD600]/30' };
    if (data.leetcode?.status === 'Live' || data.github?.status === 'Live') {
      return { label: 'Live', color: 'text-[#FFD600] bg-[#FFD600]/10 border-[#FFD600]/30 dot-pulse' };
    }
    if (data.leetcode?.status === 'Cached' || data.github?.status === 'Cached') {
      return { label: 'Cached', color: 'text-amber-400 bg-amber-400/10 border-amber-400/30' };
    }
    return { label: 'Unavailable', color: 'text-red-400 bg-red-400/10 border-red-400/30' };
  };

  const statusInfo = getOverallStatus();
  const leetcode = data.leetcode;
  const github = data.github;

  return (
    <section id="coding" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header with Live Status & Refresh Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs sm:text-sm font-bold text-[#FFD600] uppercase tracking-[0.25em] mb-2"
            >
              LIVE CODING ACTIVITY
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
            >
              Real-Time <span className="text-[#FFD600]">Activity</span>
            </motion.h2>

            <div className="h-1 w-16 bg-[#FFD600] rounded-full mt-3" />
          </div>

          {/* Sync Control Bar (Section 7) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 self-start md:self-auto bg-[#101014] border border-white/[0.07] px-4 py-2 rounded-2xl shadow-lg"
          >
            {/* Live / Cached Status Pill */}
            <div className={`flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusInfo.color}`}>
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              <span>{statusInfo.label}</span>
            </div>

            {/* Last Updated Timestamp */}
            <span className="text-xs text-[#A1A1AA]">
              Synced {timeAgo}
            </span>

            {/* Manual Refresh Button */}
            <button
              onClick={() => fetchData(true)}
              disabled={isRefreshing || isLoading}
              aria-label="Refresh live coding statistics"
              title="Synchronize live statistics from LeetCode and GitHub"
              className="w-8 h-8 rounded-full bg-[#151519] border border-white/[0.07] flex items-center justify-center text-white/80 hover:text-black hover:bg-[#FFD600] hover:border-[#FFD600] transition-all disabled:opacity-50"
            >
              <RefreshCw size={14} className={isRefreshing ? 'animate-spin text-black' : ''} />
            </button>
          </motion.div>
        </div>

        {/* Sync notification if provider temporarily down */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-[#151519] border border-white/[0.08] text-xs flex items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2.5 text-[#A1A1AA]">
              <AlertCircle size={16} className="shrink-0 text-[#FFD600]" />
              <span>{error} Displaying verified profile metrics.</span>
            </div>
            <button
              onClick={() => fetchData(true)}
              className="px-3 py-1 rounded-full bg-[#FFD600]/15 text-[#FFD600] border border-[#FFD600]/30 hover:bg-[#FFD600] hover:text-black font-semibold text-[11px] transition-all shrink-0"
            >
              Retry Sync
            </button>
          </div>
        )}

        {/* Main 2-Column Grid Matching Reference Screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* CARD 1: LEETCODE PROGRESS */}
            <div className="relative rounded-2xl bg-[#101014] border border-white/[0.07] p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.6)] overflow-hidden group hover:border-[#FFD600]/45 transition-colors">
              {/* Yellow top subtle glow border accent */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD600]/60 to-transparent opacity-80" />

              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFD600] flex items-center gap-1.5">
                  <Terminal size={14} />
                  LEETCODE PROGRESS
                </span>
                <span className="text-[11px] font-semibold text-[#FFD600] bg-[#FFD600]/10 border border-[#FFD600]/30 px-2.5 py-0.5 rounded-full">
                  ACTIVE PROFILE
                </span>
              </div>

              {/* Big Solved Number */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  {leetcode?.totalSolved ?? 307}
                </span>
                <span className="text-xs font-bold text-[#A1A1AA] uppercase tracking-wider">
                  TOTAL PROBLEMS
                </span>
              </div>

              {/* Progress Bars */}
              <div className="space-y-4 mb-7">
                {/* Easy */}
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-[#A1A1AA]">Easy</span>
                    <span className="text-white font-mono">
                      {leetcode?.easy?.solved ?? 209} <span className="text-[#73737F]">/ {leetcode?.easy?.total ?? 975}</span>
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#151519] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${leetcode?.easy?.percentage ?? 21.4}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-[#FFD600] rounded-full shadow-[0_0_8px_rgba(255,214,0,0.4)]"
                    />
                  </div>
                </div>

                {/* Medium */}
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-[#A1A1AA]">Medium</span>
                    <span className="text-white font-mono">
                      {leetcode?.medium?.solved ?? 96} <span className="text-[#73737F]">/ {leetcode?.medium?.total ?? 2146}</span>
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#151519] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${leetcode?.medium?.percentage ?? 4.5}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }}
                      className="h-full bg-[#FFE033] rounded-full shadow-[0_0_8px_rgba(255,224,51,0.4)]"
                    />
                  </div>
                </div>

                {/* Hard */}
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-[#A1A1AA]">Hard</span>
                    <span className="text-white font-mono">
                      {leetcode?.hard?.solved ?? 2} <span className="text-[#73737F]">/ {leetcode?.hard?.total ?? 989}</span>
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#151519] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${leetcode?.hard?.percentage ?? 0.2}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                      className="h-full bg-[#FFF080] rounded-full shadow-[0_0_8px_rgba(255,240,128,0.4)]"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Metrics: Practice Streak & LeetCode Rank */}
              <div className="grid grid-cols-2 gap-4 pt-5 border-t border-white/[0.06]">
                <div>
                  <p className="text-[11px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Flame size={12} className="text-[#FFD600]" />
                    PRACTICE STREAK
                  </p>
                  <p className="text-lg font-bold text-white">
                    {leetcode?.streak ?? 32} <span className="text-[#FFD600] text-sm">DAYS</span>
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Award size={12} className="text-[#FFD600]" />
                    LEETCODE RANK
                  </p>
                  <p className="text-lg font-bold text-white">
                    {leetcode?.rankingPercentile ?? 'TOP 25%'}
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 2: CODING PROFILES */}
            <div className="rounded-2xl bg-[#101014] border border-white/[0.07] p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-2">
                CODING PROFILES
              </h3>
              <div className="w-10 h-0.5 bg-[#FFD600] mb-5" />

              <div className="space-y-2.5">
                {codingProfiles.map((item) => (
                  <a
                    key={item.platform}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#151519] border border-white/[0.05] hover:border-[#FFD600]/45 hover:bg-[#1A1A22] transition-all group"
                  >
                    <span className="text-sm font-semibold text-white/95 group-hover:text-white">
                      {item.platform}
                    </span>
                    <span className="text-xs font-mono text-[#A1A1AA] group-hover:text-[#FFD600] flex items-center gap-1 transition-colors">
                      {item.username}
                      <ExternalLink size={12} className="opacity-70 group-hover:opacity-100" />
                    </span>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: HEATMAPS ================= */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* HEATMAP 1: LEETCODE SUBMISSIONS */}
            <div className="relative rounded-2xl bg-[#101014] border border-white/[0.07] p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.6)] overflow-hidden group hover:border-[#FFD600]/45 transition-colors">
              {/* Yellow top subtle glow border accent */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD600]/60 to-transparent" />

              {/* Card Header */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5 font-mono">
                  <span className="text-[#FFD600] font-black">&gt;_</span> LEETCODE SUBMISSIONS
                </span>
                <span className="text-xs font-mono text-[#A1A1AA]">
                  {leetcode?.heatmap?.totalSubmissionsLastYear ?? 413} Submissions
                </span>
              </div>

              {/* Heatmap Grid */}
              <CodingHeatmap
                days={leetcode?.heatmap?.days || []}
                totalCount={leetcode?.heatmap?.totalSubmissionsLastYear || 413}
                countLabel="submissions"
                platform="LeetCode"
              />
            </div>

            {/* HEATMAP 2: GITHUB CONTRIBUTIONS */}
            <div className="relative rounded-2xl bg-[#101014] border border-white/[0.07] p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.6)] overflow-hidden group hover:border-[#FFD600]/45 transition-colors">
              {/* Yellow top subtle glow border accent */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFD600]/60 to-transparent" />

              {/* Card Header */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <GitBranch size={15} className="text-[#FFD600]" />
                  GITHUB CONTRIBUTIONS
                </span>
                <span className="text-[11px] font-semibold text-[#FFD600] bg-[#FFD600]/10 border border-[#FFD600]/30 px-2.5 py-0.5 rounded-full">
                  Active Profile
                </span>
              </div>

              {/* Heatmap Grid */}
              <CodingHeatmap
                days={github?.heatmap?.days || []}
                totalCount={github?.heatmap?.totalContributionsLastYear || 684}
                countLabel="contributions"
                platform="GitHub"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

