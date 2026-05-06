'use client';

import { useState } from 'react';
import { LayoutList, CalendarDays } from 'lucide-react';
import { leagueSlots } from '@/lib/data/schedule';
import SlotCard from './SlotCard';
import StatusBadge from './StatusBadge';
import CalendarView from './CalendarView';

const legend = ['open', 'pending', 'confirmed', 'locked'] as const;

export default function ScheduleGrid() {
  const [view, setView] = useState<'timeline' | 'calendar'>('timeline');

  return (
    <section className="bg-background py-12 pb-24 border-t border-gray-100 dark:border-white/8">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-fob-orange text-xs font-bold tracking-[0.25em] uppercase mb-2">June – September 2026</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-fob-dark-navy dark:text-white tracking-tight">
            2026 League Schedule
          </h2>
          <div className="fob-accent-bar mx-auto" />
        </div>

        {/* View toggle + Legend */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-3">
            {legend.map((status) => (
              <StatusBadge key={status} status={status} />
            ))}
          </div>

          <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-white/10 rounded-lg">
            <button
              onClick={() => setView('timeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                view === 'timeline'
                  ? 'bg-card shadow text-fob-dark-navy dark:text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <LayoutList className="size-3.5" />
              Timeline
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                view === 'calendar'
                  ? 'bg-card shadow text-fob-dark-navy dark:text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <CalendarDays className="size-3.5" />
              Calendar
            </button>
          </div>
        </div>

        {/* Views */}
        {view === 'timeline' ? (
          <div>
            {leagueSlots.map((slot, i) => (
              <SlotCard key={slot.id} slot={slot} index={i} />
            ))}
          </div>
        ) : (
          <CalendarView />
        )}
      </div>
    </section>
  );
}
