import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import { SHIPPED, IN_FLIGHT, PLANNED, type RoadmapItem } from '@/data/roadmap';
import { CheckCircle2, Loader2, Telescope, ArrowUpRight } from 'lucide-react';
import Link from '@/components/flytt/LocaleLink';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Public roadmap · RM.00 — FlyttGo Technologies Group',
  description:
    'Quarterly view of what shipped, what is in flight, and what is planned across the FlyttGo platform. Refreshed each quarter; all dated commitments tracked transparently.',
  alternates: { canonical: '/roadmap' },
};

type LaneMeta = {
  code: string;
  title: string;
  emphasis: string;
  body: string;
  icon: typeof CheckCircle2;
  accentCls: string;
};

const LANES: { meta: LaneMeta; items: RoadmapItem[] }[] = [
  {
    meta: {
      code: 'RM.SH',
      title: 'Shipped',
      emphasis: 'last four quarters.',
      body: 'Capability landed, in production, with attached customer references and changelog entries.',
      icon: CheckCircle2,
      accentCls: 'text-emerald-600 dark:text-emerald-400',
    },
    items: SHIPPED,
  },
  {
    meta: {
      code: 'RM.FL',
      title: 'In flight',
      emphasis: 'active engineering this quarter.',
      body: 'Code in main, behind a feature flag, with QA and security review in progress. Targeted for the next public release.',
      icon: Loader2,
      accentCls: 'text-amber-600 dark:text-amber-400',
    },
    items: IN_FLIGHT,
  },
  {
    meta: {
      code: 'RM.PL',
      title: 'Planned',
      emphasis: 'committed but not yet started.',
      body: 'Approved by the platform council; design partners assigned; engineering capacity reserved. Quarter shown is the target window, not a guarantee.',
      icon: Telescope,
      accentCls: 'text-sky-600 dark:text-sky-400',
    },
    items: PLANNED,
  },
];

export default function RoadmapPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Roadmap', href: '/roadmap' },
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
          code="RM.00"
          eyebrow="Public roadmap"
          title={
            <>
              Three lanes,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                refreshed every quarter.
              </em>
            </>
          }
          description="What's already shipped, what is in flight this quarter, what is planned for the quarters ahead. Dated commitments are tracked transparently — items that slip get an explicit changelog entry, not a quiet rewrite of history."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Roadmap' }]}
        />

        {LANES.map((lane, i) => {
          const Icon = lane.meta.icon;
          return (
            <Reveal key={lane.meta.code}>
              <section
                id={lane.meta.code.toLowerCase()}
                aria-labelledby={`${lane.meta.code.toLowerCase()}-heading`}
                className={`py-20 lg:py-24 ${i % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-slate-50 dark:bg-slate-900/40'} border-b border-slate-200/60 dark:border-slate-800/60`}
              >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                  <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                    <span className={`${lane.meta.accentCls} font-semibold`}>{lane.meta.code}</span>
                    <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[180px]" />
                    <span className="inline-flex items-center gap-1.5">
                      <Icon size={11} className={lane.meta.accentCls} aria-hidden="true" />
                      {lane.meta.title}
                    </span>
                  </div>
                  <h2
                    id={`${lane.meta.code.toLowerCase()}-heading`}
                    className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
                  >
                    {lane.meta.title}{' '}
                    <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                      {lane.meta.emphasis}
                    </em>
                  </h2>
                  <p className="mt-3 max-w-3xl text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
                    {lane.meta.body}
                  </p>
                  <ul className="mt-10 grid md:grid-cols-2 gap-3">
                    {lane.items.map((it) => (
                      <li
                        key={it.code}
                        className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <span className={`font-mono text-[10px] tracking-[0.22em] font-semibold ${lane.meta.accentCls}`}>
                            {it.code}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
                            {it.module} · {it.quarter}
                          </span>
                        </div>
                        <h3 className="mt-3 text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white leading-snug">
                          {it.title}
                        </h3>
                        <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                          {it.body}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </Reveal>
          );
        })}

        <Reveal>
          <section className="py-20 lg:py-24 bg-white dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="rounded-3xl p-10 lg:p-14 bg-[#0A1F3D] text-white border border-white/10">
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#9ED0F9] font-semibold">
                  RM.NX · roadmap notification
                </div>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl font-medium tracking-tight leading-[1.05] max-w-3xl">
                  Want to know{' '}
                  <em className="not-italic font-serif italic font-normal text-[#D6B575]">
                    when something lands?
                  </em>
                </h2>
                <p className="mt-4 max-w-2xl text-base text-white/70 leading-[1.65]">
                  The changelog is the canonical &lsquo;shipped&rsquo; record — RSS, JSON
                  feed and email digest available. Roadmap commitments that
                  slip a quarter get an explicit changelog entry rather than a
                  silent rewrite.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/changelog"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#D6B575] text-[#0A1F3D] text-sm font-semibold rounded-lg hover:bg-[#D6B575]/90 motion-safe:transition-colors"
                  >
                    Open the changelog · CL.00
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                  <Link
                    href="/rss.xml"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/[0.06] border border-white/15 text-white text-sm font-semibold rounded-lg hover:bg-white/[0.10] hover:border-white/25 motion-safe:transition-colors"
                  >
                    RSS feed
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
