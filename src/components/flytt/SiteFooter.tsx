import React from 'react';
import Link from 'next/link';
import { ArrowRight, Globe2 } from 'lucide-react';

type Group = {
  heading: string;
  links: { label: string; href: string }[];
};

const groups: Group[] = [
  {
    heading: 'Platforms',
    links: [
      { label: 'Transify', href: '/platforms/transify' },
      { label: 'Workverge', href: '/platforms/workverge' },
      { label: 'Civitas', href: '/platforms/civitas' },
      { label: 'EduPro', href: '/platforms/edupro' },
      { label: 'Identra', href: '/platforms/identra' },
      { label: 'Payvera', href: '/platforms/payvera' },
      { label: 'FlyttGo (marketplace)', href: '/platforms/flyttgo' },
      { label: 'All platforms', href: '/platforms' },
    ],
  },
  {
    heading: 'Deployment',
    links: [
      { label: 'Managed infrastructure', href: '/deployment' },
      { label: 'Customer cloud', href: '/deployment' },
      { label: 'Sovereign datacenter', href: '/deployment' },
      { label: 'Deployment speed', href: '/deployment' },
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
    ],
  },
  {
    heading: 'Technology',
    links: [
      { label: 'Architecture', href: '/technology' },
      { label: 'Security & RBAC', href: '/technology' },
      { label: 'Multi-tenancy', href: '/technology' },
      { label: 'Developers', href: '/developers' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/company' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/company' },
      { label: 'FlyttGo Technologies Group', href: '/company' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy', href: '/contact' },
      { label: 'Terms', href: '/contact' },
      { label: 'Security', href: '/contact' },
      { label: 'Compliance', href: '/contact' },
    ],
  },
];

const regions = [
  { code: 'EU', name: 'Europe' },
  { code: 'AF', name: 'Africa' },
  { code: 'MENA', name: 'Middle East' },
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
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050F22] rounded-md"
              aria-label="FlyttGo Technologies Group — home"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0A3A6B] to-[#1E6FD9] flex items-center justify-center" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12L10 6L14 10L20 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 18L10 12L14 16L20 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                </svg>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-semibold text-white tracking-tight text-[15px]">FlyttGo</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-medium">
                  Technologies Group
                </span>
              </div>
            </Link>
            <p className="mt-5 text-sm text-slate-400 leading-relaxed max-w-sm">
              Modular platform infrastructure for logistics, education, government and enterprise
              operators — deployed across Europe, Africa and the Middle East.
            </p>

            <div
              className="mt-7 p-4 rounded-xl bg-white/[0.03] border border-white/10"
              aria-label="Regions covered"
            >
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-500 font-semibold">
                <Globe2 size={12} className="text-slate-400" aria-hidden="true" />
                Region Coverage
              </div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {regions.map((r) => (
                  <li
                    key={r.code}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-900/5 border border-white/10 rounded-md text-xs font-medium text-slate-200"
                  >
                    <span className="font-mono text-[10px] text-slate-500 tracking-[0.14em]">
                      {r.code}
                    </span>
                    {r.name}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0A1F3D] text-sm font-semibold rounded-md hover:bg-slate-100 dark:bg-slate-800/60 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050F22]"
            >
              Deploy Your Platform
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <nav className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8" aria-label="Footer">
            {groups.map((g) => (
              <div key={g.heading}>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {g.heading}
                </div>
                <ul className="mt-4 space-y-3">
                  {g.links.map((l) => (
                    <li key={`${g.heading}-${l.label}`}>
                      <Link
                        href={l.href}
                        className="text-sm text-slate-400 hover:text-white motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050F22] rounded-sm"
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

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} FlyttGo Technologies Group AB · Platform Infrastructure Provider
          </p>
          <p className="text-xs text-slate-500 font-mono tracking-[0.12em]">
            EU · AF · MENA · Multi-Region Deployment
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
