import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type Group = {
  heading: string;
  links: { label: string; href: string }[];
};

const groups: Group[] = [
  {
    heading: 'Platforms',
    links: [
      { label: 'FlyttGo Logistics', href: '/platforms/flyttgo' },
      { label: 'EduPro AI', href: '/platforms/edupro' },
      { label: 'GovStack', href: '/platforms/govstack' },
      { label: 'MarketStack', href: '/platforms/marketstack' },
      { label: 'FleetStack', href: '/platforms/fleetstack' },
    ],
  },
  {
    heading: 'Solutions',
    links: [
      { label: 'Enterprise Deployment', href: '/solutions#enterprise' },
      { label: 'Government Deployment', href: '/solutions#government' },
      { label: 'White-Label Deployment', href: '/white-label' },
      { label: 'Industries', href: '/industries' },
    ],
  },
  {
    heading: 'Infrastructure',
    links: [
      { label: 'Technology', href: '/technology' },
      { label: 'Platform Ecosystem', href: '/platforms' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

const SiteFooter: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200" aria-labelledby="site-footer-heading">
      <h2 id="site-footer-heading" className="sr-only">
        Site footer
      </h2>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2 rounded-md"
              aria-label="FlyttGo Technologies Group — home"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0A3A6B] to-[#1E6FD9] flex items-center justify-center" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12L10 6L14 10L20 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 18L10 12L14 16L20 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                </svg>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-semibold text-slate-900 tracking-tight text-base">FlyttGo</span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-medium">
                  Technologies Group
                </span>
              </div>
            </Link>
            <p className="mt-5 text-sm text-slate-600 leading-relaxed max-w-sm">
              Modular platform infrastructure for logistics, education, government and enterprise operators —
              deployed across Europe, Africa and the Middle East.
            </p>
            <Link
              href="/white-label"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A3A6B] text-white text-sm font-semibold rounded-md hover:bg-[#0a2f57] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2"
            >
              Launch Your Platform
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <nav className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8" aria-label="Footer">
            {groups.map((g) => (
              <div key={g.heading}>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">{g.heading}</div>
                <ul className="mt-4 space-y-3">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-slate-700 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9] focus-visible:ring-offset-2 rounded-sm"
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

        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} FlyttGo Technologies Group AB · Platform Infrastructure Provider
          </p>
          <p className="text-xs text-slate-500 font-mono">EU · AF · MENA · Multi-Region Deployment</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
