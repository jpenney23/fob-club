'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { leagueSlots } from '@/lib/data/schedule';

const statusColor: Record<string, string> = {
  confirmed: 'bg-green-500/20 text-green-400',
  pending: 'bg-yellow-500/20 text-yellow-400',
  open: 'bg-gray-500/20 text-gray-400',
  locked: 'bg-blue-500/20 text-blue-400',
};

export default function SchedulePreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const upcoming = leagueSlots.filter(s => s.status !== 'locked').slice(0, 4);

  return (
    <section className="bg-background py-12 md:py-20 border-t border-gray-100 dark:border-white/8" ref={ref}>
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-fob-orange text-xs font-bold tracking-[0.25em] uppercase mb-3">2026 Season</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-fob-dark-navy dark:text-white tracking-tight">
            Upcoming Rounds
          </h2>
          <div className="fob-accent-bar mx-auto" />
        </motion.div>

        <div className="space-y-3 mb-8">
          {upcoming.map((slot, i) => (
            <motion.div
              key={slot.id}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card border border-gray-100 dark:border-white/10 rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="text-center bg-fob-orange/10 rounded-lg px-3 py-2 min-w-[52px]">
                  <p className="text-fob-orange font-black text-lg leading-none">{slot.round}</p>
                  <p className="text-fob-orange/60 text-[9px] font-bold uppercase tracking-wider">Round</p>
                </div>
                <div>
                  <p className="font-bold text-fob-dark-navy dark:text-white text-sm">{slot.dateDisplay}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    <MapPin className="size-3" />
                    <span>{slot.club !== 'TBD' ? slot.club : 'Club TBD'}</span>
                    {slot.host && <span className="text-gray-400">· Host: {slot.host}</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {slot.teeTimeWindow !== 'TBD' && (
                  <span className="text-xs text-gray-400 dark:text-gray-500">{slot.teeTimeWindow}</span>
                )}
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${statusColor[slot.status]}`}>
                  {slot.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/schedule" className="btn-outline-gold touch-manipulation">
            Full Schedule
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
