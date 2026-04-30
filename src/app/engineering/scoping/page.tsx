import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import EngineeringSubNav from '@/components/flytt/engineering/EngineeringSubNav';
import FinalScopingCTA from '@/components/flytt/engineering/FinalScopingCTA';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Scoping Intake · SE.FN — Institutional Systems Engineering',
  description:
    'Engagement-desk intake routed to the engineering division. Capability deep-dive (SE.D1) scheduled within one business day; pilot scoping (SE.D2) follows under NDA; build & deployment (SE.D3) executes against the signed order form.',
  alternates: { canonical: '/engineering/scoping' },
};

export default function ScopingPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Engineering', href: '/engineering' },
    { name: 'SE.FN Scoping Intake', href: '/engineering/scoping' },
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
          code="SE.FN"
          eyebrow="Scoping Intake Surface"
          title={
            <>
              Open the scoping intake{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                for the engineering division.
              </em>
            </>
          }
          description="Engagement desk responds within one business day with a capability deep-dive (SE.D1) calendar. From there the engagement enters scoping (SE.D2) and the order form is issued. Build & deployment (SE.D3) executes against the signed order form."
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Engineering', href: '/engineering' },
            { label: 'SE.FN Scoping Intake' },
          ]}
        />
        <EngineeringSubNav />
        <Reveal>
          <FinalScopingCTA />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
