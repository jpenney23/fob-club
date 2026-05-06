'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function LeaderboardHero() {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden bg-background">
      <div className="absolute inset-0 hidden dark:block bg-[radial-gradient(ellipse_80%_80%_at_50%_40%,#1C3D2A_0%,#0F2318_100%)]" />
      <div className="absolute inset-0 dark:hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_40%,#f0f4f0_0%,#ffffff_100%)]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex justify-center"
        >
          <div className="relative w-20 h-20">
            <Image src="/images/logo.png" alt="Friends of Bellevue" fill className="object-contain dark:drop-shadow-2xl" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-fob-orange text-xs font-bold tracking-[0.3em] uppercase mb-3"
        >
          FOB League 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="font-display font-bold text-4xl md:text-6xl text-fob-dark-navy dark:text-white tracking-tight mb-4"
        >
          Leaderboard
        </motion.h1>

        <div className="fob-divider mb-4"><div className="fob-divider-diamond" /></div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-fob-dark-navy/50 dark:text-white/60 text-xs tracking-[0.25em] uppercase"
        >
          Season Standings &nbsp;·&nbsp; Tournament Results &nbsp;·&nbsp; Top Players
        </motion.p>
      </div>
    </section>
  );
}
