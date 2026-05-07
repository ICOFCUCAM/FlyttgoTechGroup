import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import Navbar from '@/components/flytt/Navbar';
import PageHero from '@/components/flytt/PageHero';
import SiteFooter from '@/components/flytt/SiteFooter';
import { Reveal } from '@/components/flytt/Reveal';
import NextStepsGrid from '@/components/flytt/NextStepsGrid';
import SandboxFlow from '@/components/flytt/SandboxFlow';
import { breadcrumbListLd, jsonLdScript } from '@/lib/seo/jsonld';
import {
  Sparkles,
  ShieldCheck,
  Clock,
  Workflow,
  Cpu,
  Compass,
  Code2,
  Layers3,
  type LucideIcon,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Self-serve sandbox · SB.SP — FlyttGo Technologies Group',
  description:
    'Spin up a 7-day sandbox tenant in 60 seconds. Synthetic telemetry, scoped workspace token, full module surface, audit-envelope tracked. No credit card; no sales call.',
  alternates: { canonical: '/sandbox' },
};

type Beat = { code: string; icon: LucideIcon; title: string; body: string };

const BEATS: Beat[] = [
  { code: 'SB.B1', icon: Sparkles,    title: '60-second provisioning', body: 'Workspace, identity, audit envelope, module surface — all live in under a minute. No credit card; no sales call.' },
  { code: 'SB.B2', icon: ShieldCheck, title: 'Scoped workspace token', body: 'Sandbox-only token with sandbox:read,write scope. Cannot reach production rails. Used by the existing API playground and the AI agent surface.' },
  { code: 'SB.B3', icon: Cpu,          title: 'Synthetic telemetry seeded', body: 'Real-shape data — orders, identities, payments, services — wired into the workspace so the console and agents have something to drive.' },
  { code: 'SB.B4', icon: Clock,        title: '7-day TTL · auto-teardown',  body: 'Sandbox lifetime is 7 days. Need longer? Extend via the consultation desk for any active scoping engagement.' },
];

export default function SandboxPage() {
  const ld = breadcrumbListLd([
    { name: 'Home', href: '/' },
    { name: 'Sandbox', href: '/sandbox' },
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
          code="SB.SP"
          eyebrow="Self-serve sandbox"
          title={
            <>
              60-second sandbox tenant,{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                no credit card.
              </em>
            </>
          }
          description="Spin up a workspace seeded with synthetic telemetry and a scoped workspace token. Drive the console (OC.00), call the API playground (API.PG), or hand the token to an MCP-aware agent (AI.00). Sandbox-only; cannot reach production rails. 7-day TTL."
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Sandbox' }]}
        />

        {/* SB.FL — the actual flow */}
        <Reveal>
          <section
            id="sb-fl"
            aria-labelledby="sb-fl-heading"
            className="bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-16 lg:py-20 border-y border-slate-200/60 dark:border-slate-800/60"
          >
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400 mb-6">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">SB.FL</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span id="sb-fl-heading">Provisioning flow</span>
              </div>
              <SandboxFlow />
            </div>
          </section>
        </Reveal>

        {/* SB.BT — what makes the sandbox real */}
        <Reveal>
          <section className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">SB.BT</span>
                <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
                <span>Four guarantees</span>
              </div>
              <h2 className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]">
                Real workspace,{' '}
                <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                  not a static demo.
                </em>
              </h2>
              <ul className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                {BEATS.map((b) => {
                  const Icon = b.icon;
                  return (
                    <li
                      key={b.code}
                      className="flex flex-col p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className="w-10 h-10 rounded-lg bg-[#0A3A6B]/8 dark:bg-[#9ED0F9]/12 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center"
                          aria-hidden="true"
                        >
                          <Icon size={18} strokeWidth={1.75} />
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                          {b.code}
                        </span>
                      </div>
                      <h3 className="mt-3 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white leading-snug">
                        {b.title}
                      </h3>
                      <p className="mt-2 text-[12px] text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                        {b.body}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <NextStepsGrid
            code="SB.NX"
            eyebrow="What the sandbox unlocks"
            titleLead="A workspace is the gateway to"
            titleEmphasis="every other surface."
            intro="Sandbox token in hand, the console, the API and the AI agent surface all become live. The four pathways below take a workspace operator from spin-up to deeper engagement."
            steps={[
              { href: '/console',          code: 'OC.00', icon: Workflow, title: 'Operator console',  body: 'The same console live tenants land on. Drive deployments, audit, identity, billing.', meta: 'OC.00 · post-deploy surface' },
              { href: '/developers/api',   code: 'AP.RF', icon: Code2,    title: 'API reference',     body: 'OpenAPI 3.1 across eight modules. Workspace token unlocks the live endpoints.',         meta: 'AP.RF · 634+ endpoints' },
              { href: '/agents',           code: 'AI.00', icon: Cpu,      title: 'Drive with agents', body: 'Hand the workspace token to Claude, ChatGPT, Cursor — drive FlyttGo via MCP.',         meta: 'AI.00 · MCP-discoverable' },
              { href: '/consultation',     code: 'CB.00', icon: Compass,  title: 'Open scoping',      body: 'Five-step intake routed under CT.01 platform architecture session within one business day.', meta: 'CT.01 · CB.00' },
            ]}
          />
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
