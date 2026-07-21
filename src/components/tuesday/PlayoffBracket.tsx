'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Swords } from 'lucide-react';
import {
  tuesdaySession1Standings,
  tuesdaySession2Standings,
  FOB_CUP_CHAMPIONSHIP,
} from '@/lib/data/tuesday';

interface Seed {
  name: string;
  seedLabel: string;
  qualified: boolean;
}

function SeedRow({ seed }: { seed: Seed }) {
  return (
    <div
      className={`flex items-center justify-between gap-3 px-4 py-3 ${
        seed.qualified ? 'bg-white/[0.07]' : 'bg-white/[0.02]'
      }`}
    >
      <div className="min-w-0">
        <p className={`font-bold text-sm truncate ${seed.qualified ? 'text-white' : 'text-white/40'}`}>
          {seed.name}
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-fob-orange/70">{seed.seedLabel}</p>
      </div>
      {seed.qualified ? (
        <span className="shrink-0 text-[9px] font-black uppercase tracking-wider text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-0.5 rounded-full">
          In
        </span>
      ) : (
        <span className="shrink-0 text-[9px] font-black uppercase tracking-wider text-white/30 bg-white/5 px-2 py-0.5 rounded-full">
          TBD
        </span>
      )}
    </div>
  );
}

function MatchCard({
  tag,
  title,
  seeds,
  caption,
  delay,
  isInView,
}: {
  tag: string;
  title: string;
  seeds: Seed[];
  caption?: string;
  delay: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.03]"
    >
      <div className="flex items-center justify-between px-4 py-2.5 bg-fob-orange/10 border-b border-white/10">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-fob-orange">{tag}</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-white/40">{title}</span>
      </div>
      <div className="divide-y divide-white/10">
        <SeedRow seed={seeds[0]} />
        <div className="flex items-center justify-center py-1 bg-fob-dark-navy">
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">vs</span>
        </div>
        <SeedRow seed={seeds[1]} />
      </div>
      {caption && (
        <p className="px-4 py-2 text-[10px] text-white/40 bg-white/[0.02] border-t border-white/10">{caption}</p>
      )}
    </motion.div>
  );
}

export default function PlayoffBracket() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const [s1First, s1Second] = tuesdaySession1Standings;
  const s2Leader = tuesdaySession2Standings.find(e => e.totalPoints > 0);

  const semifinal1: Seed[] = [
    { name: s1First?.name ?? 'Session 1 Champion', seedLabel: 'Session 1 · 1st', qualified: !!s1First },
    { name: s1Second?.name ?? 'Session 1 Runner-Up', seedLabel: 'Session 1 · 2nd', qualified: !!s1Second },
  ];

  const semifinal2: Seed[] = [
    { name: 'Session 2 Champion', seedLabel: 'Session 2 · 1st', qualified: false },
    { name: 'Session 2 Runner-Up', seedLabel: 'Session 2 · 2nd', qualified: false },
  ];

  return (
    <section className="bg-fob-dark-navy py-14 md:py-20 border-t border-white/8" ref={ref}>
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-fob-orange text-xs font-bold tracking-[0.25em] uppercase mb-3">The Road to the Cup</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white tracking-tight">
            2026 FOB Cup Playoffs
          </h2>
          <p className="text-white/50 text-sm mt-3">
            Four-player championship · {FOB_CUP_CHAMPIONSHIP} · Bellevue Golf Club
          </p>
        </motion.div>

        {/* Bracket */}
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-4 items-center">
          {/* Semifinals */}
          <div className="flex flex-col gap-6">
            <MatchCard
              tag="Semifinal 1"
              title="Session 1"
              seeds={semifinal1}
              delay={0.1}
              isInView={isInView}
            />
            <MatchCard
              tag="Semifinal 2"
              title="Session 2"
              seeds={semifinal2}
              caption={s2Leader ? `Session 2 leader so far: ${s2Leader.name}` : undefined}
              delay={0.2}
              isInView={isInView}
            />
          </div>

          {/* Connector */}
          <div className="hidden md:flex flex-col items-center justify-center text-white/30">
            <Swords className="size-6 text-fob-orange/50" />
            <span className="text-[9px] font-black uppercase tracking-widest mt-2">Winners<br />Advance</span>
          </div>

          {/* Championship */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="rounded-2xl border-2 border-fob-orange/50 bg-fob-orange/[0.06] p-6 text-center"
          >
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 rounded-full bg-fob-orange/15 border border-fob-orange/30 flex items-center justify-center">
                <Trophy className="size-5 text-fob-orange" />
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 mb-2">Championship Match</p>
            <p className="font-display font-bold text-2xl text-white mb-1">FOB Cup Champion</p>
            <p className="text-white/50 text-xs leading-relaxed mt-2">
              A final 9-hole match play showdown to crown our inaugural FOB Cup Champion.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
              <Trophy className="size-3 text-fob-orange" />
              <span className="text-[11px] font-bold text-white/70">{FOB_CUP_CHAMPIONSHIP}</span>
            </div>
          </motion.div>
        </div>

        <p className="text-center text-white/30 text-xs mt-8 max-w-xl mx-auto">
          Session 1 winners <span className="text-white/60 font-semibold">{s1First?.name}</span> and{' '}
          <span className="text-white/60 font-semibold">{s1Second?.name}</span> have clinched their spots. The top two
          finishers in Session 2 complete the four-player bracket.
        </p>
      </div>
    </section>
  );
}
