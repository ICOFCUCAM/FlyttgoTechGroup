import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import { COMPARISONS } from '@/data/comparisons';
import { ArrowUpRight, Scale } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Comparisons · CP.00 — FlyttGo Technologies Group',
  description:
    'Honest comparisons against Stripe Atlas, Palantir Foundry, Databricks and AWS Marketplace. When to pick FlyttGo and when to pick the alternative — without hedging.',
  alternates: { canonical: '/compare' },
};

export default function ComparisonsIndex() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Compare', href: '/compare' },
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
          code="CP.00"
          eyebrow="Comparisons"
          title={
            <>
              Honest comparisons,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                no hedging.
              </em>
            </>
          }
          description="Where FlyttGo Technologies Group sits relative to AWS Marketplace, Palantir Foundry, Databricks and Stripe Atlas. Each comparison says explicitly when to pick the other vendor — buyers don't trust pages that pretend the comparator has no strengths."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Compare' }]}
        />

        <Reveal>
          <section
            id="cp-idx"
            aria-labelledby="cp-idx-heading"
            className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-20 lg:py-24 border-y border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">CP.IDX</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span id="cp-idx-heading">Four comparisons</span>
              </div>
              <ul className="mt-12 grid md:grid-cols-2 gap-4">
                {COMPARISONS.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/compare/${c.slug}`}
                      className="group flex flex-col h-full p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span
                          className="w-11 h-11 rounded-xl bg-[#0A3A6B]/8 dark:bg-[#9ED0F9]/12 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <Scale size={20} strokeWidth={1.75} />
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                          {c.code}
                        </span>
                      </div>
                      <h3 className="mt-5 font-serif text-xl font-medium tracking-tight text-slate-900 dark:text-white">
                        FlyttGo vs. {c.comparator}
                      </h3>
                      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
                        {c.comparatorTagline}
                      </div>
                      <p className="mt-3 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                        {c.positioning}
                      </p>
                      <div className="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800/60 flex items-center justify-between gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                          {c.rows.length}-dimension matrix
                        </span>
                        <ArrowUpRight
                          size={13}
                          className="text-slate-400 group-hover:text-[#0A3A6B] dark:group-hover:text-[#9ED0F9] motion-safe:transition-colors flex-shrink-0"
                          aria-hidden="true"
                        />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
