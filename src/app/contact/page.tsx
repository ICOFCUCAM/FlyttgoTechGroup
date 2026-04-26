import type { Metadata } from 'next';
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
              </aside>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
