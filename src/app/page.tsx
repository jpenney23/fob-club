import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import LeagueStats from "@/components/home/LeagueStats";
import SchedulePreview from "@/components/home/SchedulePreview";
import TravelLeagueSpotlight from "@/components/travel/TravelLeagueSpotlight";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <HeroSection />
        <LeagueStats />
        <SchedulePreview />
        <TravelLeagueSpotlight />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
