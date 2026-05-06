'use client';

import { motion } from 'framer-motion';
import { leagueSlots, LeagueSlot } from '@/lib/data/schedule';
import StatusBadge from './StatusBadge';

const statusDot: Record<string, string> = {
  open:      'bg-green-500',
  pending:   'bg-yellow-500',
  confirmed: 'bg-blue-500',
  locked:    'bg-red-500',
};

const months = [
  { name: 'June',      year: 2026, month: 5 },
  { name: 'July',      year: 2026, month: 6 },
  { name: 'August',    year: 2026, month: 7 },
  { name: 'September', year: 2026, month: 8 },
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function getSlotForDate(year: number, month: number, day: number): LeagueSlot | undefined {
  const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  return leagueSlots.find((s) => s.date === iso);
}

export default function CalendarView() {
  return (
    <div className="space-y-8">
      {months.map((m, mi) => {
        const daysInMonth = getDaysInMonth(m.year, m.month);
        const firstDay = getFirstDayOfMonth(m.year, m.month);
        const cells: (number | null)[] = [
          ...Array(firstDay).fill(null),
          ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
        ];
        // pad to full weeks
        while (cells.length % 7 !== 0) cells.push(null);

        return (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: mi * 0.1 }}
            className="bg-card border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm"
          >
            {/* Month header */}
            <div className="bg-fob-dark-navy px-5 py-3 flex items-center justify-between">
              <h3 className="font-display font-bold text-white text-lg">{m.name} {m.year}</h3>
              <span className="text-white/40 text-xs">
                {leagueSlots.filter(s => s.date.startsWith(`${m.year}-${String(m.month + 1).padStart(2, '0')}`)).length} event{leagueSlots.filter(s => s.date.startsWith(`${m.year}-${String(m.month + 1).padStart(2, '0')}`)).length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 border-b border-gray-100 dark:border-white/8">
              {DAYS.map(d => (
                <div key={d} className="py-2 text-center text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7">
              {cells.map((day, ci) => {
                const slot = day ? getSlotForDate(m.year, m.month, day) : undefined;
                const isToday = day
                  ? new Date().toISOString().startsWith(`${m.year}-${String(m.month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`)
                  : false;

                return (
                  <div
                    key={ci}
                    className={`min-h-[44px] sm:min-h-[64px] p-1 sm:p-1.5 border-b border-r border-gray-50 dark:border-white/5 last:border-r-0 ${!day ? 'bg-gray-50/50 dark:bg-white/2' : ''}`}
                  >
                    {day && (
                      <>
                        <span className={`text-[10px] sm:text-xs font-bold w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full mb-0.5 sm:mb-1 ${
                          isToday
                            ? 'bg-fob-orange text-white'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {day}
                        </span>
                        {slot && (
                          <>
                            {/* Mobile: just a colored dot */}
                            <div className={`sm:hidden w-2 h-2 rounded-full mx-auto ${statusDot[slot.status]}`} />
                            {/* Desktop: full label */}
                            <div className={`hidden sm:block rounded-md px-1.5 py-1 ${statusDot[slot.status].replace('bg-', 'bg-').replace('-500', '-100')} dark:bg-white/10`}>
                              <div className="flex items-center gap-1 mb-0.5">
                                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${statusDot[slot.status]}`} />
                                <span className="text-[9px] font-bold uppercase tracking-wide text-gray-700 dark:text-white truncate">
                                  R{slot.round}
                                </span>
                              </div>
                              <p className="text-[9px] text-gray-600 dark:text-gray-300 leading-tight truncate">
                                {slot.club === 'TBD' ? 'Club TBD' : slot.club}
                              </p>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        );
      })}

      {/* Selected event detail on hover — just show all events below */}
      <div className="space-y-3 pt-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">All Events</p>
        {leagueSlots.map((slot) => (
          <div key={slot.id} className="flex items-center gap-4 bg-card border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3">
            <span className="font-display font-bold text-fob-orange text-sm w-6 text-center">{slot.round}</span>
            <div className="w-px h-6 bg-gray-200 dark:bg-white/10" />
            <p className="text-sm font-semibold text-fob-dark-navy dark:text-white flex-1">{slot.dateDisplay}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">{slot.club}</p>
            <StatusBadge status={slot.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
