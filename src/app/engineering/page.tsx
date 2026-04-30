import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import EngineeringPositioning from '@/components/flytt/engineering/EngineeringPositioning';
import AudienceGrid from '@/components/flytt/engineering/AudienceGrid';
import CapabilityLadder from '@/components/flytt/engineering/CapabilityLadder';
import ConfiguratorEntryCTA from '@/components/flytt/engineering/ConfiguratorEntryCTA';
import AddOnPricing from '@/components/flytt/engineering/AddOnPricing';
import EngineeringEngagement from '@/components/flytt/engineering/EngineeringEngagement';
import FinalScopingCTA from '@/components/flytt/engineering/FinalScopingCTA';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title:
    'Institutional Systems Engineering — From Digital Presence to National Platform Infrastructure',
  description:
    "FlyttGoTech's engineering capability surface across six tiers. From digital presence to national platform infrastructure, engineered on the same FlyttGoTech Core substrate. Every engagement runs on the same compliance posture and audit log.",
  alternates: { canonical: '/engineering' },
  openGraph: {
    title: 'FlyttGo · Institutional Systems Engineering',
    description:
      'Six capability tiers — digital presence, professional business website, smart interactive platform, enterprise operations platform, national institutional platform, platform ecosystem infrastructure.',
    url: '/engineering',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlyttGo · Institutional Systems Engineering',
    description:
      'Six capability tiers from digital presence to national platform infrastructure. Engineered on the same substrate.',
  },
};

const professionalServiceLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'FlyttGo Institutional Systems Engineering',
  serviceType: 'Website, application and platform-ecosystem engineering',
  provider: {
    '@type': 'Organization',
    name: 'FlyttGo Technologies Group AB',
    url: 'https://flyttgo.tech',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Capability ladder',
    itemListElement: [
      { '@type': 'Offer', name: 'L.01 · Website Design · Digital Presence',          priceCurrency: 'USD', price: '900-2500' },
      { '@type': 'Offer', name: 'L.02 · Professional Business Website',              priceCurrency: 'USD', price: '3000-7000' },
      { '@type': 'Offer', name: 'L.03 · Smart Interactive Platform',                 priceCurrency: 'USD', price: '8000-35000' },
      { '@type': 'Offer', name: 'L.04 · Enterprise Operations Platform',             priceCurrency: 'USD', price: '40000-120000' },
      { '@type': 'Offer', name: 'L.05 · National Institutional Platform',            priceCurrency: 'USD', price: '150000-800000' },
      { '@type': 'Offer', name: 'L.06 · Platform Ecosystem Infrastructure',          priceCurrency: 'USD', price: '500000-3000000' },
    ],
  },
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: 'https://flyttgo.tech/contact?intent=engineering',
    name: 'Scoping intake',
  },
};

export default function EngineeringPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Engineering', href: '/engineering' },
  ]);

  return (
    <>
      <script {...jsonLdScript(ld)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceLd) }}
      />
      <Navbar />
      <main
        id="main"
        className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased"
      >
        {/* SE.00 — page banner */}
        <PageHero
          code="SE.00"
          eyebrow="Institutional Systems Engineering"
          title={
            <>
              From digital presence to national platform infrastructure,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                engineered on the same substrate.
              </em>
            </>
          }
          description="FlyttGoTech builds digital presence websites, smart platforms, enterprise systems and sovereign-ready public infrastructure using the same engineering core that powers the FlyttGo platform ecosystem. Every engagement runs on the same FlyttGoTech Core, the same compliance posture, the same audit log."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Engineering' }]}
        />

        {/* SE.01 — Division positioning (doctrine block) */}
        <Reveal>
          <EngineeringPositioning />
        </Reveal>

        {/* SE.AU — Audience taxonomy matrix */}
        <Reveal>
          <AudienceGrid />
        </Reveal>

        {/* SE.02 / SE.LD — Capability ladder (six levels, expandable) */}
        <Reveal>
          <CapabilityLadder />
        </Reveal>

        {/* PR.00 — Live cost configurator entry */}
        <Reveal>
          <ConfiguratorEntryCTA />
        </Reveal>

        {/* SE.03 — Modular add-ons */}
        <Reveal>
          <AddOnPricing />
        </Reveal>

        {/* SE.04 — Delivery model timeline */}
        <Reveal>
          <EngineeringEngagement />
        </Reveal>

        {/* SE.FN — Final scoping entry surface + cross-links */}
        <Reveal>
          <FinalScopingCTA />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
