'use client';

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from '@/components/flytt/LocaleLink';
import BrandLogo from '@/components/flytt/BrandLogo';
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
  Globe2,
  Network,
  FileCheck2,
  CalendarClock,
  Layers,
  Workflow,
  Scale,
  LayoutDashboard,
  Cpu,
  type LucideIcon,
} from 'lucide-react';
import { useCommandPalette } from '@/components/flytt/CommandPalette';
import { AskFlyttGoTrigger } from '@/components/flytt/AskFlyttGo';
import OpsStatusRail from '@/components/flytt/OpsStatusRail';
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
  { label: 'Home', labelKey: 'nav.home', href: '/' },

  // ─── 1. Platform — explain FlyttGoTech Core ecosystem ─────────────
  {
    label: 'Platform',
    href: '/platforms',
    dropdown: {
      columns: [
        {
          heading: 'Platform ecosystem · PL.00',
          items: [
            { label: 'Ecosystem overview',          description: 'PL.00 · eight modules orchestrated through the FlyttGoTech Core', href: '/platforms',                   icon: Workflow },
            { label: 'Transify',                    description: 'Mobility infrastructure platform',                                href: '/platforms/transify',          icon: Route },
            { label: 'Workverge',                   description: 'Workforce coordination infrastructure',                           href: '/platforms/workverge',         icon: UserCheck },
            { label: 'Civitas',                     description: 'Digital government services platform',                            href: '/platforms/civitas',           icon: Landmark },
            { label: 'EduPro',                      description: 'Education intelligence infrastructure',                           href: '/platforms/edupro',            icon: GraduationCap },
          ],
        },
        {
          heading: 'Identity · Payments · Finance',
          items: [
            { label: 'Identity & Trust Layer',      description: 'ID.00 · powered by Identra · identity infrastructure',            href: '/platforms/identra',           icon: Fingerprint },
            { label: 'Payvera',                     description: 'Public-service payment infrastructure',                           href: '/platforms/payvera',           icon: CreditCard },
            { label: 'Ledgera',                     description: 'Financial operations & bookkeeping infrastructure',               href: '/platforms/ledgera',           icon: Calculator },
          ],
        },
        {
          heading: 'Architecture & coverage',
          items: [
            { label: 'Infrastructure Architecture', description: 'IA.00 · multi-tenant SaaS · API-first · multi-region',            href: '/infrastructure-architecture', icon: Network },
            { label: 'Global Coverage',             description: 'GC.00 · NA · Nordic EU · Africa · MENA · APAC footprint',         href: '/global-coverage',             icon: Globe2 },
            { label: 'Operator Console preview',    description: 'OC.00 · what tenants see post-deployment',                         href: '/console',                     icon: LayoutDashboard },
            { label: 'Self-serve sandbox',          description: 'SB.SP · 60-second sandbox tenant · 7-day TTL',                     href: '/sandbox',                     icon: Cpu },
            { label: 'FlyttGo vs. comparators',     description: 'CP.00 · honest comparisons · Stripe · Palantir · Databricks · AWS', href: '/compare',                     icon: Scale },
            { label: 'ROI / TCO calculator',        description: 'RO.00 · 1/3/5-year TCO · 3-path procurement comparison',          href: '/roi',                         icon: Calculator },
          ],
        },
      ],
      feature: {
        title: 'Platform Ecosystem · PL.00',
        description: 'Modular infrastructure platforms plus the FlyttGo marketplace — licensed independently, deployed together.',
        href: '/platforms',
        cta: 'Explore the ecosystem',
      },
    },
  },

  // ─── 2. Engineering — explain how solutions are built ─────────────
  {
    label: 'Engineering',
    href: '/engineering',
    dropdown: {
      columns: [
        {
          heading: 'Engineering division',
          items: [
            { label: 'Institutional Systems Engineering', description: 'SE.00 · division overview surface',                          href: '/engineering',                 icon: Compass },
            { label: 'Web Studio',                  description: 'WS.00 · digital presence to enterprise platform tiers',           href: '/engineering/ladder',          icon: Layers },
            { label: 'Capability Ladder',           description: 'SE.02 · six escalating tiers · L.01 → L.06',                      href: '/engineering/ladder',          icon: Layers },
            { label: 'Modular Add-ons',             description: 'SE.03 · eight extensions · AO.01 → AO.08',                        href: '/engineering/modules',         icon: Calculator },
            { label: 'Delivery Model',              description: 'SE.04 · three-step engagement cadence · SE.D1 → SE.D3',           href: '/engineering/delivery',        icon: Workflow },
          ],
        },
        {
          heading: 'Developer experience',
          items: [
            { label: 'API reference',               description: 'AP.RF · OpenAPI 3.1 · 634+ endpoints across eight modules',        href: '/developers/api',              icon: Code2 },
            { label: 'Developer playground',        description: 'API.PG · live endpoint explorer with real responses',              href: '/developers/playground',       icon: Terminal },
            { label: 'AI agent surface',            description: 'AI.00 · MCP-discoverable platform · LLM agents drive safely',      href: '/agents',                      icon: Workflow },
            { label: 'AI governance',               description: 'AG.00 · AIBOM · model cards · EU AI Act risk-tier registry',       href: '/governance/ai',               icon: ShieldCheck },
            { label: 'Open standards',              description: 'OS.00 · 33 open standards across six interop categories',          href: '/standards',                   icon: Network },
            { label: 'SBOM registry',               description: 'SB.00 · CycloneDX 1.6 · Sigstore-signed · per-module',              href: '/sbom',                        icon: ShieldCheck },
            { label: 'Open source',                  description: 'OS.MF · OSPO policy · maintained · sponsored · contributed',      href: '/open-source',                 icon: Code2 },
            { label: 'Public roadmap',              description: 'RM.00 · shipped, in-flight and planned · refreshed quarterly',     href: '/roadmap',                     icon: Compass },
            { label: 'Changelog',                   description: 'CL.00 · canonical record of every release',                        href: '/changelog',                   icon: BookOpen },
          ],
        },
      ],
      feature: {
        title: 'Build Your Digital Platform Infrastructure · PR.00',
        description:
          'Live procurement estimator. Pick a level, layer feature modules, choose a deployment substrate and region — total cost, delivery window and exportable estimate update live.',
        href: '/engineering/configurator',
        cta: 'Open the live configurator',
      },
    },
  },

  // ─── 3. Deployment — explain hosting models and rollout pathways ──
  {
    label: 'Deployment',
    href: '/deployment',
    dropdown: {
      columns: [
        {
          heading: 'Deployment modes',
          items: [
            { label: 'Deployment Architecture',     description: 'DL.00 · overview · compare all modes',                            href: '/deployment',                  icon: Network },
            { label: 'Managed SaaS',                description: 'DM.01 · FlyttGo-managed regional tenants',                        href: '/deployment/managed',          icon: CloudCog },
            { label: 'Customer Cloud',              description: 'DM.02 · runs inside your AWS, Azure or GCP tenancy',              href: '/deployment/customer-cloud',   icon: ServerCog },
            { label: 'Sovereign Datacenter',        description: 'DM.03 · self-hosted in certified national datacenters',           href: '/deployment/sovereign',        icon: ShieldCheck },
            { label: 'Confidential compute',        description: 'DM.04 · TEE-isolated · Nitro · Intel SGX · AMD SEV-SNP',          href: '/deployment/confidential',     icon: Lock },
          ],
        },
        {
          heading: 'Lifecycle & sovereignty',
          items: [
            { label: 'Deployment Lifecycle',        description: 'EP.00 · five-stage cadence with written deliverables',            href: '/deployment-lifecycle',        icon: Workflow },
            { label: 'Sovereign Deployment',        description: 'SV.00 · national hosting and data-residency posture',             href: '/sovereign',                   icon: ShieldCheck },
          ],
        },
      ],
      feature: {
        title: 'Deployment architecture · DL.00',
        description: 'Three modes plus a full procurement compatibility surface — match any sovereignty posture in one read.',
        href: '/deployment',
        cta: 'Compare all modes',
      },
    },
  },

  // ─── 4. Government — ministries and modernisation programmes ──────
  {
    label: 'Government',
    href: '/government',
    dropdown: {
      columns: [
        {
          heading: 'Public-sector surfaces',
          items: [
            { label: 'Government & Public Sector',  description: 'GV.00 · capability brief, sovereignty framework, pilot proposal', href: '/government',                  icon: Landmark },
            { label: 'Procurement Compatibility',   description: 'PC.00 · pilot, city, regional, national, white-label tiers',     href: '/procurement-compatibility',   icon: FileCheck2 },
            { label: 'Trust Center',                description: 'TC.00 · SOC 2 · ISO 27001 · DPA · subprocessors · disclosure',    href: '/trust',                       icon: ShieldCheck },
            { label: 'EU Digital Identity Wallet',  description: 'VC.00 · eIDAS 2.0 · W3C VC · OID4VP · DIDs · qualified signatures', href: '/wallet',                      icon: Fingerprint },
            { label: 'Post-quantum cryptography',   description: 'PQ.00 · NIST FIPS 203/204/205 hybrid migration roadmap',          href: '/post-quantum',                icon: Lock },
            { label: 'Jurisdictions',               description: 'JU.00 · UK · EU · Norway · KSA · UAE · ZA framework alignment',   href: '/jurisdictions',               icon: Globe2 },
            { label: 'Sovereign Deployment',        description: 'SV.00 · national hosting and data-residency posture',             href: '/sovereign',                   icon: Lock },
          ],
        },
        {
          heading: 'Sector entry points',
          items: [
            { label: 'Government & municipal',      description: 'Citizen services and sovereign deployment',                       href: '/industries/government',       icon: Landmark },
            { label: 'Education & ministries',      description: 'Admissions, scholarships, institutional analytics',               href: '/industries/education',        icon: GraduationCap },
            { label: 'Transport authorities',       description: 'Dispatch, telematics, regional mobility',                         href: '/industries/transport',        icon: Bus },
          ],
        },
      ],
      feature: {
        title: 'Public-sector engagement intake · GV.00',
        description: 'Capability brief, sovereignty framework, pilot proposal — routed to the public-sector engagement desk.',
        href: '/government',
        cta: 'Open public-sector surface',
      },
    },
  },

  // ─── 5. Marketplace — explain platform operations ─────────────────
  {
    label: 'Marketplace',
    href: '/marketplace',
    dropdown: {
      columns: [
        {
          heading: 'Marketplace infrastructure',
          items: [
            { label: 'Relocation Marketplace Infrastructure', description: 'MP.00 · regulated multi-sided marketplace substrate',   href: '/marketplace',                 icon: ShoppingBag },
            { label: 'Provider Routing Engine',     description: 'MP.RT · demand-aware order routing across the provider pool',    href: '/marketplace#provider-routing', icon: Route },
            { label: 'Trust & Verification Layer',  description: 'MP.TV · KYC and licence verification on every provider',          href: '/marketplace#trust-verification', icon: ShieldCheck },
            { label: 'Pricing Intelligence Layer',  description: 'MP.PI · reference-pricing models per region and corridor',        href: '/marketplace#pricing-intelligence', icon: Calculator },
            { label: 'Dispute Resolution Logic',    description: 'MP.DR · audit-ready adjudication workflow',                       href: '/marketplace#dispute-resolution', icon: ShieldCheck },
          ],
        },
        {
          heading: 'Operator pathways',
          items: [
            { label: 'FlyttGo Marketplace platform', description: 'Smart moving & transport — runs on Transify',                    href: '/platforms/flyttgo',           icon: Truck },
            { label: 'Marketplace operators sector', description: 'Regulated multi-sided platforms · industry surface',             href: '/industries/marketplaces',     icon: ShoppingBag },
            { label: 'Provider onboarding · CT.02', description: 'Marketplace consultation · compliance · service integration',     href: '/consultation',                icon: CalendarClock },
          ],
        },
      ],
      feature: {
        title: 'Relocation Marketplace Infrastructure · MP.00',
        description: 'Provider routing, trust & verification, pricing intelligence and dispute resolution — four orthogonal subsystems on one substrate.',
        href: '/marketplace',
        cta: 'Open marketplace surface',
      },
    },
  },

  // ─── 6. Start a Project — entry pathway for clients ───────────────
  {
    label: 'Start a Project',
    href: '/engineering/configurator',
    dropdown: {
      columns: [
        {
          heading: 'Estimate · Propose · Engage',
          items: [
            { label: 'Cost Configurator',           description: 'PR.00 · live procurement estimator · PDF / Word / email',         href: '/engineering/configurator',    icon: Calculator },
            { label: 'Proposal Generator',          description: 'SE.PG · auto-generate a pilot proposal from the configurator',    href: '/engineering/proposal',        icon: BookOpen },
            { label: 'Consultation Booking',        description: 'CB.00 · five-step intake · four consultation categories',         href: '/consultation',                icon: CalendarClock },
            { label: 'Scoping Intake',              description: 'SE.FN · engagement-desk intake · response within one business day', href: '/engineering/scoping',       icon: Workflow },
          ],
        },
      ],
      feature: {
        title: 'Configurator → Proposal → Consultation → Scoping',
        description: 'Four entry pathways into the engagement desk. Pick the one that matches the maturity of your programme.',
        href: '/engineering/configurator',
        cta: 'Start with the configurator',
      },
    },
  },

  // ─── 7. Infrastructure — readiness and expansion capability ───────
  {
    label: 'Infrastructure',
    href: '/infrastructure-architecture',
    dropdown: {
      columns: [
        {
          heading: 'Infrastructure surfaces',
          items: [
            { label: 'Infrastructure Architecture', description: 'IA.00 · multi-tenant SaaS · API-first · multi-region',            href: '/infrastructure-architecture', icon: Network },
            { label: 'Global Coverage',             description: 'GC.00 · NA · Nordic EU · Africa · MENA · APAC footprint',         href: '/global-coverage',             icon: Globe2 },
            { label: 'White-label Program',         description: 'Tenant-isolated, brandable platforms on FlyttGo infrastructure',  href: '/white-label',                 icon: Layers },
          ],
        },
      ],
      feature: {
        title: 'Infrastructure Architecture · IA.00',
        description: 'Platform readiness, expansion capability and the regional rollout footprint behind every FlyttGo deployment.',
        href: '/infrastructure-architecture',
        cta: 'Open architecture surface',
      },
    },
  },

  // ─── 8. Company — corporate identity and trust layer ──────────────
  {
    label: 'Company',
    labelKey: 'nav.company',
    href: '/company',
    dropdown: {
      columns: [
        {
          heading: 'About FlyttGo',
          items: [
            { label: 'About FlyttGo',               description: 'Nordic-origin platform infrastructure company',                   href: '/company',                     icon: Compass },
            { label: 'Leadership',                  description: 'Platform, security, deployment, commercial',                      href: '/company/leadership',          icon: Users },
            { label: 'Customer reference programmes', description: 'CS.00 · six anonymised programmes with delivered metrics',       href: '/customers',                   icon: Building2 },
            { label: 'Partners',                    description: 'PR.00 · four tiers · twelve listed partners · EU · MENA · Africa', href: '/partners',                    icon: Briefcase },
            { label: 'Research library',            description: 'RS.00 · 8 long-form papers · architecture · regulatory · sector',  href: '/research',                    icon: BookOpen },
            { label: 'Education hub',               description: 'LR.00 · 6 certification tracks · verifiable credentials',          href: '/learn',                       icon: GraduationCap },
            { label: 'Insights',                    description: 'Deployment guides, architecture notes, procurement playbooks',    href: '/insights',                    icon: BookOpen },
            { label: 'Careers',                     description: 'Open roles across engineering and commercial',                    href: '/company/careers',             icon: Users },
            { label: 'Contact',                     description: 'Engagement-desk intake · partnerships · procurement',              href: '/contact',                     icon: Newspaper },
          ],
        },
      ],
      feature: {
        title: 'Architecture Consultation Booking · CB.00',
        description:
          'Structured five-step consultation intake. Four categories: platform architecture, marketplace onboarding, government pilot deployment, enterprise relocation programme setup.',
        href: '/consultation',
        cta: 'Book a consultation',
      },
    },
  },
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
          className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px] rounded-md"
        >
          <BrandLogo variant="lockup" height={32} priority />
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
          <AskFlyttGoTrigger />
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

      {/* OPS.LIVE persistent status rail — visible on every page below
          the primary bar. Sticks with the navbar since the parent
          <header> is sticky. */}
      <OpsStatusRail />
    </header>
  );
};

export default Navbar;
