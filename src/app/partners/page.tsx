import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import {
  Briefcase,
  GraduationCap,
  Cpu,
  Users,
  Award,
  Globe2,
  ArrowUpRight,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import IndicativeNotice from '@/components/flytt/IndicativeNotice';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Partner programme · PR.00 — FlyttGo Technologies Group',
  description:
    'FlyttGo partner programme — system integrators, resellers, training partners and technology partners across EU, AF and MENA. Implementation capacity beyond the vendor.',
  alternates: { canonical: '/partners' },
};

type Tier = {
  code: string;
  name: string;
  icon: LucideIcon;
  body: string;
  benefits: string[];
};

const TIERS: Tier[] = [
  {
    code: 'PT.SI',
    name: 'System integrator',
    icon: Briefcase,
    body: 'Programme delivery partners certified to scope, build and operate FlyttGo deployments end-to-end. Carry capability across multiple modules and tier ladders (L.03 → L.06).',
    benefits: [
      'Co-sell engagement with the FlyttGo solutions desk',
      'Pre-sales support during scoping engagements (SE.D2)',
      'Sandbox tenants for integration development',
      'Joint reference programme attribution',
    ],
  },
  {
    code: 'PT.RS',
    name: 'Reseller',
    icon: Globe2,
    body: 'Regional resellers carrying the FlyttGo platform in jurisdictions where local procurement, language coverage or distribution channel matters more than implementation capacity.',
    benefits: [
      'Margin schedule on platform licences',
      'Local-language sales enablement materials',
      'Jurisdiction-specific procurement templates',
      'Pre-negotiated MSA + DPA shells',
    ],
  },
  {
    code: 'PT.TR',
    name: 'Training partner',
    icon: GraduationCap,
    body: 'Education and certification partners delivering FlyttGo platform training. Curriculum maintained jointly with the FlyttGo platform council.',
    benefits: [
      'Officially-licensed FlyttGo curriculum',
      'Examiner accreditation programme',
      'Co-marketing on /partners and platform pages',
      'Voucher schedule on certification exams',
    ],
  },
  {
    code: 'PT.TC',
    name: 'Technology partner',
    icon: Cpu,
    body: 'Technology vendors whose product integrates with FlyttGo modules — identity providers, payment processors, observability platforms, telemetry vendors. Listed on platform integration pages.',
    benefits: [
      'Integration certification programme',
      'Listing on the relevant module integration page',
      'Joint go-to-market on overlapping accounts',
      'Early access to OpenAPI changes and webhooks',
    ],
  },
];

type Partner = {
  code: string;
  name: string;
  type: 'PT.SI' | 'PT.RS' | 'PT.TR' | 'PT.TC';
  region: string;
  modules: string[];
  blurb: string;
};

const PARTNERS: Partner[] = [
  { code: 'PR.001', name: 'Nordic Platform Studio',     type: 'PT.SI', region: 'Nordic EU',         modules: ['Identra', 'Civitas', 'Workverge'],         blurb: 'Public-sector delivery partner across Norway, Sweden and Finland. 40+ ministry / agency engagements.' },
  { code: 'PR.002', name: 'Westbound Systems',          type: 'PT.SI', region: 'Western EU',        modules: ['Transify', 'Payvera', 'Workverge'],        blurb: 'Logistics + mobility specialist across DE, FR, NL, BE, ES. Carries L.04 through L.06 programmes.' },
  { code: 'PR.003', name: 'GCC Platform Group',         type: 'PT.SI', region: 'GCC',               modules: ['Civitas', 'Identra', 'Payvera'],           blurb: 'In-Kingdom delivery presence across KSA, UAE and Qatar. Sovereign-deployment specialists.' },
  { code: 'PR.004', name: 'East Africa Digital',        type: 'PT.SI', region: 'East Africa',       modules: ['Civitas', 'Workverge', 'EduPro'],          blurb: 'Municipal modernisation partner across Kenya, Uganda, Ethiopia, Rwanda and Tanzania.' },
  { code: 'PR.005', name: 'Southern Africa Cloud',      type: 'PT.SI', region: 'Southern Africa',   modules: ['Identra', 'Civitas', 'Ledgera'],           blurb: 'BEE-aligned delivery partner with sovereign-class capability in Johannesburg.' },
  { code: 'PR.006', name: 'Iberia Mobility Resellers',  type: 'PT.RS', region: 'Iberian Peninsula', modules: ['Transify', 'FlyttGo Marketplace'],         blurb: 'Spanish / Portuguese-language regional reseller for mobility-led programmes.' },
  { code: 'PR.007', name: 'MENA Public Programmes',     type: 'PT.RS', region: 'MENA',              modules: ['Civitas', 'EduPro'],                       blurb: 'Arabic-language reseller with public-sector procurement expertise across MENA.' },
  { code: 'PR.008', name: 'Atlas Cert Academy',         type: 'PT.TR', region: 'Global',            modules: ['All'],                                     blurb: 'Official FlyttGo curriculum delivered online and in-person across EU, MENA and Africa.' },
  { code: 'PR.009', name: 'Nordic Tech Institute',      type: 'PT.TR', region: 'Nordic EU',         modules: ['Identra', 'Civitas', 'Payvera'],          blurb: 'Public-sector technology training pathway with accredited examiner programme.' },
  { code: 'PR.010', name: 'OpenID Trust Federation',    type: 'PT.TC', region: 'Global',            modules: ['Identra'],                                 blurb: 'Federated trust framework partner. Identra interoperates with the OIDC Federation 1.0 ecosystem.' },
  { code: 'PR.011', name: 'Stripe',                      type: 'PT.TC', region: 'Global',            modules: ['Payvera'],                                 blurb: 'Payment processor integration. Payvera orchestrates Stripe rails alongside SEPA and national rails.' },
  { code: 'PR.012', name: 'OpenTelemetry Foundation',    type: 'PT.TC', region: 'Global',            modules: ['Platform'],                                blurb: 'Observability vendor-neutral telemetry. FlyttGo emits OTel traces across every module.' },
];

const TIER_BY_CODE = Object.fromEntries(TIERS.map((t) => [t.code, t]));

export default function PartnersPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Partners', href: '/partners' },
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
          code="PR.00"
          eyebrow="Partner programme"
          title={
            <>
              Implementation capacity{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                beyond the vendor.
              </em>
            </>
          }
          description="Four partner tiers — system integrators, resellers, training partners, technology partners — across EU, MENA and Africa. Programme delivery scales beyond FlyttGo's own consulting bench."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Partners' }]}
        />

        <IndicativeNotice
          code="PR.IND"
          body="The directory below illustrates the partner programme shape — four tiers, regional coverage, modules, eligibility. No partners are enrolled yet. Open the partner intake at the bottom of the page to register interest; the first cohort will be listed publicly with written consent."
        />

        {/* PR.TI — partner tiers */}
        <Reveal>
          <section
            id="pr-ti"
            aria-labelledby="pr-ti-heading"
            className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-20 lg:py-24 border-y border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">PR.TI</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span id="pr-ti-heading">Partner tiers</span>
              </div>
              <ul className="mt-12 grid md:grid-cols-2 gap-4">
                {TIERS.map((t) => {
                  const Icon = t.icon;
                  return (
                    <li
                      key={t.code}
                      className="flex flex-col p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span
                          className="w-11 h-11 rounded-xl bg-[#0A3A6B]/8 dark:bg-[#9ED0F9]/12 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <Icon size={20} strokeWidth={1.75} />
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                          {t.code}
                        </span>
                      </div>
                      <h3 className="mt-5 font-serif text-xl font-medium tracking-tight text-slate-900 dark:text-white">
                        {t.name}
                      </h3>
                      <p className="mt-3 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                        {t.body}
                      </p>
                      <ul className="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800/60 space-y-2">
                        {t.benefits.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                            <Sparkles size={11} className="text-[#D6B575] mt-1 flex-shrink-0" aria-hidden="true" />
                            <span className="leading-snug">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* PR.DR — partner directory */}
        <Reveal>
          <section
            id="pr-dr"
            aria-labelledby="pr-dr-heading"
            className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">PR.DR</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span id="pr-dr-heading">Partner directory</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Twelve listed partners.{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  Programme on the right one.
                </em>
              </h2>
              <ul className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {PARTNERS.map((p) => {
                  const tier = TIER_BY_CODE[p.type];
                  const TierIcon = tier?.icon ?? Users;
                  return (
                    <li
                      key={p.code}
                      className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-8 h-8 rounded-lg bg-[#0A3A6B]/8 dark:bg-[#9ED0F9]/12 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center flex-shrink-0"
                            aria-hidden="true"
                          >
                            <TierIcon size={14} strokeWidth={1.75} />
                          </span>
                          <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                            {p.code}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-600 dark:text-slate-400">
                          {p.type}
                        </span>
                      </div>
                      <h3 className="mt-3 font-serif text-base font-medium tracking-tight text-slate-900 dark:text-white">
                        {p.name}
                      </h3>
                      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
                        {p.region}
                      </div>
                      <p className="mt-2 text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed">
                        {p.blurb}
                      </p>
                      <div className="mt-3 pt-3 border-t border-slate-200/70 dark:border-slate-800/60 flex flex-wrap gap-1">
                        {p.modules.slice(0, 4).map((m) => (
                          <span
                            key={m}
                            className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-600 dark:text-slate-400"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* PR.JN — join the programme */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-900/40">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="rounded-3xl p-10 lg:p-14 bg-[#0A1F3D] text-white border border-white/10">
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#9ED0F9] font-semibold flex items-center gap-3">
                  <Award size={14} className="text-[#D6B575]" aria-hidden="true" />
                  PR.JN · become a partner
                </div>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl font-medium tracking-tight leading-[1.05] max-w-3xl">
                  Carry the platform{' '}
                  <em className="not-italic font-serif italic font-normal text-[#D6B575]">
                    where your customers operate.
                  </em>
                </h2>
                <p className="mt-4 max-w-2xl text-base text-white/70 leading-[1.65]">
                  Open the partner intake. Pick the tier that matches your
                  business shape, declare regional coverage and the modules
                  you carry. Onboarding and certification routed to the
                  partner success desk within one business day.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/contact?intent=partnership"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#D6B575] text-[#0A1F3D] text-sm font-semibold rounded-lg hover:bg-[#D6B575]/90 motion-safe:transition-colors"
                  >
                    Apply to the partner programme
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                  <Link
                    href="/consultation"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/[0.06] border border-white/15 text-white text-sm font-semibold rounded-lg hover:bg-white/[0.10] hover:border-white/25 motion-safe:transition-colors"
                  >
                    Open consultation · CB.00
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
