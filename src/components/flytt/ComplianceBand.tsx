import React from 'react';
import Link from '@/components/flytt/LocaleLink';
import {
  ShieldCheck,
  Lock,
  FileCheck2,
  Accessibility,
  CreditCard,
  Fingerprint,
  ArrowUpRight,
} from 'lucide-react';
import { Reveal } from '@/components/flytt/Reveal';

/**
 * Security, compliance and deployment-readiness signalling band.
 *
 * Communicates infrastructure-grade deployment readiness without
 * implying that third-party certifications have been formally
 * obtained where they have not. Language modeled on AWS Public
 * Sector, Stripe Infrastructure, Palantir Government deployment
 * surfaces and ServiceNow Trust Center positioning.
 *
 * Section index codes:
 *   CR.00       Section index + heading
 *   CR.01–04    Platform-level alignment
 *   CR.05–06    Module-specific regulatory compatibility
 *   CR.RM       Certification roadmap indicator
 *
 * Every item links to /security where the architecture explanation
 * page lives (Phase 8).
 */

type Item = {
  code: string;
  icon: typeof ShieldCheck;
  label: string;
  sub: string;
};

// CR.01–CR.04 — platform-level alignment (Phases 2 + 4).
const PLATFORM_ITEMS: Item[] = [
  {
    code: 'CR.01',
    icon: ShieldCheck,
    label: 'SOC 2–aligned infrastructure controls',
    sub: 'Logging, change management and access governance modelled on the SOC 2 trust-services criteria.',
  },
  {
    code: 'CR.02',
    icon: Lock,
    label: 'ISO 27001–aligned security architecture',
    sub: 'Information-security management surface mapped to ISO 27001 Annex A controls.',
  },
  {
    code: 'CR.03',
    icon: FileCheck2,
    label: 'GDPR-compliant data handling architecture',
    sub: 'EU data residency, processor agreements, subject-access workflows; lawful-basis tagging in the audit log.',
  },
  {
    code: 'CR.04',
    icon: Accessibility,
    label: 'WCAG 2.1 AA accessibility targets',
    sub: 'Keyboard, screen-reader, contrast, motion and language requirements met across the platform UI.',
  },
];

// CR.05–CR.06 — module-specific regulatory compatibility (Phase 4).
const MODULE_ITEMS: Item[] = [
  {
    code: 'CR.05',
    icon: CreditCard,
    label: 'PSD2-ready payments infrastructure (Payvera)',
    sub: 'Strong customer authentication, open-banking endpoints and transaction-monitoring hooks.',
  },
  {
    code: 'CR.06',
    icon: Fingerprint,
    label: 'eIDAS-compatible identity services (Identra)',
    sub: 'Qualified-signature flows, eIDAS LoA mapping and cross-border attribute exchange.',
  },
];

const ComplianceBand: React.FC = () => {
  return (
    <section
      aria-labelledby="compliance-band-heading"
      className="relative bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/60"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <Reveal>
          {/* PHASE 1 + PHASE 7 — section index + serif headline.
              Title rewritten from "Certifications & Compliance" to
              "Security, Compliance & Deployment Readiness", presented
              with the section-index code rail used by the deployment
              region panel and the platform ecosystem metadata blocks. */}
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
            <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
              CR.00
            </span>
            <span
              aria-hidden="true"
              className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]"
            />
            <span>Trust center · alignment registry</span>
          </div>

          <div className="mt-6 grid lg:grid-cols-12 gap-8 items-end">
            <h2
              id="compliance-band-heading"
              className="lg:col-span-7 font-serif text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.1]"
            >
              Security, compliance &{' '}
              <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
                deployment readiness.
              </em>
            </h2>
            {/* PHASE 6 — trust-signal microcopy (infrastructure tone) */}
            <p className="lg:col-span-5 text-sm text-slate-600 dark:text-slate-400 leading-[1.65]">
              Certification alignment enables FlyttGo deployments to
              operate within enterprise security frameworks and
              regulated-sector infrastructure environments.
            </p>
          </div>

          {/* PHASE 2 + PHASE 4 — platform-level alignment grid.
              Wording rewritten to architecture-aligned positioning
              language ("SOC 2-aligned infrastructure controls" etc.)
              rather than statements implying completed certification. */}
          <div className="mt-10">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 mb-3">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
                PLATFORM-LEVEL ALIGNMENT
              </span>
              <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
              CR.01–04
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PLATFORM_ITEMS.map((b) => (
                <ItemCard key={b.code} item={b} />
              ))}
            </ul>
          </div>

          {/* PHASE 4 — module-specific regulatory compatibility,
              visually separated from the platform-level grid. */}
          <div className="mt-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500 mb-3">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
                MODULE-SPECIFIC REGULATORY COMPATIBILITY
              </span>
              <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
              CR.05–06
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {MODULE_ITEMS.map((b) => (
                <ItemCard key={b.code} item={b} />
              ))}
            </ul>
          </div>

          {/* PHASE 3 — explanatory metadata line beneath the grid */}
          <p className="mt-8 max-w-3xl font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-500 leading-relaxed">
            FlyttGo platform infrastructure is designed to support
            regulated-sector deployments and certification-aligned
            operating environments across public-sector and enterprise
            implementations.
          </p>

          {/* PHASE 5 — certification roadmap indicator.
              Communicates forward capability without misrepresentation. */}
          <div className="mt-8 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/60">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
              <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
                CR.RM
              </span>
              <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
              Certification pathways supported
            </div>
            <ul className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-[11px] uppercase tracking-[0.16em]">
              {[
                'ISO 27001',
                'SOC 2 Type II',
                'Public-sector sovereign deployment compliance environments',
              ].map((label) => (
                <li
                  key={label}
                  className="flex items-start gap-2 px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/60"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0A3A6B] dark:bg-[#9ED0F9] flex-shrink-0"
                  />
                  <span className="text-slate-700 dark:text-slate-300 leading-snug normal-case tracking-tight">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[12px] text-slate-500 dark:text-slate-500 leading-snug">
              Pathways indicate engineered capability to operate inside
              the named compliance environment. Formal third-party
              attestation lands separately and is published on the
              security architecture page.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/**
 * Card for a single CR.0X alignment item. Linked to /security
 * (Phase 8) so each row routes to the architecture explanation page.
 */
function ItemCard({ item }: { item: Item }) {
  const Icon = item.icon;
  return (
    <li>
      <Link
        href="/security"
        className="group flex items-start gap-3 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
      >
        <span
          className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center flex-shrink-0"
          aria-hidden="true"
        >
          <Icon size={18} strokeWidth={1.75} />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.18em]">
            <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
              {item.code}
            </span>
            <ArrowUpRight
              size={12}
              className="text-slate-300 group-hover:text-slate-700 dark:group-hover:text-white motion-safe:transition-all"
              aria-hidden="true"
            />
          </div>
          <div className="mt-2 text-[14px] font-semibold tracking-tight text-slate-900 dark:text-white leading-snug">
            {item.label}
          </div>
          <p className="mt-1 text-[12px] text-slate-500 dark:text-slate-500 leading-snug">
            {item.sub}
          </p>
        </div>
      </Link>
    </li>
  );
}

export default ComplianceBand;
