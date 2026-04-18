import React from 'react';
import Link from 'next/link';
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

type Group = {
  heading: string;
  links: { label: string; href: string }[];
};

const groups: Group[] = [
  {
    heading: 'Platforms',
    links: [
      { label: 'Transify — Mobility', href: '/platforms/transify' },
      { label: 'Workverge — Workforce', href: '/platforms/workverge' },
      { label: 'Civitas — Government', href: '/platforms/civitas' },
      { label: 'EduPro — Education', href: '/platforms/edupro' },
      { label: 'Identra — Identity', href: '/platforms/identra' },
      { label: 'Payvera — Payments', href: '/platforms/payvera' },
      { label: 'Ledgera — Financial Ops', href: '/platforms/ledgera' },
      { label: 'FlyttGo — Marketplace', href: '/platforms/flyttgo' },
      { label: 'All platforms', href: '/platforms' },
    ],
  },
  {
    heading: 'Industries',
    links: [
      { label: 'Government & municipal', href: '/industries' },
      { label: 'Education & ministries', href: '/industries' },
      { label: 'Transport & logistics', href: '/industries' },
      { label: 'Enterprise operations', href: '/industries' },
      { label: 'Marketplace operators', href: '/industries' },
      { label: 'Deployment modes', href: '/deployment' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About FlyttGo Tech Group', href: '/company' },
      { label: 'Leadership', href: '/company' },
      { label: 'Careers', href: '/company' },
      { label: 'Press & media', href: '/company' },
      { label: 'Partnership inquiries', href: '/contact?intent=partnership' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Technology architecture', href: '/technology' },
      { label: 'Developer portal', href: '/developers' },
      { label: 'API reference', href: '/developers' },
      { label: 'Solution briefs', href: '/solutions' },
      { label: 'White-label program', href: '/white-label' },
      { label: 'Deploy your platform', href: '/contact' },
    ],
  },
];

const enterpriseLinks = [
  { label: 'Partnership inquiries', href: '/contact?intent=partnership' },
  { label: 'Procurement & RFPs', href: '/contact?intent=procurement' },
  { label: 'API access', href: '/developers' },
  { label: 'Developer portal', href: '/developers' },
  { label: 'Solution briefs', href: '/solutions' },
  { label: 'Status', href: '/technology' },
];

const certifications = [
  'SOC 2 Type II',
  'ISO 27001',
  'GDPR-ready',
  'WCAG 2.1 AA',
];

const regions = [
  { code: 'EU', name: 'Europe' },
  { code: 'AF', name: 'Africa' },
  { code: 'MENA', name: 'Middle East' },
];

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: Linkedin },
  { label: 'X (Twitter)', href: 'https://x.com/', icon: Twitter },
  { label: 'GitHub', href: 'https://github.com/', icon: Github },
];

const legalLinks = [
  { label: 'Privacy', href: '/contact' },
  { label: 'Terms', href: '/contact' },
  { label: 'Security', href: '/contact' },
  { label: 'Compliance', href: '/contact' },
  { label: 'Contact', href: '/contact' },
];

const SiteFooter: React.FC = () => {
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
        {/* Primary — brand block + 4 navigation columns */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050F22] rounded-md"
              aria-label="FlyttGo Technologies Group — home"
            >
              <div
                className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0A3A6B] to-[#1E6FD9] flex items-center justify-center"
                aria-hidden="true"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 12L10 6L14 10L20 4"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 18L10 12L14 16L20 10"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.5"
                  />
                </svg>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-semibold text-white tracking-tight text-[15px]">
                  FlyttGo
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-medium">
                  Technologies Group
                </span>
              </div>
            </Link>

            <p className="mt-5 text-sm text-slate-400 leading-relaxed max-w-sm">
              Modular platform infrastructure for logistics, education,
              government and enterprise operators — deployed across Europe,
              Africa and the Middle East.
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
            {groups.map((g) => (
              <div key={g.heading}>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                  {g.heading}
                </div>
                <ul className="mt-4 space-y-3">
                  {g.links.map((l) => (
                    <li key={`${g.heading}-${l.label}`}>
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
            ))}
          </nav>
        </div>

        {/* Enterprise row */}
        <div className="mt-14 pt-8 border-t border-white/5">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Enterprise
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
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Certifications &amp; compliance
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {certifications.map((c) => (
                <li
                  key={c}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/10 text-xs font-medium text-slate-200"
                >
                  <ShieldCheck size={12} className="text-[#0FB5A6]" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:text-right">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Deployment regions
            </div>
            <ul className="mt-4 flex flex-wrap md:justify-end gap-2">
              {regions.map((r) => (
                <li
                  key={r.code}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-md text-xs font-medium text-slate-200"
                >
                  <span className="font-mono text-[10px] text-slate-500 tracking-[0.14em]">
                    {r.code}
                  </span>
                  {r.name}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-white text-[#0A1F3D] text-sm font-semibold rounded-md hover:bg-slate-100 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050F22]"
            >
              Deploy your platform
              <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Regulatory info row */}
        <div className="mt-10 pt-8 border-t border-white/5 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Company
            </div>
            <p className="mt-2 text-[13px] text-slate-300 leading-snug">
              FlyttGo Technologies Group AB
              <br />
              <span className="text-slate-500 tabular-nums">Org. nr. SE 000 000 000</span>
            </p>
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              VAT
            </div>
            <p className="mt-2 text-[13px] text-slate-300 leading-snug">
              EU VAT registered
              <br />
              <span className="text-slate-500 tabular-nums">SE 000 000 000 01</span>
            </p>
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              Security
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
              Support
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

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} FlyttGo Technologies Group AB · Designed
            in Oslo
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="text-xs text-slate-500 hover:text-white motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050F22] rounded-sm"
                >
                  {l.label}
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
