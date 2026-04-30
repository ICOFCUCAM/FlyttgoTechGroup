import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import EngineeringPositioning from '@/components/flytt/engineering/EngineeringPositioning';
import CapabilityLadder from '@/components/flytt/engineering/CapabilityLadder';
import AddOnPricing from '@/components/flytt/engineering/AddOnPricing';
import EngineeringEngagement from '@/components/flytt/engineering/EngineeringEngagement';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title:
    'Institutional Systems Engineering — From Digital Presence to National Platform Infrastructure',
  description:
    "FlyttGo's engineering division builds websites, applications and platform ecosystems across six capability levels. From small-business presence sites to national platform infrastructure — engineered on the same FlyttGoTech Core substrate.",
  alternates: { canonical: '/engineering' },
  openGraph: {
    title: 'FlyttGo · Institutional Systems Engineering',
    description:
      'Six capability levels — digital presence, professional business site, smart interactive platform, enterprise operations platform, national institutional platform, platform ecosystem infrastructure. Indicative pricing per region.',
    url: '/engineering',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlyttGo · Institutional Systems Engineering',
    description:
      'Six capability levels from digital presence to national platform infrastructure. Engineered on the same substrate.',
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
  areaServed: [
    { '@type': 'Place', name: 'European Union' },
    { '@type': 'Place', name: 'United Kingdom' },
    { '@type': 'Place', name: 'Africa' },
    { '@type': 'Place', name: 'Middle East and North Africa' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Capability ladder',
    itemListElement: [
      { '@type': 'Offer', name: 'Level 1 · Digital Presence Website',                priceCurrency: 'USD', price: '900-2500' },
      { '@type': 'Offer', name: 'Level 2 · Professional Business Website',           priceCurrency: 'USD', price: '3000-7000' },
      { '@type': 'Offer', name: 'Level 3 · Smart Interactive Platform',              priceCurrency: 'USD', price: '8000-35000' },
      { '@type': 'Offer', name: 'Level 4 · Enterprise Operations Platform',          priceCurrency: 'USD', price: '40000-120000' },
      { '@type': 'Offer', name: 'Level 5 · National Institutional Platform',         priceCurrency: 'USD', price: '150000-800000' },
      { '@type': 'Offer', name: 'Level 6 · Platform Ecosystem Infrastructure',       priceCurrency: 'USD', price: '500000-3000000' },
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
          description="FlyttGo's engineering division builds websites, applications and platform ecosystems across six capability levels. Every engagement runs on the same FlyttGoTech Core, the same compliance posture, the same audit log."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Engineering' }]}
        />

        <Reveal>
          <EngineeringPositioning />
        </Reveal>

        <Reveal>
          <CapabilityLadder />
        </Reveal>

        <Reveal>
          <AddOnPricing />
        </Reveal>

        <Reveal>
          <EngineeringEngagement />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
