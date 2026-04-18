import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/flytt/Navbar';
import SiteFooter from '@/components/flytt/SiteFooter';
import PageHero from '@/components/flytt/PageHero';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms governing access to flyttgotech.com and the FlyttGo Technologies Group platform ecosystem. Deployment-specific terms are executed in a Master Service Agreement.',
  alternates: { canonical: '/terms' },
};

const sections = [
  {
    heading: 'Scope',
    body:
      'These terms govern browsing, contact-form submissions and public access to FlyttGo Technologies Group websites. Platform deployments, API access and enterprise licensing are governed by separate commercial agreements (MSA, Order Form, DPA, SLA).',
  },
  {
    heading: 'Acceptable use',
    body:
      'You agree not to probe, scan or test the vulnerability of any FlyttGo system without prior written authorization, introduce malware, attempt to circumvent rate limits, or use the site to harass or defame any party. Coordinated disclosure is welcomed at security@flyttgotech.com.',
  },
  {
    heading: 'Intellectual property',
    body:
      'All content on this site — including copy, illustrations, code samples and the FlyttGo platform marks (Transify, Workverge, Civitas, EduPro, Identra, Payvera, Ledgera, FlyttGo) — is owned by FlyttGo Technologies Group AB or its licensors. No licence is granted except as expressly stated.',
  },
  {
    heading: 'Third-party content',
    body:
      'Third-party tools referenced in documentation (AWS, Azure, GCP, Kubernetes, PostgreSQL and similar) are the property of their respective owners. Mention does not imply endorsement or partnership.',
  },
  {
    heading: 'Disclaimer',
    body:
      'Public content is provided "as is" without warranty. Commitments around uptime, performance, support response and security are governed by the SLA appended to each customer\'s Order Form — not by this website.',
  },
  {
    heading: 'Governing law',
    body:
      'These terms are governed by the laws of Sweden. Enterprise agreements may specify alternative governing law and dispute resolution mechanisms (ICC, SCC, LCIA) as negotiated per deployment.',
  },
  {
    heading: 'Contact',
    body:
      'For questions about these terms, contact legal@flyttgotech.com. Commercial terms, procurement templates and redlines are handled by the enterprise team.',
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <PageHero
          eyebrow="Legal · Terms"
          title={<>Terms of service for flyttgotech.com.</>}
          description="These public terms govern access to FlyttGo Technologies Group marketing surfaces. Platform deployments, API access and enterprise licensing are covered by dedicated commercial contracts."
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Legal', href: '/privacy' },
            { label: 'Terms' },
          ]}
        />

        <section className="py-14 lg:py-20">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold">
              Effective · {new Date().toISOString().slice(0, 10)}
            </p>
            <div className="mt-8 space-y-10">
              {sections.map((s) => (
                <section key={s.heading}>
                  <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                    {s.heading}
                  </h2>
                  <p className="mt-3 text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    {s.body}
                  </p>
                </section>
              ))}
            </div>

            <div className="mt-14 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60">
              <h2 className="text-base font-semibold tracking-tight">Need a commercial contract?</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Request an MSA, DPA or SLA template from the{' '}
                <Link
                  href="/contact?intent=procurement"
                  className="font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4"
                >
                  procurement team
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
