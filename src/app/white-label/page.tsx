import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import WhiteLabelStrategy from '@/components/flytt/WhiteLabelStrategy';
import WhiteLabelSection from '@/components/flytt/WhiteLabelSection';
import NextStepsGrid from '@/components/flytt/NextStepsGrid';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { Layers3, Network, Globe2, Compass } from 'lucide-react';

export const metadata: Metadata = {
  title: 'White-Label Deployment — Launch Your Own Platform',
  description:
    'Launch a branded logistics marketplace, analytics environment or municipal coordination system on FlyttGo infrastructure — tenant-isolated, brandable and deployable in weeks.',
  alternates: { canonical: '/white-label' },
  openGraph: {
    title: 'Launch Your Platform — FlyttGo White-Label Deployment',
    description:
      'Deploy branded logistics, analytics and municipal platforms on modular, multi-tenant infrastructure.',
    url: '/white-label',
    type: 'website',
  },
};

export default function WhiteLabelPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <PageHero
          code="WL.00"
          eyebrow="White-Label Deployment"
          title={
            <>
              Your brand on the surface.{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                FlyttGo infrastructure underneath.
              </em>
            </>
          }
          description="Tenant-isolated, brandable platforms launched on FlyttGo's multi-tenant infrastructure — logistics marketplaces, analytics environments, municipal coordination systems. Branded for the operator, hardened by the platform, deployable in weeks."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'White-label' }]}
        />
        <WhiteLabelStrategy />
        <Reveal>
          <WhiteLabelSection />
        </Reveal>
        <Reveal>
          <NextStepsGrid
            code="WL.NX"
            eyebrow="A white-label is one shape of a deployment"
            titleLead="The brand sits on top."
            titleEmphasis="The substrate is shared."
            intro="A white-label deployment composes a tenant-isolated module set on FlyttGo's substrate with the operator's brand on the surface. The four pathways below show what gets composed underneath, and how to start scoping it."
            steps={[
              {
                href: '/platforms',
                code: 'PL.00',
                icon: Layers3,
                title: 'The modules behind the brand',
                body: 'Eight platform modules selectable per white-label tenant — Transify, Workverge, Civitas, EduPro, Identra, Payvera, Ledgera, FlyttGo Marketplace.',
                meta: 'PL.00 · 8 modules',
              },
              {
                href: '/marketplace',
                code: 'MP.00',
                icon: Network,
                title: 'Marketplace as a white-label shape',
                body: 'Provider routing, trust & verification, pricing intelligence, dispute resolution — running under the operator’s brand.',
                meta: 'MP.RT · MP.TV · MP.PI · MP.DR',
              },
              {
                href: '/deployment',
                code: 'DM.00',
                icon: Globe2,
                title: 'Pick the substrate underneath',
                body: 'Managed SaaS for fastest launch; customer cloud for tenant control; sovereign datacenter for regulator perimeter.',
                meta: 'DM.01 · DM.02 · DM.03',
              },
              {
                href: '/consultation',
                code: 'CB.00',
                icon: Compass,
                title: 'Scope a white-label launch',
                body: 'Five-step intake under CT.04 Enterprise Relocation Programme Setup or CT.02 Marketplace Provider Onboarding.',
                meta: 'CT.02 · CT.04',
              },
            ]}
          />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
