'use client';

import React, { useMemo } from 'react';
import Link from '@/components/flytt/LocaleLink';
import { useSearchParams } from 'next/navigation';
import {
  FileText,
  Printer,
  Mail,
  ArrowUpRight,
  Calculator,
  AlertCircle,
} from 'lucide-react';

/**
 * SE.PG — Proposal generator engine.
 *
 * Reads the configurator state from the URL (?level=L.03&addons=AO.01,
 * AO.03&deploy=DM.OR&region=RG.EU) and renders a procurement-grade
 * pilot proposal document inline. Visitor can print to PDF, download
 * as Word, or email.
 *
 * If no configuration is present in the URL, the generator surfaces
 * the empty-state with a CTA into the cost configurator.
 */

// --- Reference data (static; matches the configurator's vocabulary) -----

type Level = { code: string; name: string; users: string; baseUSD: number; baseWeeks: number };
type AddOn = { code: string; name: string; priceUSD: number; weeks: number; context: string };
type Substrate = { code: string; name: string; priceMult: number; weeksAdd: number };
type Region = { code: string; name: string; priceMult: number; weeksAdd: number };

const LEVELS: Record<string, Level> = {
  'L.01': { code: 'L.01', name: 'Digital Presence Website',          users: 'Solo · 1–5 users',         baseUSD: 1500,    baseWeeks: 2 },
  'L.02': { code: 'L.02', name: 'Professional Business Website',     users: '5–50 users',                baseUSD: 4000,    baseWeeks: 4 },
  'L.03': { code: 'L.03', name: 'Smart Interactive Platform',        users: '50–5,000 users',            baseUSD: 15000,   baseWeeks: 8 },
  'L.04': { code: 'L.04', name: 'Enterprise Operations Platform',    users: '1,000–50,000 users',        baseUSD: 60000,   baseWeeks: 18 },
  'L.05': { code: 'L.05', name: 'National Institutional Platform',   users: '100k–5M residents',         baseUSD: 300000,  baseWeeks: 36 },
  'L.06': { code: 'L.06', name: 'Platform Ecosystem Infrastructure', users: 'Multi-country · 5M+ users', baseUSD: 1000000, baseWeeks: 60 },
};

const ADDONS: Record<string, AddOn> = {
  'AO.01': { code: 'AO.01', name: 'Authentication system',          priceUSD: 2500,  weeks: 2, context: 'SSO · SAML · OIDC' },
  'AO.02': { code: 'AO.02', name: 'Payment integration',            priceUSD: 3000,  weeks: 3, context: 'PSD2 · Stripe · SEPA' },
  'AO.03': { code: 'AO.03', name: 'Admin dashboard',                priceUSD: 4000,  weeks: 3, context: 'Multi-tenant · audit-log' },
  'AO.04': { code: 'AO.04', name: 'Mobile companion app',           priceUSD: 20000, weeks: 6, context: 'iOS + Android · React Native' },
  'AO.05': { code: 'AO.05', name: 'Marketplace engine',             priceUSD: 40000, weeks: 6, context: 'Multi-sided · provider directory' },
  'AO.06': { code: 'AO.06', name: 'Enterprise workflow system',     priceUSD: 25000, weeks: 5, context: 'Approval chains · SLA queues' },
  'AO.07': { code: 'AO.07', name: 'Government compliance module',   priceUSD: 60000, weeks: 8, context: 'eIDAS · GDPR · DPIA' },
  'AO.08': { code: 'AO.08', name: 'AI routing engine',              priceUSD: 80000, weeks: 6, context: 'Demand · routing · MLOps' },
};

const SUBSTRATES: Record<string, Substrate> = {
  'DM.01': { code: 'DM.01', name: 'Managed SaaS',                       priceMult: 1.00, weeksAdd: 0 },
  'DM.02': { code: 'DM.02', name: 'Dedicated Tenant',                   priceMult: 1.20, weeksAdd: 2 },
  'DM.OR': { code: 'DM.OR', name: 'Platform Integration (PaaS)',        priceMult: 1.35, weeksAdd: 3 },
  'DM.03': { code: 'DM.03', name: 'Sovereign Infrastructure Deployment', priceMult: 1.65, weeksAdd: 8 },
};

const REGIONS: Record<string, Region> = {
  'RG.US': { code: 'RG.US', name: 'United States',                     priceMult: 1.05, weeksAdd: 0 },
  'RG.EU': { code: 'RG.EU', name: 'Europe',                            priceMult: 1.00, weeksAdd: 0 },
  'RG.UK': { code: 'RG.UK', name: 'United Kingdom',                    priceMult: 1.05, weeksAdd: 0 },
  'RG.NO': { code: 'RG.NO', name: 'Norway / Nordics',                  priceMult: 1.10, weeksAdd: 0 },
  'RG.CA': { code: 'RG.CA', name: 'Canada',                            priceMult: 1.00, weeksAdd: 0 },
  'RG.AF': { code: 'RG.AF', name: 'Africa',                            priceMult: 0.30, weeksAdd: 0 },
  'RG.GV': { code: 'RG.GV', name: 'Government modernization environments', priceMult: 1.40, weeksAdd: 4 },
};

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

function timelineBucket(weeks: number): string {
  if (weeks <= 4)  return '2–4 weeks';
  if (weeks <= 12) return '1–3 months';
  if (weeks <= 24) return '3–6 months';
  if (weeks <= 48) return '6–12 months';
  return '12+ months';
}

// --- Empty state ---------------------------------------------------------

function EmptyState() {
  return (
    <section className="relative bg-white dark:bg-slate-950 py-24 lg:py-28">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <span
          className="w-14 h-14 mx-auto rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center"
          aria-hidden="true"
        >
          <AlertCircle size={28} strokeWidth={1.75} />
        </span>
        <h2 className="mt-6 font-serif text-2xl md:text-3xl font-medium tracking-tight text-slate-900 dark:text-white">
          No configuration provided.
        </h2>
        <p className="mt-3 text-[14px] text-slate-600 dark:text-slate-400 leading-relaxed">
          The proposal generator reads the level, modules, deployment substrate
          and region from the URL — those are produced by the live cost
          configurator. Open the configurator, build a configuration, then
          press <em>Open scoping engagement</em> to land back here with the
          full proposal pre-rendered.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/engineering/configurator"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0A3A6B] text-white text-sm font-semibold tracking-tight hover:bg-[#0A3A6B]/90 motion-safe:transition-colors"
          >
            <Calculator size={14} strokeWidth={2} aria-hidden="true" />
            Open the cost configurator · PR.00
          </Link>
          <Link
            href="/engineering/ladder"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:border-slate-300 dark:hover:border-slate-600 motion-safe:transition-colors"
          >
            Browse capability tiers · SE.02
            <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// --- Render --------------------------------------------------------------

export default function ProposalGenerator() {
  const sp = useSearchParams();

  const config = useMemo(() => {
    const levelCode = (sp?.get('level') ?? '').toUpperCase();
    const deployCode = (sp?.get('deploy') ?? '').toUpperCase();
    const regionCode = (sp?.get('region') ?? '').toUpperCase();
    const addonCodes = (sp?.get('addons') ?? '')
      .split(',')
      .map((s) => s.trim().toUpperCase())
      .filter(Boolean);

    const level = LEVELS[levelCode];
    const deployment = SUBSTRATES[deployCode];
    const region = REGIONS[regionCode];
    const addons = addonCodes.map((c) => ADDONS[c]).filter(Boolean) as AddOn[];

    if (!level || !deployment || !region) return null;

    const baseSum = level.baseUSD + addons.reduce((s, a) => s + a.priceUSD, 0);
    const total = baseSum * deployment.priceMult * region.priceMult;
    const weeksMid =
      level.baseWeeks +
      addons.reduce((s, a) => s + a.weeks, 0) * 0.6 +
      deployment.weeksAdd +
      region.weeksAdd;
    return {
      level,
      addons,
      deployment,
      region,
      totalLow: total * 0.85,
      totalHigh: total * 1.15,
      weeksLow: Math.max(1, Math.floor(weeksMid * 0.85)),
      weeksHigh: Math.ceil(weeksMid * 1.15),
      weeksMid,
      issued: new Date().toISOString().slice(0, 10),
    };
  }, [sp]);

  if (!config) return <EmptyState />;

  const {
    level,
    addons,
    deployment,
    region,
    totalLow,
    totalHigh,
    weeksLow,
    weeksHigh,
    weeksMid,
    issued,
  } = config;

  const printProposal = () => {
    if (typeof window !== 'undefined') window.print();
  };

  const downloadDoc = () => {
    if (typeof document === 'undefined') return;
    const html = document.getElementById('proposal-document')?.outerHTML ?? '';
    const doc = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"><title>FlyttGo proposal</title></head><body>${html}</body></html>`;
    const blob = new Blob([doc], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flyttgo-proposal-${level.code.toLowerCase().replace('.', '-')}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const emailProposal = () => {
    const subject = `FlyttGo proposal — ${level.code} · ${level.name}`;
    const body = `FlyttGo Proposal Generator — auto-generated draft\n\nArchitecture tier: ${level.code} · ${level.name}\nUsers: ${level.users}\nDeployment: ${deployment.code} · ${deployment.name}\nRegion: ${region.code} · ${region.name}\n${
      addons.length ? `\nModules:\n${addons.map((a) => `  + ${a.code} · ${a.name}`).join('\n')}\n` : ''
    }\nIndicative band: ${fmt(totalLow)} – ${fmt(totalHigh)} USD\nDelivery window: ${weeksLow} – ${weeksHigh} weeks (${timelineBucket(weeksMid)})\n\nIndicative — final pricing on the order form after a scoping engagement (SE.D2).\n\nFlyttGo Technologies Group AB\nplatform@flyttgotech.com`;
    window.location.href = `mailto:platform@flyttgotech.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      {/* Action toolbar — hidden in print */}
      <div className="bg-slate-50 dark:bg-slate-900 print:hidden border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-3 flex flex-wrap items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
            SE.PG · auto-generated proposal · {issued}
          </span>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={printProposal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0A3A6B] text-white text-xs font-semibold hover:bg-[#0A3A6B]/90 motion-safe:transition-colors"
            >
              <Printer size={12} strokeWidth={2} aria-hidden="true" /> Print to PDF
            </button>
            <button
              type="button"
              onClick={downloadDoc}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:border-slate-300 motion-safe:transition-colors"
            >
              <FileText size={12} strokeWidth={2} aria-hidden="true" /> Download Word
            </button>
            <button
              type="button"
              onClick={emailProposal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:border-slate-300 motion-safe:transition-colors"
            >
              <Mail size={12} strokeWidth={2} aria-hidden="true" /> Email
            </button>
          </div>
        </div>
      </div>

      {/* Proposal document */}
      <main className="bg-slate-100 dark:bg-slate-950 print:bg-white py-10 print:py-0">
        <article
          id="proposal-document"
          className="max-w-3xl mx-auto bg-white dark:bg-slate-900 dark:text-slate-100 px-10 lg:px-14 py-14 lg:py-16 shadow-[0_24px_60px_-30px_rgb(10_31_61/0.18)] print:shadow-none print:max-w-none print:px-12 print:py-10"
        >
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
            FlyttGo Technologies Group AB · SE.PG · Pilot Proposal
          </div>
          <h1 className="mt-3 font-serif text-3xl md:text-4xl font-medium tracking-tight leading-[1.05]">
            Pilot Deployment Partnership Proposal
          </h1>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
            Auto-generated · indicative · supersedes only on order form
          </p>

          {/* §1 — Configuration summary */}
          <section className="mt-10">
            <h2 className="font-serif text-xl font-medium text-[#0A3A6B] dark:text-[#9ED0F9]">
              §1 · Configuration summary
            </h2>
            <table className="mt-4 w-full border-collapse text-[12px]">
              <tbody>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th scope="row" className="text-left py-2 pr-4 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 align-top w-1/3">
                    Architecture tier
                  </th>
                  <td className="py-2 align-top">
                    <span className="font-semibold text-slate-900 dark:text-white">{level.code} · {level.name}</span>
                    <br />
                    <span className="text-slate-500 text-[11px]">Users: {level.users}</span>
                  </td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th scope="row" className="text-left py-2 pr-4 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 align-top">
                    Deployment substrate
                  </th>
                  <td className="py-2 align-top text-slate-700 dark:text-slate-300">
                    <span className="font-semibold text-slate-900 dark:text-white">{deployment.code}</span> · {deployment.name}
                  </td>
                </tr>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th scope="row" className="text-left py-2 pr-4 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 align-top">
                    Region
                  </th>
                  <td className="py-2 align-top text-slate-700 dark:text-slate-300">
                    <span className="font-semibold text-slate-900 dark:text-white">{region.code}</span> · {region.name}
                  </td>
                </tr>
                {addons.length > 0 && (
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <th scope="row" className="text-left py-2 pr-4 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 align-top">
                      Modules
                    </th>
                    <td className="py-2 align-top text-slate-700 dark:text-slate-300">
                      <ul className="space-y-0.5">
                        {addons.map((a) => (
                          <li key={a.code}>
                            <span className="font-mono text-[10px] tracking-[0.16em] text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
                              {a.code}
                            </span>{' '}
                            <span className="font-semibold text-slate-900 dark:text-white">{a.name}</span>
                            <span className="text-slate-500 text-[11px]"> — {a.context}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>

          {/* §2 — Indicative price + delivery */}
          <section className="mt-10">
            <h2 className="font-serif text-xl font-medium text-[#0A3A6B] dark:text-[#9ED0F9]">
              §2 · Indicative pricing &amp; delivery
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-6">
              <div className="p-4 rounded-lg bg-[#F7FAFD] dark:bg-slate-800/40 border-l-2 border-[#0A3A6B] dark:border-[#9ED0F9]">
                <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">
                  Cost band · USD
                </div>
                <div className="mt-1 font-serif text-2xl font-medium tabular-nums">
                  {fmt(totalLow)} – {fmt(totalHigh)}
                </div>
              </div>
              <div className="p-4 rounded-lg bg-[#F7FAFD] dark:bg-slate-800/40 border-l-2 border-[#D6B575]">
                <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">
                  Delivery window
                </div>
                <div className="mt-1 font-serif text-2xl font-medium tabular-nums">
                  {weeksLow}–{weeksHigh}w
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#D6B575]">
                  {timelineBucket(weeksMid)}
                </div>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-slate-500 leading-snug">
              Indicative ±15 %. Final point pricing appears on the order form
              signed at the close of the SE.D2 scoping engagement.
            </p>
          </section>

          {/* §3 — Engagement model */}
          <section className="mt-10">
            <h2 className="font-serif text-xl font-medium text-[#0A3A6B] dark:text-[#9ED0F9]">
              §3 · Engagement model
            </h2>
            <ol className="mt-4 grid gap-3 text-[12px]">
              <li className="p-3 rounded-md border border-slate-200 dark:border-slate-800">
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                  SE.D1 · Capability scope
                </span>
                <span className="block mt-0.5 text-slate-700 dark:text-slate-300">
                  60-minute working session · output: assigned tier · add-on shortlist · indicative envelope.
                </span>
              </li>
              <li className="p-3 rounded-md border border-slate-200 dark:border-slate-800">
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                  SE.D2 · Build scoping
                </span>
                <span className="block mt-0.5 text-slate-700 dark:text-slate-300">
                  1–3 weeks under NDA · output: written build brief · order form · point pricing.
                </span>
              </li>
              <li className="p-3 rounded-md border border-slate-200 dark:border-slate-800">
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                  SE.D3 · Build &amp; deployment
                </span>
                <span className="block mt-0.5 text-slate-700 dark:text-slate-300">
                  Sprint-cadenced · output: live deployment · written hand-over · operations runbook · audit trail.
                </span>
              </li>
            </ol>
          </section>

          {/* §4 — Sovereignty posture */}
          <section className="mt-10">
            <h2 className="font-serif text-xl font-medium text-[#0A3A6B] dark:text-[#9ED0F9]">
              §4 · Sovereignty posture
            </h2>
            <p className="mt-3 text-[12px] leading-relaxed text-slate-700 dark:text-slate-300">
              The {deployment.name} substrate carries the corresponding data-
              residency, key-custody and regulator-hand-off framework
              documented in the FlyttGoTech Government Capability Brief
              (GCB.00). The {region.name} region applies the regional
              compliance perimeter on top of that posture.
            </p>
          </section>

          {/* §5 — Next steps */}
          <section className="mt-10">
            <h2 className="font-serif text-xl font-medium text-[#0A3A6B] dark:text-[#9ED0F9]">
              §5 · Next steps
            </h2>
            <ol className="mt-3 space-y-1.5 text-[12px] text-slate-700 dark:text-slate-300 list-decimal list-inside">
              <li>Recipient signs an NDA (template furnished on request).</li>
              <li>Capability deep-dive (SE.D1) is scheduled within one business day.</li>
              <li>Pilot scope and order form are issued at the close of SE.D2.</li>
            </ol>
          </section>

          <footer className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
            FlyttGo Technologies Group AB · platform@flyttgotech.com · auto-generated by SE.PG · {issued}
          </footer>
        </article>
      </main>
    </>
  );
}
