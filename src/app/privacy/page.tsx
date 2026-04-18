import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/flytt/Navbar';
import SiteFooter from '@/components/flytt/SiteFooter';
import PageHero from '@/components/flytt/PageHero';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How FlyttGo Technologies Group collects, processes and protects personal data across EU, AF and MENA deployments — GDPR-aligned, data-residency aware.',
  alternates: { canonical: '/privacy' },
};

const sections = [
  {
    heading: 'Controllers and processors',
    body:
      'FlyttGo Technologies Group AB acts as data controller for marketing, sales and recruitment contacts collected through flyttgotech.com. For platform deployments, FlyttGo typically acts as data processor under the customer\'s instructions. A Data Processing Agreement (DPA) is executed with every enterprise and public-sector customer.',
  },
  {
    heading: 'Data we process',
    body:
      'Through this website we process only the data you submit — name, work email, company, country, deployment intent and message — plus technical metadata (IP, user agent, referrer) strictly for security, abuse prevention and aggregate analytics. We do not set marketing cookies and do not sell personal data.',
  },
  {
    heading: 'Lawful basis',
    body:
      'Contact form submissions are processed under legitimate interest for replying to your enquiry and, where relevant, on the basis of pre-contractual measures under GDPR Art. 6(1)(b). Marketing communications only occur after explicit opt-in.',
  },
  {
    heading: 'Retention',
    body:
      'Marketing contacts are retained for up to 24 months after last meaningful engagement. Deployment and contractual data follows the DPA and jurisdictional retention requirements of the deployment tenancy.',
  },
  {
    heading: 'Transfers',
    body:
      'For customer-cloud and sovereign deployments, data stays within the tenancy region. For FlyttGo-managed SaaS, primary processing is inside the EU. Where cross-border transfers occur, they rely on Standard Contractual Clauses (SCCs) and applicable supplementary safeguards.',
  },
  {
    heading: 'Data subject rights',
    body:
      'You may exercise access, rectification, erasure, restriction, objection and portability rights under GDPR, or equivalent local rights under the laws applicable to your deployment. Requests reach our Data Protection Officer at privacy@flyttgotech.com and are acknowledged within five business days.',
  },
  {
    heading: 'Security',
    body:
      'Platforms are engineered against SOC 2 Type II and ISO 27001 controls: tenant-isolated schemas, region-scoped encryption keys, MFA on privileged access, continuous vulnerability scanning and 24/7 monitoring.',
  },
  {
    heading: 'Changes to this policy',
    body:
      'We update this policy as our platform evolves or as regulations change. The effective date below reflects the latest revision. Material changes are communicated to enterprise customers through their deployment portal.',
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <PageHero
          eyebrow="Legal · Privacy"
          title={<>How FlyttGo handles your data — transparently.</>}
          description="This policy explains how FlyttGo Technologies Group collects, processes and protects personal data across our marketing surfaces and platform deployments. Enterprise customers receive a Data Processing Agreement alongside their deployment contract."
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Legal', href: '/privacy' },
            { label: 'Privacy' },
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
              <h2 className="text-base font-semibold tracking-tight">
                Privacy enquiries &amp; DPO
              </h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Reach our Data Protection Officer at{' '}
                <a
                  href="mailto:privacy@flyttgotech.com"
                  className="font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4"
                >
                  privacy@flyttgotech.com
                </a>
                . For deployment-specific requests, contact the{' '}
                <Link
                  href="/contact?intent=procurement"
                  className="font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4"
                >
                  enterprise procurement team
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
