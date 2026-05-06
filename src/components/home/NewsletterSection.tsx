'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';

export default function NewsletterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <section id="newsletter" className="bg-background py-12 md:py-20 border-t border-gray-100 dark:border-white/8" ref={ref}>
      <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="w-12 h-12 rounded-full bg-fob-orange/10 border border-fob-orange/20 flex items-center justify-center mx-auto mb-6">
            <Mail className="size-5 text-fob-orange" />
          </div>
          <p className="text-fob-orange text-xs font-bold tracking-[0.25em] uppercase mb-3">Stay in the Loop</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-fob-dark-navy dark:text-white tracking-tight mb-4">
            League Updates
          </h2>
          <div className="fob-accent-bar mx-auto" />
          <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto mb-8">
            Get notified about round schedules, leaderboard updates, and league announcements.
          </p>

          {submitted ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/40 rounded-xl px-6 py-4 inline-block">
              <p className="text-green-700 dark:text-green-400 font-semibold text-sm">You're on the list! We'll be in touch.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                aria-required="true"
                className="flex-1 rounded-xl border border-gray-200 dark:border-white/20 bg-white dark:bg-white/5 px-4 py-2.5 text-sm text-fob-dark-navy dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-fob-orange/40"
              />
              <button type="submit" className="btn-gold touch-manipulation shrink-0">
                Subscribe
                <ArrowRight className="size-4" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
