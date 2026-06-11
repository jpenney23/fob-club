'use client';

import { motion } from 'framer-motion';
import { Crown, Trophy } from 'lucide-react';
import { tuesdayRounds, tuesdaySeasonStandings } from '@/lib/data/tuesday';

const PODIUM_LAYOUT = [
  { order: 'order-1' },
  { order: 'order-2' },
  { order: 'order-3' },
];

const RANK_HEIGHT: Record<string, string> = {
  '1': 'h-32', 'T1': 'h-32',
  '2': 'h-20', 'T2': 'h-20',
  '3': 'h-14', 'T3': 'h-14',
};

const RANK_STYLE: Record<string, { color: string; bg: string; border: string; rowBg: string }> = {
  '1':  { color: 'text-yellow-500',                   bg: 'bg-yellow-400', border: 'border-yellow-400/40', rowBg: 'bg-yellow-50 dark:bg-yellow-400/10' },
  'T1': { color: 'text-yellow-500',                   bg: 'bg-yellow-400', border: 'border-yellow-400/40', rowBg: 'bg-yellow-50 dark:bg-yellow-400/10' },
  '2':  { color: 'text-gray-400 dark:text-gray-300',  bg: 'bg-gray-300 dark:bg-gray-500', border: 'border-gray-300/40', rowBg: 'bg-gray-50 dark:bg-gray-400/10' },
  'T2': { color: 'text-gray-400 dark:text-gray-300',  bg: 'bg-gray-300 dark:bg-gray-500', border: 'border-gray-300/40', rowBg: 'bg-gray-50 dark:bg-gray-400/10' },
  '3':  { color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-600', border: 'border-amber-500/40', rowBg: 'bg-amber-50 dark:bg-amber-600/10' },
  'T3': { color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-600', border: 'border-amber-500/40', rowBg: 'bg-amber-50 dark:bg-amber-600/10' },
};
const FALLBACK_STYLE = { color: 'text-gray-400', bg: 'bg-gray-400', border: 'border-gray-400/40', rowBg: 'bg-gray-50 dark:bg-gray-400/10' };

const RANK_MEDAL: Record<string, string> = {
  '1': '🥇', 'T1': '🥇',
  '2': '🥈', 'T2': '🥈',
  '3': '🥉', 'T3': '🥉',
};

export default function RoundPodium() {
  const latestRound = tuesdayRounds.filter(r => r.completed).at(-1);
  if (!latestRound || tuesdaySeasonStandings.length < 3) return null;

  // Podium reflects season standings — top 3 score groups, tied players share a step
  const scoreGroups = [...new Set(
    tuesdaySeasonStandings.filter(e => e.totalPoints > 0).map(e => e.totalPoints),
  )]
    .sort((a, b) => b - a)
    .slice(0, 3)
    .map((pts, i) => ({
      rank: i + 1,
      pts,
      players: tuesdaySeasonStandings.filter(e => e.totalPoints === pts),
    }));

  // Left to right: 2nd, 1st, 3rd
  const podiumSlots = [scoreGroups[1] ?? null, scoreGroups[0] ?? null, scoreGroups[2] ?? null];
  const slotRanks = [2, 1, 3];

  const first = scoreGroups[0] ?? null;

  // Latest round's top scorer for the round winner card
  const roundWinner = latestRound.results[0] ?? null;


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
            After Round {latestRound.round} · {latestRound.dateDisplay}
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">
            Season Leaders
          </h2>
        </motion.div>

        {/* Podium */}
        <div className="flex items-end justify-center gap-3 sm:gap-6 mb-10">
          {PODIUM_LAYOUT.map((layout, i) => {
            const group = podiumSlots[i];
            const rankNum = slotRanks[i];
            const tied = !!group && group.players.length > 1;
            const ordinal = rankNum === 1 ? '1st' : rankNum === 2 ? '2nd' : '3rd';
            const style = RANK_STYLE[`${rankNum}`] ?? FALLBACK_STYLE;
            const medal = RANK_MEDAL[`${rankNum}`] ?? '🏅';
            const rankLabel = group ? (tied ? `T${rankNum}` : ordinal) : ordinal;
            const barLabel = !group ? 'TBD' : rankNum === 1 ? '🏆 Season Leader' : (tied ? `T${rankNum}` : `${rankNum}`);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`flex flex-col items-center ${layout.order}`}
              >
                <div className="text-center mb-2 px-1">
                  <p className="text-lg sm:text-xl">{medal}</p>
                  {group ? (
                    group.players.map(p => (
                      <p key={p.name} className="font-bold text-xs sm:text-sm text-white leading-tight mt-1 max-w-[90px] sm:max-w-[120px]">
                        {p.name}
                      </p>
                    ))
                  ) : (
                    <p className="font-bold text-xs sm:text-sm text-white leading-tight mt-1 max-w-[90px] sm:max-w-[120px]">
                      TBD
                    </p>
                  )}
                  {group && (
                    <p className={`text-xs font-black mt-0.5 ${style.color}`}>
                      {group.pts % 1 === 0 ? group.pts : group.pts.toFixed(2)} {group.pts === 1 ? 'pt' : 'pts'}
                    </p>
                  )}
                </div>
                <div className={`w-24 sm:w-36 ${RANK_HEIGHT[`${rankNum}`] ?? 'h-14'} rounded-t-xl ${style.rowBg} border-t-2 ${style.border} flex items-center justify-center`}>
                  <p className={`text-xs sm:text-sm font-black ${style.color}`}>{rankLabel}</p>
                </div>
                <div className={`w-24 sm:w-36 py-1.5 rounded-b-xl ${style.bg} flex items-center justify-center`}>
                  <p className="text-[9px] sm:text-[10px] font-black text-white uppercase tracking-wider">{barLabel}</p>
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
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 mb-2">
              {first && first.players.length > 1 ? 'Season Leaders' : 'Season Leader'}
            </p>
            {first ? (
              first.players.map(p => (
                <p key={p.name} className="font-display font-bold text-2xl text-white mb-1">{p.name}</p>
              ))
            ) : (
              <p className="font-display font-bold text-2xl text-white mb-1">TBD</p>
            )}
            {first && (
              <p className="text-fob-orange font-black text-lg">
                {first.pts % 1 === 0 ? first.pts : first.pts.toFixed(2)} {first.pts === 1 ? 'pt' : 'pts'}
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
            <p className="font-display font-bold text-2xl text-white mb-1">{roundWinner?.name ?? 'TBD'}</p>
            <p className="text-fob-orange text-xs font-bold mt-1">{latestRound.dateDisplay} · {latestRound.location}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
