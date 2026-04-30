import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import EngineeringSubNav from '@/components/flytt/engineering/EngineeringSubNav';
import ProposalGenerator from '@/components/flytt/engineering/ProposalGenerator';
import SiteFooter from '@/components/flytt/SiteFooter';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Proposal Generator · SE.PG — Institutional Systems Engineering',
  description:
    'Auto-generates a procurement-grade pilot proposal from the cost configurator output. Reads architecture tier, modules, deployment substrate and region from the URL. Print to PDF · download as Word · email.',
  alternates: { canonical: '/engineering/proposal' },
  robots: { index: false, follow: true },
};

export default function ProposalPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Engineering', href: '/engineering' },
    { name: 'SE.PG Proposal Generator', href: '/engineering/proposal' },
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
          code="SE.PG"
          eyebrow="Proposal Generator Engine"
          title={
            <>
              Auto-generated pilot proposal,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                rendered from the configurator output.
              </em>
            </>
          }
          description="Reads the architecture tier, modules, deployment substrate and region from the URL produced by the cost configurator (PR.00). Auto-renders a procurement-grade pilot proposal document inline. Print to PDF · download as Word · email."
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Engineering', href: '/engineering' },
            { label: 'SE.PG Proposal Generator' },
          ]}
        />
        <EngineeringSubNav />
        <ProposalGenerator />
      </main>
      <SiteFooter />
    </>
  );
}
