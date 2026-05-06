'use client';

import { motion } from 'framer-motion';

const stats = [
  { value: '100', label: 'Players' },
  { value: '8', label: 'Rounds' },
  { value: '6+', label: 'Premier Courses' },
  { value: '2019', label: 'Est.' },
];

export default function LeagueStats() {
  return (
    <section className="bg-fob-dark-navy border-b border-white/10 py-8">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center px-4 py-2"
            >
              <p className="font-display font-black text-3xl md:text-4xl text-fob-orange">{stat.value}</p>
              <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
