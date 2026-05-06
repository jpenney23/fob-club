import Link from 'next/link';
import { Heart, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-gray-100 dark:border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
          {/* Brand */}
          <div className="space-y-2 md:space-y-4 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <span className="text-2xl">⛳</span>
              <div>
                <p className="font-bold text-lg leading-tight text-fob-dark-navy dark:text-white">FOB Golf League</p>
                <p className="text-sm text-gray-500 dark:text-white/80">fob.club</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-white/70 text-sm leading-relaxed">
              Greater Boston's premier member golf league. 100 players, 8 rounds, premier courses — season runs June through September.
            </p>
          </div>

          {/* Navigation */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-fob-dark-navy dark:text-white/90 mb-4 text-sm uppercase tracking-wider">
              League
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/schedule" className="text-gray-500 hover:text-fob-dark-navy dark:text-white/80 dark:hover:text-white text-sm transition-colors">
                  Schedule
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-gray-500 hover:text-fob-dark-navy dark:text-white/80 dark:hover:text-white text-sm transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <a
                  href="https://fobcharity.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fob-orange hover:underline underline-offset-2 text-sm font-semibold transition-colors"
                >
                  ❤ fobcharity.com — our charity arm
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-fob-dark-navy dark:text-white/90 mb-4 text-sm uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 justify-center md:justify-start">
                <Mail className="size-4 text-fob-orange mt-0.5 shrink-0" />
                <span className="text-gray-600 dark:text-white/80 text-sm">info@fob.club</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 md:mt-12 pt-6 md:pt-8 border-t border-gray-100 dark:border-white/10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-gray-400 dark:text-white/40 text-sm text-center sm:text-left">
            © 2026 FOB Golf League. All rights reserved.
          </p>
          <p className="text-gray-400 dark:text-white/40 text-xs">
            Built with <Heart className="size-3 inline text-fob-orange mx-0.5" /> for the community
          </p>
        </div>
      </div>
    </footer>
  );
}
