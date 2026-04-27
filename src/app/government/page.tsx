import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import GovernmentPositioning from '@/components/flytt/government/GovernmentPositioning';
import GovernmentServiceModels from '@/components/flytt/government/GovernmentServiceModels';
import HomeOrchestrationCore from '@/components/flytt/HomeOrchestrationCore';
import HomeDeploymentMatrix from '@/components/flytt/HomeDeploymentMatrix';
import SovereigntyFramework from '@/components/flytt/government/SovereigntyFramework';
import ComplianceBand from '@/components/flytt/ComplianceBand';
import HomeProcurementEntry from '@/components/flytt/HomeProcurementEntry';
import GovernmentReferences from '@/components/flytt/government/GovernmentReferences';
import GovernmentEngagement from '@/components/flytt/government/GovernmentEngagement';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title:
    'Government & Public Sector — Modular Platform Infrastructure for Sovereign-Ready Deployment',
  description:
    'FlyttGo Technologies Group designs and operates modular cloud platform infrastructure for ministries, transport authorities, universities and municipal modernisation programmes. Eight modules, three deployment modes, sovereign national infrastructure readiness.',
  alternates: { canonical: '/government' },
  openGraph: {
    title:
      'FlyttGo · Government Platform Infrastructure',
    description:
      'Modular cloud platform infrastructure for sovereign-ready public-sector deployment. Identity, payments, mobility, workforce, education, government services and financial operations — orchestrated through the FlyttGoTech Core.',
    url: '/government',
    type: 'website',
  },
};

export default function GovernmentPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Government', href: '/government' },
  ]);

  return (
    <>
      <script {...jsonLdScript(ld)} />
      <Navbar />
      <main
        id="main"
        className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased"
      >
        {/* GV.00 — page banner */}
        <PageHero
          code="GV.00"
          eyebrow="Government & Public Sector"
          title={
            <>
              Modular platform infrastructure for{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                sovereign-ready public-sector deployment.
              </em>
            </>
          }
          description="Identity, payments, mobility, workforce, education, government services and financial operations — orchestrated through the FlyttGoTech Core. Three deployment modes: managed SaaS, customer cloud, sovereign national datacenter."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Government' }]}
        />

        {/* GV.01 — programme positioning */}
        <Reveal>
          <GovernmentPositioning />
        </Reveal>

        {/* GV.02 — service-model declaration (SaaS · PaaS · IaaS · Sovereign) */}
        <Reveal>
          <GovernmentServiceModels />
        </Reveal>

        {/* GV.03 — platform capability matrix (re-uses HomeOrchestrationCore) */}
        <Reveal>
          <HomeOrchestrationCore />
        </Reveal>

        {/* GV.04 — deployment posture (re-uses HomeDeploymentMatrix DM.MX) */}
        <Reveal>
          <HomeDeploymentMatrix />
        </Reveal>

        {/* GV.05 — sovereignty framework (the page's anchor moment) */}
        <Reveal>
          <SovereigntyFramework />
        </Reveal>

        {/* GV.06 — compliance posture (re-uses ComplianceBand) */}
        <Reveal>
          <ComplianceBand />
        </Reveal>

        {/* GV.07 — procurement compatibility (re-uses HomeProcurementEntry) */}
        <Reveal>
          <HomeProcurementEntry />
        </Reveal>

        {/* GV.08 — reference programme shapes */}
        <Reveal>
          <GovernmentReferences />
        </Reveal>

        {/* GV.09 — engagement intake */}
        <Reveal>
          <GovernmentEngagement />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
