'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Truck,
  GraduationCap,
  Building2,
  Store,
  Radar,
  CreditCard,
  Fingerprint,
  Sparkles,
  LayoutDashboard,
  BarChart3,
  Search,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';
import { useCommandPalette } from '@/components/flytt/CommandPalette';

type DropdownItem = {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

type DropdownColumn = {
  heading: string;
  items: DropdownItem[];
};

type NavLink = {
  label: string;
  href: string;
  dropdown?: {
    columns: DropdownColumn[];
    feature?: {
      title: string;
      description: string;
      href: string;
      cta: string;
    };
  };
};

const primaryLinks: NavLink[] = [
  {
    label: 'Platforms',
    href: '/platforms',
    dropdown: {
      columns: [
        {
          heading: 'Infrastructure Platforms',
          items: [
            { label: 'FlyttGo Logistics', description: 'Dispatch, driver and delivery orchestration', href: '/platforms/flyttgo', icon: Truck },
            { label: 'EduPro AI', description: 'Attendance + institutional analytics', href: '/platforms/edupro', icon: GraduationCap },
            { label: 'GovStack', description: 'Municipal & ministry dashboards', href: '/platforms/govstack', icon: Building2 },
            { label: 'MarketStack', description: 'Branded service marketplaces', href: '/platforms/marketstack', icon: Store },
            { label: 'FleetStack', description: 'Fleet telemetry + route optimization', href: '/platforms/fleetstack', icon: Radar },
          ],
        },
      ],
      feature: {
        title: 'Platform Ecosystem',
        description: 'Five modular platforms on one infrastructure layer.',
        href: '/platforms',
        cta: 'Explore all platforms',
      },
    },
  },
  {
    label: 'Infrastructure',
    href: '/infrastructure',
    dropdown: {
      columns: [
        {
          heading: 'Modules',
          items: [
            { label: 'Payments layer', description: 'Multi-provider, ledger & payouts', href: '/infrastructure#infrastructure-modules', icon: CreditCard },
            { label: 'Identity layer', description: 'OAuth, SSO, RBAC, audit logs', href: '/infrastructure#infrastructure-modules', icon: Fingerprint },
            { label: 'Marketplace engine', description: 'Multi-vendor orchestration', href: '/infrastructure#infrastructure-modules', icon: Store },
            { label: 'Relocation intelligence', description: 'Routing, demand, territory balance', href: '/infrastructure#infrastructure-modules', icon: Sparkles },
            { label: 'Admin dashboards', description: 'Dispatch, tenant, support consoles', href: '/infrastructure#infrastructure-modules', icon: LayoutDashboard },
            { label: 'Analytics layer', description: 'Real-time + geospatial pipelines', href: '/infrastructure#infrastructure-modules', icon: BarChart3 },
          ],
        },
      ],
      feature: {
        title: 'Modular Infrastructure',
        description: 'Activate together or independently, per tenant and region.',
        href: '/technology',
        cta: 'Review architecture',
      },
    },
  },
  { label: 'Industries', href: '/industries' },
  { label: 'Technology', href: '/technology' },
  { label: 'Developers', href: '/developers' },
  { label: 'Company', href: '/company' },
];

const isRouteActive = (pathname: string, href: string) => {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
};

type IndicatorState = { left: number; width: number; opacity: number };

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { toggle: toggleCommandPalette } = useCommandPalette();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [indicator, setIndicator] = useState<IndicatorState>({ left: 0, width: 0, opacity: 0 });

  const linkRefs = useRef<Record<string, HTMLElement | null>>({});
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | null>(null);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    closeMobile();
    setOpenDropdown(null);
  }, [pathname, closeMobile]);

  // Scroll-responsive shadow
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        setScrolled(window.scrollY > 4);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  // Escape closes mobile panel + any open dropdown
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (openDropdown) setOpenDropdown(null);
        if (mobileOpen) {
          closeMobile();
          toggleRef.current?.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openDropdown, mobileOpen, closeMobile]);

  // Magic-line active/hover indicator
  const syncIndicator = useCallback(
    (href?: string) => {
      const target = href ?? primaryLinks.find((l) => isRouteActive(pathname, l.href))?.href;
      if (!target) {
        setIndicator((i) => ({ ...i, opacity: 0 }));
        return;
      }
      const el = linkRefs.current[target];
      if (!el || !navRef.current) return;
      const navRect = navRef.current.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      setIndicator({
        left: rect.left - navRect.left,
        width: rect.width,
        opacity: 1,
      });
    },
    [pathname],
  );

  useLayoutEffect(() => {
    syncIndicator();
    const onResize = () => syncIndicator();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [syncIndicator]);

  const hoverEnter = (href: string) => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    const link = primaryLinks.find((l) => l.href === href);
    if (link?.dropdown) setOpenDropdown(href);
    syncIndicator(href);
  };
  const hoverLeave = () => {
    closeTimer.current = window.setTimeout(() => {
      setOpenDropdown(null);
    }, 120);
    syncIndicator();
  };

  return (
    <header
      role="banner"
      className={`sticky top-0 z-50 motion-safe:transition-shadow motion-safe:duration-200 ${
        scrolled
          ? 'bg-white/92 supports-[backdrop-filter]:bg-white/85 backdrop-blur-md shadow-[0_1px_0_0_rgb(15_23_42/0.06),0_6px_18px_-8px_rgb(15_23_42/0.18)] border-b border-slate-200/70'
          : 'bg-white/80 supports-[backdrop-filter]:bg-white/60 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 lg:h-[68px] flex items-center justify-between gap-8">
        <Link
          href="/"
          aria-label="FlyttGo Technologies — home"
          className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px] rounded-md"
        >
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#0A3A6B] to-[#1E6FD9] flex items-center justify-center" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M4 12L10 6L14 10L20 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 18L10 12L14 16L20 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
            </svg>
          </div>
          <span className="flex flex-col leading-none">
            <span className="text-[15px] tracking-tight text-slate-900">
              <span className="font-semibold">FlyttGo</span>
              <span className="hidden sm:inline font-medium text-slate-500"> Technologies</span>
            </span>
            <span className="hidden sm:block mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-400 font-medium">
              Platform Infrastructure
            </span>
          </span>
        </Link>

        <nav
          ref={navRef}
          aria-label="Primary"
          className="hidden lg:block relative"
          onMouseLeave={hoverLeave}
        >
          <ul className="flex items-center gap-0.5">
            {primaryLinks.map((l) => {
              const hasDropdown = Boolean(l.dropdown);
              const dropdownOpen = openDropdown === l.href;
              const active = isRouteActive(pathname, l.href);
              return (
                <li
                  key={l.href}
                  className="relative"
                  onMouseEnter={() => hoverEnter(l.href)}
                  onFocus={() => hoverEnter(l.href)}
                >
                  <Link
                    href={l.href}
                    ref={(el) => {
                      linkRefs.current[l.href] = el;
                    }}
                    aria-current={active ? 'page' : undefined}
                    aria-haspopup={hasDropdown ? 'menu' : undefined}
                    aria-expanded={hasDropdown ? dropdownOpen : undefined}
                    className={`inline-flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-md motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px] ${
                      active ? 'text-[#0A3A6B]' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {l.label}
                    {hasDropdown && (
                      <ChevronDown
                        size={13}
                        aria-hidden="true"
                        className={`text-slate-400 motion-safe:transition-transform ${dropdownOpen ? 'rotate-180 text-slate-600' : ''}`}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-[1px] h-[2px] rounded-full bg-[#0A3A6B] motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out"
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: `${indicator.width}px`,
              opacity: indicator.opacity,
            }}
          />

          {primaryLinks.map((l) => {
            if (!l.dropdown) return null;
            const open = openDropdown === l.href;
            return (
              <div
                key={`dropdown-${l.href}`}
                onMouseEnter={() => hoverEnter(l.href)}
                onMouseLeave={hoverLeave}
                className={`absolute left-0 right-0 top-full mt-3 motion-safe:transition-all motion-safe:duration-200 ${
                  open
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-1 pointer-events-none'
                }`}
                role="menu"
                aria-label={`${l.label} menu`}
              >
                <div className="w-[640px] max-w-[min(90vw,640px)] rounded-2xl bg-white border border-slate-200/80 shadow-[0_1px_0_0_rgb(15_23_42/0.04),0_24px_48px_-12px_rgb(15_23_42/0.18)] overflow-hidden">
                  <div className="grid grid-cols-[1fr_240px]">
                    <div className="p-4">
                      {l.dropdown.columns.map((col) => (
                        <div key={col.heading}>
                          <div className="px-3 pt-2 pb-1 text-[10px] uppercase tracking-[0.18em] text-slate-400 font-semibold">
                            {col.heading}
                          </div>
                          <ul>
                            {col.items.map((item) => {
                              const Icon = item.icon;
                              return (
                                <li key={item.label}>
                                  <Link
                                    href={item.href}
                                    role="menuitem"
                                    onClick={() => setOpenDropdown(null)}
                                    className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40"
                                  >
                                    <span className="mt-0.5 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[#0A3A6B] flex-shrink-0" aria-hidden="true">
                                      <Icon size={16} strokeWidth={1.75} />
                                    </span>
                                    <span className="flex flex-col leading-tight">
                                      <span className="text-sm font-semibold text-slate-900 tracking-tight">{item.label}</span>
                                      <span className="mt-0.5 text-[12px] text-slate-500 leading-snug">{item.description}</span>
                                    </span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                    {l.dropdown.feature && (
                      <div className="bg-gradient-to-br from-[#0A1F3D] to-[#0A3A6B] text-white p-5 flex flex-col">
                        <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/60">
                          Featured
                        </div>
                        <div className="mt-2 text-lg font-semibold tracking-tight">{l.dropdown.feature.title}</div>
                        <p className="mt-2 text-[13px] text-white/70 leading-relaxed">
                          {l.dropdown.feature.description}
                        </p>
                        <div className="mt-auto pt-5">
                          <Link
                            href={l.dropdown.feature.href}
                            onClick={() => setOpenDropdown(null)}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:gap-2.5 motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1F3D] rounded-sm"
                          >
                            {l.dropdown.feature.cta}
                            <ArrowUpRight size={14} aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <button
            type="button"
            onClick={toggleCommandPalette}
            aria-label="Search platforms, modules and pages"
            className="group inline-flex items-center gap-2 pl-3 pr-1.5 py-1.5 text-[13px] text-slate-500 bg-white border border-slate-200 rounded-md hover:text-slate-700 hover:border-slate-300 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
          >
            <Search size={13} aria-hidden="true" />
            <span className="hidden xl:inline">Search</span>
            <kbd className="ml-1 font-mono text-[10px] text-slate-400 bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5">
              ⌘K
            </kbd>
          </button>
          <Link
            href="/contact"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px] rounded-md px-2"
          >
            Sign in
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold bg-[#0A3A6B] text-white rounded-md hover:bg-[#0a2f57] motion-safe:transition-colors shadow-[0_1px_0_0_rgb(10_58_107/0.6),0_6px_18px_-6px_rgb(10_58_107/0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
          >
            Deploy Your Platform
            <ArrowRight size={14} className="motion-safe:transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="lg:hidden p-1.5 text-slate-700 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-panel"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      <div
        id="mobile-nav-panel"
        hidden={!mobileOpen}
        className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl"
      >
        <nav aria-label="Mobile primary" className="px-5 py-4 flex flex-col gap-1">
          {primaryLinks.map((l) => {
            const active = isRouteActive(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                onClick={closeMobile}
                className={`px-3 py-2.5 text-sm font-medium rounded-md ${
                  active ? 'text-[#0A3A6B] bg-slate-100' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <div className="mt-2 flex flex-col gap-2 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={() => {
                closeMobile();
                toggleCommandPalette();
              }}
              className="inline-flex items-center justify-between px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md"
            >
              <span className="inline-flex items-center gap-2">
                <Search size={14} aria-hidden="true" />
                Search
              </span>
              <kbd className="font-mono text-[10px] text-slate-400 bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5">
                ⌘K
              </kbd>
            </button>
            <Link
              href="/contact"
              onClick={closeMobile}
              className="px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
            >
              Sign in
            </Link>
            <Link
              href="/contact"
              onClick={closeMobile}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-[#0A3A6B] text-white rounded-md"
            >
              Deploy Your Platform
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
