import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import EngineeringSubNav from '@/components/flytt/engineering/EngineeringSubNav';
import EngineeringEngagement from '@/components/flytt/engineering/EngineeringEngagement';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Delivery Model · SE.04 — Institutional Systems Engineering',
  description:
    'Three-step delivery cadence applied uniformly across every capability tier — capability scope (SE.D1), build scoping (SE.D2), build & deployment (SE.D3). Sprint counts scale with tier; engagement shape is constant.',
  alternates: { canonical: '/engineering/delivery' },
};

export default function DeliveryPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Engineering', href: '/engineering' },
    { name: 'SE.04 Delivery Model', href: '/engineering/delivery' },
  ]);

  return (
    <>
      <script {...jsonLdScript(ld)} />
      <Navbar />
      <main
        id="main"
        className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased"
      >
        <PageHero
          code="SE.04"
          eyebrow="Delivery Model"
          title={
            <>
              Three steps{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                from scoping to live deployment.
              </em>
            </>
          }
          description="The same cadence applies across every capability tier. What changes between L.01 and L.06 is the sprint count, the integration depth and the regulator footprint — not the engagement shape."
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Engineering', href: '/engineering' },
            { label: 'SE.04 Delivery Model' },
          ]}
        />
        <EngineeringSubNav />
        <Reveal>
          <EngineeringEngagement />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
