'use client';

import { motion } from 'framer-motion';
import { Calendar, Users, MapPin } from 'lucide-react';
import { TUESDAY_SEASON_START, TUESDAY_SEASON_END, tuesdayRounds } from '@/lib/data/tuesday';

export default function TuesdayHero() {
  const completedRounds = tuesdayRounds.filter(r => r.completed).length;

  return (
    <section className="relative overflow-hidden bg-fob-dark-navy py-20 md:py-28">
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }} />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-fob-orange text-xs font-bold tracking-[0.3em] uppercase mb-4"
        >
          2026 Season
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-bold text-4xl md:text-6xl text-white tracking-tight leading-tight mb-3"
        >
          Tuesday 9 Hole League
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-white/50 text-sm font-semibold tracking-widest uppercase mb-8"
        >
          Season Long Quota Competition
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          <span className="flex items-center gap-2 bg-white/10 border border-white/15 text-white/80 text-xs font-semibold px-4 py-2 rounded-full">
            <Calendar className="size-3.5 text-fob-orange" />
            {TUESDAY_SEASON_START} – {TUESDAY_SEASON_END}
          </span>
          <span className="flex items-center gap-2 bg-white/10 border border-white/15 text-white/80 text-xs font-semibold px-4 py-2 rounded-full">
            <Users className="size-3.5 text-fob-orange" />
            Weekly · Every Tuesday
          </span>
          <span className="flex items-center gap-2 bg-white/10 border border-white/15 text-white/80 text-xs font-semibold px-4 py-2 rounded-full">
            <MapPin className="size-3.5 text-fob-orange" />
            Bellevue Golf Club
          </span>
        </motion.div>

        {/* Rounds progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="inline-flex items-center gap-3 bg-fob-orange/15 border border-fob-orange/30 rounded-full px-5 py-2.5"
        >
          <span className="w-2 h-2 rounded-full bg-fob-orange animate-pulse" />
          <span className="text-fob-orange text-xs font-bold tracking-wider uppercase">
            Round {completedRounds} of 14 Complete
          </span>
        </motion.div>
      </div>
    </section>
  );
}
