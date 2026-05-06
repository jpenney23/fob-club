'use client';

import { motion } from 'framer-motion';
import { Crown, Trophy } from 'lucide-react';
import { leaderboardEntries, tournamentHighlights } from '@/lib/data/leaderboard';

const PODIUM = [
  { place: 2, label: '2nd Place', color: 'text-gray-400', bg: 'bg-gray-300', border: 'border-gray-300/40', rowBg: 'bg-gray-50 dark:bg-gray-400/10', medal: '🥈', height: 'h-20', order: 'order-1' },
  { place: 1, label: '1st Place', color: 'text-yellow-500', bg: 'bg-yellow-400', border: 'border-yellow-400/40', rowBg: 'bg-yellow-50 dark:bg-yellow-400/10', medal: '🥇', height: 'h-32', order: 'order-2' },
  { place: 3, label: '3rd Place', color: 'text-amber-600', bg: 'bg-amber-600', border: 'border-amber-500/40', rowBg: 'bg-amber-50 dark:bg-amber-600/10', medal: '🥉', height: 'h-14', order: 'order-3' },
];

export default function SeasonSpotlight() {
  const leader = leaderboardEntries[0] ?? null;
  const second = leaderboardEntries[1] ?? null;
  const third = leaderboardEntries[2] ?? null;
  const latest = tournamentHighlights[tournamentHighlights.length - 1] ?? null;
  const roundsPlayed = tournamentHighlights.length;
  const hasData = leaderboardEntries.length >= 3;

  const entries = [second, leader, third];

  return (
    <section className="bg-background py-8">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">

        {/* Rounds progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8 justify-center"
        >
          <span className="text-xs text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-widest">
            Season Progress
          </span>
          <div className="flex gap-1.5">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className={`w-6 h-2 rounded-full transition-all ${
                  i < roundsPlayed ? 'bg-fob-orange' : 'bg-gray-200 dark:bg-white/10'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-fob-orange font-black">{roundsPlayed}/8</span>
        </motion.div>

        {/* Podium — top 3 */}
        {hasData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <p className="text-center text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500 mb-6">Current Standings</p>
            <div className="flex items-end justify-center gap-2 sm:gap-4">
              {PODIUM.map((p, i) => {
                const entry = entries[i];
                return (
                  <motion.div
                    key={p.place}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`flex flex-col items-center ${p.order}`}
                  >
                    <div className="text-center mb-2 px-1">
                      <p className="text-sm sm:text-base">{p.medal}</p>
                      <p className="font-bold text-xs sm:text-sm text-fob-dark-navy dark:text-white leading-tight mt-0.5 max-w-[90px] sm:max-w-none">
                        {entry?.name ?? 'TBD'}
                      </p>
                      {entry && (
                        <p className={`text-xs font-black ${p.color}`}>{entry.total}</p>
                      )}
                    </div>
                    <div className={`w-24 sm:w-36 ${p.height} rounded-t-xl ${p.rowBg} border-t-2 ${p.border} flex items-center justify-center`}>
                      <p className={`text-base sm:text-lg font-black ${p.color}`}>{p.label}</p>
                    </div>
                    <div className={`w-24 sm:w-36 py-1.5 rounded-b-xl ${p.bg} flex items-center justify-center`}>
                      <p className="text-[9px] sm:text-[10px] font-black text-white uppercase tracking-wider">{p.place === 1 ? '🏆 Champion' : p.place === 2 ? 'Runner Up' : '3rd Place'}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Spotlight cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Season Leader */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl bg-card border-2 border-fob-orange/60 p-6 text-center shadow-sm"
          >
            <div className="flex justify-center mb-3">
              <div className="w-11 h-11 rounded-full bg-fob-orange/10 border border-fob-orange/20 flex items-center justify-center">
                <Crown className="size-5 text-fob-orange" />
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500 mb-2">Season Leader</p>
            <p className="font-display font-bold text-2xl text-fob-dark-navy dark:text-white mb-1">
              {leader ? leader.name : 'TBD'}
            </p>
            {leader && (
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-xs text-gray-400 dark:text-gray-500">Net Total</span>
                <span className="text-fob-orange font-black text-lg">{leader.total}</span>
              </div>
            )}
            {!leader && <p className="text-gray-400 text-xs mt-1">Season underway</p>}
          </motion.div>

          {/* Latest Winner */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative overflow-hidden rounded-2xl bg-card border border-gray-100 dark:border-white/10 p-6 text-center shadow-sm"
          >
            <div className="flex justify-center mb-3">
              <div className="w-11 h-11 rounded-full bg-fob-orange/10 border border-fob-orange/20 flex items-center justify-center">
                <Trophy className="size-5 text-fob-orange" />
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500 mb-2">Latest Winner</p>
            <p className="font-display font-bold text-2xl text-fob-dark-navy dark:text-white mb-1">
              {latest ? latest.winner : 'TBD'}
            </p>
            {latest ? (
              <div className="mt-2 space-y-0.5">
                <p className="text-xs text-fob-orange font-bold">{latest.club}</p>
                <p className="text-[11px] text-gray-400 dark:text-gray-500">Round {latest.round} · {latest.dateDisplay}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Score: <span className="font-bold text-fob-dark-navy dark:text-white">{latest.winnerScore}</span></p>
              </div>
            ) : (
              <p className="text-gray-400 text-xs mt-1">First round coming soon</p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
