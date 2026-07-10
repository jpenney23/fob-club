import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScheduleHero from '@/components/schedule/ScheduleHero';
import ScheduleGrid from '@/components/schedule/ScheduleGrid';

export const metadata: Metadata = {
  title: 'Club Schedule | Friends of Bellevue',
  description: 'FOB Club 2026 schedule — 6 rounds across premier courses, June through October.',
};

export default function SchedulePage() {
  return (
    <>
      <Header />
      <main>
        <ScheduleHero />
        <ScheduleGrid />
      </main>
      <Footer />
    </>
  );
}
