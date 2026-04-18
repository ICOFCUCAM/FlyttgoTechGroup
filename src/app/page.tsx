import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import HeroSlider from '@/components/flytt/HeroSlider';
import PlatformEcosystemOverview from '@/components/flytt/PlatformEcosystemOverview';
import DeploymentArchitecture from '@/components/flytt/DeploymentArchitecture';
import TargetUsers from '@/components/flytt/TargetUsers';
import TechnologySection from '@/components/flytt/TechnologySection';
import FinalCTA from '@/components/flytt/FinalCTA';
import ComplianceBand from '@/components/flytt/ComplianceBand';
import SiteFooter from '@/components/flytt/SiteFooter';

export const metadata: Metadata = {
  title: 'Deploy National-Scale Digital Infrastructure Platforms Without Building Systems From Scratch',
  description:
    'FlyttGo Technologies Group designs modular digital infrastructure platforms — Transify mobility, Workverge workforce coordination, Civitas government services, EduPro education intelligence, Identra identity and Payvera payments — plus the FlyttGo marketplace running on top of Transify.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <HeroSlider />
        <PlatformEcosystemOverview />
        <DeploymentArchitecture />
        <TargetUsers />
        <TechnologySection />
        <FinalCTA />
        <ComplianceBand />
      </main>
      <SiteFooter />
    </>
  );
}
