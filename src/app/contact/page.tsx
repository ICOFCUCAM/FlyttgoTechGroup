import type { Metadata } from 'next';
import {
  CloudCog,
  ServerCog,
  ShieldCheck,
  FileCheck2,
  ScrollText,
  Scale,
  Globe2,
  ArrowUpRight,
  Network,
  Layers,
  Cpu,
  Landmark,
} from 'lucide-react';
import Navbar from '@/components/flytt/Navbar';
import DeploymentIntake from '@/components/flytt/DeploymentIntake';
import SiteFooter from '@/components/flytt/SiteFooter';
import LocaleLink from '@/components/flytt/LocaleLink';

export const metadata: Metadata = {
  title: 'Deployment Intake — FlyttGo Technologies Group',
  description:
    'Multi-step intake for ministries, municipalities, transport authorities, universities, enterprise operators and marketplace operators scoping a FlyttGo platform deployment. Routed to a solution architect within one business day.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'FlyttGo Deployment Intake',
    description:
      'Scope a national-scale platform deployment with FlyttGo — institution type, objective, scale, timeline, and contact captured in one structured intake.',
    url: '/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main
        id="main"
        className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased"
      >
        {/* Page hero — DP.01 section index + serif headline */}
        <section className="relative pt-14 lg:pt-20 pb-10 bg-gradient-to-b from-[#F7FAFD] to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.25] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, #e2e8f0 1px, transparent 1px),' +
                'linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)',
              backgroundSize: '56px 56px',
              maskImage:
                'radial-gradient(ellipse at 20% 20%, black 30%, transparent 80%)',
            }}
          />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
                DP.01
              </span>
              <span
                aria-hidden="true"
                className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]"
              />
              <span>Deployment Intake Interface</span>
            </div>

            <h1 className="mt-6 font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05] max-w-3xl">
              Deploy your platform infrastructure{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                with FlyttGo.
              </em>
            </h1>
            <p className="mt-5 text-base md:text-lg text-slate-600 dark:text-slate-400 leading-[1.65] max-w-2xl">
              Five-step intake for ministries, municipalities, transport
              authorities, universities, enterprise operators and marketplace
              operators. Routed to a solution architect — not a sales
              representative — within one business day.
            </p>
          </div>
        </section>

        {/* Wizard + sidebar panels */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <DeploymentIntake />
              </div>
              <aside
                aria-label="Deployment intake context"
                className="lg:col-span-4 space-y-4"
              >
                {/* RT.00 — Engagement routing logic */}
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400">
                    <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
                      RT.00
                    </span>
                    <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
                    Engagement routing
                  </div>
                  <h2 className="mt-3 font-serif text-lg font-medium tracking-tight text-slate-900 dark:text-white leading-snug">
                    Routed by domain and geography — not by inbox.
                  </h2>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-[1.65]">
                    Deployments are routed by infrastructure domain
                    (mobility, identity, payments, government, education,
                    workforce, finance) and geographic scope (EU, AF, MENA)
                    to the appropriate platform deployment team. Initial
                    conversations are handled by solution architects, not
                    sales representatives.
                  </p>

                  {/* Routing flow — mono four-stage ladder */}
                  <ol className="mt-5 space-y-2">
                    {[
                      { code: 'RT.01', label: 'Intake submitted', sub: 'Structured 5-step capture' },
                      { code: 'RT.02', label: 'Domain + region triage', sub: 'Same business day' },
                      { code: 'RT.03', label: 'Solution architect assigned', sub: 'Not a sales touch' },
                      { code: 'RT.04', label: 'Scoping conversation', sub: '30-min architecture review' },
                    ].map((s, i, arr) => (
                      <li key={s.code} className="relative pl-7">
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border border-[#0A3A6B]/30 dark:border-[#1E6FD9]/40 flex items-center justify-center font-mono text-[8px] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]"
                        >
                          {i + 1}
                        </span>
                        {i < arr.length - 1 && (
                          <span
                            aria-hidden="true"
                            className="absolute left-2 top-[22px] w-px h-[calc(100%-4px)] bg-slate-200/80 dark:bg-slate-800/60"
                          />
                        )}
                        <div className="flex items-center justify-between gap-2 font-mono text-[10px] tracking-[0.18em] uppercase">
                          <span className="text-slate-400">{s.code}</span>
                          <span className="text-slate-400 normal-case tracking-tight">
                            {s.sub}
                          </span>
                        </div>
                        <div className="mt-0.5 text-[13px] font-medium text-slate-800 dark:text-slate-200 tracking-tight">
                          {s.label}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* RP.00 — Response metadata strip */}
                <div className="p-6 rounded-2xl bg-[#0A1F3D] text-white border border-white/10">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
                    <span className="text-[#9ED0F9] font-semibold">RP.00</span>
                    <span className="mx-2 text-white/20">·</span>
                    Response metadata
                  </div>

                  <dl className="mt-4 space-y-3">
                    <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-white/10">
                      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                        Expected response
                      </dt>
                      <dd className="font-mono text-[12px] text-white tracking-[0.04em] tabular-nums">
                        ≤ 1 business day
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-white/10">
                      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                        First touch
                      </dt>
                      <dd className="font-mono text-[12px] text-white tracking-[0.04em]">
                        Solution architect
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-white/10">
                      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                        Engineering contact
                      </dt>
                      <dd className="font-mono text-[12px] text-white tracking-[0.04em] truncate">
                        <a
                          href="mailto:platforms@flyttgo.tech"
                          className="text-[#9ED0F9] hover:underline underline-offset-4"
                        >
                          platforms@flyttgo.tech
                        </a>
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-white/10">
                      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                        Headquarters
                      </dt>
                      <dd className="font-mono text-[12px] text-white tracking-[0.04em]">
                        Stockholm · Nordic EU
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-3">
                      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                        Regional coordination
                      </dt>
                      <dd className="font-mono text-[12px] text-[#9ED0F9] tracking-[0.18em]">
                        EU · AF · MENA
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* DM.00 — Sovereign deployment compatibility */}
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400">
                    <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
                      DM.00
                    </span>
                    <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
                    Deployment compatibility
                  </div>
                  <h2 className="mt-3 font-serif text-lg font-medium tracking-tight text-slate-900 dark:text-white leading-snug">
                    Sovereignty-aware — managed, customer cloud, or national datacenter.
                  </h2>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-[1.65]">
                    FlyttGo platforms run across three deployment surfaces, each
                    aligned to a distinct procurement and sovereignty model.
                    Environment is selected during architecture review — not at
                    intake — so the route below is descriptive, not prescriptive.
                  </p>

                  {/* DM.01–03 — Deployment environment manifest */}
                  <ul className="mt-5 space-y-3">
                    {[
                      {
                        code: 'DM.01',
                        icon: CloudCog,
                        title: 'FlyttGo-managed',
                        sub: 'Region-aware managed SaaS · EU primary',
                        accent: '#1E6FD9',
                      },
                      {
                        code: 'DM.02',
                        icon: ServerCog,
                        title: 'Customer-controlled cloud',
                        sub: 'AWS · Azure · GCP tenancy · customer SOC',
                        accent: '#0FB5A6',
                      },
                      {
                        code: 'DM.03',
                        icon: ShieldCheck,
                        title: 'Sovereign datacenter',
                        sub: 'Certified national infrastructure · in-jurisdiction',
                        accent: '#7C5CE6',
                      },
                    ].map((d) => {
                      const Icon = d.icon;
                      return (
                        <li
                          key={d.code}
                          className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/60"
                        >
                          <span
                            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{
                              backgroundColor: `${d.accent}14`,
                              color: d.accent,
                            }}
                            aria-hidden="true"
                          >
                            <Icon size={16} strokeWidth={1.75} />
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 font-mono text-[10px] tracking-[0.18em] uppercase">
                              <span
                                className="font-semibold"
                                style={{ color: d.accent }}
                              >
                                {d.code}
                              </span>
                            </div>
                            <div className="mt-0.5 text-[13px] font-medium tracking-tight text-slate-800 dark:text-slate-200">
                              {d.title}
                            </div>
                            <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-500 leading-snug">
                              {d.sub}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Procurement compatibility note */}
                  <p className="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800/60 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-500 leading-relaxed">
                    Compatible with public-sector procurement frameworks —
                    DPS · G-Cloud · OJEU · national framework agreements.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* EP.00 — Deployment engagement pathway */}
        <section
          aria-labelledby="engagement-pathway-heading"
          className="relative py-16 lg:py-20 border-t border-slate-200/60 dark:border-slate-800/60 bg-gradient-to-b from-white to-[#F7FAFD] dark:from-slate-950 dark:to-slate-900"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
                EP.00
              </span>
              <span
                aria-hidden="true"
                className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]"
              />
              <span>Deployment engagement pathway</span>
            </div>

            <div className="mt-6 grid lg:grid-cols-12 gap-8 items-end">
              <h2
                id="engagement-pathway-heading"
                className="lg:col-span-7 font-serif text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.1]"
              >
                How deployment engagement{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  actually unfolds.
                </em>
              </h2>
              <p className="lg:col-span-5 text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
                The intake above triggers a five-stage engagement track. Each
                stage is owned by a named architect, scoped to a fixed cadence,
                and gated on a written deliverable — not on a sales cycle.
              </p>
            </div>

            {/* EP.01–05 — Engagement ladder */}
            <ol className="mt-10 grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                {
                  code: 'EP.01',
                  title: 'Initial scoping',
                  cadence: 'Week 1',
                  deliverable: 'Fit memo',
                  body: 'Solution architect reviews intake, validates fit, and confirms whether deployment is feasible against your timeline and sovereignty constraints.',
                },
                {
                  code: 'EP.02',
                  title: 'Architecture alignment',
                  cadence: 'Weeks 2–3',
                  deliverable: 'Reference architecture',
                  body: 'Module selection (Identra · Payvera · Transify · Workverge · Civitas · EduPro · Ledgera) mapped against your data, identity, and integration topology.',
                },
                {
                  code: 'EP.03',
                  title: 'Environment selection',
                  cadence: 'Weeks 3–4',
                  deliverable: 'DM.0X commitment',
                  body: 'FlyttGo-managed, customer cloud, or sovereign datacenter — selected against procurement framework, residency policy, and operational ownership model.',
                },
                {
                  code: 'EP.04',
                  title: 'Pilot rollout planning',
                  cadence: 'Weeks 4–8',
                  deliverable: 'Pilot SOW',
                  body: 'Bounded pilot scope — single city, single agency, or single operator. Success metrics, cutover plan, and operational runbook signed before any code ships.',
                },
                {
                  code: 'EP.05',
                  title: 'National scaling roadmap',
                  cadence: 'Quarter 2+',
                  deliverable: 'Regional rollout plan',
                  body: 'Pilot graduates into staged regional or cross-border rollout — onboarding cadence, regulatory checkpoints, and Ledgera-backed financial reporting alignment.',
                },
              ].map((s, i, arr) => (
                <li
                  key={s.code}
                  className="relative flex flex-col p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 motion-safe:transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 font-mono text-[10px] tracking-[0.22em] uppercase">
                    <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
                      {s.code}
                    </span>
                    <span className="text-slate-400 normal-case tracking-tight">
                      {s.cadence}
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-[1.6] flex-1">
                    {s.body}
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800/60 font-mono text-[10px] tracking-[0.16em] uppercase">
                    <span className="text-slate-400">Deliverable</span>
                    <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
                    <span className="text-slate-700 dark:text-slate-300 normal-case tracking-tight">
                      {s.deliverable}
                    </span>
                  </div>
                  {i < arr.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-slate-300 dark:bg-slate-700"
                    />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* PC.00 — Procurement compatibility */}
        <section
          aria-labelledby="procurement-heading"
          className="relative py-16 lg:py-20 border-t border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-950"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
                PC.00
              </span>
              <span
                aria-hidden="true"
                className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]"
              />
              <span>Procurement compatibility</span>
            </div>

            <div className="mt-6 grid lg:grid-cols-12 gap-8 items-end">
              <h2
                id="procurement-heading"
                className="lg:col-span-7 font-serif text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.1]"
              >
                Compatible with how public-sector{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  procurement actually works.
                </em>
              </h2>
              <p className="lg:col-span-5 text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
                FlyttGo platforms are deployable through the procurement
                frameworks ministries, municipalities and transport authorities
                already operate inside — no bespoke contracting required to
                evaluate or pilot.
              </p>
            </div>

            {/* PC.01–04 — Procurement framework matrix */}
            <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  code: 'PC.01',
                  icon: FileCheck2,
                  title: 'Dynamic Purchasing Systems',
                  scope: 'EU · UK · Nordic',
                  body: 'Available through DPS catalogues for digital, cloud, and platform infrastructure procurement.',
                  accent: '#1E6FD9',
                },
                {
                  code: 'PC.02',
                  icon: ScrollText,
                  title: 'G-Cloud-style frameworks',
                  scope: 'UK · Commonwealth',
                  body: 'Compatible with G-Cloud and equivalent national catalogue frameworks for SaaS and managed services.',
                  accent: '#0FB5A6',
                },
                {
                  code: 'PC.03',
                  icon: Scale,
                  title: 'OJEU / Find-a-Tender',
                  scope: 'EU · EEA · UK',
                  body: 'Responds to public restricted, open and competitive dialogue procedures published under OJEU and FTS.',
                  accent: '#7C5CE6',
                },
                {
                  code: 'PC.04',
                  icon: Globe2,
                  title: 'National framework agreements',
                  scope: 'AF · MENA · regional',
                  body: 'Delivered through national framework agreements and ministry-level master service agreements where DPS does not apply.',
                  accent: '#F5B547',
                },
              ].map((p) => {
                const Icon = p.icon;
                return (
                  <li
                    key={p.code}
                    className="flex flex-col p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 motion-safe:transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <span
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: `${p.accent}14`,
                          color: p.accent,
                        }}
                        aria-hidden="true"
                      >
                        <Icon size={18} strokeWidth={1.75} />
                      </span>
                      <span
                        className="font-mono text-[10px] tracking-[0.22em] font-semibold"
                        style={{ color: p.accent }}
                      >
                        {p.code}
                      </span>
                    </div>
                    <h3 className="mt-4 text-sm font-semibold tracking-tight text-slate-900 dark:text-white leading-snug">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-400 leading-[1.6] flex-1">
                      {p.body}
                    </p>
                    <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-800/60 font-mono text-[10px] tracking-[0.16em] uppercase">
                      <span className="text-slate-400">Scope</span>
                      <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
                      <span style={{ color: p.accent }}>{p.scope}</span>
                    </div>
                  </li>
                );
              })}
            </ul>

            <p className="mt-8 max-w-3xl font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-500 leading-relaxed">
              Procurement and contracting routes are confirmed during EP.03
              environment selection — pre-intake fit confirmation does not
              require a procurement decision.
            </p>
          </div>
        </section>

        {/* DP.01 — Closing intake confirmation strip */}
        <section
          aria-labelledby="dp01-confirmation-heading"
          className="relative py-12 lg:py-16 bg-[#0A1F3D] text-white border-y border-white/10"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-white/55">
              <span className="text-[#9ED0F9] font-semibold">DP.01</span>
              <span
                aria-hidden="true"
                className="flex-1 h-px bg-white/15 max-w-[200px]"
              />
              <span>Intake confirmation</span>
            </div>

            <div className="mt-6 grid lg:grid-cols-12 gap-6 items-end">
              <h2
                id="dp01-confirmation-heading"
                className="lg:col-span-8 font-serif text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight leading-[1.1]"
              >
                Submissions route to a solution architect{' '}
                <em className="not-italic font-serif italic font-normal text-[#9ED0F9]">
                  — never to a sales queue.
                </em>
              </h2>
              <p className="lg:col-span-4 text-sm text-white/65 leading-[1.65]">
                One business day to first-architect contact. Engineering escalations
                go directly to{' '}
                <a
                  href="mailto:platforms@flyttgo.tech"
                  className="text-[#9ED0F9] hover:underline underline-offset-4"
                >
                  platforms@flyttgo.tech
                </a>
                .
              </p>
            </div>

            <dl className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-[10px] uppercase tracking-[0.18em]">
              {[
                { dt: 'Intake gate', dd: 'DP.01 · 5-step structured capture' },
                { dt: 'Routing', dd: 'Domain + region triage' },
                { dt: 'First touch', dd: 'Solution architect · ≤ 1 day' },
                { dt: 'Coordination', dd: 'EU · AF · MENA' },
              ].map((c) => (
                <div
                  key={c.dt}
                  className="p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <dt className="text-white/55">{c.dt}</dt>
                  <dd className="mt-1 text-[12px] text-white tracking-[0.04em] normal-case">
                    {c.dd}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* IL.00 — Internal linking strip */}
        <section
          aria-labelledby="internal-links-heading"
          className="relative py-16 lg:py-20 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
                IL.00
              </span>
              <span
                aria-hidden="true"
                className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]"
              />
              <span>Adjacent infrastructure</span>
            </div>

            <h2
              id="internal-links-heading"
              className="mt-6 max-w-3xl font-serif text-2xl md:text-3xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.1]"
            >
              Continue reading{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                before you submit.
              </em>
            </h2>

            <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  code: 'IL.01',
                  icon: Layers,
                  title: 'Platform ecosystem',
                  sub: '8 platforms · 7 modules + marketplace',
                  href: '/platforms',
                  accent: '#1E6FD9',
                },
                {
                  code: 'IL.02',
                  icon: Network,
                  title: 'Deployment architecture',
                  sub: 'Topology · regional rollout · DM modes',
                  href: '/deployment',
                  accent: '#0FB5A6',
                },
                {
                  code: 'IL.03',
                  icon: Cpu,
                  title: 'Technology stack',
                  sub: 'Runtime · data · identity · observability',
                  href: '/technology',
                  accent: '#7C5CE6',
                },
                {
                  code: 'IL.04',
                  icon: Landmark,
                  title: 'Sovereign deployment',
                  sub: 'In-jurisdiction · national HSM · air-gap',
                  href: '/deployment/sovereign',
                  accent: '#F5B547',
                },
              ].map((l) => {
                const Icon = l.icon;
                return (
                  <li key={l.code}>
                    <LocaleLink
                      href={l.href}
                      className="group flex flex-col h-full p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
                    >
                      <div className="flex items-start justify-between">
                        <span
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            backgroundColor: `${l.accent}14`,
                            color: l.accent,
                          }}
                          aria-hidden="true"
                        >
                          <Icon size={18} strokeWidth={1.75} />
                        </span>
                        <span
                          className="font-mono text-[10px] tracking-[0.22em] font-semibold"
                          style={{ color: l.accent }}
                        >
                          {l.code}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-2">
                        <span className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
                          {l.title}
                        </span>
                        <ArrowUpRight
                          size={14}
                          className="text-slate-300 group-hover:text-slate-700 dark:group-hover:text-white motion-safe:transition-all flex-shrink-0"
                          aria-hidden="true"
                        />
                      </div>
                      <span className="mt-1 text-[12px] text-slate-500 dark:text-slate-500 leading-snug">
                        {l.sub}
                      </span>
                    </LocaleLink>
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
