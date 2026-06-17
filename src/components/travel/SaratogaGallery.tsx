'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Camera } from 'lucide-react';
import { featuredEvent } from '@/lib/data/travel';

type Photo = (typeof featuredEvent.gallery)[number];

// Greedy balance: place each photo in the currently-shortest column,
// using h/w as the relative rendered height (columns are equal width).
function balanceColumns(photos: Photo[], colCount: number): Photo[][] {
  const cols = Array.from({ length: colCount }, () => ({ items: [] as Photo[], height: 0 }));
  for (const p of photos) {
    const target = cols.reduce((min, c) => (c.height < min.height ? c : min), cols[0]);
    target.items.push(p);
    target.height += p.h / p.w;
  }
  return cols.map((c) => c.items);
}

export default function SaratogaGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const photos = featuredEvent.gallery;

  if (!photos.length) return null;

  const desktopCols = balanceColumns(photos, 3);
  const mobileCols = balanceColumns(photos, 2);

  const renderColumn = (col: Photo[], gap: string) => (
    <div className={`flex flex-1 flex-col ${gap}`}>
      {col.map((photo) => {
        const order = photos.indexOf(photo);
        return (
          <motion.div
            key={photo.src}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.45, delay: order * 0.06 }}
            className="overflow-hidden rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm group"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.w}
              height={photo.h}
              className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <section className="bg-background py-12 md:py-20 border-t border-gray-100 dark:border-white/8" ref={ref}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="w-12 h-12 rounded-full bg-fob-orange/10 border border-fob-orange/20 flex items-center justify-center mx-auto mb-4">
            <Camera className="size-5 text-fob-orange" />
          </div>
          <p className="text-fob-orange text-xs font-bold tracking-[0.25em] uppercase mb-3">From the Trip</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-fob-dark-navy dark:text-white tracking-tight">
            Saratoga Invitational Gallery
          </h2>
          <div className="fob-accent-bar mx-auto" />
        </motion.div>

        {/* Height-balanced columns — each photo keeps its natural shape (no cropping) */}
        <div className="hidden md:flex gap-4">
          {desktopCols.map((col, ci) => (
            <div key={ci} className="flex-1">{renderColumn(col, 'gap-4')}</div>
          ))}
        </div>
        <div className="flex md:hidden gap-3">
          {mobileCols.map((col, ci) => (
            <div key={ci} className="flex-1">{renderColumn(col, 'gap-3')}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
