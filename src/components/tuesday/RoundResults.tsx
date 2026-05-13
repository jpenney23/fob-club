'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Users } from 'lucide-react';
import { tuesdayRounds } from '@/lib/data/tuesday';

const posStyle: Record<string, string> = {
  '1':  'bg-yellow-400/15 text-yellow-600 dark:text-yellow-400 font-black',
  'T2': 'bg-gray-300/15 text-gray-500 dark:text-gray-400 font-bold',
  '2':  'bg-gray-300/15 text-gray-500 dark:text-gray-400 font-bold',
};

export default function RoundResults() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const completedRounds = tuesdayRounds.filter(r => r.completed);
  const [activeRound, setActiveRound] = useState(completedRounds[0]?.round ?? 1);

  if (completedRounds.length === 0) return null;

  const round = tuesdayRounds.find(r => r.round === activeRound)!;

  return (
    <section className="bg-background py-12 md:py-20 border-t border-gray-100 dark:border-white/8" ref={ref}>
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-fob-orange text-xs font-bold tracking-[0.25em] uppercase mb-3">Results</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-fob-dark-navy dark:text-white tracking-tight">
            Round Results
          </h2>
          <div className="fob-accent-bar mx-auto" />
        </motion.div>

        {/* Round tabs */}
        {completedRounds.length > 1 && (
          <div className="flex gap-2 mb-6 flex-wrap justify-center">
            {completedRounds.map(r => (
              <button
                key={r.round}
                onClick={() => setActiveRound(r.round)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${
                  activeRound === r.round
                    ? 'bg-fob-orange text-fob-dark-navy shadow-md'
                    : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 hover:bg-fob-orange/10'
                }`}
              >
                Round {r.round}
              </button>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-card border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm"
        >
          {/* Round header */}
          <div className="bg-fob-dark-navy px-6 py-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-fob-orange text-xs font-bold tracking-widest uppercase mb-1">Round {round.round}</p>
                <h3 className="text-white font-display font-bold text-xl">{round.dateDisplay}</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-1.5 text-white/60 text-xs font-semibold">
                  <MapPin className="size-3.5 text-fob-orange" />{round.location}
                </span>
                {round.playerCount && (
                  <span className="flex items-center gap-1.5 text-white/60 text-xs font-semibold">
                    <Users className="size-3.5 text-fob-orange" />{round.playerCount} Players
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Results table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
                  <th className="py-2.5 pl-5 pr-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 tracking-wider w-14">Pos</th>
                  <th className="py-2.5 px-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 tracking-wider">Player</th>
                  <th className="py-2.5 px-3 text-center text-xs font-bold text-gray-500 dark:text-gray-400 tracking-wider">+/- Quota</th>
                  <th className="py-2.5 px-3 text-center text-xs font-bold text-gray-500 dark:text-gray-400 tracking-wider">Gross</th>
                  <th className="py-2.5 pl-3 pr-5 text-center text-xs font-bold text-fob-orange tracking-wider">Pts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/8">
                {round.results.map((r, i) => (
                  <tr key={i} className={`transition-colors ${i === 0 ? 'bg-yellow-400/6 dark:bg-yellow-400/8' : 'hover:bg-gray-50/70 dark:hover:bg-white/4'}`}>
                    <td className="py-3 pl-5 pr-3">
                      <span className={`inline-block text-xs px-2 py-0.5 rounded-md ${posStyle[r.pos] ?? 'text-gray-400 font-semibold'}`}>
                        {r.pos}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`font-semibold ${i === 0 ? 'text-fob-dark-navy dark:text-white' : 'text-gray-700 dark:text-gray-200'}`}>
                        {r.name}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      {r.quotaDiff !== null ? (
                        <span className={`text-xs font-bold ${r.quotaDiff > 0 ? 'text-green-600 dark:text-green-400' : r.quotaDiff < 0 ? 'text-red-500' : 'text-gray-400'}`}>
                          {r.quotaDiff > 0 ? `+${r.quotaDiff}` : r.quotaDiff}
                        </span>
                      ) : <span className="text-gray-300 dark:text-white/20 text-xs">—</span>}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {r.gross ?? '—'}
                      </span>
                    </td>
                    <td className="py-3 pl-3 pr-5 text-center">
                      <span className={`text-xs font-black ${r.pts > 0 ? 'text-fob-orange' : 'text-gray-300 dark:text-white/20'}`}>
                        {r.pts > 0 ? (r.pts % 1 === 0 ? r.pts : r.pts.toFixed(2)) : '—'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
