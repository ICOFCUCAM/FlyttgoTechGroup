import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import HeroSlider from '@/components/flytt/HeroSlider';
import PlatformEcosystem from '@/components/flytt/PlatformEcosystem';
import MetricsStrip from '@/components/flytt/MetricsStrip';
import EnterpriseSection from '@/components/flytt/EnterpriseSection';
import GovernmentSection from '@/components/flytt/GovernmentSection';
import WhiteLabelSection from '@/components/flytt/WhiteLabelSection';
import InvestorSection from '@/components/flytt/InvestorSection';
import IndustryGrid from '@/components/flytt/IndustryGrid';
import TechnologySection from '@/components/flytt/TechnologySection';
import DeploymentMap from '@/components/flytt/DeploymentMap';
import ContactFooter from '@/components/flytt/ContactFooter';

export const metadata: Metadata = {
  title: 'Smart Digital Infrastructure for Logistics, Education, Government & Enterprise',
  description:
    'FlyttGo Technologies Group builds modular AI-powered platform infrastructure — logistics marketplaces, education analytics, municipal dashboards, fleet intelligence and white-label digital platforms deployable across Europe, Africa and the Middle East.',
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
        <EnterpriseSection />
        <GovernmentSection />
        <WhiteLabelSection />
        <IndustryGrid />
        <TechnologySection />
        <DeploymentMap />
        <InvestorSection />
        <ContactFooter />
      </main>
    </>
  );
}
