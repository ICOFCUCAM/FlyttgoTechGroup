'use client';

import React from 'react';
import Link from '@/components/flytt/LocaleLink';
import BrandLogo from '@/components/flytt/BrandLogo';
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Twitter,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import CarbonFooterPill from '@/components/flytt/CarbonFooterPill';

type FooterGroup = {
  headingKey: string;
  headingFallback: string;
  /** Optional section-index code (mono uppercase) shown alongside the heading. */
  code?: string;
  links: { label: string; href: string }[];
};

// Footer rails — restructured per the Section A · Phase 5 brief into the
// five named architecture rails. Visually rendered as four columns
// (Enterprise nav · Deployment readiness · Compliance readiness · Support
// channels). Legal surfaces live in the bottom utility row; the regional
// infrastructure rail (RG.FT) sits between the columns and the bottom bar.
const groups: FooterGroup[] = [
  {
    headingKey: 'footer.group.enterprise',
    headingFallback: 'Enterprise navigation',
    code: 'EN.RL',
    links: [
      { label: 'Platform ecosystem', href: '/platforms' },
      { label: 'Transify · Mobility', href: '/platforms/transify' },
      { label: 'Workverge · Workforce', href: '/platforms/workverge' },
      { label: 'Civitas · Government', href: '/platforms/civitas' },
      { label: 'EduPro · Education', href: '/platforms/edupro' },
      { label: 'Identra · Identity', href: '/platforms/identra' },
      { label: 'Payvera · Payments', href: '/platforms/payvera' },
      { label: 'Ledgera · Financial Ops', href: '/platforms/ledgera' },
      { label: 'FlyttGo · Marketplace', href: '/platforms/flyttgo' },
      { label: 'Industries surface', href: '/industries' },
    ],
  },
  {
    headingKey: 'footer.group.deployment',
    headingFallback: 'Deployment readiness',
    code: 'DR.RL',
    links: [
      { label: 'Deployment architecture', href: '/deployment' },
      { label: 'Government & public sector · GV.00', href: '/government' },
      { label: 'Deployment lifecycle · EP.00', href: '/deployment-lifecycle' },
      { label: 'Managed SaaS · DM.01', href: '/deployment/managed' },
      { label: 'Customer cloud · DM.02', href: '/deployment/customer-cloud' },
      { label: 'Sovereign datacenter · DM.03', href: '/deployment/sovereign' },
      { label: 'Sovereign deployment · SV.00', href: '/sovereign' },
      { label: 'Global coverage · GC.00', href: '/global-coverage' },
      { label: 'Procurement compatibility · PC.00', href: '/procurement-compatibility' },
      { label: 'Infrastructure architecture · IA.00', href: '/infrastructure-architecture' },
      { label: 'White-label program', href: '/white-label' },
    ],
  },
  {
    headingKey: 'footer.group.compliance',
    headingFallback: 'Compliance readiness',
    code: 'CR.RL',
    links: [
      { label: 'Security architecture', href: '/security' },
      { label: 'Trust signals · TS.00', href: '/security#trust-signals-heading' },
      { label: 'Alignment registry · CR.00', href: '/security' },
      { label: 'Compliance overview', href: '/compliance' },
      { label: 'Sustainability · CO2.00', href: '/sustainability' },
      { label: 'Platform status', href: '/status' },
    ],
  },
  {
    headingKey: 'footer.group.support',
    headingFallback: 'Support channels',
    code: 'SP.RL',
    links: [
      { label: 'Deployment intake · DP.01', href: '/contact' },
      { label: 'Partnership inquiries', href: '/contact?intent=partnership' },
      { label: 'Procurement & RFPs', href: '/contact?intent=procurement' },
      { label: 'Developer portal', href: '/developers' },
      { label: 'API architecture · AP.00', href: '/api-architecture' },
      { label: 'Live API playground · API.PG', href: '/developers/playground' },
      { label: 'MCP discovery manifest', href: '/.well-known/mcp.json' },
      { label: 'Insights', href: '/insights' },
      { label: 'Solution briefs', href: '/solutions' },
      { label: 'Try Ledgera sandbox', href: '/try/ledgera' },
    ],
  },
];

const enterpriseLinks = [
  { label: 'Partnership inquiries', href: '/contact?intent=partnership' },
  { label: 'Procurement & RFPs', href: '/contact?intent=procurement' },
  { label: 'API access', href: '/developers' },
  { label: 'Developer portal', href: '/developers' },
  { label: 'Solution briefs', href: '/solutions' },
  { label: 'Status', href: '/status' },
];

const certifications = [
  { code: 'SC.01', label: 'SOC 2 Type II', frame: 'Annual audit · NDA' },
  { code: 'IS.02', label: 'ISO 27001', frame: 'ISMS · Annex A' },
  { code: 'GD.03', label: 'GDPR-ready', frame: 'DPA · in-region' },
  { code: 'AC.04', label: 'WCAG 2.1 AA', frame: 'Accessibility' },
  { code: 'PS.05', label: 'PSD2 (Payvera)', frame: 'EU payments · SCA' },
  { code: 'EI.06', label: 'eIDAS (Identra)', frame: 'EU trust services' },
];

const regions = [
  { code: 'EU', name: 'Europe', manifest: 'NO · SE · DK · FI · DE · FR · NL · UK' },
  { code: 'AF', name: 'Africa', manifest: 'ZA · KE · NG · EG · MA · TZ' },
  { code: 'MENA', name: 'Middle East', manifest: 'SA · AE · QA · KW · OM · BH' },
];

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: Linkedin },
  { label: 'X (Twitter)', href: 'https://x.com/', icon: Twitter },
  { label: 'GitHub', href: 'https://github.com/', icon: Github },
];

type LegalLink = { key: string; fallback: string; href: string };

const legalLinks: LegalLink[] = [
  { key: 'footer.legal.privacy', fallback: 'Privacy', href: '/privacy' },
  { key: 'footer.legal.terms', fallback: 'Terms', href: '/terms' },
  { key: 'footer.legal.security', fallback: 'Security', href: '/security' },
  { key: 'footer.legal.compliance', fallback: 'Compliance', href: '/compliance' },
  { key: 'footer.legal.contact', fallback: 'Contact', href: '/contact' },
];

const SiteFooter: React.FC = () => {
  const { t } = useI18n();
  return (
    <footer
      className="relative bg-[#050F22] text-slate-300 border-t border-white/5"
      aria-labelledby="site-footer-heading"
    >
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden="true"
      />

      <h2 id="site-footer-heading" className="sr-only">
        Site footer
      </h2>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        {/* Engineering section index — footer is treated as a navigable surface */}
        <div className="mb-12 flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-white/55">
          <span className="text-[#9ED0F9] font-semibold">FT.07</span>
          <span aria-hidden="true" className="flex-1 h-px bg-white/10 max-w-[200px]" />
          <span>Infrastructure Navigation Surface</span>
        </div>

        {/* Primary — brand block + 4 navigation columns */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050F22] rounded-md"
              aria-label="FlyttGo Technologies Group — home"
            >
              <BrandLogo variant="lockup-dark" height={36} />
            </Link>

            <p className="mt-5 text-sm text-slate-400 leading-relaxed max-w-sm">
              {t('footer.tagline')}
            </p>

            <ul className="mt-6 space-y-2.5 text-sm">
              <li>
                <a
                  href="tel:+442012345678"
                  className="inline-flex items-center gap-2.5 text-slate-300 hover:text-white motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050F22] rounded-sm"
                >
                  <Phone size={13} className="text-slate-500" aria-hidden="true" />
                  <span className="tabular-nums">+44 20 1234 5678</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:platform@flyttgotech.com"
                  className="inline-flex items-center gap-2.5 text-slate-300 hover:text-white motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050F22] rounded-sm"
                >
                  <Mail size={13} className="text-slate-500" aria-hidden="true" />
                  <span>platform@flyttgotech.com</span>
                </a>
              </li>
              <li className="inline-flex items-start gap-2.5 text-slate-400">
                <MapPin size={13} className="text-slate-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span className="leading-snug">
                  HQ · Oslo, Norway
                  <br />
                  <span className="text-slate-500">
                    Regional presence · London · Stockholm · Dubai
                  </span>
                </span>
              </li>
            </ul>

            <ul className="mt-6 flex items-center gap-2" aria-label="Social channels">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-9 h-9 inline-flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.08] hover:border-white/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050F22]"
                    >
                      <Icon size={15} strokeWidth={1.75} aria-hidden="true" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav
            className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8"
            aria-label="Footer"
          >
            {groups.map((g) => {
              const heading = t(g.headingKey) || g.headingFallback;
              return (
                <div key={g.headingKey}>
                  <div className="flex items-center gap-2 mb-4">
                    {g.code && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9ED0F9] font-semibold">
                        {g.code}
                      </span>
                    )}
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                      {heading}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {g.links.map((l) => (
                      <li key={`${g.headingKey}-${l.label}`}>
                        <Link
                          href={l.href}
                          className="text-sm text-slate-400 hover:text-white motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050F22] rounded-sm"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Enterprise row */}
        <div className="mt-14 pt-8 border-t border-white/5">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-400">
              <span className="text-[#9ED0F9] font-semibold">EP.00</span>
              <span className="mx-2 text-white/20">·</span>
              {t('footer.enterprise')}
            </span>
            {enterpriseLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="group inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-white motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050F22] rounded-sm"
              >
                {l.label}
                <ArrowUpRight
                  size={12}
                  aria-hidden="true"
                  className="text-slate-500 group-hover:text-white motion-safe:transition-colors"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Trust row — certifications (left) + regions + CTA (right) */}
        <div className="mt-10 pt-8 border-t border-white/5 grid md:grid-cols-2 gap-8">
          <div>
            <Link
              href="/status"
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300 hover:text-white motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050F22] rounded-sm"
              aria-label="Platform status — all systems operational"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              {t('footer.status')}
            </Link>
            <div className="mt-5 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
              <span className="text-[#9ED0F9] font-semibold">CR.00</span>
              <span className="mx-2 text-white/20">·</span>
              {t('footer.certifications')}
            </div>
            <ul className="mt-3 grid grid-cols-2 gap-1.5">
              {certifications.map((c) => (
                <li
                  key={c.code}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-md bg-white/[0.03] border border-white/10 hover:border-white/20 motion-safe:transition-colors"
                >
                  <ShieldCheck size={11} className="text-[#0FB5A6] flex-shrink-0" aria-hidden="true" />
                  <span className="font-mono text-[10px] tracking-[0.18em] text-[#9ED0F9] font-semibold flex-shrink-0">
                    {c.code}
                  </span>
                  <span className="flex flex-col leading-tight min-w-0">
                    <span className="text-[12px] font-medium text-slate-200 truncate">
                      {c.label}
                    </span>
                    <span className="text-[10px] text-slate-500 truncate font-mono tracking-wide">
                      {c.frame}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400 md:text-right">
              <span className="text-[#9ED0F9] font-semibold">RG.00</span>
              <span className="mx-2 text-white/20">·</span>
              {t('footer.regions')}
            </div>
            <ul className="mt-3 space-y-1.5">
              {regions.map((r) => (
                <li
                  key={r.code}
                  className="flex items-center gap-3 px-3 py-2 bg-white/[0.03] border border-white/10 rounded-md"
                >
                  <span className="font-mono text-[11px] text-[#9ED0F9] tracking-[0.2em] font-semibold w-12 flex-shrink-0">
                    {r.code}
                  </span>
                  <span className="flex flex-col leading-tight min-w-0 flex-1">
                    <span className="text-[12px] font-medium text-slate-200">{r.name}</span>
                    <span className="font-mono text-[10px] text-slate-500 truncate tracking-[0.14em]">
                      {r.manifest}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-white text-[#0A1F3D] text-sm font-semibold rounded-md hover:bg-slate-100 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050F22]"
            >
              {t('footer.deploy')}
              <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Regulatory info row */}
        <div className="mt-10 pt-8 border-t border-white/5 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              {t('footer.regulatory.company')}
            </div>
            <p className="mt-2 text-[13px] text-slate-300 leading-snug">
              FlyttGo Technologies Group AB
              <br />
              <span className="text-slate-500 tabular-nums">Org. nr. SE 000 000 000</span>
            </p>
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              {t('footer.regulatory.vat')}
            </div>
            <p className="mt-2 text-[13px] text-slate-300 leading-snug">
              EU VAT registered
              <br />
              <span className="text-slate-500 tabular-nums">SE 000 000 000 01</span>
            </p>
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              {t('footer.regulatory.security')}
            </div>
            <p className="mt-2 text-[13px] text-slate-300 leading-snug">
              24/7 infrastructure monitoring
              <br />
              <a
                href="mailto:security@flyttgotech.com"
                className="text-slate-500 hover:text-white motion-safe:transition-colors"
              >
                security@flyttgotech.com
              </a>
            </p>
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              {t('footer.regulatory.support')}
            </div>
            <p className="mt-2 text-[13px] text-slate-300 leading-snug">
              Enterprise SLA · 24/7
              <br />
              <a
                href="mailto:platform@flyttgotech.com"
                className="text-slate-500 hover:text-white motion-safe:transition-colors"
              >
                platform@flyttgotech.com
              </a>
            </p>
          </div>
        </div>

        {/* RG.FT — Regional infrastructure rail */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55 mb-4">
            <span className="text-[#9ED0F9] font-semibold">RG.FT</span>
            <span className="mx-2 text-white/20">·</span>
            Regional infrastructure
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { code: 'NA',    label: 'North America · SaaS + IaaS',     sub: 'San Francisco · Seattle · Chicago · Boston · Northern Virginia · Atlanta · Dallas · Miami' },
              { code: 'EU-N',  label: 'Nordic EU + sovereign',           sub: 'Oslo HQ · Stockholm · Copenhagen · Helsinki' },
              { code: 'EU-W',  label: 'Western EU infrastructure',       sub: 'London · Frankfurt · Amsterdam' },
              { code: 'SA',    label: 'Latin America presence',          sub: 'São Paulo · LatAm hub · Miami gateway' },
              { code: 'AF',    label: 'Africa rollout presence',         sub: 'Lagos · Yaoundé · Nairobi · Kampala · Addis · Johannesburg' },
              { code: 'MENA',  label: 'MENA deployment readiness',       sub: 'Dubai · Riyadh · Cairo · sovereign environments' },
              { code: 'APAC',  label: 'APAC SaaS + edge',                sub: 'Singapore · Tokyo · Mumbai · Sydney' },
            ].map((r) => (
              <li
                key={r.code}
                className="p-3 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#9ED0F9] font-semibold">
                  {r.code}
                </div>
                <div className="mt-1 text-[13px] font-medium tracking-tight text-white/90">
                  {r.label}
                </div>
                <div className="mt-0.5 text-[11px] text-white/55 leading-snug">
                  {r.sub}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} FlyttGo Technologies Group AB ·
              Designed in Oslo
            </p>
            <CarbonFooterPill />
          </div>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.key}>
                <Link
                  href={l.href}
                  className="text-xs text-slate-500 hover:text-white motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050F22] rounded-sm"
                >
                  {t(l.key) || l.fallback}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
