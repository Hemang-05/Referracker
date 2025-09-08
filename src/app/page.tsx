import HeroSection from '@/components/landing/HeroSection';
import ProblemSection from '@/components/landing/ProblemSection';
import LiveDemoSection from '@/components/landing/LiveDemoSection';
import PricingSection from '@/components/landing/PricingSection';
import Footer from '@/components/landing/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <LiveDemoSection />
      <PricingSection />
      <Footer />
    </main>
  );
}
