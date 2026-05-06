'use client';

import { motion } from 'framer-motion';
import { leaderboardEntries } from '@/lib/data/leaderboard';

const ROUNDS = [1, 2, 3, 4, 5, 6, 7, 8];

const medals: Record<number, { bg: string; text: string; border: string; row: string; label: string }> = {
  1: { bg: 'bg-yellow-400', text: 'text-yellow-900', border: 'border-l-yellow-400', row: 'bg-yellow-50/60 dark:bg-yellow-400/5',  label: '🥇' },
  2: { bg: 'bg-gray-300',   text: 'text-gray-800',   border: 'border-l-slate-400',  row: 'bg-gray-50/60 dark:bg-gray-400/5',     label: '🥈' },
  3: { bg: 'bg-amber-600',  text: 'text-white',      border: 'border-l-amber-600',  row: 'bg-amber-50/60 dark:bg-amber-600/5',   label: '🥉' },
};

function getBestRound(scores: (number | null)[]): number | null {
  const played = scores.filter((s): s is number => s !== null);
  return played.length ? Math.min(...played) : null;
}

export default function StandingsTable() {
  const isEmpty = leaderboardEntries.length === 0;

  return (
    <section className="bg-background py-10 pb-24 border-t border-gray-100 dark:border-white/8">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">

        <div className="text-center mb-8">
          <p className="text-fob-orange text-xs font-bold tracking-[0.25em] uppercase mb-2">2026 Season</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-fob-dark-navy dark:text-white tracking-tight">
            Season Standings
          </h2>
          <div className="fob-accent-bar mx-auto" />
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">Net scores · Lower is better · Updated after each event</p>
        </div>

        {isEmpty ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-card border border-gray-100 dark:border-white/10 rounded-2xl"
          >
            <p className="text-5xl mb-4">🏌️</p>
            <p className="font-display font-bold text-xl text-fob-dark-navy dark:text-white mb-2">Season kicks off June 2026</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Check back after Round 1 — standings update after every event.</p>
          </motion.div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-fob-dark-navy">
                    <th className="px-4 py-3.5 text-left text-[10px] font-black uppercase tracking-widest text-white/60 w-14">#</th>
                    <th className="px-4 py-3.5 text-left text-[10px] font-black uppercase tracking-widest text-white/60">Player</th>
                    {ROUNDS.map(r => (
                      <th key={r} className="px-3 py-3.5 text-center text-[10px] font-black uppercase tracking-widest text-white/60">R{r}</th>
                    ))}
                    <th className="px-3 py-3.5 text-center text-[10px] font-black uppercase tracking-widest text-white/40">Best</th>
                    <th className="px-4 py-3.5 text-center text-[10px] font-black uppercase tracking-widest text-fob-orange">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardEntries.map((entry, i) => {
                    const medal = medals[entry.rank];
                    const best = getBestRound(entry.scores);
                    return (
                      <motion.tr
                        key={entry.name}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.04 }}
                        className={`group border-b border-gray-50 dark:border-white/5 last:border-0 hover:brightness-95 transition-all ${
                          medal ? `border-l-4 ${medal.border} ${medal.row}` : 'bg-card border-l-4 border-l-transparent'
                        }`}
                      >
                        <td className="px-4 py-3.5">
                          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-black ${
                            medal ? `${medal.bg} ${medal.text}` : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400'
                          }`}>
                            {entry.rank}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="font-bold text-fob-dark-navy dark:text-white">{entry.name}</span>
                          {entry.rank <= 3 && <span className="ml-2 text-base">{medal.label}</span>}
                        </td>
                        {ROUNDS.map((_, ri) => (
                          <td key={ri} className="px-3 py-3.5 text-center">
                            {entry.scores[ri] != null ? (
                              <span className={`font-semibold ${
                                entry.scores[ri] === best ? 'text-fob-orange font-black' : 'text-gray-600 dark:text-gray-300'
                              }`}>
                                {entry.scores[ri]}
                              </span>
                            ) : (
                              <span className="text-gray-200 dark:text-white/15 text-xs">—</span>
                            )}
                          </td>
                        ))}
                        <td className="px-3 py-3.5 text-center text-xs font-bold text-gray-400 dark:text-gray-500">
                          {best ?? '—'}
                        </td>
                        <td className="px-4 py-3.5 text-center font-black text-fob-orange text-base">{entry.total}</td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-2">
              {leaderboardEntries.map((entry, i) => {
                const medal = medals[entry.rank];
                const best = getBestRound(entry.scores);
                return (
                  <motion.div
                    key={entry.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    className={`rounded-xl px-4 py-3.5 flex items-center gap-4 shadow-sm ${
                      medal ? `border-l-4 ${medal.border} ${medal.row} border border-gray-100 dark:border-white/10` : 'bg-card border border-gray-100 dark:border-white/10'
                    }`}
                  >
                    <span className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-black flex-shrink-0 ${
                      medal ? `${medal.bg} ${medal.text}` : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400'
                    }`}>
                      {entry.rank}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-fob-dark-navy dark:text-white truncate">{entry.name}</p>
                      <p className="text-[11px] text-gray-400 dark:text-gray-500">Best: {best ?? '—'}</p>
                    </div>
                    <p className="font-black text-fob-orange text-xl">{entry.total}</p>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
