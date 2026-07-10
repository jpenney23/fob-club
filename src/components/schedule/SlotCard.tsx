'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, User, X, Mail, Trophy, ArrowRight } from 'lucide-react';
import { LeagueSlot } from '@/lib/data/schedule';
import StatusBadge from './StatusBadge';

// Venmo universal link — opens the native Venmo app on phones, Venmo web on desktop.
// Payments go to @FOBcharity (Friends of Bellevue).
const VENMO_URL = 'https://venmo.com/code?user_id=4626060889031930260&created=1782919904';

function JoinModal({ slot, onClose }: { slot: LeagueSlot; onClose: () => void }) {
  const registrationOpen = slot.status === 'open';
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
        className="bg-card border border-gray-100 dark:border-white/10 rounded-2xl shadow-2xl w-full max-w-md p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-fob-orange text-xs font-bold tracking-[0.2em] uppercase mb-0.5">Round {slot.round}</p>
            <h3 className="font-display font-bold text-xl text-fob-dark-navy dark:text-white">{slot.dateDisplay}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{slot.club} · {slot.teeTimeWindow}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
            <X className="size-5" />
          </button>
        </div>

        {registrationOpen ? (
          <>
            {/* Registration open — payment goes directly to FOB */}
            <div className="bg-fob-orange/10 border border-fob-orange/30 rounded-xl p-4 mb-5">
              <div className="flex items-center gap-2 mb-1">
                <Mail className="size-4 text-fob-orange" />
                <p className="text-fob-orange font-bold text-xs uppercase tracking-wider">Registration Open</p>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                To lock in your spot, send your payment directly to FOB via Venmo{' '}
                <span className="font-bold text-fob-dark-navy dark:text-white">@FOBcharity</span>
                {' '}and email us your name and the round you&apos;re joining.
              </p>
            </div>

            <a
              href={VENMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full btn-gold text-center mb-3"
            >
              Pay with Venmo — @FOBcharity
            </a>
            <a
              href={`mailto:info@fobcharity.com?subject=${encodeURIComponent(`FOB Registration — ${slot.club} · ${slot.dateDisplay}`)}`}
              className="block w-full btn-outline-gold text-center"
            >
              Email Us Your Registration
            </a>
          </>
        ) : (
          <>
            {/* Coming soon notice */}
            <div className="bg-fob-orange/10 border border-fob-orange/30 rounded-xl p-4 mb-5">
              <div className="flex items-center gap-2 mb-1">
                <Mail className="size-4 text-fob-orange" />
                <p className="text-fob-orange font-bold text-xs uppercase tracking-wider">Registration Opening Soon</p>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Registration for this round isn&apos;t open yet. Contact us to express interest and we&apos;ll get back to you within <span className="font-bold text-fob-dark-navy dark:text-white">24 business hours</span> with everything you need to join.
              </p>
            </div>

            <button onClick={onClose} className="w-full btn-outline-gold">
              Got It
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function SlotCard({ slot, index, total }: { slot: LeagueSlot; index: number; total: number }) {
  const [showModal, setShowModal] = useState(false);
  const canJoin = slot.status === 'open' || slot.status === 'confirmed';

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: index * 0.07 }}
        className="relative flex gap-3 sm:gap-6 pb-8 last:pb-0"
      >
        {/* Timeline dot + spine */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-fob-dark-navy dark:bg-fob-orange/20 border-2 border-fob-orange flex items-center justify-center z-10">
            <span className="text-fob-orange font-black text-xs">{slot.round}</span>
          </div>
          {index < total - 1 && <div className="w-px flex-1 mt-1 bg-fob-orange/20" />}
        </div>

        {/* Card */}
        <div className="relative overflow-hidden flex-1 bg-card border border-gray-100 dark:border-white/10 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow mb-1">
          {/* Sold Out watermark stamp */}
          {slot.status === 'locked' && (
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
              <span className="-rotate-12 rounded-lg border-4 border-red-500/40 px-6 py-2 font-black uppercase tracking-[0.25em] text-3xl sm:text-4xl text-red-500/40 select-none">
                Sold Out
              </span>
            </div>
          )}
          <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
            <div>
              <p className="text-fob-orange text-xs font-bold tracking-[0.2em] uppercase mb-0.5">Round {slot.round}</p>
              <p className="font-display font-bold text-xl text-fob-dark-navy dark:text-white">{slot.dateDisplay}</p>
            </div>
            <StatusBadge status={slot.status} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-fob-orange flex-shrink-0" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">Club</p>
                <p className="text-sm font-semibold text-fob-dark-navy dark:text-white">{slot.club}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <User className="size-4 text-fob-orange flex-shrink-0" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">Host</p>
                <p className="text-sm font-semibold text-fob-dark-navy dark:text-white">{slot.host ?? 'Available'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-fob-orange flex-shrink-0" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">Tee Time</p>
                <p className="text-sm font-semibold text-fob-dark-navy dark:text-white">{slot.teeTimeWindow}</p>
              </div>
            </div>
          </div>

          {slot.notes && (
            <p className="text-xs text-gray-500 dark:text-gray-400 italic border-t border-gray-100 dark:border-white/10 pt-3 mb-4">
              {slot.notes}
            </p>
          )}

          {/* Join button */}
          {canJoin && (
            <div className="border-t border-gray-100 dark:border-white/10 pt-4 flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShowModal(true)}
                className="btn-gold text-xs py-2 px-5"
              >
                Join This Round
              </button>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 italic">
                {slot.status === 'open' ? 'Registration open — payments made directly to FOB' : 'Registration & payment coming soon'}
              </span>
            </div>
          )}

          {slot.status === 'locked' && (
            <div className="border-t border-gray-100 dark:border-white/10 pt-4">
              <span className="text-xs text-red-500 font-semibold">Sold Out — no spots available</span>
            </div>
          )}

          {slot.status === 'completed' && (
            <div className="border-t border-gray-100 dark:border-white/10 pt-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-fob-orange">
                <Trophy className="size-3.5" /> Event Complete
              </span>
              {slot.resultsHref && (
                <Link
                  href={slot.resultsHref}
                  className="inline-flex items-center gap-1 text-xs font-bold text-fob-dark-navy dark:text-white hover:text-fob-orange dark:hover:text-fob-orange transition-colors"
                >
                  View Results <ArrowRight className="size-3.5" />
                </Link>
              )}
            </div>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && <JoinModal slot={slot} onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </>
  );
}
