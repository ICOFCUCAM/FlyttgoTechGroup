import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import { ArrowLeft } from 'lucide-react';
import PlatformOrchestrationDiagram from '@/components/flytt/government/PlatformOrchestrationDiagram';
import PrintButton from '@/components/flytt/PrintButton';

/**
 * Standalone full-screen view of the FlyttGoTech Core orchestration
 * diagram. Used as a shareable URL in pilot proposals, capability
 * briefs, regulator briefings and ministerial decks. No marketing
 * chrome — diagram, classification mark, print button.
 */

export const metadata: Metadata = {
  title:
    'Platform Orchestration Architecture — FlyttGoTech Core · Eight Modules · Three Deployment Modes',
  description:
    'FlyttGo Technologies Group platform orchestration architecture: service-delivery surface (8 modules) · FlyttGoTech Core (PaaS) · deployment substrate (IaaS-compatible) · sovereignty posture.',
  alternates: { canonical: '/government/orchestration' },
  robots: { index: true, follow: true },
};

export default function OrchestrationPage() {
  return (
    <main
      id="main"
      className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased"
    >
      {/* Top utility bar — hidden in print */}
      <div className="bg-slate-50 dark:bg-slate-900 print:hidden border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex flex-wrap items-center gap-4">
          <Link
            href="/government"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back to /government
          </Link>
          <div className="ml-auto flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
              GCB.00 · Orchestration architecture
            </span>
            <PrintButton />
          </div>
        </div>
      </div>

      <PlatformOrchestrationDiagram />

      <div className="print:hidden border-t border-slate-200 dark:border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-serif text-xl md:text-2xl font-medium tracking-tight text-slate-900 dark:text-white">
              How to read this diagram
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Top to bottom: the modules a recipient licenses, the
              orchestration substrate they all run on, the deployment
              substrate the orchestration is delivered against, and
              the sovereignty band that binds the entire architecture.
              Every contract instrument names a posture in each band.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl md:text-2xl font-medium tracking-tight text-slate-900 dark:text-white">
              Where this surface is referenced
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-600 dark:text-slate-400">
              <li>· Government Capability Brief (GCB.00) — page 2</li>
              <li>· Pilot Deployment Partnership Proposal (PP.00) — §3.4</li>
              <li>· /government landing surface — section GV.04b</li>
              <li>· Regulator briefings + ministerial decks (per engagement)</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
