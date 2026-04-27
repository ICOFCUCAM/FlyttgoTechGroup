import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import HeroSlider from '@/components/flytt/HeroSlider';
import HomeRegionsStrip from '@/components/flytt/HomeRegionsStrip';
import LiveOpsStrip from '@/components/flytt/LiveOpsStrip';
import TrustIndicators from '@/components/flytt/TrustIndicators';
import PlatformEcosystemOverview from '@/components/flytt/PlatformEcosystemOverview';
import HomeDeploymentStrip from '@/components/flytt/HomeDeploymentStrip';
import HomeDeploymentMatrix from '@/components/flytt/HomeDeploymentMatrix';
import HomeIndustriesStrip from '@/components/flytt/HomeIndustriesStrip';
import HomeTechStrip from '@/components/flytt/HomeTechStrip';
import HomeServiceModels from '@/components/flytt/HomeServiceModels';
import HomeOrchestrationCore from '@/components/flytt/HomeOrchestrationCore';
import HomeProcurementEntry from '@/components/flytt/HomeProcurementEntry';
import ComplianceBand from '@/components/flytt/ComplianceBand';
import HomeFAQ from '@/components/flytt/HomeFAQ';
import FinalCTA from '@/components/flytt/FinalCTA';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does a platform deployment typically take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A standard FlyttGo deployment goes from procurement sign-off to a production-ready tenant in 60–120 days, depending on deployment mode. Sovereign datacenter installations add 30–60 days for network and hardware provisioning.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can we host FlyttGo platforms inside our own cloud tenancy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every platform supports three deployment modes: FlyttGo-managed SaaS, customer cloud (AWS, Azure or GCP under your account), and sovereign national datacenters. Data residency is enforced per deployment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which certifications and compliance frameworks do you support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Platforms are engineered against SOC 2 Type II, ISO 27001, GDPR and WCAG 2.1 AA. Regulated verticals add PSD2, eIDAS and PCI-DSS controls as needed per jurisdiction.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can we deploy only one module, or do we have to take the full suite?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Modules are independent. Most operators start with one or two and add the rest as program requirements grow. Each module is licensed per deployment, per region.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is multi-tenancy isolated between customer deployments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every tenant runs on a dedicated schema with region-scoped encryption keys, tenant-level audit trails and RBAC boundaries enforced at the API gateway. Sovereign deployments can be fully air-gapped.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you integrate with our existing identity and payment providers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — SAML 2.0, OIDC, LDAP and national eID schemes are supported through Identra. Payvera supports Stripe, Adyen, PayPal, SEPA and national payment rails.',
      },
    },
  ],
};

export const metadata: Metadata = {
  title: 'Deploy National-Scale Digital Infrastructure Platforms Without Building Systems From Scratch',
  description:
    'FlyttGo Technologies Group designs modular digital infrastructure platforms — Transify mobility, Workverge workforce coordination, Civitas government services, EduPro education intelligence, Identra identity and Payvera payments — plus the FlyttGo marketplace running on top of Transify.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main
        id="main"
        className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased"
      >
        <HeroSlider />
        <HomeRegionsStrip />
        <LiveOpsStrip />
        <TrustIndicators />
        {/* Service-models surface (SM.00) — IaaS · SaaS · PaaS ·
            Sovereign explained explicitly so visitors see the four
            delivery shapes before module / deployment detail. */}
        <Reveal>
          <HomeServiceModels />
        </Reveal>
        {/* Phase-5 narrative order:
            1. Orchestration core — explains the FlyttGoTech Core layer
            2. Deployment models matrix — names the substrates the
               modules run on (SaaS · customer cloud · sovereign)
            3. Platform ecosystem — modules grid lands AFTER the
               infrastructure explanation, not before */}
        <Reveal>
          <HomeOrchestrationCore />
        </Reveal>
        <Reveal>
          <HomeDeploymentStrip />
        </Reveal>
        {/* Procurement-grade comparison surface — DM.MX. Pairs with
            HomeDeploymentStrip's mode cards (high-level lead-in) and
            tabulates the 8 dimensions security/legal/ops actually
            compare during sign-off. */}
        <Reveal>
          <HomeDeploymentMatrix />
        </Reveal>
        <Reveal>
          <PlatformEcosystemOverview />
        </Reveal>
        <Reveal>
          <HomeIndustriesStrip />
        </Reveal>
        <Reveal>
          <HomeTechStrip />
        </Reveal>
        <Reveal>
          <ComplianceBand />
        </Reveal>
        <Reveal>
          <HomeProcurementEntry />
        </Reveal>
        <Reveal>
          <HomeFAQ />
        </Reveal>
        <Reveal>
          <FinalCTA />
        </Reveal>
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
