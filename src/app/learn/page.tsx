import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import NextStepsGrid from '@/components/flytt/NextStepsGrid';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import {
  GraduationCap,
  Award,
  ShieldCheck,
  Network,
  Landmark,
  Cpu,
  Briefcase,
  ArrowUpRight,
  Compass,
  Clock,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Education hub · LR.00 — FlyttGo Technologies Group',
  description:
    'Six certification tracks for FlyttGo platform — architect, identity, government, marketplace, deployment, security. Free intro modules, paid advanced. Public credential verification via Identra.',
  alternates: { canonical: '/learn' },
};

type Track = {
  code: string;
  icon: LucideIcon;
  title: string;
  audience: string;
  hours: number;
  modules: number;
  level: 'Foundation' | 'Practitioner' | 'Expert';
  intro: { hours: number; price: string };
  advanced: { hours: number; price: string };
  body: string;
  outcomes: string[];
};

const TRACKS: Track[] = [
  {
    code: 'LR.T01', icon: Network,
    title: 'Platform Architect',
    audience: 'Lead architects scoping multi-module deployments',
    hours: 36, modules: 12, level: 'Practitioner',
    intro:    { hours: 6,  price: 'Free · 0 EUR' },
    advanced: { hours: 30, price: '1,400 EUR' },
    body: 'Module composition, deployment substrate selection (DM.01–DM.04), multi-region rollout, audit envelope, identity federation. Capstone: design a national-scale L.05 platform with full deployment posture.',
    outcomes: [
      'Pick the right deployment substrate for any programme shape',
      'Compose modules under audit envelope and policy-as-code',
      'Run a tier-ladder scoping engagement (SE.D2) end-to-end',
    ],
  },
  {
    code: 'LR.T02', icon: ShieldCheck,
    title: 'Identity Engineer',
    audience: 'Engineers wiring Identra into citizen / employee flows',
    hours: 28, modules: 10, level: 'Practitioner',
    intro:    { hours: 5,  price: 'Free · 0 EUR' },
    advanced: { hours: 23, price: '1,200 EUR' },
    body: 'Identra fundamentals, OIDC + SAML 2.0 federation, eIDAS LoA mapping, qualified signatures, EU Digital Identity Wallet integration via OID4VP, FIDO2 / WebAuthn rollout. Capstone: ship a relying-party flow against the EUDI Wallet.',
    outcomes: [
      'Operate Identra as a relying party against EUDI Wallets',
      'Design eIDAS LoA-substantial flows for cross-border programmes',
      'Migrate legacy identity systems to OIDC + qualified signature',
    ],
  },
  {
    code: 'LR.T03', icon: Landmark,
    title: 'Government Pilot Lead',
    audience: 'Programme leads owning ministry / municipal pilots',
    hours: 32, modules: 11, level: 'Practitioner',
    intro:    { hours: 6,  price: 'Free · 0 EUR' },
    advanced: { hours: 26, price: '1,600 EUR' },
    body: 'Public-sector procurement frameworks (G-Cloud, OJEU, NUPP), sovereign deployment posture, regulator hand-off, data-residency operations, ministry stakeholder management. Capstone: scope a multi-agency pilot under MNDA.',
    outcomes: [
      'Run a public-sector pilot under one of six jurisdiction frameworks',
      'Hand off to a regulator without losing the audit envelope',
      'Coordinate ministry + agency + citizen-facing rollout',
    ],
  },
  {
    code: 'LR.T04', icon: Network,
    title: 'Marketplace Operator',
    audience: 'Operators running multi-sided marketplaces on FlyttGo',
    hours: 24, modules: 9, level: 'Practitioner',
    intro:    { hours: 4,  price: 'Free · 0 EUR' },
    advanced: { hours: 20, price: '1,000 EUR' },
    body: 'Provider routing, trust + verification (KYC + licence), pricing intelligence, dispute resolution, settlement via Payvera + Ledgera. Capstone: launch a 3-country relocation marketplace with full audit envelope.',
    outcomes: [
      'Operate the four MP subsystems (RT / TV / PI / DR) under regulator oversight',
      'Settle cross-border transactions with T+1 reconciliation',
      'Resolve disputes through tiered adjudication without escalation overhead',
    ],
  },
  {
    code: 'LR.T05', icon: Cpu,
    title: 'Deployment Specialist',
    audience: 'SREs operating FlyttGo workspaces in production',
    hours: 30, modules: 10, level: 'Expert',
    intro:    { hours: 5,  price: 'Free · 0 EUR' },
    advanced: { hours: 25, price: '1,300 EUR' },
    body: 'Tenant operations, on-call runbooks, observability via OpenTelemetry, capacity planning, incident response, BC/DR exercises, BYOK rotation, sovereign cluster bootstrap. Capstone: lead a sovereign-region deployment.',
    outcomes: [
      'Operate a sovereign-region tenant under regulator-bounded SLAs',
      'Drive a BC/DR tabletop exercise quarterly',
      'Bootstrap a customer-cloud or sovereign cluster from zero',
    ],
  },
  {
    code: 'LR.T06', icon: ShieldCheck,
    title: 'Security Architect',
    audience: 'Security architects reviewing platform deployments',
    hours: 36, modules: 12, level: 'Expert',
    intro:    { hours: 6,  price: 'Free · 0 EUR' },
    advanced: { hours: 30, price: '1,800 EUR' },
    body: 'Threat modelling against the FlyttGo audit envelope, supply-chain (SLSA L3 + Sigstore), confidential compute (DM.04), post-quantum migration, AI agent surface safety, AI governance (AIBOM + EU AI Act). Capstone: full security review of an L.05 deployment.',
    outcomes: [
      'Run a procurement-grade security review across all eight modules',
      'Design a confidential-compute (DM.04) deployment shape',
      'Carry an AI-driven workspace through the EU AI Act risk-tier classification',
    ],
  },
];

const LEVEL_CLS: Record<Track['level'], string> = {
  Foundation:   'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  Practitioner: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  Expert:       'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300',
};

const PILLARS = [
  { code: 'LR.PR.01', title: 'Free intro · paid advanced', body: 'Every track ships a free 4-6 hour intro on FlyttGo fundamentals. Advanced certification material is paid; partner-delivered options available at a discount.' },
  { code: 'LR.PR.02', title: 'Verifiable credentials',     body: 'Issued via Identra as W3C Verifiable Credentials. Public verification at /verify/{credential-id}; revocation under StatusList 2021.' },
  { code: 'LR.PR.03', title: 'Partner-delivered tracks',    body: 'Atlas Cert Academy and Nordic Tech Institute deliver in-person + online tracks across EU, MENA and Africa with examiner accreditation.' },
];

export default function LearnPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Education hub', href: '/learn' },
  ]);

  const totalHours = TRACKS.reduce((s, t) => s + t.hours, 0);
  const totalModules = TRACKS.reduce((s, t) => s + t.modules, 0);

  return (
    <>
      <script {...jsonLdScript(ld)} />
      <Navbar />
      <main
        id="main"
        className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased"
      >
        <PageHero
          code="LR.00"
          eyebrow="Education hub"
          title={
            <>
              Six certification tracks,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                {totalHours} hours of curriculum.
              </em>
            </>
          }
          description="Architect, identity, government, marketplace, deployment, security — six certification tracks across the FlyttGo platform. Free intro module per track; paid advanced certification issued as a verifiable credential via Identra."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Education hub' }]}
        />

        {/* LR.SUM */}
        <Reveal>
          <section className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-12 lg:py-14 border-y border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <Stat label="Tracks · live"           value="6" />
                <Stat label="Curriculum hours"        value={String(totalHours)} />
                <Stat label="Modules"                 value={String(totalModules)} />
                <Stat label="Free intro · per track" value="4-6h" />
              </ul>
            </div>
          </section>
        </Reveal>

        {/* LR.PR — pillars */}
        <Reveal>
          <section className="py-16 lg:py-20 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">LR.PR</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Programme structure</span>
              </div>
              <ul className="mt-8 grid md:grid-cols-3 gap-3">
                {PILLARS.map((p) => (
                  <li
                    key={p.code}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                  >
                    <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                      {p.code}
                    </span>
                    <h3 className="mt-3 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      {p.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        {/* LR.TR — tracks */}
        <Reveal>
          <section
            id="lr-tr"
            aria-labelledby="lr-tr-heading"
            className="py-20 lg:py-24 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">LR.TR</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span id="lr-tr-heading">Certification tracks</span>
              </div>
              <ul className="mt-12 grid md:grid-cols-2 gap-4">
                {TRACKS.map((t) => {
                  const Icon = t.icon;
                  return (
                    <li
                      key={t.code}
                      className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className="w-11 h-11 rounded-xl bg-[#0A3A6B]/8 dark:bg-[#9ED0F9]/12 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <Icon size={20} strokeWidth={1.75} />
                        </span>
                        <div className="flex flex-col items-end gap-1">
                          <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                            {t.code}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.14em] font-semibold ${LEVEL_CLS[t.level]}`}>
                            {t.level}
                          </span>
                        </div>
                      </div>
                      <h3 className="mt-4 font-serif text-xl font-medium tracking-tight text-slate-900 dark:text-white">
                        {t.title}
                      </h3>
                      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
                        {t.audience}
                      </div>
                      <p className="mt-3 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                        {t.body}
                      </p>

                      <ul className="mt-4 space-y-1.5">
                        {t.outcomes.map((o) => (
                          <li key={o} className="flex items-start gap-2 text-[12px] text-slate-700 dark:text-slate-300">
                            <CheckCircle2 size={11} className="text-emerald-600 dark:text-emerald-400 mt-1 flex-shrink-0" aria-hidden="true" />
                            <span className="leading-snug">{o}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 grid grid-cols-2 gap-2">
                        <div className="rounded-lg p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200/80 dark:border-emerald-800/60">
                          <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">Free intro</div>
                          <div className="mt-1 text-[12px] font-semibold tracking-tight text-emerald-900 dark:text-emerald-200">{t.intro.hours}h · {t.intro.price}</div>
                        </div>
                        <div className="rounded-lg p-3 bg-[#0A3A6B]/5 dark:bg-[#9ED0F9]/5 border border-[#0A3A6B]/30 dark:border-[#9ED0F9]/30">
                          <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#0A3A6B] dark:text-[#9ED0F9]">Advanced</div>
                          <div className="mt-1 text-[12px] font-semibold tracking-tight text-slate-900 dark:text-white">{t.advanced.hours}h · {t.advanced.price}</div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-200/70 dark:border-slate-800/60 flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                          <Clock size={11} aria-hidden="true" />
                          {t.hours}h · {t.modules} modules
                        </span>
                        <Link
                          href={`/learn/${t.code.toLowerCase().replace('.', '-')}`}
                          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4"
                        >
                          Open track
                          <ArrowUpRight size={11} aria-hidden="true" />
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <NextStepsGrid
            code="LR.NX"
            eyebrow="Where the curriculum plugs in"
            titleLead="Certification fits inside"
            titleEmphasis="the partner ecosystem."
            intro="Tracks are self-paced or partner-delivered. Verifiable credentials issued via Identra. The four pathways below take a learner-or-buyer to next-step engagement."
            steps={[
              { href: '/partners', code: 'PR.00', icon: Briefcase,    title: 'Training partners',    body: 'Atlas Cert Academy and Nordic Tech Institute deliver paid advanced tracks across EU, MENA and Africa.', meta: 'PR.00 · 2 training partners' },
              { href: '/sandbox',  code: 'SB.SP', icon: Cpu,          title: 'Practice in sandbox',  body: 'Spin up a 60-second sandbox tenant to drive the modules referenced in the curriculum.',                  meta: 'SB.SP · 7-day TTL' },
              { href: '/wallet',   code: 'VC.00', icon: Award,        title: 'Verifiable credential', body: 'Certifications issued as W3C VCs via Identra; public verification under StatusList 2021.',                meta: 'VC.00 · eIDAS-aligned' },
              { href: '/consultation', code: 'CB.00', icon: Compass, title: 'Open enrolment desk',  body: 'Five-step intake routes a curriculum question under CT.04 enterprise programme setup.',                     meta: 'CT.04 · CB.00' },
            ]}
          />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}

const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <li className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60">
    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">{label}</div>
    <div className="mt-2 font-serif text-3xl font-medium tabular-nums text-[#0A3A6B] dark:text-[#9ED0F9]">{value}</div>
  </li>
);
