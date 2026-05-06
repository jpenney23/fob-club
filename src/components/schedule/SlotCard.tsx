'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, User, X, Mail } from 'lucide-react';
import { LeagueSlot } from '@/lib/data/schedule';
import StatusBadge from './StatusBadge';

function JoinModal({ slot, onClose }: { slot: LeagueSlot; onClose: () => void }) {
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

        {/* Coming soon notice */}
        <div className="bg-fob-orange/10 border border-fob-orange/30 rounded-xl p-4 mb-5">
          <div className="flex items-center gap-2 mb-1">
            <Mail className="size-4 text-fob-orange" />
            <p className="text-fob-orange font-bold text-xs uppercase tracking-wider">Registration Opening Soon</p>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Online registration and payment are coming soon. Contact us to express interest and we'll get back to you within <span className="font-bold text-fob-dark-navy dark:text-white">24 business hours</span> with everything you need to join.
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mb-5">
          Payment via Stripe — coming soon
        </p>

        <button onClick={onClose} className="w-full btn-outline-gold">
          Got It
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function SlotCard({ slot, index }: { slot: LeagueSlot; index: number }) {
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
          {index < 7 && <div className="w-px flex-1 mt-1 bg-fob-orange/20" />}
        </div>

        {/* Card */}
        <div className="flex-1 bg-card border border-gray-100 dark:border-white/10 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow mb-1">
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
                Registration & payment coming soon
              </span>
            </div>
          )}

          {slot.status === 'locked' && (
            <div className="border-t border-gray-100 dark:border-white/10 pt-4">
              <span className="text-xs text-red-500 font-semibold">This round is locked — no spots available</span>
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
