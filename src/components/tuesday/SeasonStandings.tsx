'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy } from 'lucide-react';
import {
  tuesdaySessions,
  getTuesdaySession,
  fmtPts,
  type TuesdaySeasonEntry,
} from '@/lib/data/tuesday';
import { useTuesdaySession } from './TuesdaySessionContext';

const medalStyle: Record<string, { row: string; rank: string; medal: string }> = {
  '1':  { row: 'bg-yellow-500/8 dark:bg-yellow-400/10', rank: 'text-yellow-500 dark:text-yellow-400', medal: '🥇' },
  'T1': { row: 'bg-yellow-500/8 dark:bg-yellow-400/10', rank: 'text-yellow-500 dark:text-yellow-400', medal: '🥇' },
  '2':  { row: 'bg-gray-400/6 dark:bg-gray-300/8',      rank: 'text-gray-400',                        medal: '🥈' },
  'T2': { row: 'bg-gray-400/6 dark:bg-gray-300/8',      rank: 'text-gray-400',                        medal: '🥈' },
  '3':  { row: 'bg-amber-600/6 dark:bg-amber-500/8',    rank: 'text-amber-600 dark:text-amber-400',   medal: '🥉' },
  'T3': { row: 'bg-amber-600/6 dark:bg-amber-500/8',    rank: 'text-amber-600 dark:text-amber-400',   medal: '🥉' },
};

function getDisplayRanks(standings: TuesdaySeasonEntry[]): string[] {
  const uniqueScores = [...new Set(standings.map(e => e.totalPoints))].sort((a, b) => b - a);
  return standings.map(entry => {
    const rank  = uniqueScores.indexOf(entry.totalPoints) + 1;
    const equal = standings.filter(e => e.totalPoints === entry.totalPoints).length;
    return equal > 1 ? `T${rank}` : `${rank}`;
  });
}

export default function SeasonStandings() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const { activeSession, setActiveSession } = useTuesdaySession();

  const active = getTuesdaySession(activeSession);
  const { standings, rounds, totalRounds } = active;
  const completedRounds = rounds.filter(r => r.completed);
  const roundLabels = Array.from({ length: totalRounds }, (_, i) => `R${i + 1}`);
  const anyDropped = standings.some(e => e.droppedCount > 0);

  return (
    <section className="bg-background py-12 md:py-20 border-t border-gray-100 dark:border-white/8" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-fob-orange text-xs font-bold tracking-[0.25em] uppercase mb-3">Points Table</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-fob-dark-navy dark:text-white tracking-tight">
            Season Standings
          </h2>
          <div className="fob-accent-bar mx-auto" />
        </motion.div>

        {/* Session toggle */}
        <div className="flex justify-center gap-2 mb-5">
          {tuesdaySessions.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSession(s.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all ${
                activeSession === s.id
                  ? 'bg-fob-orange text-fob-dark-navy shadow-md'
                  : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 hover:bg-fob-orange/10'
              }`}
            >
              {s.label}
              <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                activeSession === s.id
                  ? 'bg-fob-dark-navy/15 text-fob-dark-navy'
                  : s.status === 'Live'
                    ? 'bg-green-500/15 text-green-600 dark:text-green-400'
                    : 'bg-gray-400/15 text-gray-500'
              }`}>
                {s.status}
              </span>
            </button>
          ))}
        </div>

        <p className="text-center text-gray-500 dark:text-gray-400 text-xs mb-6 max-w-xl mx-auto">
          {completedRounds.length} of {totalRounds} rounds · {active.scoringNote}
        </p>

        <motion.div
          key={activeSession}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
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
                {(() => {
                  const displayRanks = getDisplayRanks(standings);
                  return standings.map((entry, i) => {
                    const displayRank = displayRanks[i];
                    const medal = medalStyle[displayRank];
                    return (
                      <tr
                        key={entry.name}
                        className={`transition-colors hover:bg-fob-orange/4 ${medal?.row ?? (i % 2 === 0 ? 'bg-white dark:bg-transparent' : 'bg-gray-50/60 dark:bg-white/3')}`}
                      >
                        <td className="py-3 pl-5 pr-3">
                          {medal ? (
                            <span className="text-base">{medal.medal}</span>
                          ) : (
                            <span className="text-xs font-bold text-gray-400">{displayRank}</span>
                          )}
                        </td>
                        <td className="py-3 px-3">
                          <span className={`font-semibold text-sm ${medal ? 'text-fob-dark-navy dark:text-white' : 'text-gray-700 dark:text-gray-200'}`}>
                            {entry.name}
                          </span>
                          {entry.droppedCount > 0 && (
                            <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-gray-400" title="Two lowest weekly totals dropped (mulligan weeks)">
                              −{entry.droppedCount} drop
                            </span>
                          )}
                        </td>
                        {entry.roundPoints.map((pts, ri) => (
                          <td key={ri} className="py-3 px-2 text-center">
                            {pts !== null ? (
                              <span className={`text-xs font-bold ${pts > 0 ? 'text-fob-orange' : 'text-gray-400 dark:text-gray-600'}`}>
                                {fmtPts(pts)}
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
                            {fmtPts(entry.totalPoints)}
                          </span>
                        </td>
                      </tr>
                    );
                  });
                })()}
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
            {(() => {
              const displayRanks = getDisplayRanks(standings);
              return standings.map((entry, i) => {
                const displayRank = displayRanks[i];
                const medal = medalStyle[displayRank];
                return (
                  <div
                    key={entry.name}
                    className={`grid grid-cols-[40px_1fr_60px] items-center px-4 py-3 border-t border-gray-100 dark:border-white/8 ${medal?.row ?? (i % 2 === 0 ? '' : 'bg-gray-50/60 dark:bg-white/3')}`}
                  >
                    <span>
                      {medal ? (
                        <span className="text-base">{medal.medal}</span>
                      ) : (
                        <span className="text-xs font-bold text-gray-400">{displayRank}</span>
                      )}
                    </span>
                    <span className="text-sm font-semibold text-fob-dark-navy dark:text-white truncate">{entry.name}</span>
                    <span className={`text-sm font-black text-right ${entry.totalPoints > 0 ? 'text-fob-orange' : 'text-gray-400'}`}>
                      {fmtPts(entry.totalPoints)}
                    </span>
                  </div>
                );
              });
            })()}
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
            {anyDropped && (
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">−2 drop</span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">Mulligan weeks</span>
              </div>
            )}
            <div className="ml-auto flex items-center gap-1.5">
              <Trophy className="size-3 text-fob-orange" />
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">FOB Cup Race</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
