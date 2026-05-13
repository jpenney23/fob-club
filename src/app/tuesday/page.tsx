import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TuesdayHero from '@/components/tuesday/TuesdayHero';
import RoundPodium from '@/components/tuesday/RoundPodium';
import SeasonStandings from '@/components/tuesday/SeasonStandings';
import RoundResults from '@/components/tuesday/RoundResults';
import LeagueFormat from '@/components/tuesday/LeagueFormat';

export const metadata: Metadata = {
  title: 'Tuesday 9 Hole League | fob.club',
  description: 'FOB Tuesday 9 Hole League 2026 — season-long quota competition at Bellevue Golf Club. Weekly standings, round results, and scoring format.',
};

export default function TuesdayPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <TuesdayHero />
        <RoundPodium />
        <SeasonStandings />
        <RoundResults />
        <LeagueFormat />
      </main>
      <Footer />
    </>
  );
}
