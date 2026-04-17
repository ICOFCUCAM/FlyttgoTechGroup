import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import HeroSlider from '@/components/flytt/HeroSlider';
import PlatformEcosystemOverview from '@/components/flytt/PlatformEcosystemOverview';
import DeploymentSpeed from '@/components/flytt/DeploymentSpeed';
import MultiRegion from '@/components/flytt/MultiRegion';
import WhiteLabelStrategy from '@/components/flytt/WhiteLabelStrategy';
import TargetUsers from '@/components/flytt/TargetUsers';
import InfrastructureModules from '@/components/flytt/InfrastructureModules';
import FinalCTA from '@/components/flytt/FinalCTA';
import ContactFooter from '@/components/flytt/ContactFooter';

export const metadata: Metadata = {
  title: 'Launch National-Scale Digital Platforms Without Building Infrastructure From Scratch',
  description:
    'FlyttGo Technologies Group provides modular deployment infrastructure for logistics marketplaces, education intelligence platforms, government service layers and enterprise ecosystems — deployable across Europe, Africa and the Middle East in weeks, not years.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white text-slate-900 antialiased">
        <HeroSlider />
        <PlatformEcosystemOverview />
        <DeploymentSpeed />
        <MultiRegion />
        <WhiteLabelStrategy />
        <TargetUsers />
        <InfrastructureModules />
        <FinalCTA />
        <ContactFooter />
      </main>
    </>
  );
}
