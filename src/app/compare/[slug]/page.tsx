import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import { COMPARISONS } from '@/data/comparisons';
import { ArrowUpRight, CheckCircle2, Compass } from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const c = COMPARISONS.find((x) => x.slug === params.slug);
  if (!c) return {};
  return {
    title: `FlyttGo vs. ${c.comparator} · ${c.code}`,
    description: c.positioning,
    alternates: { canonical: `/compare/${c.slug}` },
  };
}

export default function ComparisonPage({ params }: { params: { slug: string } }) {
  const c = COMPARISONS.find((x) => x.slug === params.slug);
  if (!c) notFound();

  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Compare', href: '/compare' },
    { name: `vs ${c.comparator}`, href: `/compare/${c.slug}` },
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
          code={c.code}
          eyebrow={`vs. ${c.comparator}`}
          title={
            <>
              FlyttGo Technologies Group{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                vs. {c.comparator}.
              </em>
            </>
          }
          description={c.positioning}
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Compare', href: '/compare' },
            { label: `vs ${c.comparator}` },
          ]}
        />

        {/* When to pick which */}
        <Reveal>
          <section className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-20 lg:py-24 border-y border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">{c.code}.WP</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>When to pick which</span>
              </div>
              <div className="mt-8 grid md:grid-cols-2 gap-4">
                <div className="p-7 rounded-2xl bg-white dark:bg-slate-900 border-2 border-[#0A3A6B] dark:border-[#9ED0F9]">
                  <div className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                    Pick FlyttGo when
                  </div>
                  <p className="mt-3 text-[14px] text-slate-700 dark:text-slate-300 leading-[1.65]">
                    {c.whenToPick.flyttgo}
                  </p>
                </div>
                <div className="p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60">
                  <div className="font-mono text-[10px] tracking-[0.22em] font-semibold text-slate-600 dark:text-slate-400">
                    Pick {c.comparator} when
                  </div>
                  <p className="mt-3 text-[14px] text-slate-700 dark:text-slate-300 leading-[1.65]">
                    {c.whenToPick.comparator}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* Comparison matrix */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">{c.code}.MX</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Dimension-by-dimension</span>
              </div>
              <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800/60">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800/60">
                    <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                      <th className="px-5 py-4 font-semibold w-[260px]">Dimension</th>
                      <th className="px-5 py-4 font-semibold">
                        <span className="text-[#0A3A6B] dark:text-[#9ED0F9]">FlyttGo</span>
                      </th>
                      <th className="px-5 py-4 font-semibold">{c.comparator}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
                    {c.rows.map((r) => (
                      <tr key={r.dimension} className="motion-safe:transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-900/40">
                        <td className="px-5 py-5 align-top">
                          <div className="text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white">
                            {r.dimension}
                          </div>
                          <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
                            {r.body}
                          </div>
                        </td>
                        <td className="px-5 py-5 align-top text-[13px] text-slate-700 dark:text-slate-300 leading-snug">
                          <CheckCircle2 size={11} className="inline text-[#0A3A6B] dark:text-[#9ED0F9] mr-1 align-baseline" aria-hidden="true" />
                          {r.flyttgo}
                        </td>
                        <td className="px-5 py-5 align-top text-[13px] text-slate-600 dark:text-slate-400 leading-snug">
                          {r.comparator}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-8 max-w-3xl font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 leading-relaxed">
                Comparison reflects publicly-documented {c.comparator} capability
                as of FY2026. Re-evaluated quarterly; corrections welcome.
              </p>
            </div>
          </section>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-900/40">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="rounded-3xl p-10 lg:p-14 bg-[#0A1F3D] text-white border border-white/10">
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#9ED0F9] font-semibold">
                  {c.code}.NX · scope a programme
                </div>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl font-medium tracking-tight leading-[1.05] max-w-3xl">
                  Pick the right tool{' '}
                  <em className="not-italic font-serif italic font-normal text-[#D6B575]">
                    for the programme.
                  </em>
                </h2>
                <p className="mt-4 max-w-2xl text-base text-white/70 leading-[1.65]">
                  If FlyttGo is the right fit, the consultation desk routes
                  scoping within one business day. If {c.comparator} is the
                  right fit, the comparison still helps the team write a clear
                  brief.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/consultation"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#D6B575] text-[#0A1F3D] text-sm font-semibold rounded-lg hover:bg-[#D6B575]/90 motion-safe:transition-colors"
                  >
                    <Compass size={14} aria-hidden="true" />
                    Open consultation · CB.00
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                  <Link
                    href="/compare"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/[0.06] border border-white/15 text-white text-sm font-semibold rounded-lg hover:bg-white/[0.10] hover:border-white/25 motion-safe:transition-colors"
                  >
                    All comparisons
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
