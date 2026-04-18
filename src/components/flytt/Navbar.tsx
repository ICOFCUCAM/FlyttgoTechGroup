'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from '@/components/flytt/LocaleLink';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Route,
  UserCheck,
  Landmark,
  GraduationCap,
  Fingerprint,
  CreditCard,
  Calculator,
  Truck,
  Search,
  ArrowUpRight,
  Code2,
  Terminal,
  Activity,
  Lock,
  ShieldCheck,
  BookOpen,
  Building2,
  Bus,
  ShoppingBag,
  CloudCog,
  ServerCog,
  Briefcase,
  Newspaper,
  Users,
  Compass,
  type LucideIcon,
} from 'lucide-react';
import { useCommandPalette } from '@/components/flytt/CommandPalette';
import { ThemeToggle } from '@/components/flytt/ThemeToggle';
import TopUtilityBar from '@/components/flytt/TopUtilityBar';
import { useI18n } from '@/lib/i18n/I18nProvider';

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
  labelKey?: string;
  href: string;
  dropdown?: {
    columns: DropdownColumn[];
    feature?: {
      title: string;
      titleKey?: string;
      description: string;
      descriptionKey?: string;
      href: string;
      cta: string;
      ctaKey?: string;
    };
  };
};

const primaryLinks: NavLink[] = [
  {
    label: 'Platforms',
    labelKey: 'nav.platforms',
    href: '/platforms',
    dropdown: {
      columns: [
        {
          heading: 'Infrastructure Platforms',
          items: [
            { label: 'Transify', description: 'Mobility infrastructure platform', href: '/platforms/transify', icon: Route },
            { label: 'Workverge', description: 'Workforce coordination infrastructure', href: '/platforms/workverge', icon: UserCheck },
            { label: 'Civitas', description: 'Digital government services platform', href: '/platforms/civitas', icon: Landmark },
            { label: 'EduPro', description: 'Education intelligence infrastructure', href: '/platforms/edupro', icon: GraduationCap },
            { label: 'Identra', description: 'Identity infrastructure platform', href: '/platforms/identra', icon: Fingerprint },
            { label: 'Payvera', description: 'Public service payment infrastructure', href: '/platforms/payvera', icon: CreditCard },
            { label: 'Ledgera', description: 'Financial operations & bookkeeping infrastructure', href: '/platforms/ledgera', icon: Calculator },
          ],
        },
        {
          heading: 'Marketplace Platform',
          items: [
            { label: 'FlyttGo', description: 'Smart moving & transport marketplace — runs on Transify', href: '/platforms/flyttgo', icon: Truck },
          ],
        },
      ],
      feature: {
        title: 'Platform Ecosystem',
        titleKey: 'nav.feature.title',
        description:
          'Modular infrastructure platforms plus the FlyttGo marketplace — licensed independently, deployed together.',
        descriptionKey: 'nav.feature.description',
        href: '/platforms',
        cta: 'Explore the ecosystem',
        ctaKey: 'nav.feature.cta',
      },
    },
  },
  {
    label: 'Industries',
    labelKey: 'nav.industries',
    href: '/industries',
    dropdown: {
      columns: [
        {
          heading: 'Public sector',
          items: [
            { label: 'Government & municipal', description: 'Citizen services and sovereign deployment', href: '/industries/government', icon: Landmark },
            { label: 'Education & ministries', description: 'Admissions, scholarships, institutional analytics', href: '/industries/education', icon: GraduationCap },
          ],
        },
        {
          heading: 'Transport, enterprise & commerce',
          items: [
            { label: 'Transport & logistics', description: 'Dispatch, telematics, regional mobility', href: '/industries/transport', icon: Bus },
            { label: 'Enterprise operations', description: 'Internal platforms on customer-cloud tenancy', href: '/industries/enterprise', icon: Building2 },
            { label: 'Marketplace operators', description: 'Regulated multi-sided platforms', href: '/industries/marketplaces', icon: ShoppingBag },
            { label: 'Freight & logistics networks', description: 'Port-to-inland corridor coordination', href: '/industries/logistics', icon: Truck },
          ],
        },
      ],
      feature: {
        title: 'All industries',
        description: 'Every sector on one page — see the full range of FlyttGo deployments.',
        href: '/industries',
        cta: 'Industries overview',
      },
    },
  },
  {
    label: 'Deployment',
    labelKey: 'nav.deployment',
    href: '/deployment',
    dropdown: {
      columns: [
        {
          heading: 'Deployment modes',
          items: [
            { label: 'FlyttGo-managed', description: 'Fully managed SaaS, region-aware', href: '/deployment/managed', icon: CloudCog },
            { label: 'Customer cloud', description: 'Runs inside your AWS, Azure or GCP tenancy', href: '/deployment/customer-cloud', icon: ServerCog },
            { label: 'Sovereign datacenter', description: 'Self-hosted for public-sector procurement', href: '/deployment/sovereign', icon: ShieldCheck },
          ],
        },
      ],
      feature: {
        title: 'Deployment architecture',
        description: 'Three modes to match any procurement or sovereignty posture.',
        href: '/deployment',
        cta: 'Compare all modes',
      },
    },
  },
  {
    label: 'Technology',
    labelKey: 'nav.technology',
    href: '/technology',
    dropdown: {
      columns: [
        {
          heading: 'Architecture & Developers',
          items: [
            { label: 'Architecture', description: 'Cloud-native platform stack', href: '/technology', icon: Code2 },
            { label: 'Developer portal', description: 'APIs, SDKs and deployment pipelines', href: '/developers', icon: Terminal },
            { label: 'API reference', description: 'Tenant-scoped REST endpoints', href: '/developers', icon: BookOpen },
          ],
        },
        {
          heading: 'Trust & Operations',
          items: [
            { label: 'Platform status', description: 'Live component health and incidents', href: '/status', icon: Activity },
            { label: 'Security', description: 'Isolation, encryption, monitoring, incident response', href: '/security', icon: Lock },
            { label: 'Compliance', description: 'SOC 2, ISO 27001, GDPR, WCAG, regional frameworks', href: '/compliance', icon: ShieldCheck },
          ],
        },
      ],
      feature: {
        title: 'Insights',
        description:
          'Deployment guides, architecture notes and procurement playbooks from the FlyttGo platform teams.',
        href: '/insights',
        cta: 'Read the latest insights',
      },
    },
  },
  {
    label: 'Company',
    labelKey: 'nav.company',
    href: '/company',
    dropdown: {
      columns: [
        {
          heading: 'About FlyttGo',
          items: [
            { label: 'Company overview', description: 'Nordic-origin platform infrastructure company', href: '/company', icon: Compass },
            { label: 'Leadership', description: 'Platform, security, deployment, commercial', href: '/company/leadership', icon: Users },
            { label: 'Careers', description: 'Open roles across engineering and commercial', href: '/company/careers', icon: Briefcase },
            { label: 'Press & media', description: 'Boilerplate, logos, media contacts', href: '/company/press', icon: Newspaper },
          ],
        },
      ],
      feature: {
        title: 'Talk to partnerships',
        description: 'Scope a deployment with our partnership and deployment engineering team.',
        href: '/contact?intent=partnership',
        cta: 'Start a conversation',
      },
    },
  },
  { label: 'Contact', labelKey: 'nav.contact', href: '/contact' },
];

const isRouteActive = (pathname: string, href: string) => {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
};

type IndicatorState = { left: number; width: number; opacity: number };

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { toggle: toggleCommandPalette } = useCommandPalette();
  const { t } = useI18n();
  const label = (l: NavLink) => (l.labelKey ? t(l.labelKey) : l.label);

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
          ? 'bg-white dark:bg-slate-900/92 supports-[backdrop-filter]:bg-white dark:bg-slate-900/85 backdrop-blur-md shadow-[0_1px_0_0_rgb(15_23_42/0.06),0_6px_18px_-8px_rgb(15_23_42/0.18)] border-b border-slate-200/70 dark:border-slate-800/60'
          : 'bg-white/80 supports-[backdrop-filter]:bg-white/60 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <TopUtilityBar />
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
            <span className="text-[15px] tracking-tight text-slate-900 dark:text-white">
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
                      active ? 'text-[#0A3A6B]' : 'text-slate-600 hover:text-slate-900 dark:text-white'
                    }`}
                  >
                    {label(l)}
                    {hasDropdown && (
                      <ChevronDown
                        size={13}
                        aria-hidden="true"
                        className={`text-slate-400 motion-safe:transition-transform ${dropdownOpen ? 'rotate-180 text-slate-600 dark:text-slate-400' : ''}`}
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
                aria-label={`${label(l)} menu`}
              >
                <div className="w-[760px] max-w-[min(94vw,760px)] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 shadow-[0_1px_0_0_rgb(15_23_42/0.04),0_24px_48px_-12px_rgb(15_23_42/0.18)] overflow-hidden">
                  <div className="grid grid-cols-[1fr_240px]">
                    <div className="p-4 grid sm:grid-cols-2 gap-4">
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
                                    className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:bg-slate-900/60 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40"
                                  >
                                    <span className="mt-0.5 w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800/60 flex items-center justify-center text-[#0A3A6B] flex-shrink-0" aria-hidden="true">
                                      <Icon size={16} strokeWidth={1.75} />
                                    </span>
                                    <span className="flex flex-col leading-tight">
                                      <span className="text-sm font-semibold text-slate-900 dark:text-white tracking-tight">{item.label}</span>
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
                        <div className="mt-2 text-lg font-semibold tracking-tight">
                          {l.dropdown.feature.titleKey
                            ? t(l.dropdown.feature.titleKey)
                            : l.dropdown.feature.title}
                        </div>
                        <p className="mt-2 text-[13px] text-white/70 leading-relaxed">
                          {l.dropdown.feature.descriptionKey
                            ? t(l.dropdown.feature.descriptionKey)
                            : l.dropdown.feature.description}
                        </p>
                        <div className="mt-auto pt-5">
                          <Link
                            href={l.dropdown.feature.href}
                            onClick={() => setOpenDropdown(null)}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:gap-2.5 motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1F3D] rounded-sm"
                          >
                            {l.dropdown.feature.ctaKey
                              ? t(l.dropdown.feature.ctaKey)
                              : l.dropdown.feature.cta}
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
            aria-label={t('nav.search')}
            className="group inline-flex items-center gap-2 pl-3 pr-1.5 py-1.5 text-[13px] text-slate-500 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 rounded-md hover:text-slate-700 dark:text-slate-300 hover:border-slate-300 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
          >
            <Search size={13} aria-hidden="true" />
            <span className="hidden xl:inline">{t('nav.search')}</span>
            <kbd className="ml-1 font-mono text-[10px] text-slate-400 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60 rounded px-1.5 py-0.5">
              ⌘K
            </kbd>
          </button>
          <ThemeToggle compact />
          <Link
            href="/contact"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-white motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px] rounded-md px-2"
          >
            {t('nav.signin')}
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold bg-[#0A3A6B] text-white rounded-md hover:bg-[#0a2f57] motion-safe:transition-colors shadow-[0_1px_0_0_rgb(10_58_107/0.6),0_6px_18px_-6px_rgb(10_58_107/0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
          >
            {t('nav.cta.primary')}
            <ArrowRight size={14} className="motion-safe:transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="lg:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 text-slate-700 dark:text-slate-300 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
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
        className="lg:hidden border-t border-slate-200/80 dark:border-slate-800/60 bg-white/95 backdrop-blur-xl"
      >
        <nav aria-label="Mobile primary" className="px-5 py-4 flex flex-col gap-1">
          {primaryLinks.map((l) => {
            const active = isRouteActive(pathname, l.href);
            return (
              <div key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? 'page' : undefined}
                  onClick={closeMobile}
                  className={`block px-3 py-2.5 text-sm font-semibold rounded-md ${
                    active
                      ? 'text-[#0A3A6B] bg-slate-100 dark:bg-slate-800/60 dark:text-white'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/60'
                  }`}
                >
                  {label(l)}
                </Link>
                {l.dropdown && (
                  <ul className="mt-1 mb-2 ml-3 pl-3 border-l border-slate-200/80 dark:border-slate-800/60 space-y-0.5">
                    {l.dropdown.columns.flatMap((c) => c.items).map((item) => (
                      <li key={`${l.href}-${item.href}-${item.label}`}>
                        <Link
                          href={item.href}
                          onClick={closeMobile}
                          className="block px-3 py-2 text-[13px] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900/60 rounded-md"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                    {l.dropdown.feature && (
                      <li>
                        <Link
                          href={l.dropdown.feature.href}
                          onClick={closeMobile}
                          className="block px-3 py-2 text-[13px] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9] hover:underline underline-offset-4"
                        >
                          {l.dropdown.feature.title} →
                        </Link>
                      </li>
                    )}
                  </ul>
                )}
              </div>
            );
          })}
          <div className="mt-2 flex flex-col gap-2 pt-3 border-t border-slate-200/80 dark:border-slate-800/60">
            <button
              type="button"
              onClick={() => {
                closeMobile();
                toggleCommandPalette();
              }}
              className="inline-flex items-center justify-between px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:bg-slate-900/60 rounded-md"
            >
              <span className="inline-flex items-center gap-2">
                <Search size={14} aria-hidden="true" />
                {t('nav.search')}
              </span>
              <kbd className="font-mono text-[10px] text-slate-400 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60 rounded px-1.5 py-0.5">
                ⌘K
              </kbd>
            </button>
            <div className="px-1 py-1">
              <ThemeToggle />
            </div>
            <Link
              href="/contact"
              onClick={closeMobile}
              className="px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:bg-slate-900/60 rounded-md"
            >
              {t('nav.signin')}
            </Link>
            <Link
              href="/contact"
              onClick={closeMobile}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-[#0A3A6B] text-white rounded-md"
            >
              {t('nav.cta.primary')}
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
