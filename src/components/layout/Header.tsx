'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';

const navigation = [
  { name: 'Schedule', href: '/schedule' },
  { name: 'Leaderboard', href: '/leaderboard' },
  { name: 'Tuesday League', href: '/tuesday' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md', scrolled && 'shadow-sm')}
      style={{ backgroundColor: 'var(--header-bg)', borderBottom: '1px solid var(--header-border)' }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 focus:outline-none min-w-0 shrink">
          <div className="relative h-10 w-10 flex-shrink-0">
            <Image src="/images/fob-club-logo.png" alt="FOB Golf League" fill className="object-contain drop-shadow-sm" priority />
          </div>
          <span className="font-display font-bold text-sm leading-tight min-w-0 truncate tracking-wide" style={{ color: 'var(--header-text)' }}>
            FOB Golf League
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-7">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-xs font-semibold leading-6 tracking-wider uppercase hover:opacity-80 transition-opacity"
              style={{ color: 'var(--header-text-muted)' }}
            >
              {item.name}
            </Link>
          ))}
          <a
            href="https://fobcharity.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold leading-6 tracking-wider uppercase hover:opacity-80 transition-opacity"
            style={{ color: 'var(--header-text-muted)' }}
          >
            ❤ FOB Charity
          </a>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <ThemeToggle />
          <button
            className="lg:hidden p-1.5 rounded-md hover:opacity-70 transition-opacity"
            style={{ color: 'var(--header-text)' }}
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t px-6 py-4 space-y-1" style={{ backgroundColor: 'var(--header-bg)', borderColor: 'var(--header-border)' }}>
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block w-full text-left px-3 py-2.5 text-sm font-semibold tracking-wide rounded-lg hover:bg-fob-orange/5 transition-colors"
              style={{ color: 'var(--header-text-muted)' }}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-1 border-t" style={{ borderColor: 'var(--header-border)' }}>
            <a
              href="https://fobcharity.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-sm font-bold rounded-lg hover:bg-fob-orange/5 transition-colors"
              style={{ color: 'var(--header-text)' }}
            >
              ❤ FOB Charity
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
