import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import DoctrineStrip from '@/components/flytt/engineering/DoctrineStrip';
import EngineeringSubNav from '@/components/flytt/engineering/EngineeringSubNav';
import EngineeringPositioning from '@/components/flytt/engineering/EngineeringPositioning';
import AudienceGrid from '@/components/flytt/engineering/AudienceGrid';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import {
  Layers3,
  Cpu,
  Workflow,
  Calculator,
  FileText,
  Rocket,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title:
    'Institutional Systems Engineering — Division Overview',
  description:
    "Overview of FlyttGoTech's engineering capability division. Six surfaces — capability ladder, modular add-ons, delivery model, cost configurator, proposal generator, scoping intake — each its own structured page.",
  alternates: { canonical: '/engineering' },
};

type Surface = {
  href: string;
  code: string;
  icon: LucideIcon;
  title: string;
  body: string;
  meta: string;
};

const SURFACES: Surface[] = [
  {
    href: '/engineering/ladder',
    code: 'SE.02',
    icon: Layers3,
    title: 'Capability ladder',
    body: 'Six escalating engagement tiers — L.01 digital presence website to L.06 platform-class ecosystem. Each tier carries a defined feature set, technology profile, delivery cadence and indicative regional pricing band.',
    meta: 'L.01 → L.06',
  },
  {
    href: '/engineering/modules',
    code: 'SE.03',
    icon: Cpu,
    title: 'Modular add-ons',
    body: 'Eight modular extensions that bolt onto any tier — authentication, payments, marketplace engine, government compliance, AI routing and more. Each licensed independently.',
    meta: 'AO.01 → AO.08',
  },
  {
    href: '/engineering/delivery',
    code: 'SE.04',
    icon: Workflow,
    title: 'Delivery model',
    body: 'Three-step engagement cadence applied uniformly across every tier — capability scope, build scoping, build & deployment. Sprint counts scale with tier; engagement shape is constant.',
    meta: 'SE.D1 → SE.D3',
  },
  {
    href: '/engineering/configurator',
    code: 'PR.00',
    icon: Calculator,
    title: 'Cost configurator',
    body: 'Live procurement estimator. Pick a tier, layer feature modules, choose a deployment substrate and a region — total pricing band, delivery window and exportable estimate update live.',
    meta: 'Live total · PDF / Word / email',
  },
  {
    href: '/engineering/proposal',
    code: 'SE.PG',
    icon: FileText,
    title: 'Proposal generator engine',
    body: 'Auto-generates a procurement-grade pilot proposal from the configurator output. Reads the level, modules, deployment and region from the URL and renders a printable proposal document.',
    meta: 'PDF · Word · email',
  },
  {
    href: '/engineering/scoping',
    code: 'SE.FN',
    icon: Rocket,
    title: 'Scoping intake surface',
    body: 'Engagement-desk intake routed to the engineering division. Capability deep-dive (SE.D1) scheduled within one business day; pilot scoping (SE.D2) follows under NDA.',
    meta: 'Response within one business day',
  },
];

export default function EngineeringOverviewPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Engineering', href: '/engineering' },
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
          code="SE.00"
          eyebrow="Institutional Systems Engineering"
          title={
            <>
              From digital presence to national platform infrastructure,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                engineered on the same substrate.
              </em>
            </>
          }
          description="FlyttGoTech builds digital presence websites, smart platforms, enterprise systems and sovereign-ready public infrastructure using the same engineering core that powers the FlyttGo platform ecosystem."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Engineering' }]}
        />

        <DoctrineStrip />
        <EngineeringSubNav />

        <Reveal>
          <EngineeringPositioning />
        </Reveal>

        <Reveal>
          <AudienceGrid />
        </Reveal>

        {/* SE.IDX — six division surfaces */}
        <Reveal>
          <section
            id="se-idx"
            aria-labelledby="se-idx-heading"
            className="relative bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-24 lg:py-28 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-24"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">SE.IDX</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Division surfaces · six pages</span>
              </div>

              <h2
                id="se-idx-heading"
                className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
              >
                Pick the surface{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  your programme needs first.
                </em>
              </h2>
              <p className="mt-4 max-w-3xl text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
                Each page below is a discrete capability surface within the
                engineering division. Cross-links between surfaces are
                preserved so a visitor can navigate laterally — capability
                ladder → cost configurator → proposal generator → scoping
                intake — without backtracking through the overview.
              </p>

              <ul className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {SURFACES.map((s) => {
                  const Icon = s.icon;
                  return (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        className="group flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
                      >
                        <div className="flex items-start justify-between">
                          <span
                            className="w-11 h-11 rounded-xl bg-[#0A3A6B]/8 dark:bg-[#9ED0F9]/12 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center"
                            aria-hidden="true"
                          >
                            <Icon size={20} strokeWidth={1.75} />
                          </span>
                          <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                            {s.code}
                          </span>
                        </div>
                        <h3 className="mt-5 font-serif text-xl font-medium tracking-tight text-slate-900 dark:text-white leading-snug">
                          {s.title}
                        </h3>
                        <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                          {s.body}
                        </p>
                        <div className="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800/60 flex items-center justify-between gap-2">
                          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                            {s.meta}
                          </span>
                          <ArrowUpRight
                            size={13}
                            className="text-slate-400 group-hover:text-[#0A3A6B] dark:group-hover:text-[#9ED0F9] motion-safe:transition-colors flex-shrink-0"
                            aria-hidden="true"
                          />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
