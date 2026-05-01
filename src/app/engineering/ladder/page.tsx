import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import EngineeringSubNav from '@/components/flytt/engineering/EngineeringSubNav';
import CapabilityMatrix from '@/components/flytt/engineering/CapabilityMatrix';
import CapabilityLadder from '@/components/flytt/engineering/CapabilityLadder';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Capability Ladder · SE.02 — Institutional Systems Engineering',
  description:
    'Six escalating engagement tiers from L.01 digital presence website to L.06 platform-class ecosystem. Each tier carries a defined feature set, technology profile, delivery cadence and indicative regional pricing band.',
  alternates: { canonical: '/engineering/ladder' },
};

export default function LadderPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Engineering', href: '/engineering' },
    { name: 'SE.02 Capability Ladder', href: '/engineering/ladder' },
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
          code="SE.02"
          eyebrow="Capability Ladder"
          title={
            <>
              Six escalating tiers,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                each a discrete engagement shape.
              </em>
            </>
          }
          description="Defined feature set · technology profile · delivery cadence · indicative regional pricing band per tier. Programmes typically start at one level and advance up the ladder as scope and audience grow."
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Engineering', href: '/engineering' },
            { label: 'SE.02 Capability Ladder' },
          ]}
        />
        <EngineeringSubNav />
        {/* SE.MX — side-by-side comparator first; SE.LD expandable
            cards below carry the full feature inventory per level. */}
        <Reveal>
          <CapabilityMatrix />
        </Reveal>
        <Reveal>
          <CapabilityLadder />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
