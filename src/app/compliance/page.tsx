import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/flytt/Navbar';
import SiteFooter from '@/components/flytt/SiteFooter';
import PageHero from '@/components/flytt/PageHero';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Compliance',
  description:
    'Certifications, regulatory frameworks and jurisdictional controls applied across FlyttGo Technologies Group platform deployments.',
  alternates: { canonical: '/compliance' },
};

const frameworks = [
  {
    title: 'SOC 2 Type II',
    body:
      'Annual audit covering security, availability, confidentiality and processing integrity. Reports available under NDA.',
  },
  {
    title: 'ISO 27001',
    body:
      'Information Security Management System (ISMS) covering organisational controls, personnel, physical, and technological controls (Annex A).',
  },
  {
    title: 'GDPR',
    body:
      'Data Protection Agreement executed with every customer. Data residency honoured per deployment mode — sovereign, customer-cloud and managed EU.',
  },
  {
    title: 'WCAG 2.1 AA',
    body:
      'Accessibility conformance across customer-facing UI, including keyboard navigation, screen-reader support, colour contrast and reduced-motion respect.',
  },
  {
    title: 'PSD2 (Payvera)',
    body:
      'Strong Customer Authentication (SCA), open-banking API exposure and transactional reporting for EU payment deployments.',
  },
  {
    title: 'eIDAS (Identra)',
    body:
      'Qualified electronic signatures and trust services for cross-border digital identity in EU member states.',
  },
  {
    title: 'PCI-DSS',
    body:
      'Scoped to Payvera and FlyttGo marketplace card handling. Tokenisation + externally-hosted vaults keep customer systems out of PCI scope where possible.',
  },
  {
    title: 'Local sovereign frameworks',
    body:
      'Regional compliance programmes — UK PSN, Saudi NCA ECC, UAE IA, South Africa POPIA — handled per deployment as part of the sovereign enablement package.',
  },
];

export default function CompliancePage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <PageHero
          eyebrow="Trust · Compliance"
          title={<>Compliance across EU, AF and MENA jurisdictions.</>}
          description="FlyttGo platforms are engineered to satisfy the compliance and sovereignty requirements of regulated enterprise and public-sector deployments. This page summarises the frameworks we support; per-deployment attestations are shared under NDA."
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Trust' },
            { label: 'Compliance' },
          ]}
        />

        <section className="py-14 lg:py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {frameworks.map((f) => (
                <li
                  key={f.title}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                >
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
                    <ShieldCheck size={13} strokeWidth={1.75} aria-hidden="true" />
                    Certified
                  </div>
                  <h2 className="mt-3 text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                    {f.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {f.body}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-14 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60">
              <h2 className="text-base font-semibold tracking-tight">Request compliance documentation</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                SOC 2 reports, ISO certificates, pen-test summaries and DPIA templates are available
                to qualified enterprise and public-sector buyers under NDA.{' '}
                <Link
                  href="/contact?intent=procurement"
                  className="font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4"
                >
                  Contact procurement
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
