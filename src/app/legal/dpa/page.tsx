import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import { Download, ArrowUpRight, ScrollText } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Data Processing Agreement · TC.03 — FlyttGo Technologies Group',
  description:
    'Standard GDPR Article 28 controller-to-processor terms with EU SCCs (2021/914) annexed for restricted transfers and UK IDTA addendum. Pre-signed by counsel.',
  alternates: { canonical: '/legal/dpa' },
};

export default function DPAPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Trust Center', href: '/trust' },
    { name: 'Data Processing Agreement', href: '/legal/dpa' },
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
          code="TC.03"
          eyebrow="Data Processing Agreement"
          title={
            <>
              GDPR Article 28 terms,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                pre-signed by counsel.
              </em>
            </>
          }
          description="Standard controller-to-processor agreement. EU SCCs (2021/914) annexed for restricted transfers; UK IDTA addendum for UK-bound data flows. Countersign and return — no side-letter required for the standard track."
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Trust Center', href: '/trust' },
            { label: 'Data Processing Agreement' },
          ]}
        />

        <Reveal>
          <section className="py-20 lg:py-24 bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 border-y border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
              <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 p-8 lg:p-12">
                <ScrollText size={32} className="text-[#0A3A6B] dark:text-[#9ED0F9]" aria-hidden="true" />
                <h2 className="mt-5 font-serif text-2xl md:text-3xl font-medium tracking-tight text-slate-900 dark:text-white leading-snug">
                  Standard track
                </h2>
                <p className="mt-3 text-[14px] text-slate-600 dark:text-slate-400 leading-[1.65]">
                  Most institutional buyers use the standard DPA shell with the EU
                  SCCs and (for UK flows) the IDTA addendum. The shell is countersigned
                  by FlyttGo counsel; the buyer countersigns and returns a single
                  PDF. Bound to the parent MSA on execution.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/contact?intent=dpa"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A3A6B] text-white text-sm font-semibold rounded-lg hover:bg-[#0A3A6B]/90 motion-safe:transition-colors"
                  >
                    <Download size={14} aria-hidden="true" />
                    Request the DPA pack (Word + PDF)
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                  <Link
                    href="/trust"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 text-slate-900 dark:text-white text-sm font-semibold rounded-lg hover:border-slate-300 motion-safe:transition-colors"
                  >
                    Back to Trust Center
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </div>
              <p className="mt-6 max-w-2xl font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 leading-relaxed">
                Custom DPA terms negotiated case-by-case during the scoping
                engagement (SE.D2). Material edits to the standard shell may
                affect the deployment timeline; the counsel desk flags any
                impact during scoping.
              </p>
            </div>
          </section>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
