'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { tuesdaySeasonStandings, tuesdayRounds, TUESDAY_TOTAL_ROUNDS } from '@/lib/data/tuesday';

const medalStyle: Record<number, { row: string; rank: string; medal: string }> = {
  0: { row: 'bg-yellow-500/8 dark:bg-yellow-400/10', rank: 'text-yellow-500 dark:text-yellow-400', medal: '🥇' },
  1: { row: 'bg-gray-400/6 dark:bg-gray-300/8',      rank: 'text-gray-400',                        medal: '🥈' },
  2: { row: 'bg-amber-600/6 dark:bg-amber-500/8',    rank: 'text-amber-600 dark:text-amber-400',   medal: '🥉' },
};

export default function SeasonStandings() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const completedRounds = tuesdayRounds.filter(r => r.completed);
  const roundLabels = Array.from({ length: TUESDAY_TOTAL_ROUNDS }, (_, i) => `R${i + 1}`);

  return (
    <section className="bg-background py-12 md:py-20 border-t border-gray-100 dark:border-white/8" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-fob-orange text-xs font-bold tracking-[0.25em] uppercase mb-3">Points Table</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-fob-dark-navy dark:text-white tracking-tight">
            Season Standings
          </h2>
          <div className="fob-accent-bar mx-auto" />
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
            {completedRounds.length} of {TUESDAY_TOTAL_ROUNDS} rounds complete · Updated after each Tuesday game
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden shadow-sm"
        >
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-fob-dark-navy text-white">
                  <th className="py-3 pl-5 pr-3 text-left text-xs font-bold tracking-wider w-12">#</th>
                  <th className="py-3 px-3 text-left text-xs font-bold tracking-wider min-w-[180px]">Player</th>
                  {roundLabels.map((label, i) => (
                    <th key={label} className="py-3 px-2 text-center text-xs font-bold tracking-wider w-10">
                      <span className={i < completedRounds.length ? 'text-fob-orange' : 'text-white/30'}>
                        {label}
                      </span>
                    </th>
                  ))}
                  <th className="py-3 pl-3 pr-5 text-center text-xs font-bold tracking-wider w-16 text-fob-orange">
                    PTS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/8">
                {tuesdaySeasonStandings.map((entry, i) => {
                  const medal = medalStyle[i];
                  return (
                    <tr
                      key={entry.name}
                      className={`transition-colors hover:bg-fob-orange/4 ${medal?.row ?? (i % 2 === 0 ? 'bg-white dark:bg-transparent' : 'bg-gray-50/60 dark:bg-white/3')}`}
                    >
                      <td className="py-3 pl-5 pr-3">
                        {medal ? (
                          <span className="text-base">{medal.medal}</span>
                        ) : (
                          <span className="text-xs font-bold text-gray-400">{i + 1}</span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`font-semibold text-sm ${medal ? 'text-fob-dark-navy dark:text-white' : 'text-gray-700 dark:text-gray-200'}`}>
                          {entry.name}
                        </span>
                      </td>
                      {entry.roundPoints.map((pts, ri) => (
                        <td key={ri} className="py-3 px-2 text-center">
                          {pts !== null ? (
                            <span className={`text-xs font-bold ${pts > 0 ? 'text-fob-orange' : 'text-gray-400 dark:text-gray-600'}`}>
                              {pts % 1 === 0 ? pts : pts.toFixed(2)}
                            </span>
                          ) : ri < completedRounds.length ? (
                            <span className="text-xs text-gray-300 dark:text-white/20">—</span>
                          ) : (
                            <span className="text-xs text-gray-200 dark:text-white/10">·</span>
                          )}
                        </td>
                      ))}
                      <td className="py-3 pl-3 pr-5 text-center">
                        <span className={`text-sm font-black ${medal ? 'text-fob-orange' : 'text-fob-dark-navy dark:text-white'}`}>
                          {entry.totalPoints % 1 === 0 ? entry.totalPoints : entry.totalPoints.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile table — rank, name, total only */}
          <div className="md:hidden">
            <div className="grid grid-cols-[40px_1fr_60px] bg-fob-dark-navy text-white text-xs font-bold tracking-wider px-4 py-3">
              <span>#</span>
              <span>Player</span>
              <span className="text-right text-fob-orange">PTS</span>
            </div>
            {tuesdaySeasonStandings.map((entry, i) => {
              const medal = medalStyle[i];
              return (
                <div
                  key={entry.name}
                  className={`grid grid-cols-[40px_1fr_60px] items-center px-4 py-3 border-t border-gray-100 dark:border-white/8 ${medal?.row ?? (i % 2 === 0 ? '' : 'bg-gray-50/60 dark:bg-white/3')}`}
                >
                  <span>
                    {medal ? (
                      <span className="text-base">{medal.medal}</span>
                    ) : (
                      <span className="text-xs font-bold text-gray-400">{i + 1}</span>
                    )}
                  </span>
                  <span className="text-sm font-semibold text-fob-dark-navy dark:text-white truncate">{entry.name}</span>
                  <span className={`text-sm font-black text-right ${entry.totalPoints > 0 ? 'text-fob-orange' : 'text-gray-400'}`}>
                    {entry.totalPoints % 1 === 0 ? entry.totalPoints : entry.totalPoints.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 px-5 py-3 bg-gray-50 dark:bg-white/3 border-t border-gray-100 dark:border-white/8">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-fob-orange" />
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">Completed round</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-gray-300 dark:text-white/20 text-sm font-bold leading-none">·</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">Upcoming</span>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <Trophy className="size-3 text-fob-orange" />
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">Season Long Competition</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
