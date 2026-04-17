import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import HeroSlider from '@/components/flytt/HeroSlider';
import PlatformEcosystem from '@/components/flytt/PlatformEcosystem';
import MetricsStrip from '@/components/flytt/MetricsStrip';
import WhiteLabelSection from '@/components/flytt/WhiteLabelSection';
import InvestorSection from '@/components/flytt/InvestorSection';
import SolutionsSection from '@/components/flytt/SolutionsSection';
import IndustryGrid from '@/components/flytt/IndustryGrid';
import TechnologySection from '@/components/flytt/TechnologySection';
import DeploymentMap from '@/components/flytt/DeploymentMap';
import ContactFooter from '@/components/flytt/ContactFooter';

export const metadata: Metadata = {
  title: 'Smart Digital Infrastructure for Logistics, Education, Government & Enterprise',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white text-slate-900 antialiased">
        <HeroSlider />
        <PlatformEcosystem />
        <MetricsStrip />
        <WhiteLabelSection />
        <InvestorSection />
        <SolutionsSection />
        <IndustryGrid />
        <TechnologySection />
        <DeploymentMap />
        <ContactFooter />
      </main>
    </>
  );
}
