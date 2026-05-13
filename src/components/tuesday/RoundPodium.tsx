'use client';

import { motion } from 'framer-motion';
import { Crown, Trophy } from 'lucide-react';
import { tuesdayRounds } from '@/lib/data/tuesday';

const PODIUM = [
  { place: 2, medal: '🥈', color: 'text-gray-400 dark:text-gray-300', bg: 'bg-gray-300 dark:bg-gray-500', border: 'border-gray-300/40', rowBg: 'bg-gray-50 dark:bg-gray-400/10', height: 'h-20', order: 'order-1' },
  { place: 1, medal: '🥇', color: 'text-yellow-500',                   bg: 'bg-yellow-400',                  border: 'border-yellow-400/40', rowBg: 'bg-yellow-50 dark:bg-yellow-400/10', height: 'h-32', order: 'order-2' },
  { place: 3, medal: '🥉', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-600',                  border: 'border-amber-500/40',  rowBg: 'bg-amber-50 dark:bg-amber-600/10',  height: 'h-14', order: 'order-3' },
];

const placeLabel: Record<number, string> = { 1: '🏆 Round Winner', 2: 'Runner Up', 3: '3rd Place' };

export default function RoundPodium() {
  const latestRound = tuesdayRounds.filter(r => r.completed).at(-1);
  if (!latestRound || latestRound.results.length < 3) return null;

  const scorers = latestRound.results.filter(r => r.pts > 0);
  const first  = scorers[0] ?? null;
  const second = scorers[1] ?? null;
  const third  = scorers[2] ?? null;
  const podiumEntries = [second, first, third];


  return (
    <section className="bg-fob-dark-navy py-12 md:py-16 border-t border-white/8">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-fob-orange text-xs font-bold tracking-[0.25em] uppercase mb-2">
            Round {latestRound.round} · {latestRound.dateDisplay}
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">
            Round Winners
          </h2>
        </motion.div>

        {/* Podium */}
        <div className="flex items-end justify-center gap-3 sm:gap-6 mb-10">
          {PODIUM.map((p, i) => {
            const entry = podiumEntries[i];
            return (
              <motion.div
                key={p.place}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`flex flex-col items-center ${p.order}`}
              >
                <div className="text-center mb-2 px-1">
                  <p className="text-lg sm:text-xl">{p.medal}</p>
                  <p className="font-bold text-xs sm:text-sm text-white leading-tight mt-1 max-w-[90px] sm:max-w-[120px]">
                    {entry?.name ?? 'TBD'}
                  </p>
                  {entry && (
                    <p className={`text-xs font-black mt-0.5 ${p.color}`}>
                      {entry.pts % 1 === 0 ? entry.pts : entry.pts.toFixed(2)} pts
                    </p>
                  )}

                </div>
                <div className={`w-24 sm:w-36 ${p.height} rounded-t-xl ${p.rowBg} border-t-2 ${p.border} flex items-center justify-center`}>
                  <p className={`text-xs sm:text-sm font-black ${p.color}`}>{p.place === 1 ? '1st' : p.place === 2 ? '2nd' : '3rd'}</p>
                </div>
                <div className={`w-24 sm:w-36 py-1.5 rounded-b-xl ${p.bg} flex items-center justify-center`}>
                  <p className="text-[9px] sm:text-[10px] font-black text-white uppercase tracking-wider">{placeLabel[p.place]}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Spotlight cards — season leader + round winner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl bg-white/5 border-2 border-fob-orange/50 p-6 text-center"
          >
            <div className="flex justify-center mb-3">
              <div className="w-10 h-10 rounded-full bg-fob-orange/15 border border-fob-orange/30 flex items-center justify-center">
                <Crown className="size-4 text-fob-orange" />
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 mb-2">Season Leader</p>
            <p className="font-display font-bold text-2xl text-white mb-1">{first?.name ?? 'TBD'}</p>
            {first && (
              <p className="text-fob-orange font-black text-lg">
                {first.pts % 1 === 0 ? first.pts : first.pts.toFixed(2)} pts
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-2xl bg-white/5 border border-white/10 p-6 text-center"
          >
            <div className="flex justify-center mb-3">
              <div className="w-10 h-10 rounded-full bg-fob-orange/15 border border-fob-orange/30 flex items-center justify-center">
                <Trophy className="size-4 text-fob-orange" />
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 mb-2">Round {latestRound.round} Winner</p>
            <p className="font-display font-bold text-2xl text-white mb-1">{first?.name ?? 'TBD'}</p>
            <p className="text-fob-orange text-xs font-bold mt-1">{latestRound.dateDisplay} · {latestRound.location}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
