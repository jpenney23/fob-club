import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LeaderboardHero from '@/components/leaderboard/LeaderboardHero';
import SeasonSpotlight from '@/components/leaderboard/SeasonSpotlight';
import StandingsTable from '@/components/leaderboard/StandingsTable';

export const metadata: Metadata = {
  title: 'Leaderboard | Friends of Bellevue',
  description: 'FOB League 2026 season standings and tournament results.',
};

export default function LeaderboardPage() {
  return (
    <>
      <Header />
      <main>
        <LeaderboardHero />
        <SeasonSpotlight />
        <StandingsTable />
      </main>
      <Footer />
    </>
  );
}
