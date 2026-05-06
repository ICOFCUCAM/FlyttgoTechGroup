import type { Metadata } from 'next';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import Link from '@/components/flytt/LocaleLink';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import { CHANGELOG, type ChangelogEntry } from '@/data/roadmap';
import { ArrowUpRight, Sparkles, TrendingUp, Bug, Shield, AlertOctagon } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Changelog · CL.00 — FlyttGo Technologies Group',
  description:
    'Canonical record of platform changes — features, improvements, fixes, security advisories and deprecations. Every entry tagged by module and date.',
  alternates: { canonical: '/changelog' },
};

const TYPE_META: Record<ChangelogEntry['type'], { label: string; icon: typeof Sparkles; cls: string }> = {
  feature:     { label: 'Feature',     icon: Sparkles,      cls: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' },
  improvement: { label: 'Improvement', icon: TrendingUp,    cls: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
  fix:         { label: 'Fix',         icon: Bug,           cls: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' },
  security:    { label: 'Security',    icon: Shield,        cls: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' },
  deprecation: { label: 'Deprecation', icon: AlertOctagon,  cls: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' },
};

export default function ChangelogPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Changelog', href: '/changelog' },
  ]);

  // Group by month-year for headline runs.
  const byMonth = new Map<string, ChangelogEntry[]>();
  CHANGELOG.forEach((e) => {
    const key = e.date.slice(0, 7);
    const arr = byMonth.get(key) ?? [];
    arr.push(e);
    byMonth.set(key, arr);
  });

  return (
    <>
      <script {...jsonLdScript(ld)} />
      <Navbar />
      <main
        id="main"
        className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased"
      >
        <PageHero
          code="CL.00"
          eyebrow="Changelog"
          title={
            <>
              Every release,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                tagged and dated.
              </em>
            </>
          }
          description="Canonical record of every shipped change — features, improvements, fixes, security advisories and deprecations. Each entry tagged by module so operators can subscribe per surface they integrate with."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Changelog' }]}
        />

        <Reveal>
          <section className="py-16 lg:py-20 bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 border-y border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              {[...byMonth.entries()].map(([month, entries]) => {
                const monthLabel = new Date(month + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
                return (
                  <div key={month} className="mb-14 last:mb-0">
                    <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400 mb-6">
                      <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">CL.{month.replace('-', '')}</span>
                      <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[180px]" />
                      <span>{monthLabel}</span>
                    </div>
                    <ol className="space-y-3">
                      {entries.map((e) => {
                        const meta = TYPE_META[e.type];
                        const TypeIcon = meta.icon;
                        return (
                          <li
                            key={e.code}
                            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                          >
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                              <div className="flex items-center gap-3 flex-wrap">
                                <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                                  {e.code}
                                </span>
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.14em] font-semibold ${meta.cls}`}>
                                  <TypeIcon size={10} aria-hidden="true" />
                                  {meta.label}
                                </span>
                                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
                                  {e.module}
                                </span>
                              </div>
                              <span className="font-mono text-[11px] tabular-nums text-slate-500">
                                {e.date}
                              </span>
                            </div>
                            <h3 className="mt-3 text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white leading-snug">
                              {e.title}
                            </h3>
                            <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                              {e.body}
                            </p>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                );
              })}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="py-20 lg:py-24 bg-white dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="rounded-3xl p-10 lg:p-14 bg-[#0A1F3D] text-white border border-white/10">
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#9ED0F9] font-semibold">
                  CL.NX · subscribe
                </div>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl font-medium tracking-tight leading-[1.05] max-w-3xl">
                  Don&apos;t miss{' '}
                  <em className="not-italic font-serif italic font-normal text-[#D6B575]">
                    a release.
                  </em>
                </h2>
                <p className="mt-4 max-w-2xl text-base text-white/70 leading-[1.65]">
                  Per-module RSS feeds, JSON feed for tooling, monthly digest by
                  email. Security advisories also push to the trust desk.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/roadmap"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#D6B575] text-[#0A1F3D] text-sm font-semibold rounded-lg hover:bg-[#D6B575]/90 motion-safe:transition-colors"
                  >
                    See the public roadmap · RM.00
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                  <Link
                    href="/rss.xml"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/[0.06] border border-white/15 text-white text-sm font-semibold rounded-lg hover:bg-white/[0.10] hover:border-white/25 motion-safe:transition-colors"
                  >
                    Subscribe via RSS
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
