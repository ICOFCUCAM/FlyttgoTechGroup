import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SectorsOverview from '@/components/flytt/SectorsOverview';
import TargetUsers from '@/components/flytt/TargetUsers';
import IndustryGrid from '@/components/flytt/IndustryGrid';
import DeploymentMap from '@/components/flytt/DeploymentMap';
import NextStepsGrid from '@/components/flytt/NextStepsGrid';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import { Layers3, Workflow, Globe2, Compass } from 'lucide-react';

// SSR so the layout's server-detected locale drives the sector card copy.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Industries — Government, Education, Transport, Enterprise, Marketplaces & Logistics',
  description:
    'FlyttGo platform infrastructure is deployed across government and municipal services, education systems, transport networks, enterprise operations, regulated marketplaces and freight corridors — one cloud-native architecture per sector deployment.',
  alternates: { canonical: '/industries' },
  openGraph: {
    title: 'Industries Served by FlyttGo Infrastructure',
    description:
      'One platform layer. Six sector deployments — government, education, transport, enterprise, marketplaces and freight networks.',
    url: '/industries',
    type: 'website',
  },
};

export default function IndustriesPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Industries', href: '/industries' },
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
          code="IN.00"
          eyebrow="Industries Served"
          title={
            <>
              One platform layer.{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                Every sector deployment.
              </em>
            </>
          }
          description="Ministries, universities, transport authorities, enterprise fleets, marketplace operators and freight networks deploy FlyttGo platforms as modules — with the configuration, compliance posture and deployment pattern that each sector actually needs."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Industries' }]}
        />
        <SectorsOverview />
        <Reveal>
          <TargetUsers />
        </Reveal>
        <Reveal>
          <IndustryGrid />
        </Reveal>
        <Reveal>
          <DeploymentMap />
        </Reveal>
        <Reveal>
          <NextStepsGrid
            code="IN.NX"
            eyebrow="Where these sectors go next"
            titleLead="The sector view is"
            titleEmphasis="one cut across the substrate."
            intro="Every sector deployment composes from the same modular surface — the platform ecosystem above, run on the deployment substrate below, optionally engineered into a bespoke shape and routed through the engagement intake."
            steps={[
              {
                href: '/platforms',
                code: 'PL.00',
                icon: Layers3,
                title: 'The modules each sector composes from',
                body: 'Eight platform modules — Transify, Workverge, Civitas, EduPro, Identra, Payvera, Ledgera and FlyttGo Marketplace.',
                meta: 'PL.00 · 8 modules',
              },
              {
                href: '/deployment',
                code: 'DM.00',
                icon: Globe2,
                title: 'The substrate each sector runs on',
                body: 'FlyttGo-managed SaaS, customer cloud, sovereign datacenter — picked per programme and per regulator perimeter.',
                meta: 'DM.01 · DM.02 · DM.03',
              },
              {
                href: '/engineering',
                code: 'SE.00',
                icon: Workflow,
                title: 'Engineer a bespoke programme',
                body: 'Six engagement tiers (L.01 → L.06). For sector deployments that need a shape outside the standard module surface.',
                meta: 'L.01 → L.06',
              },
              {
                href: '/consultation',
                code: 'CB.00',
                icon: Compass,
                title: 'Open a sector engagement',
                body: 'Routed into the right consultation category — platform architecture, government pilot, marketplace onboarding or enterprise rollout.',
                meta: 'CT.01 → CT.04',
              },
            ]}
          />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
