'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Had the greatest experience at Kernwood last year. Fantastic course with a great group of guys!! Can't wait for this season!!",
    name: "Bill Redler",
    role: "Member",
    initials: "BR",
  },
  {
    quote: "Boca Grove and St. Andrews in the Winter League — fantastic courses. St. Andrews is rated #8 most expensive in Florida, and I heard Adios (#4 most expensive) could be on the calendar this winter's Florida League. All great experiences of a lifetime!! Can't wait to go next year.",
    name: "Mark Cassino",
    role: "Winter League · March 2026",
    initials: "MC",
  },
  {
    quote: "What a great season last year — the hospitality of all hosts was overwhelming with premier golf courses like Nashua CC and Kernwood CC. Great experiences with a great group of guys.",
    name: "Tony Iuliano",
    role: "Member",
    initials: "TI",
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="bg-background py-12 md:py-24 border-t border-gray-100 dark:border-white/8" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-fob-orange text-xs font-bold tracking-[0.25em] uppercase mb-3">From Our Members</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-fob-dark-navy dark:text-white tracking-tight">
            Why We Show Up
          </h2>
          <div className="fob-accent-bar mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="bg-card border border-gray-100 dark:border-white/10 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow"
            >
              <Quote className="size-8 text-fob-orange/60 mb-4" />
              <p className="text-gray-700 dark:text-white/85 text-base leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fob-orange/30 to-fob-orange/10 border border-fob-orange/30 flex items-center justify-center">
                  <span className="text-fob-orange font-black text-xs">{t.initials}</span>
                </div>
                <div>
                  <p className="text-fob-dark-navy dark:text-white font-bold text-sm">{t.name}</p>
                  <p className="text-gray-500 dark:text-white/50 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
