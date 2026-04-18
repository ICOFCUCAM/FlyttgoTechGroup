import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import HeroSlider from '@/components/flytt/HeroSlider';
import StatStrip from '@/components/flytt/StatStrip';
import PlatformEcosystemOverview from '@/components/flytt/PlatformEcosystemOverview';
import InfrastructureModules from '@/components/flytt/InfrastructureModules';
import MultiRegion from '@/components/flytt/MultiRegion';
import CaseStudyCard from '@/components/flytt/CaseStudyCard';
import FinalCTA from '@/components/flytt/FinalCTA';
import ComplianceBand from '@/components/flytt/ComplianceBand';
import SiteFooter from '@/components/flytt/SiteFooter';

export const metadata: Metadata = {
  title: 'Infrastructure for National-Scale Digital Platforms',
  description:
    'FlyttGo Technologies provides modular deployment infrastructure for logistics marketplaces, education intelligence platforms, government service layers and enterprise ecosystems — deployable across Europe, Africa and the Middle East.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white text-slate-900 antialiased">
        <HeroSlider />
        <StatStrip />
        <PlatformEcosystemOverview />
        <InfrastructureModules />
        <MultiRegion />
        <CaseStudyCard />
        <FinalCTA />
        <ComplianceBand />
      </main>
      <SiteFooter />
    </>
  );
}
