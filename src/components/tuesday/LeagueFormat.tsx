'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ClipboardList, Repeat, Award } from 'lucide-react';

// Session 2 FOB Cup scoring: points = finish % × field size, + 1 participation point.
const scoringRows = [
  { place: '1st',      pct: '100%', highlight: true },
  { place: '2nd',      pct: '90%',  highlight: false },
  { place: '3rd',      pct: '80%',  highlight: false },
  { place: '4th–9th',  pct: '−10% each', highlight: false },
  { place: '10th',     pct: '10%',  highlight: false },
  { place: '11th+',    pct: 'participation', highlight: false },
];

export default function LeagueFormat() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section className="bg-background py-12 md:py-20 border-t border-gray-100 dark:border-white/8" ref={ref}>
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-fob-orange text-xs font-bold tracking-[0.25em] uppercase mb-3">How It Works</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-fob-dark-navy dark:text-white tracking-tight">
            FOB Cup Point System
          </h2>
          <div className="fob-accent-bar mx-auto" />
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-4 max-w-2xl mx-auto leading-relaxed">
            Beginning with Session 2, weekly points scale with the size of the field — so a big turnout is
            worth more, and every round you play keeps you in the hunt.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Weekly scoring */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card border border-gray-100 dark:border-white/10 rounded-2xl p-6 shadow-sm md:col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-fob-orange/10 flex items-center justify-center">
                <ClipboardList className="size-4 text-fob-orange" />
              </div>
              <h3 className="font-bold text-fob-dark-navy dark:text-white">Weekly Points</h3>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-xs mb-4 leading-relaxed">
              1st place earns <span className="font-bold text-fob-orange">100% of the field size</span> in points, then
              each place down drops 10% through 10th.
            </p>
            <div className="space-y-1.5 mb-4">
              {scoringRows.map(row => (
                <div
                  key={row.place}
                  className={`flex justify-between items-center px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    row.highlight
                      ? 'bg-fob-orange/15 text-fob-dark-navy dark:text-white border border-fob-orange/20'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  <span>{row.place}</span>
                  <span className={row.highlight ? 'text-fob-orange font-black' : 'text-gray-400 dark:text-gray-300 font-bold'}>
                    {row.pct}
                  </span>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-3 text-xs text-gray-500 dark:text-gray-400">
              <p className="font-bold text-gray-700 dark:text-gray-300 mb-1">Example (8-player field)</p>
              <p>1st = 8 × 100% = <span className="text-fob-orange font-bold">8 pts</span></p>
              <p className="mt-0.5">2nd = 8 × 90% = <span className="text-fob-orange font-bold">7.2 pts</span></p>
              <p className="mt-1 text-[10px] text-gray-400">…plus every player earns +1 participation point.</p>
            </div>
          </motion.div>

          {/* Participation + Mulligans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 flex flex-col gap-6"
          >
            <div className="bg-card border border-gray-100 dark:border-white/10 rounded-2xl p-6 shadow-sm flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-fob-orange/10 flex items-center justify-center">
                  <Award className="size-4 text-fob-orange" />
                </div>
                <h3 className="font-bold text-fob-dark-navy dark:text-white">Participation Point</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
                Every player who tees it up earns <span className="font-bold text-fob-orange">+1 point</span> on top of
                their finish, so simply showing up keeps you climbing the FOB Cup standings.
              </p>
              <ul className="grid grid-cols-2 gap-2">
                {['Rewards strong finishes', 'Rewards consistency', 'Scales with turnout', 'Everyone stays in it'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-fob-orange shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-gray-100 dark:border-white/10 rounded-2xl p-6 shadow-sm flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-fob-orange/10 flex items-center justify-center">
                  <Repeat className="size-4 text-fob-orange" />
                </div>
                <h3 className="font-bold text-fob-dark-navy dark:text-white">Two Mulligan Weeks</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
                Each player gets <span className="font-bold text-fob-orange">two mulligan weeks per session</span>. Your
                two lowest weekly point totals are automatically dropped, so an off week — or a missed Tuesday — won&apos;t
                sink your season.
              </p>
              <ul className="grid grid-cols-2 gap-2">
                {['2 lowest scores dropped', 'Applied automatically', 'Per session, resets each half', 'Miss up to 2 weeks'].map(item => (
                  <li key={item} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-fob-orange shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
