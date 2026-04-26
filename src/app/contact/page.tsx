import type { Metadata } from 'next';
import { CloudCog, ServerCog, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/flytt/Navbar';
import DeploymentIntake from '@/components/flytt/DeploymentIntake';
import SiteFooter from '@/components/flytt/SiteFooter';

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

        {/* Wizard — sidebar panels (Parts 9–11) slot in next */}
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
      </main>
      <SiteFooter />
    </>
  );
}
