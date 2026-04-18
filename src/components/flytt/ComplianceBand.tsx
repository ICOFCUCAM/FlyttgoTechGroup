import React from 'react';
import { ShieldCheck, Lock, FileCheck2, Layers3, KeyRound } from 'lucide-react';
import { Reveal } from '@/components/flytt/Reveal';

type Badge = {
  icon: typeof ShieldCheck;
  label: string;
  sub: string;
};

const badges: Badge[] = [
  { icon: ShieldCheck, label: 'SOC 2 Type II', sub: 'Roadmap · 2026' },
  { icon: Lock, label: 'ISO 27001', sub: 'Aligned controls' },
  { icon: FileCheck2, label: 'GDPR', sub: 'EU-aligned data residency' },
  { icon: Layers3, label: 'Multi-tenant isolation', sub: 'Per-tenant data & access scope' },
  { icon: KeyRound, label: 'OAuth & RBAC', sub: 'Role-based access everywhere' },
];

const ComplianceBand: React.FC = () => {
  return (
    <section
      aria-labelledby="compliance-band-heading"
      className="relative bg-white border-t border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-16">
        <Reveal>
          <h2
            id="compliance-band-heading"
            className="text-[11px] uppercase tracking-[0.22em] font-semibold text-slate-500 text-center"
          >
            Built to institutional standards
          </h2>

          <ul className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {badges.map((b) => {
              const Icon = b.icon;
              return (
                <li
                  key={b.label}
                  className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200/80 bg-white motion-safe:transition-colors hover:border-slate-300"
                >
                  <span
                    className="w-9 h-9 rounded-lg bg-slate-100 text-[#0A3A6B] flex items-center justify-center flex-shrink-0"
                    aria-hidden="true"
                  >
                    <Icon size={16} strokeWidth={1.75} />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold text-slate-900 tracking-tight">{b.label}</span>
                    <span className="mt-0.5 text-[11px] text-slate-500">{b.sub}</span>
                  </span>
                </li>
              );
            })}
          </ul>

          <p className="mt-6 text-xs text-slate-500 text-center max-w-2xl mx-auto">
            Formal certifications in progress. Contact the platform team for compliance
            attestations, DPA templates and regional deployment reviews.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default ComplianceBand;
