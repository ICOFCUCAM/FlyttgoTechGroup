'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Check,
  FileText,
  Mail,
  Printer,
  RotateCcw,
  ArrowRight,
  Calculator,
  ShieldCheck,
  Globe2,
  ListChecks,
} from 'lucide-react';

/**
 * PR.00 — Live infrastructure cost configurator.
 *
 * Procurement-grade pricing widget. Visitor picks a level, layers on
 * add-ons, picks a deployment substrate, picks a region — total
 * pricing band and delivery-window estimate update live. Export to
 * print-PDF, .doc and email so the estimate can be circulated
 * inside the recipient's office under standard public-sector
 * information-handling rules.
 *
 * Pricing model: total = (base + sum(addons)) × deploymentMult × regionMult
 * Timeline model: weeks = baseWeeks + sum(addonWeeks) × 0.6 + deploymentWeeks + regionWeeks
 * Range: ±15 % on price · ±15 % on timeline
 */

type Level = {
  id: string;
  code: string;
  name: string;
  baseUSD: number;
  baseWeeks: number;
  audience: string;
};

type AddOn = {
  id: string;
  code: string;
  name: string;
  priceUSD: number;
  weeks: number;
  context: string;
};

type Deployment = {
  id: string;
  code: string;
  name: string;
  priceMult: number;
  weeksAdd: number;
  sub: string;
};

type Region = {
  id: string;
  code: string;
  name: string;
  priceMult: number;
  weeksAdd: number;
  sub: string;
};

const LEVELS: Level[] = [
  { id: 'l1', code: 'L.01', name: 'Digital Presence Website',          baseUSD: 1500,    baseWeeks: 2,  audience: 'SMB · consultants · startups' },
  { id: 'l2', code: 'L.02', name: 'Professional Business Website',     baseUSD: 4000,    baseWeeks: 4,  audience: 'SMEs · schools · health centres' },
  { id: 'l3', code: 'L.03', name: 'Smart Interactive Platform',        baseUSD: 15000,   baseWeeks: 8,  audience: 'Marketplaces · universities · NGOs' },
  { id: 'l4', code: 'L.04', name: 'Enterprise Operations Platform',    baseUSD: 60000,   baseWeeks: 18, audience: 'Corporations · transport systems' },
  { id: 'l5', code: 'L.05', name: 'National Institutional Platform',   baseUSD: 300000,  baseWeeks: 36, audience: 'Ministries · transport authorities' },
  { id: 'l6', code: 'L.06', name: 'Platform Ecosystem Infrastructure', baseUSD: 1000000, baseWeeks: 60, audience: 'Cross-border · platform-class' },
];

const ADDONS: AddOn[] = [
  { id: 'auth',         code: 'AO.01', name: 'Authentication system',         priceUSD: 2500,   weeks: 2, context: 'SSO · SAML · OIDC' },
  { id: 'roles',        code: 'AO.02', name: 'Role permissions',              priceUSD: 1500,   weeks: 1, context: 'Multi-role access control' },
  { id: 'pay',          code: 'AO.03', name: 'Payment integration',           priceUSD: 3000,   weeks: 3, context: 'PSD2 · Stripe · SEPA' },
  { id: 'admin',        code: 'AO.04', name: 'Admin dashboard',               priceUSD: 4000,   weeks: 3, context: 'Multi-tenant · audit-log' },
  { id: 'mobile',       code: 'AO.05', name: 'Mobile companion app',          priceUSD: 20000,  weeks: 6, context: 'iOS + Android · React Native' },
  { id: 'api',          code: 'AO.06', name: 'API integrations',              priceUSD: 2000,   weeks: 2, context: 'REST · GraphQL · webhooks' },
  { id: 'marketplace',  code: 'AO.07', name: 'Marketplace engine',            priceUSD: 40000,  weeks: 6, context: 'Multi-sided · provider directory' },
  { id: 'workflow',     code: 'AO.08', name: 'Enterprise workflow engine',    priceUSD: 25000,  weeks: 5, context: 'Approval chains · SLA queues · DMS' },
  { id: 'gov',          code: 'AO.09', name: 'Government compliance module',  priceUSD: 60000,  weeks: 8, context: 'eIDAS · GDPR · DPIA' },
  { id: 'ai',           code: 'AO.10', name: 'AI routing engine',             priceUSD: 80000,  weeks: 6, context: 'Demand · routing · MLOps' },
];

const DEPLOYMENT: Deployment[] = [
  { id: 'saas',      code: 'DM.01', name: 'Managed SaaS',                       priceMult: 1.00, weeksAdd: 0, sub: 'FlyttGo-managed regional tenants' },
  { id: 'dedicated', code: 'DM.02', name: 'Dedicated Tenant',                   priceMult: 1.20, weeksAdd: 2, sub: 'Isolated tenant · dedicated resources' },
  { id: 'paas',      code: 'DM.OR', name: 'Platform Integration (PaaS)',        priceMult: 1.35, weeksAdd: 3, sub: 'FlyttGoTech Core orchestration substrate' },
  { id: 'sovereign', code: 'DM.03', name: 'Sovereign Infrastructure Deployment', priceMult: 1.65, weeksAdd: 8, sub: 'National datacenter · national HSM · regulator-bounded' },
];

const REGIONS: Region[] = [
  { id: 'usa', code: 'RG.NA',  name: 'USA',                              priceMult: 1.05, weeksAdd: 0, sub: 'Primary NA region' },
  { id: 'eu',  code: 'RG.EU',  name: 'Europe',                           priceMult: 1.00, weeksAdd: 0, sub: 'Primary EU region · GDPR baseline' },
  { id: 'af',  code: 'RG.AF',  name: 'Africa',                           priceMult: 0.30, weeksAdd: 0, sub: 'Regional pricing band' },
  { id: 'gov', code: 'RG.GV',  name: 'Government deployment environments', priceMult: 1.40, weeksAdd: 4, sub: 'Sovereignty + compliance overhead' },
];

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US');
const pct = (n: number) => `×${n.toFixed(2)}`;

function buildEstimateHTML(args: {
  level: Level;
  addons: AddOn[];
  deployment: Deployment;
  region: Region;
  totalLow: number;
  totalHigh: number;
  weeksLow: number;
  weeksHigh: number;
  issued: string;
}): string {
  const { level, addons, deployment, region, totalLow, totalHigh, weeksLow, weeksHigh, issued } = args;
  return `
<style>
  body { font-family: 'IBM Plex Serif', Georgia, serif; color: #0A1F3D; padding: 56px 64px; max-width: 794px; margin: 0 auto; }
  .rail { font-family: ui-monospace, 'JetBrains Mono', monospace; font-size: 9pt; letter-spacing: 0.22em; text-transform: uppercase; color: #0A3A6B; margin-bottom: 24px; }
  h1 { font-family: 'IBM Plex Serif', Georgia, serif; font-size: 22pt; font-weight: 500; margin: 0 0 4px; line-height: 1.1; }
  h2 { font-family: 'IBM Plex Serif', Georgia, serif; font-size: 13pt; color: #0A3A6B; margin: 18px 0 6px; }
  .lede { color: #475569; font-size: 11pt; margin: 0 0 28px; }
  table { width: 100%; border-collapse: collapse; font-size: 10pt; margin: 4px 0 12px; }
  th, td { padding: 6px 0; border-bottom: 1px solid #E2E8F0; text-align: left; vertical-align: top; }
  th { font-family: ui-monospace, 'JetBrains Mono', monospace; font-size: 8pt; letter-spacing: 0.18em; text-transform: uppercase; color: #64748B; }
  td.num { text-align: right; font-family: ui-monospace, 'JetBrains Mono', monospace; tabular-nums: 1; color: #0A3A6B; }
  .total { margin-top: 24px; padding: 16px 20px; background: #F7FAFD; border-left: 3px solid #0A3A6B; }
  .total-label { font-family: ui-monospace, 'JetBrains Mono', monospace; font-size: 9pt; letter-spacing: 0.18em; text-transform: uppercase; color: #64748B; }
  .total-value { font-family: 'IBM Plex Serif', Georgia, serif; font-size: 22pt; font-weight: 500; color: #0A3A6B; margin-top: 4px; }
  .meta { font-family: ui-monospace, 'JetBrains Mono', monospace; font-size: 8pt; letter-spacing: 0.18em; text-transform: uppercase; color: #64748B; margin-top: 32px; }
  .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid #CBD5E1; font-size: 9pt; color: #64748B; }
</style>
<div class="rail">FlyttGo Technologies Group AB · PR.00 · Indicative estimate</div>
<h1>Infrastructure cost estimate</h1>
<p class="lede">Generated by the FlyttGo Pricing Configurator (PR.00). Indicative — final pricing on the order form after a scoping engagement.</p>

<h2>Configuration</h2>
<table>
  <tr><th>Capability level</th><td>${level.code} · ${level.name}</td><td class="num">${fmt(level.baseUSD)}</td></tr>
  ${addons.map((a) => `<tr><th>+ ${a.code}</th><td>${a.name}</td><td class="num">${fmt(a.priceUSD)}</td></tr>`).join('')}
  <tr><th>Deployment substrate</th><td>${deployment.code} · ${deployment.name}</td><td class="num">${pct(deployment.priceMult)}</td></tr>
  <tr><th>Region</th><td>${region.code} · ${region.name}</td><td class="num">${pct(region.priceMult)}</td></tr>
</table>

<div class="total">
  <div class="total-label">Estimated total · USD · indicative band</div>
  <div class="total-value">${fmt(totalLow)} – ${fmt(totalHigh)}</div>
  <div class="total-label" style="margin-top: 14px;">Estimated delivery window</div>
  <div class="total-value" style="font-size: 16pt;">${weeksLow} – ${weeksHigh} weeks</div>
</div>

<div class="meta">Issued ${issued} · pricing in USD · per scoping engagement</div>
<div class="footer">FlyttGo Technologies Group AB · platform@flyttgotech.com · this estimate is indicative and supersedes only on the order form signed after the scoping engagement (SE.D2). Suitable for circulation under standard public-sector information-handling rules.</div>
`;
}

function buildEstimatePlainText(args: {
  level: Level;
  addons: AddOn[];
  deployment: Deployment;
  region: Region;
  totalLow: number;
  totalHigh: number;
  weeksLow: number;
  weeksHigh: number;
}): string {
  const { level, addons, deployment, region, totalLow, totalHigh, weeksLow, weeksHigh } = args;
  const lines: string[] = [];
  lines.push('FlyttGo Pricing Configurator — indicative estimate');
  lines.push('');
  lines.push(`Level:        ${level.code} · ${level.name}`);
  lines.push(`Base:         ${fmt(level.baseUSD)}`);
  if (addons.length) {
    lines.push('');
    lines.push('Add-ons:');
    for (const a of addons) {
      lines.push(`  + ${a.code} · ${a.name.padEnd(40)} ${fmt(a.priceUSD)}`);
    }
  }
  lines.push('');
  lines.push(`Deployment:   ${deployment.code} · ${deployment.name} (${pct(deployment.priceMult)})`);
  lines.push(`Region:       ${region.code} · ${region.name} (${pct(region.priceMult)})`);
  lines.push('');
  lines.push(`Total band:   ${fmt(totalLow)} – ${fmt(totalHigh)}`);
  lines.push(`Delivery:     ${weeksLow} – ${weeksHigh} weeks`);
  lines.push('');
  lines.push('Indicative — final pricing on the order form after a scoping engagement.');
  lines.push('FlyttGo Technologies Group AB · platform@flyttgotech.com');
  return lines.join('\n');
}

type StepCardProps = {
  code: string;
  number: number;
  title: string;
  children: React.ReactNode;
};
function StepCard({ code, number, title, children }: StepCardProps) {
  return (
    <section className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 p-6 lg:p-7">
      <div className="flex items-center gap-3 mb-5 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
        <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">{code}</span>
        <span aria-hidden="true" className="text-slate-200 dark:text-slate-700">·</span>
        <span className="text-slate-500">Step {number}</span>
        <span aria-hidden="true" className="text-slate-200 dark:text-slate-700">·</span>
        <span className="text-slate-700 dark:text-slate-300 normal-case tracking-tight font-sans">
          {title}
        </span>
      </div>
      {children}
    </section>
  );
}

type PickerCardProps = {
  active: boolean;
  onClick: () => void;
  code: string;
  title: string;
  body?: string;
  meta?: string;
  accent?: string;
  type?: 'radio' | 'checkbox';
  badge?: string;
};
function PickerCard({ active, onClick, code, title, body, meta, accent = '#0A3A6B', type = 'radio', badge }: PickerCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group text-left p-4 rounded-xl border-2 motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px] ${
        active
          ? 'bg-[#0A3A6B]/[0.04] dark:bg-[#9ED0F9]/[0.06]'
          : 'bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
      }`}
      style={{ borderColor: active ? accent : 'rgb(226 232 240 / 0.8)' }}
      aria-pressed={active}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 w-5 h-5 flex items-center justify-center flex-shrink-0 ${
            type === 'radio' ? 'rounded-full' : 'rounded-md'
          } border-2 ${active ? 'border-transparent' : 'border-slate-300 dark:border-slate-600'}`}
          style={{ backgroundColor: active ? accent : 'transparent' }}
          aria-hidden="true"
        >
          {active && <Check size={12} strokeWidth={3} className="text-white" />}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase font-semibold" style={{ color: accent }}>
              {code}
            </span>
            {badge && (
              <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                {badge}
              </span>
            )}
          </div>
          <div className="mt-1 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white leading-snug">
            {title}
          </div>
          {body && (
            <div className="mt-1 text-[12px] text-slate-500 dark:text-slate-400 leading-snug">
              {body}
            </div>
          )}
          {meta && (
            <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 tabular-nums">
              {meta}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

type SummaryRowProps = {
  label: string;
  value: string;
  accent?: boolean;
  small?: boolean;
};
function SummaryRow({ label, value, accent, small }: SummaryRowProps) {
  return (
    <div className={`flex items-baseline justify-between gap-3 ${small ? 'py-1' : 'py-1.5'}`}>
      <span className={`text-slate-300 ${small ? 'text-[11px]' : 'text-[12px]'} truncate`}>{label}</span>
      <span
        className={`font-mono tabular-nums ${
          accent ? 'text-[#D6B575] font-semibold' : 'text-white'
        } ${small ? 'text-[11px]' : 'text-[13px]'} flex-shrink-0`}
      >
        {value}
      </span>
    </div>
  );
}

const DEFAULT_LEVEL = 'l2';
const DEFAULT_DEPLOYMENT = 'saas';
const DEFAULT_REGION = 'eu';

const VALID_LEVELS = new Set(LEVELS.map((l) => l.id));
const VALID_ADDONS = new Set(ADDONS.map((a) => a.id));
const VALID_DEPLOYMENTS = new Set(DEPLOYMENT.map((d) => d.id));
const VALID_REGIONS = new Set(REGIONS.map((r) => r.id));

export default function PricingConfigurator() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Hydrate initial state from URL params so the configurator is
  // shareable — sending a link with ?level=l3&addons=auth,pay
  // restores the recipient's view exactly. Falls back to defaults
  // for any missing/invalid parameter.
  const initial = useMemo(() => {
    const levelParam = searchParams?.get('level') ?? '';
    const deployParam = searchParams?.get('deploy') ?? '';
    const regionParam = searchParams?.get('region') ?? '';
    const addonsParam = (searchParams?.get('addons') ?? '').split(',').filter(Boolean);
    return {
      level: VALID_LEVELS.has(levelParam) ? levelParam : DEFAULT_LEVEL,
      deployment: VALID_DEPLOYMENTS.has(deployParam) ? deployParam : DEFAULT_DEPLOYMENT,
      region: VALID_REGIONS.has(regionParam) ? regionParam : DEFAULT_REGION,
      addons: new Set(addonsParam.filter((a) => VALID_ADDONS.has(a))),
    };
    // Hydrate once on mount; URL is then updated by the configurator
    // itself so subsequent searchParams changes are our own.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [levelId, setLevelId] = useState<string>(initial.level);
  const [addonIds, setAddonIds] = useState<Set<string>>(initial.addons);
  const [deploymentId, setDeploymentId] = useState<string>(initial.deployment);
  const [regionId, setRegionId] = useState<string>(initial.region);

  // Persist state into the URL on every change so the link is always
  // shareable. router.replace is shallow (no scroll, no re-render of
  // server tree).
  useEffect(() => {
    const sp = new URLSearchParams();
    if (levelId !== DEFAULT_LEVEL) sp.set('level', levelId);
    if (addonIds.size) sp.set('addons', Array.from(addonIds).join(','));
    if (deploymentId !== DEFAULT_DEPLOYMENT) sp.set('deploy', deploymentId);
    if (regionId !== DEFAULT_REGION) sp.set('region', regionId);
    const query = sp.toString();
    const url = query ? `/pricing?${query}` : '/pricing';
    router.replace(url, { scroll: false });
  }, [levelId, addonIds, deploymentId, regionId, router]);

  const level = useMemo(() => LEVELS.find((l) => l.id === levelId)!, [levelId]);
  const addons = useMemo(
    () => ADDONS.filter((a) => addonIds.has(a.id)),
    [addonIds],
  );
  const deployment = useMemo(() => DEPLOYMENT.find((d) => d.id === deploymentId)!, [deploymentId]);
  const region = useMemo(() => REGIONS.find((r) => r.id === regionId)!, [regionId]);

  const totals = useMemo(() => {
    const baseSum = level.baseUSD + addons.reduce((s, a) => s + a.priceUSD, 0);
    const total = baseSum * deployment.priceMult * region.priceMult;
    const weeks =
      level.baseWeeks +
      addons.reduce((s, a) => s + a.weeks, 0) * 0.6 +
      deployment.weeksAdd +
      region.weeksAdd;
    return {
      total,
      totalLow: total * 0.85,
      totalHigh: total * 1.15,
      weeks,
      weeksLow: Math.max(1, Math.floor(weeks * 0.85)),
      weeksHigh: Math.ceil(weeks * 1.15),
    };
  }, [level, addons, deployment, region]);

  const toggleAddon = (id: string) => {
    setAddonIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const reset = () => {
    setLevelId(DEFAULT_LEVEL);
    setAddonIds(new Set());
    setDeploymentId(DEFAULT_DEPLOYMENT);
    setRegionId(DEFAULT_REGION);
  };

  const exportArgs = () => ({
    level,
    addons,
    deployment,
    region,
    totalLow: totals.totalLow,
    totalHigh: totals.totalHigh,
    weeksLow: totals.weeksLow,
    weeksHigh: totals.weeksHigh,
    issued: new Date().toISOString().slice(0, 10),
  });

  const printEstimate = () => {
    const html = buildEstimateHTML(exportArgs());
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(
      `<!doctype html><html><head><meta charset="utf-8"><title>FlyttGo estimate</title></head><body>${html}</body></html>`,
    );
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 200);
  };

  const downloadDoc = () => {
    const html = buildEstimateHTML(exportArgs());
    const doc = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"><title>FlyttGo estimate</title></head><body>${html}</body></html>`;
    const blob = new Blob([doc], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flyttgo-estimate-${level.code.toLowerCase().replace('.', '-')}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const emailEstimate = () => {
    const subject = `FlyttGo estimate — ${level.code} · ${level.name}`;
    const body = buildEstimatePlainText({
      level,
      addons,
      deployment,
      region,
      totalLow: totals.totalLow,
      totalHigh: totals.totalHigh,
      weeksLow: totals.weeksLow,
      weeksHigh: totals.weeksHigh,
    });
    const href = `mailto:platform@flyttgotech.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  };

  const intakeUrl = useMemo(() => {
    const params = new URLSearchParams({
      intent: 'engineering',
      level: level.code,
      deployment: deployment.code,
      region: region.code,
    });
    if (addonIds.size) {
      params.set('addons', addons.map((a) => a.code).join(','));
    }
    params.set(
      'estimate',
      `${fmt(totals.totalLow)}-${fmt(totals.totalHigh)} · ${totals.weeksLow}-${totals.weeksHigh}w`,
    );
    return `/contact?${params.toString()}`;
  }, [level, addons, addonIds, deployment, region, totals]);

  return (
    <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
      {/* === LEFT: STEPS === */}
      <div className="lg:col-span-8 space-y-5">
        {/* STEP 1 — LEVEL */}
        <StepCard code="PR.01" number={1} title="Choose project level">
          <ul className="grid sm:grid-cols-2 gap-3">
            {LEVELS.map((l) => (
              <li key={l.id}>
                <PickerCard
                  active={levelId === l.id}
                  onClick={() => setLevelId(l.id)}
                  code={l.code}
                  title={l.name}
                  body={l.audience}
                  meta={`Base ${fmt(l.baseUSD)} · ${l.baseWeeks}w`}
                  type="radio"
                />
              </li>
            ))}
          </ul>
        </StepCard>

        {/* STEP 2 — ADD-ONS */}
        <StepCard code="PR.02" number={2} title="Add feature modules">
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
              {addons.length} of {ADDONS.length} add-ons selected
            </span>
            {addons.length > 0 && (
              <button
                type="button"
                onClick={() => setAddonIds(new Set())}
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 hover:text-slate-900 dark:hover:text-white motion-safe:transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
          <ul className="grid sm:grid-cols-2 gap-3">
            {ADDONS.map((a) => (
              <li key={a.id}>
                <PickerCard
                  active={addonIds.has(a.id)}
                  onClick={() => toggleAddon(a.id)}
                  code={a.code}
                  title={a.name}
                  body={a.context}
                  meta={`+${fmt(a.priceUSD)} · +${a.weeks}w`}
                  type="checkbox"
                  accent="#0FB5A6"
                />
              </li>
            ))}
          </ul>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 leading-relaxed">
            Each add-on layers onto the chosen level · prices are EU baseline before deployment + region multipliers
          </p>
        </StepCard>

        {/* STEP 3 — DEPLOYMENT */}
        <StepCard code="PR.03" number={3} title="Choose deployment substrate">
          <ul className="grid sm:grid-cols-2 gap-3">
            {DEPLOYMENT.map((d) => (
              <li key={d.id}>
                <PickerCard
                  active={deploymentId === d.id}
                  onClick={() => setDeploymentId(d.id)}
                  code={d.code}
                  title={d.name}
                  body={d.sub}
                  meta={`${pct(d.priceMult)} cost · +${d.weeksAdd}w`}
                  type="radio"
                  accent="#7C5CE6"
                />
              </li>
            ))}
          </ul>
        </StepCard>

        {/* STEP 4 — REGION */}
        <StepCard code="PR.04" number={4} title="Choose region">
          <ul className="grid sm:grid-cols-2 gap-3">
            {REGIONS.map((r) => (
              <li key={r.id}>
                <PickerCard
                  active={regionId === r.id}
                  onClick={() => setRegionId(r.id)}
                  code={r.code}
                  title={r.name}
                  body={r.sub}
                  meta={`${pct(r.priceMult)} cost${r.weeksAdd ? ` · +${r.weeksAdd}w` : ''}`}
                  type="radio"
                  accent="#D6B575"
                />
              </li>
            ))}
          </ul>
        </StepCard>
      </div>

      {/* === RIGHT: STICKY SUMMARY (cost + feature manifest) === */}
      <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
        {/* COST SUMMARY PANEL */}
        <div className="rounded-2xl bg-[#0A1F3D] text-white border border-white/10 overflow-hidden shadow-[0_24px_60px_-30px_rgb(10_31_61/0.5)]">
          <div className="px-6 py-4 bg-gradient-to-r from-[#0A1F3D] to-[#0A3A6B] border-b border-white/10 flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase">
            <Calculator size={12} strokeWidth={2} aria-hidden="true" className="text-[#D6B575]" />
            <span className="text-[#D6B575] font-semibold">PR.00</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span className="text-white/85">Live estimate</span>
          </div>

          <div className="px-6 py-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
              Estimated total · USD
            </div>
            <div className="mt-1.5 font-serif tabular-nums leading-none text-white motion-safe:transition-all">
              <div className="text-[28px] font-medium">{fmt(totals.totalLow)}</div>
              <div className="text-[12px] text-white/55 mt-1 font-sans uppercase tracking-[0.18em]">to</div>
              <div className="text-[28px] font-medium text-[#D6B575]">{fmt(totals.totalHigh)}</div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                Estimated delivery window
              </div>
              <div className="mt-1 text-[18px] font-semibold tracking-tight text-white tabular-nums motion-safe:transition-all">
                {totals.weeksLow} – {totals.weeksHigh} weeks
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-white/10 grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={printEstimate}
              aria-label="Print or save as PDF"
              className="flex flex-col items-center gap-1 px-2 py-2.5 rounded-md bg-white/[0.06] border border-white/10 text-white/85 hover:bg-white/[0.10] hover:border-white/20 motion-safe:transition-colors"
            >
              <Printer size={14} strokeWidth={1.75} aria-hidden="true" />
              <span className="text-[10px] font-mono tracking-[0.16em] uppercase">PDF</span>
            </button>
            <button
              type="button"
              onClick={downloadDoc}
              aria-label="Download Word estimate"
              className="flex flex-col items-center gap-1 px-2 py-2.5 rounded-md bg-white/[0.06] border border-white/10 text-white/85 hover:bg-white/[0.10] hover:border-white/20 motion-safe:transition-colors"
            >
              <FileText size={14} strokeWidth={1.75} aria-hidden="true" />
              <span className="text-[10px] font-mono tracking-[0.16em] uppercase">Word</span>
            </button>
            <button
              type="button"
              onClick={emailEstimate}
              aria-label="Send estimate via email"
              className="flex flex-col items-center gap-1 px-2 py-2.5 rounded-md bg-white/[0.06] border border-white/10 text-white/85 hover:bg-white/[0.10] hover:border-white/20 motion-safe:transition-colors"
            >
              <Mail size={14} strokeWidth={1.75} aria-hidden="true" />
              <span className="text-[10px] font-mono tracking-[0.16em] uppercase">Email</span>
            </button>
          </div>

          <div className="px-6 py-4 border-t border-white/10">
            <a
              href={intakeUrl}
              className="group flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#D6B575] text-[#0A1F3D] text-sm font-semibold tracking-tight hover:bg-[#D6B575]/90 motion-safe:transition-colors"
            >
              Open scoping engagement
              <ArrowRight
                size={14}
                className="motion-safe:transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
            <button
              type="button"
              onClick={reset}
              className="mt-2 w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-[11px] font-mono tracking-[0.16em] uppercase text-white/55 hover:text-white/85 motion-safe:transition-colors"
            >
              <RotateCcw size={11} strokeWidth={1.75} aria-hidden="true" />
              Reset configuration
            </button>
          </div>
        </div>

        {/* SELECTED FEATURE MANIFEST PANEL */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-200/70 dark:border-slate-800/60 flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase">
            <ListChecks size={12} strokeWidth={2} aria-hidden="true" className="text-[#0A3A6B] dark:text-[#9ED0F9]" />
            <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">PR.05</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span className="text-slate-700 dark:text-slate-300">Configuration manifest</span>
            <span className="ml-auto text-[10px] text-slate-500 tabular-nums">
              {1 + addons.length + 2} items
            </span>
          </div>

          <ul className="px-5 py-4 space-y-2.5 text-[12px]">
            {/* Level */}
            <li className="flex items-baseline justify-between gap-3">
              <span className="flex items-baseline gap-2 min-w-0">
                <span className="font-mono text-[9px] tracking-[0.18em] uppercase font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] flex-shrink-0">
                  {level.code}
                </span>
                <span className="text-slate-700 dark:text-slate-300 truncate">
                  {level.name}
                </span>
              </span>
              <span className="font-mono tabular-nums text-slate-900 dark:text-white font-semibold flex-shrink-0">
                {fmt(level.baseUSD)}
              </span>
            </li>

            {/* Addons */}
            {addons.length === 0 ? (
              <li className="text-[11px] text-slate-400 dark:text-slate-500 italic py-1">
                No add-ons selected
              </li>
            ) : (
              addons.map((a) => (
                <li key={a.id} className="flex items-baseline justify-between gap-3">
                  <span className="flex items-baseline gap-2 min-w-0">
                    <span className="font-mono text-[9px] tracking-[0.18em] uppercase font-semibold text-[#0FB5A6] flex-shrink-0">
                      {a.code}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 truncate">
                      + {a.name}
                    </span>
                  </span>
                  <span className="font-mono tabular-nums text-slate-700 dark:text-slate-300 flex-shrink-0">
                    +{fmt(a.priceUSD)}
                  </span>
                </li>
              ))
            )}

            <li aria-hidden="true" className="border-t border-slate-200/70 dark:border-slate-800/60 my-2" />

            {/* Deployment */}
            <li className="flex items-baseline justify-between gap-3">
              <span className="flex items-baseline gap-2 min-w-0">
                <span className="font-mono text-[9px] tracking-[0.18em] uppercase font-semibold text-[#7C5CE6] flex-shrink-0">
                  {deployment.code}
                </span>
                <span className="text-slate-600 dark:text-slate-400 truncate">
                  {deployment.name}
                </span>
              </span>
              <span className="font-mono tabular-nums text-slate-700 dark:text-slate-300 flex-shrink-0">
                {pct(deployment.priceMult)}
              </span>
            </li>

            {/* Region */}
            <li className="flex items-baseline justify-between gap-3">
              <span className="flex items-baseline gap-2 min-w-0">
                <span className="font-mono text-[9px] tracking-[0.18em] uppercase font-semibold text-[#D6B575] flex-shrink-0">
                  {region.code}
                </span>
                <span className="text-slate-600 dark:text-slate-400 truncate">
                  {region.name}
                </span>
              </span>
              <span className="font-mono tabular-nums text-slate-700 dark:text-slate-300 flex-shrink-0">
                {pct(region.priceMult)}
              </span>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-2 text-center font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">
          <div className="flex items-center justify-center gap-1.5 p-2.5 rounded-md border border-slate-200/70 dark:border-slate-800/60">
            <ShieldCheck size={11} className="text-[#0FB5A6]" aria-hidden="true" />
            Indicative band
          </div>
          <div className="flex items-center justify-center gap-1.5 p-2.5 rounded-md border border-slate-200/70 dark:border-slate-800/60">
            <Globe2 size={11} className="text-[#0A3A6B] dark:text-[#9ED0F9]" aria-hidden="true" />
            USD baseline
          </div>
        </div>
      </aside>
    </div>
  );
}
