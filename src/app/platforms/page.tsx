import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import PlatformEcosystem from '@/components/flytt/PlatformEcosystem';
import TechnologySection from '@/components/flytt/TechnologySection';
import SiteFooter from '@/components/flytt/SiteFooter';

export const metadata: Metadata = {
  title: 'Platform Ecosystem — Logistics, Education, Government & Marketplace Infrastructure',
  description:
    'Explore the FlyttGo platform ecosystem: FlyttGo Logistics, EduPro AI, GovStack, MarketStack and FleetStack — modular infrastructure platforms for logistics operators, education ministries, municipalities, marketplace founders and enterprise fleets.',
  alternates: { canonical: '/platforms' },
  openGraph: {
    title: 'FlyttGo Platform Ecosystem',
    description:
      'Five modular platforms. One infrastructure layer. Deployable across Europe, Africa and the Middle East.',
    url: '/platforms',
    type: 'website',
  },
};

export default function PlatformsPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white text-slate-900 antialiased">
        <PlatformEcosystem />
        <TechnologySection />
      </main>
      <SiteFooter />
    </>
  );
}
