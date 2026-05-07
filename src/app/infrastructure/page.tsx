import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import InfrastructureModules from '@/components/flytt/InfrastructureModules';
import SiteFooter from '@/components/flytt/SiteFooter';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Infrastructure — Modular Platform Components',
  description:
    'Composable infrastructure modules — payments, identity, marketplace engine, mobility intelligence, admin dashboards and analytics — powering every FlyttGo deployment.',
  alternates: { canonical: '/infrastructure' },
  openGraph: {
    title: 'FlyttGo Infrastructure Modules',
    description:
      'Composable modules for payments, identity, marketplaces, relocation intelligence, admin and analytics.',
    url: '/infrastructure',
    type: 'website',
  },
};

export default function InfrastructurePage() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <PageHero
          code="IF.00"
          eyebrow="Infrastructure Modules"
          title={
            <>
              Composable modules.{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                One platform substrate.
              </em>
            </>
          }
          description="Payments, identity, marketplace engine, mobility intelligence, admin dashboards and analytics — independent modules that compose into every FlyttGo deployment, governed by a shared audit, identity and orchestration core."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Infrastructure' }]}
        />
        <InfrastructureModules />

        {/* IF.NX — point to the architecture surface so the two
            infrastructure pages (modules vs. stack) are clearly
            differentiated rather than competing. */}
        <section
          aria-labelledby="if-nx-heading"
          className="py-20 lg:py-24 border-t border-slate-200/60 dark:border-slate-800/60 bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">IF.NX</span>
              <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
              <span>Looking for the platform stack?</span>
            </div>
            <h2
              id="if-nx-heading"
              className="mt-6 max-w-3xl font-serif text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.1]"
            >
              The modules above run on a deeper{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                seven-layer architecture.
              </em>
            </h2>
            <p className="mt-4 max-w-3xl text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
              IF.00 (this page) describes the composable modules a deployment
              picks from. IA.00 describes the architecture pillars and stack
              layers underneath every module — multi-tenant SaaS, API-first
              interoperability, Kubernetes orchestration, multi-region
              deployment, identity federation, payment infrastructure and the
              append-only data pipeline.
            </p>
            <Link
              href="/infrastructure-architecture"
              className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 bg-[#0A3A6B] text-white text-sm font-semibold tracking-tight rounded-lg hover:bg-[#0A3A6B]/90 motion-safe:transition-colors"
            >
              Open infrastructure architecture · IA.00
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
