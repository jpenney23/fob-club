'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-fob-dark-navy">
      {/* Background hero image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="FOB Golf League"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-fob-dark-navy/60 via-transparent to-fob-dark-navy/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center py-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="relative w-28 h-28 md:w-36 md:h-36">
            <Image
              src="/images/fob-club-logo.png"
              alt="FOB Golf League"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-fob-orange text-xs font-bold tracking-[0.3em] uppercase mb-4"
        >
          2026 Season
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display font-bold text-5xl md:text-7xl text-white tracking-tight leading-tight mb-6"
        >
          FOB Golf League
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          Greater Boston's premier member golf league. 100 players, 8 rounds across premier courses — season runs June through September.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/schedule" className="btn-gold touch-manipulation">
            View Schedule
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/leaderboard"
            className="btn-outline-gold touch-manipulation"
          >
            View Leaderboard
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
