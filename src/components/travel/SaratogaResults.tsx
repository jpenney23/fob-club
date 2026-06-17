'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Crown, Trophy, Users, Flag, Layers } from 'lucide-react';
import { featuredEvent } from '@/lib/data/travel';

const PLACE_MEDAL: Record<string, string> = {
  '1st': '🥇', 'T1': '🥇',
  '2nd': '🥈', 'T2': '🥈',
  '3rd': '🥉', 'T3': '🥉',
};

function fmtScore(score: number): string {
  if (score === 0) return 'E';
  return score > 0 ? `+${score}` : `${score}`;
}

export default function SaratogaResults() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const e = featuredEvent;

  const stats = [
    { icon: Users, value: e.summary.players, label: 'Players' },
    { icon: Trophy, value: e.summary.teams, label: '2-Man Teams' },
    { icon: Layers, value: e.summary.flights, label: 'Flights' },
    { icon: Flag, value: e.summary.rounds, label: 'Rounds' },
  ];

  return (
    <section className="bg-background py-12 md:py-16" ref={ref}>
      <div className="mx-auto max-w-5xl px-6 lg:px-8">

        {/* Champion banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-fob-dark-navy border border-fob-orange/30 p-8 md:p-12 text-center shadow-lg"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(201,168,76,0.18)_0%,transparent_70%)]" />
          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-fob-orange/15 border border-fob-orange/40 flex items-center justify-center">
                <Crown className="size-7 text-fob-orange" />
              </div>
            </div>
            <p className="text-fob-orange text-[11px] font-black uppercase tracking-[0.3em] mb-3">
              {e.year} Saratoga Invitational Champions
            </p>
            <p className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight mb-2">
              🏆 {e.champions.team}
            </p>
            <div className="fob-divider my-5"><div className="fob-divider-diamond" /></div>
            <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.25em] mb-1">Runner-Up</p>
            <p className="text-white/90 font-display font-bold text-lg md:text-xl">🥈 {e.runnerUp.team}</p>
          </div>
        </motion.div>

        {/* Tournament summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6"
        >
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-card border border-gray-100 dark:border-white/10 p-5 text-center shadow-sm">
              <s.icon className="size-5 text-fob-orange mx-auto mb-2" />
              <p className="font-display font-black text-2xl md:text-3xl text-fob-dark-navy dark:text-white">{s.value}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Flight results */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <p className="text-fob-orange text-xs font-bold tracking-[0.25em] uppercase mb-2">Flight Results</p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-fob-dark-navy dark:text-white tracking-tight">
              Four Flights · Seven Teams Each
            </h2>
            <div className="fob-accent-bar mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {e.flights.map((flight, fi) => (
              <motion.div
                key={flight.flight}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + fi * 0.08 }}
                className="rounded-2xl bg-card border border-gray-100 dark:border-white/10 overflow-hidden shadow-sm"
              >
                <div className="bg-fob-dark-navy px-5 py-3.5">
                  <p className="text-fob-orange text-[11px] font-black uppercase tracking-[0.2em]">Flight {flight.flight}</p>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-white/8">
                  {flight.teams.map((t, ti) => {
                    const medal = PLACE_MEDAL[t.place];
                    const top = ti === 0;
                    return (
                      <div
                        key={`${t.names}-${ti}`}
                        className={`flex items-center gap-3 px-5 py-3.5 ${top ? 'bg-yellow-400/6 dark:bg-yellow-400/8' : ''}`}
                      >
                        <span className="w-9 text-center text-base">
                          {medal ?? <span className="text-xs font-bold text-gray-400">{t.place}</span>}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className={`font-semibold text-sm truncate ${top ? 'text-fob-dark-navy dark:text-white' : 'text-gray-700 dark:text-gray-200'}`}>
                            {t.names}
                          </p>
                          {t.tiebreak && (
                            <p className="text-[10px] text-gray-400 dark:text-gray-500">Tiebreaker applied</p>
                          )}
                        </div>
                        <span className={`font-black text-sm tabular-nums ${top ? 'text-fob-orange' : 'text-gray-500 dark:text-gray-400'}`}>
                          {fmtScore(t.score)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Championship playoff */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 rounded-2xl bg-card border border-gray-100 dark:border-white/10 p-7 md:p-9 shadow-sm"
        >
          <div className="text-center mb-7">
            <Trophy className="size-6 text-fob-orange mx-auto mb-2" />
            <p className="text-fob-orange text-xs font-bold tracking-[0.25em] uppercase mb-1">Championship Playoff</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              The four flight champions advanced to play for the overall Saratoga Invitational title.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {e.playoffTeams.map((p) => {
              const isChamp = p.team === e.champions.team || e.champions.team.includes(p.team.split(' & ')[0]);
              return (
                <div
                  key={p.team}
                  className={`rounded-xl p-4 text-center border-2 ${
                    isChamp
                      ? 'border-fob-orange bg-fob-orange/10'
                      : 'border-gray-100 dark:border-white/10 bg-gray-50/60 dark:bg-white/5'
                  }`}
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1.5">
                    Flight {p.flight}
                  </p>
                  <p className="font-bold text-sm text-fob-dark-navy dark:text-white leading-tight">{p.team}</p>
                  {isChamp && <p className="text-fob-orange text-[11px] font-black uppercase tracking-wider mt-2">🏆 Champion</p>}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Notes */}
        {e.notes && e.notes.length > 0 && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 space-y-2 max-w-2xl mx-auto"
          >
            {e.notes.map((note, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-500 dark:text-gray-400">
                <span className="text-fob-orange mt-1.5 shrink-0 w-1 h-1 rounded-full bg-fob-orange" />
                <span>{note}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </div>
    </section>
  );
}
