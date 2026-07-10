import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TravelLeagueHero from '@/components/travel/TravelLeagueHero';
import SaratogaResults from '@/components/travel/SaratogaResults';
import SaratogaGallery from '@/components/travel/SaratogaGallery';

export const metadata: Metadata = {
  title: 'Travel | FOB Golf Club',
  description:
    'FOB Travel — destination tournaments and invitationals, featuring the 2026 Saratoga Invitational at Saratoga National Golf Club.',
};

export default function TravelLeaguePage() {
  return (
    <>
      <Header />
      <main>
        <TravelLeagueHero />
        <SaratogaResults />
        <SaratogaGallery />
      </main>
      <Footer />
    </>
  );
}
