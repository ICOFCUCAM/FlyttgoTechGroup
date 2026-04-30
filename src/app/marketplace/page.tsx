import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import {
  Route,
  ShieldCheck,
  TrendingUp,
  Scale,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title:
    'Relocation Marketplace Infrastructure · MP.00 — FlyttGo Technologies',
  description:
    "FlyttGo's regulated multi-sided marketplace infrastructure. Provider routing engine, trust & verification layer, pricing intelligence layer, dispute resolution logic — operating across mobility, relocation and logistics.",
  alternates: { canonical: '/marketplace' },
};

type Subsystem = {
  code: string;
  anchor: string;
  icon: LucideIcon;
  title: string;
  body: string;
  primitives: string[];
  links: { label: string; href: string }[];
};

const SUBSYSTEMS: Subsystem[] = [
  {
    code: 'MP.RT',
    anchor: 'provider-routing',
    icon: Route,
    title: 'Provider Routing Engine',
    body:
      'Demand-aware routing of orders to verified providers across the marketplace. Optimises for capacity, coverage geometry, route efficiency and SLA targets — with constraint solving for regulated routes (cabotage, cross-border, hazmat).',
    primitives: [
      'Real-time provider availability index',
      'Multi-objective optimisation (cost · time · coverage)',
      'Capacity-aware load balancing across the provider pool',
      'Constraint solver for regulated routes',
      'Fallback chains and routing telemetry',
    ],
    links: [
      { label: 'Runs on Transify · mobility infrastructure', href: '/platforms/transify' },
    ],
  },
  {
    code: 'MP.TV',
    anchor: 'trust-verification',
    icon: ShieldCheck,
    title: 'Trust & Verification Layer',
    body:
      'KYC and licence verification of every onboarded provider. Identity binding, document validation, jurisdictional licence checks and continuous re-verification under regulator-bounded retention.',
    primitives: [
      'Identity verification on provider onboarding',
      'Operating-licence registry, verified per jurisdiction',
      'Vehicle and asset register with certification check',
      'Insurance & bond status tracking',
      'Reputation and incident history with audit trail',
    ],
    links: [
      { label: 'Powered by Identra · identity infrastructure', href: '/platforms/identra' },
    ],
  },
  {
    code: 'MP.PI',
    anchor: 'pricing-intelligence',
    icon: TrendingUp,
    title: 'Pricing Intelligence Layer',
    body:
      'Reference-pricing models tuned per region, route and corridor. Surfaces fair-band pricing to buyers, transparent yield rules to providers, and anomaly detection for under- or over-priced supply.',
    primitives: [
      'Regional reference-price models',
      'Surge / off-peak corridor pricing curves',
      'Provider yield bands with anomaly detection',
      'Multi-currency pricing surface',
      'Statutory tax and duty inclusion per jurisdiction',
    ],
    links: [
      { label: 'Settled through Payvera · payment orchestration', href: '/platforms/payvera' },
    ],
  },
  {
    code: 'MP.DR',
    anchor: 'dispute-resolution',
    icon: Scale,
    title: 'Dispute Resolution Logic',
    body:
      'Structured dispute workflow with documented evidence chain and adjudication policy. Handles damage claims, no-show events, cancellation disputes and provider-buyer escalations under audit-ready procedure.',
    primitives: [
      'Evidence-backed dispute case file (immutable record)',
      'Tiered adjudication: auto · desk · ombuds',
      'Restitution and refund routing through Payvera',
      'Provider-side strike and reinstatement logic',
      'Audit-ready resolution archive (regulator-defined retention)',
    ],
    links: [
      { label: 'Final-state recorded in Ledgera · financial operations', href: '/platforms/ledgera' },
    ],
  },
];

export default function MarketplacePage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Marketplace', href: '/marketplace' },
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
          code="MP.00"
          eyebrow="Relocation Marketplace Infrastructure"
          title={
            <>
              Regulated multi-sided marketplace infrastructure,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                operated as platform substrate.
              </em>
            </>
          }
          description="Four orthogonal subsystems govern every order: provider routing, trust & verification, pricing intelligence and dispute resolution. Each runs against the same FlyttGoTech Core that powers the platform ecosystem."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Marketplace' }]}
        />

        {/* MP.IDX — subsystem index */}
        <Reveal>
          <section className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-20 lg:py-24 border-t border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">MP.IDX</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Marketplace subsystems · four orthogonal layers</span>
              </div>
              <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {SUBSYSTEMS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <li key={s.code}>
                      <a
                        href={`#${s.anchor}`}
                        className="group flex flex-col h-full p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
                      >
                        <div className="flex items-start justify-between">
                          <span
                            className="w-10 h-10 rounded-xl bg-[#0A3A6B]/8 dark:bg-[#9ED0F9]/12 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center"
                            aria-hidden="true"
                          >
                            <Icon size={18} strokeWidth={1.75} />
                          </span>
                          <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                            {s.code}
                          </span>
                        </div>
                        <div className="mt-4 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white leading-snug flex-1">
                          {s.title}
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-200/70 dark:border-slate-800/60 flex items-center justify-end">
                          <ArrowUpRight
                            size={13}
                            className="text-slate-400 group-hover:text-[#0A3A6B] dark:group-hover:text-[#9ED0F9] motion-safe:transition-colors"
                            aria-hidden="true"
                          />
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* Each subsystem as its own anchored section */}
        {SUBSYSTEMS.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.code}>
              <section
                id={s.anchor}
                className={`scroll-mt-24 py-20 lg:py-24 border-t border-slate-200/60 dark:border-slate-800/60 ${
                  i % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-[#F7FAFD] dark:bg-slate-900/60'
                }`}
              >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                  <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                    <div className="lg:col-span-7">
                      <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                        <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
                          {s.code}
                        </span>
                        <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[180px]" />
                        <span>Subsystem</span>
                      </div>
                      <h2 className="mt-4 font-serif text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                        {s.title}
                      </h2>
                      <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
                        {s.body}
                      </p>
                      <ul className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-2">
                        {s.primitives.map((p) => (
                          <li
                            key={p}
                            className="text-[13px] text-slate-700 dark:text-slate-300 leading-snug pl-4 relative"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute left-0 top-2 w-1 h-1 rounded-full bg-[#0FB5A6]"
                            />
                            {p}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 pt-5 border-t border-slate-200/70 dark:border-slate-800/60 flex flex-wrap items-center gap-3">
                        {s.links.map((l) => (
                          <Link
                            key={l.href}
                            href={l.href}
                            className="inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-tight text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4"
                          >
                            {l.label}
                            <ArrowUpRight size={12} aria-hidden="true" />
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="lg:col-span-5">
                      <div className="rounded-2xl bg-[#0A1F3D] text-white p-6 lg:p-7 border border-white/10">
                        <span
                          className="w-12 h-12 rounded-xl bg-[#D6B575]/15 text-[#D6B575] flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <Icon size={22} strokeWidth={1.75} />
                        </span>
                        <div className="mt-5 font-mono text-[10px] tracking-[0.22em] uppercase text-[#D6B575] font-semibold">
                          {s.code}
                        </div>
                        <div className="mt-1 font-serif text-lg font-medium tracking-tight text-white">
                          {s.title}
                        </div>
                        <p className="mt-3 text-[12px] text-white/70 leading-relaxed">
                          One of four orthogonal subsystems that govern every
                          order on the marketplace. The four operate against
                          the same FlyttGoTech Core, share the same audit log,
                          and inherit the same regulator-bounded retention
                          posture.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </Reveal>
          );
        })}

        {/* MP.CTA — closing CTA */}
        <Reveal>
          <section className="bg-gradient-to-b from-[#F7FAFD] to-white dark:from-slate-900 dark:to-slate-950 py-24 lg:py-28 border-t border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="rounded-3xl bg-[#0A1F3D] text-white p-10 lg:p-14 border border-white/10">
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#D6B575] font-semibold">
                  MP.CTA · marketplace operator engagement
                </div>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.05] max-w-3xl">
                  Onboard your providers,{' '}
                  <em className="not-italic font-serif italic font-normal text-[#D6B575]">
                    enter the regulated marketplace.
                  </em>
                </h2>
                <p className="mt-5 max-w-2xl text-base text-white/75 leading-[1.65]">
                  Marketplace provider onboarding runs through the
                  Consultation Booking surface (CB.00) under the Marketplace
                  Provider Onboarding Session category (CT.02).
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/consultation"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#D6B575] text-[#0A1F3D] text-sm font-semibold tracking-tight rounded-lg hover:bg-[#D6B575]/90 motion-safe:transition-colors"
                  >
                    Open marketplace consultation · CB.00
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                  <Link
                    href="/platforms/flyttgo"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/[0.06] border border-white/15 text-white text-sm font-semibold rounded-lg hover:bg-white/[0.10] hover:border-white/25 motion-safe:transition-colors"
                  >
                    FlyttGo Marketplace platform
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
