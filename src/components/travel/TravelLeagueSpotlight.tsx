'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Crown, MapPin, ArrowRight } from 'lucide-react';
import { featuredEvent } from '@/lib/data/travel';

export default function TravelLeagueSpotlight() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const e = featuredEvent;

  return (
    <section className="bg-fob-dark-navy py-12 md:py-20 border-t border-white/8" ref={ref}>
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-fob-orange text-xs font-bold tracking-[0.25em] uppercase mb-3">Travel League</p>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight">
            {e.name} {e.year}
          </h2>
          <div className="fob-accent-bar fob-accent-bar-dark mx-auto" />
          <p className="flex items-center justify-center gap-1.5 text-white/50 text-xs font-semibold uppercase tracking-widest mt-3">
            <MapPin className="size-3.5 text-fob-orange" /> {e.venue} · {e.dates}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative overflow-hidden rounded-3xl bg-white/5 border border-fob-orange/30 p-8 md:p-10 text-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(201,168,76,0.15)_0%,transparent_70%)]" />
          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-fob-orange/15 border border-fob-orange/40 flex items-center justify-center">
                <Crown className="size-6 text-fob-orange" />
              </div>
            </div>
            <p className="text-fob-orange text-[11px] font-black uppercase tracking-[0.3em] mb-2">Champions</p>
            <p className="font-display font-bold text-2xl md:text-4xl text-white tracking-tight mb-1">
              🏆 {e.champions.team}
            </p>
            <p className="text-white/60 text-sm">Runner-Up · {e.runnerUp.team}</p>

            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-7 mb-7">
              {[
                { value: e.summary.players, label: 'Players' },
                { value: e.summary.teams, label: 'Teams' },
                { value: e.summary.flights, label: 'Flights' },
                { value: e.summary.rounds, label: 'Rounds' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-display font-black text-2xl md:text-3xl text-fob-orange">{s.value}</p>
                  <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            <Link href="/travel-league" className="btn-gold touch-manipulation">
              View Full Results
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
