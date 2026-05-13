'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ClipboardList, Zap, Globe } from 'lucide-react';

const scoringExample = [
  { place: '1st', pts: 5, highlight: true },
  { place: '2nd', pts: 4, highlight: false },
  { place: '3rd', pts: 3, highlight: false },
  { place: '4th', pts: 2, highlight: false },
  { place: '5th', pts: 1, highlight: false },
  { place: 'All others', pts: 0, highlight: false },
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
            League Format
          </h2>
          <div className="fob-accent-bar mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Scoring */}
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
              <h3 className="font-bold text-fob-dark-navy dark:text-white">Scoring Format</h3>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-xs mb-4 leading-relaxed">
              Points available each week = number of foursomes. Scale adjusts proportionally with turnout.
            </p>
            <div className="space-y-1.5 mb-4">
              {scoringExample.map(row => (
                <div
                  key={row.place}
                  className={`flex justify-between items-center px-3 py-1.5 rounded-lg text-xs font-semibold ${
                    row.highlight
                      ? 'bg-fob-orange/15 text-fob-dark-navy dark:text-white border border-fob-orange/20'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  <span>{row.place}</span>
                  <span className={row.pts > 0 ? 'text-fob-orange font-black' : 'text-gray-300 dark:text-white/20'}>
                    {row.pts > 0 ? `${row.pts} pts` : '—'}
                  </span>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-3 text-xs text-gray-500 dark:text-gray-400">
              <p className="font-bold text-gray-700 dark:text-gray-300 mb-1">Example (20 players)</p>
              <p>5 foursomes = <span className="text-fob-orange font-bold">5 pts</span> available</p>
              <p className="mt-1 text-[10px] text-gray-400">18 players = 4.5 pts available</p>
            </div>
          </motion.div>

          {/* Registration & Golf Genius */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 flex flex-col gap-6"
          >
            <div className="bg-card border border-gray-100 dark:border-white/10 rounded-2xl p-6 shadow-sm flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-fob-orange/10 flex items-center justify-center">
                  <Globe className="size-4 text-fob-orange" />
                </div>
                <h3 className="font-bold text-fob-dark-navy dark:text-white">Registration</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
                All players must register weekly via the FOB website. The site handles group organization, participation tracking, weekly leaderboard updates, and season-long standings.
              </p>
              <ul className="grid grid-cols-2 gap-2">
                {['Weekly registration', 'Group organization', 'Participation tracking', 'Season standings'].map(item => (
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
                  <Zap className="size-4 text-fob-orange" />
                </div>
                <h3 className="font-bold text-fob-dark-navy dark:text-white">Golf Genius Integration</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
                Official scoring is submitted directly from the Golf Genius spreadsheet system each week. Results automatically feed the leaderboard and standings.
              </p>
              <ul className="grid grid-cols-2 gap-2">
                {['Weekly leaderboard', 'Season standings', 'Player rankings', 'Participation totals'].map(item => (
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
