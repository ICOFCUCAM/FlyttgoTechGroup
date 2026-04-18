import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/flytt/Navbar';
import SiteFooter from '@/components/flytt/SiteFooter';
import PageHero from '@/components/flytt/PageHero';
import { T } from '@/components/flytt/T';
import { platformList } from '@/data/platforms';
import { industrySectors } from '@/data/industries';
import { deploymentModes } from '@/data/deployment-modes';
import { insights } from '@/data/insights';

export const metadata: Metadata = {
  title: 'Site map',
  description:
    'A complete index of every page on the FlyttGo Technologies Group website — platforms, industries, deployment modes, company, trust and legal.',
  alternates: { canonical: '/sitemap' },
};

type Section = {
  heading: string;
  links: { label: string; href: string; note?: string }[];
};

const sections: Section[] = [
  {
    heading: 'Platforms',
    links: [
      { label: 'All platforms', href: '/platforms' },
      ...platformList.map((p) => ({
        label: p.name,
        href: `/platforms/${p.slug}`,
        note: p.subtitle,
      })),
    ],
  },
  {
    heading: 'Industries',
    links: [
      { label: 'All industries', href: '/industries' },
      ...industrySectors.map((s) => ({
        label: s.name,
        href: `/industries/${s.slug}`,
        note: s.eyebrow,
      })),
    ],
  },
  {
    heading: 'Deployment',
    links: [
      { label: 'Deployment architecture', href: '/deployment' },
      ...deploymentModes.map((m) => ({
        label: m.name,
        href: `/deployment/${m.slug}`,
        note: m.eyebrow,
      })),
    ],
  },
  {
    heading: 'Solutions & infrastructure',
    links: [
      { label: 'Solutions overview', href: '/solutions' },
      { label: 'Infrastructure modules', href: '/infrastructure' },
      { label: 'White-label program', href: '/white-label' },
      { label: 'Technology architecture', href: '/technology' },
      { label: 'Developer portal', href: '/developers' },
    ],
  },
  {
    heading: 'Insights',
    links: [
      { label: 'All insights', href: '/insights' },
      ...insights.map((i) => ({
        label: i.title,
        href: `/insights/${i.slug}`,
        note: i.eyebrow,
      })),
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About FlyttGo Technologies Group', href: '/company' },
      { label: 'Leadership', href: '/company/leadership' },
      { label: 'Careers', href: '/company/careers' },
      { label: 'Press & media', href: '/company/press' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Trust & legal',
    links: [
      { label: 'Platform status', href: '/status' },
      { label: 'Security', href: '/security' },
      { label: 'Compliance', href: '/compliance' },
      { label: 'Privacy policy', href: '/privacy' },
      { label: 'Terms of service', href: '/terms' },
    ],
  },
];

export default function SiteMapPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <PageHero
          eyebrow={<T k="sitemap.eyebrow" />}
          title={<T k="sitemap.title" />}
          description={<T k="sitemap.description" />}
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Site map' },
          ]}
        />

        <section className="py-14 lg:py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-10 lg:gap-12">
            {sections.map((sec) => (
              <div key={sec.heading}>
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  {sec.heading}
                </h2>
                <ul className="mt-4 divide-y divide-slate-200/70 dark:divide-slate-800/60 border-y border-slate-200/70 dark:border-slate-800/60">
                  {sec.links.map((l) => (
                    <li key={`${sec.heading}-${l.href}`}>
                      <Link
                        href={l.href}
                        className="group flex items-center justify-between gap-3 py-3 hover:bg-slate-50/80 dark:hover:bg-slate-900/40 motion-safe:transition-colors rounded-md -mx-2 px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
                      >
                        <span className="flex flex-col min-w-0">
                          <span className="text-[15px] font-semibold text-slate-900 dark:text-white group-hover:underline underline-offset-4 tracking-tight">
                            {l.label}
                          </span>
                          {l.note && (
                            <span className="text-xs text-slate-500 mt-0.5">{l.note}</span>
                          )}
                        </span>
                        <ArrowUpRight
                          size={14}
                          className="text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white motion-safe:transition-colors flex-shrink-0"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="max-w-6xl mx-auto px-6 lg:px-8 mt-14">
            <p className="text-xs text-slate-500 dark:text-slate-500">
              <T k="sitemap.machineReadable" />{' '}
              <Link href="/sitemap.xml" className="font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4">/sitemap.xml</Link>.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
