import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import { ArrowUpRight, Clock } from 'lucide-react';
import Navbar from '@/components/flytt/Navbar';
import SiteFooter from '@/components/flytt/SiteFooter';
import PageHero from '@/components/flytt/PageHero';
import { insights, insightDateFormat } from '@/data/insights';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';

export const metadata: Metadata = {
  title: 'Insights — Platform infrastructure notes',
  description:
    'Deployment guides, architecture notes and procurement playbooks from the FlyttGo Technologies Group platform, security and commercial teams.',
  alternates: { canonical: '/insights' },
  openGraph: {
    title: 'FlyttGo Insights',
    description:
      'Deployment guides, architecture notes and procurement playbooks from the FlyttGo platform teams.',
    url: '/insights',
    type: 'website',
  },
};

export default function InsightsIndexPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Insights', href: '/insights' },
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
          eyebrow="Insights"
          title={<>Notes on deploying platform infrastructure at scale.</>}
          description="Deployment guides, architecture notes and procurement playbooks from the FlyttGo platform, security and commercial teams. Written for operators and buyers evaluating modular infrastructure."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Insights' }]}
        />

        <section className="py-14 lg:py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {insights.map((post) => {
                const Icon = post.icon;
                return (
                  <li key={post.slug} className="h-full">
                    <Link
                      href={`/insights/${post.slug}`}
                      className="group flex flex-col h-full p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
                    >
                      <div className="flex items-start justify-between">
                        <span
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${post.accent}14`, color: post.accent }}
                          aria-hidden="true"
                        >
                          <Icon size={18} strokeWidth={1.75} />
                        </span>
                        <ArrowUpRight
                          size={14}
                          className="text-slate-300 group-hover:text-slate-700 dark:group-hover:text-white motion-safe:transition-colors"
                          aria-hidden="true"
                        />
                      </div>
                      <p
                        className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em]"
                        style={{ color: post.accent }}
                      >
                        {post.eyebrow}
                      </p>
                      <h2 className="mt-2 text-lg md:text-xl font-semibold tracking-tight text-slate-900 dark:text-white leading-snug group-hover:underline underline-offset-4">
                        {post.title}
                      </h2>
                      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                        {post.dek}
                      </p>
                      <div className="mt-6 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-500">
                        <span>{insightDateFormat(post.publishedOn)}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" aria-hidden="true" />
                        <span className="inline-flex items-center gap-1">
                          <Clock size={11} aria-hidden="true" />
                          {post.readMinutes} min read
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
