import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import HeroSlider from '@/components/flytt/HeroSlider';
import TrustIndicators from '@/components/flytt/TrustIndicators';
import PlatformEcosystemOverview from '@/components/flytt/PlatformEcosystemOverview';
import HomeDeploymentStrip from '@/components/flytt/HomeDeploymentStrip';
import HomeIndustriesStrip from '@/components/flytt/HomeIndustriesStrip';
import HomeTechStrip from '@/components/flytt/HomeTechStrip';
import FinalCTA from '@/components/flytt/FinalCTA';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';

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
      <main
        id="main"
        className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased"
      >
        <HeroSlider />
        <TrustIndicators />
        <Reveal>
          <PlatformEcosystemOverview />
        </Reveal>
        <Reveal>
          <HomeDeploymentStrip />
        </Reveal>
        <Reveal>
          <HomeIndustriesStrip />
        </Reveal>
        <Reveal>
          <HomeTechStrip />
        </Reveal>
        <Reveal>
          <FinalCTA />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
