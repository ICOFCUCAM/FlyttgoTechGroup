import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import PlatformEcosystem from '@/components/flytt/PlatformEcosystem';
import TechnologySection from '@/components/flytt/TechnologySection';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';

export const metadata: Metadata = {
  title: 'Platform Ecosystem — Mobility, Workforce, Government, Education, Identity, Payments, Financial Ops & Marketplace',
  description:
    'Explore the FlyttGo platform ecosystem: Transify, Workverge, Civitas, EduPro, Identra, Payvera, Ledgera and the FlyttGo marketplace — modular infrastructure platforms for operators and institutions.',
  alternates: { canonical: '/platforms' },
  openGraph: {
    title: 'FlyttGo Platform Ecosystem',
    description:
      'Modular platforms. One infrastructure layer. Deployable across Europe, Africa and the Middle East.',
    url: '/platforms',
    type: 'website',
  },
};

export default function PlatformsPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Platforms', href: '/platforms' },
  ]);
  return (
    <>
      <script {...jsonLdScript(ld)} />
      <Navbar />
      <main id="main" className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <PageHero
          code="PL.00"
          eyebrow="Platform Ecosystem"
          title={
            <>
              Eight modular platforms.{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                One infrastructure layer.
              </em>
            </>
          }
          description="Transify, Workverge, Civitas, EduPro, Identra, Payvera, Ledgera and the FlyttGo Marketplace — each licensed independently, each deployable in any of three modes, each operating against the same shared identity, audit and orchestration core."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Platforms' }]}
        />
        <PlatformEcosystem />
        <Reveal>
          <TechnologySection />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
