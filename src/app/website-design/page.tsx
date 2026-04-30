import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import EngineeringPositioning from '@/components/flytt/engineering/EngineeringPositioning';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import {
  Layers3,
  Cpu,
  Rocket,
  ArrowUpRight,
  Calculator,
  type LucideIcon,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'FlyttGo Web Studio — Website Design & Platform Engineering',
  description:
    'FlyttGo Web Studio designs and builds websites, applications and platform ecosystems across six capability tiers — from a 5-day digital presence site to a national platform infrastructure programme.',
  alternates: { canonical: '/website-design' },
  openGraph: {
    title: 'FlyttGo Web Studio',
    description:
      'Website design & platform engineering across six capability tiers. From digital presence to platform-class — engineered on the same substrate.',
    url: '/website-design',
    type: 'website',
  },
};

type WayIn = {
  code: string;
  href: string;
  icon: LucideIcon;
  title: string;
  body: string;
  meta: string;
};

const WAYS_IN: WayIn[] = [
  {
    code: 'WS.LV',
    href: '/website-design/levels',
    icon: Layers3,
    title: 'Six capability levels',
    body:
      'From a 5-day digital presence site to a 6-to-18 month platform-ecosystem programme. Each level has a defined feature set, technology stack, delivery cadence and indicative pricing band per region.',
    meta: 'L.01 → L.06 · pricing per region · delivery cadence',
  },
  {
    code: 'WS.MD',
    href: '/website-design/modules',
    icon: Cpu,
    title: 'Fifteen feature modules',
    body:
      'Authentication, payments, marketplace engine, government compliance, AI routing, multi-language, audit logging — fifteen modular extensions that bolt onto any capability level.',
    meta: '15 add-ons · code-prefixed AO.01 → AO.15',
  },
  {
    code: 'WS.EG',
    href: '/website-design/engagement',
    icon: Rocket,
    title: 'Three-step engagement',
    body:
      'Every programme runs the same delivery cadence — capability scope (60 min), build scoping (NDA-bound), build & deployment (sprint-cadenced). The sprint count scales with the level; the engagement shape doesn\'t.',
    meta: 'SE.D1 · SE.D2 · SE.D3',
  },
];

export default function WebsiteDesignPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Web Studio', href: '/website-design' },
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
          code="WS.00"
          eyebrow="FlyttGo Web Studio"
          title={
            <>
              Website design and platform engineering,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                from digital presence to platform-class.
              </em>
            </>
          }
          description="Six capability tiers, fifteen modular feature add-ons, three deployment substrates — engineered on the same FlyttGoTech Core that runs our national platform deployments. From a 5-day presence site to a multi-year platform-ecosystem programme."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Web Studio' }]}
        />

        <Reveal>
          <EngineeringPositioning />
        </Reveal>

        {/* WS.IDX — three ways in */}
        <Reveal>
          <section className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-24 lg:py-28 border-t border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">WS.IDX</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Three ways into the studio</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Pick the surface you need first.{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  Each one drills deeper.
                </em>
              </h2>

              <ul className="mt-12 grid md:grid-cols-3 gap-4">
                {WAYS_IN.map((w) => {
                  const Icon = w.icon;
                  return (
                    <li key={w.code}>
                      <Link
                        href={w.href}
                        className="group flex flex-col h-full p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
                      >
                        <div className="flex items-start justify-between">
                          <span
                            className="w-12 h-12 rounded-xl bg-[#0A3A6B]/8 dark:bg-[#9ED0F9]/12 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center"
                            aria-hidden="true"
                          >
                            <Icon size={22} strokeWidth={1.75} />
                          </span>
                          <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                            {w.code}
                          </span>
                        </div>
                        <h3 className="mt-5 font-serif text-2xl font-medium tracking-tight text-slate-900 dark:text-white leading-snug">
                          {w.title}
                        </h3>
                        <p className="mt-3 text-[14px] text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                          {w.body}
                        </p>
                        <div className="mt-6 pt-4 border-t border-slate-200/70 dark:border-slate-800/60 flex items-center justify-between gap-2">
                          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                            {w.meta}
                          </span>
                          <ArrowUpRight
                            size={14}
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

        {/* WS.CTA — closing CTA */}
        <Reveal>
          <section className="bg-white dark:bg-slate-950 py-24 lg:py-28 border-t border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="rounded-3xl bg-[#0A1F3D] text-white p-10 lg:p-14 border border-white/10 shadow-[0_24px_60px_-30px_rgb(10_31_61/0.5)]">
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#D6B575] font-semibold">
                  WS.CTA · ready to estimate
                </div>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.05] max-w-3xl">
                  Build the configuration{' '}
                  <em className="not-italic font-serif italic font-normal text-[#D6B575]">
                    your programme actually needs.
                  </em>
                </h2>
                <p className="mt-5 text-base md:text-lg text-white/75 leading-[1.65] max-w-2xl">
                  Open the live cost configurator. Pick a level, layer feature
                  modules, choose a deployment substrate and a region — total
                  pricing band, delivery window and an exportable estimate
                  update live.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/pricing"
                    className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#D6B575] text-[#0A1F3D] text-sm font-semibold tracking-tight rounded-lg hover:bg-[#D6B575]/90 motion-safe:transition-colors"
                  >
                    <Calculator size={15} strokeWidth={2} aria-hidden="true" />
                    Open the live configurator · PR.00
                    <ArrowUpRight
                      size={14}
                      className="motion-safe:transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                  <Link
                    href="/consultation"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/[0.06] border border-white/15 text-white text-sm font-semibold rounded-lg hover:bg-white/[0.10] hover:border-white/25 motion-safe:transition-colors"
                  >
                    Book an architecture consultation · CB.00
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
