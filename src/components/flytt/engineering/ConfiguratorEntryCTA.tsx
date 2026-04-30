import React from 'react';
import Link from '@/components/flytt/LocaleLink';
import { Calculator, ArrowUpRight, FileText, FileType, Mail, Clock3, DollarSign } from 'lucide-react';

/**
 * PR.00 entry surface — placed immediately after the capability
 * ladder so a visitor can transition from "browsing tiers" to
 * "estimating a configuration" in one click. Matches the dark
 * editorial chrome family of the home FinalCTA + sovereignty band.
 */

const META = [
  { icon: DollarSign, label: 'Live total' },
  { icon: Clock3,    label: 'Delivery window' },
  { icon: FileText,  label: 'Export to PDF' },
  { icon: FileType,  label: 'Export to Word' },
  { icon: Mail,      label: 'Send via email' },
];

export default function ConfiguratorEntryCTA() {
  return (
    <section
      id="pr-00"
      aria-labelledby="pr-00-heading"
      className="relative bg-white dark:bg-slate-950 py-20 lg:py-24 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="rounded-3xl bg-[#0A1F3D] text-white p-8 lg:p-12 border border-white/10 shadow-[0_24px_60px_-30px_rgb(10_31_61/0.5)]">
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase">
            <Calculator size={12} strokeWidth={2} aria-hidden="true" className="text-[#D6B575]" />
            <span className="text-[#D6B575] font-semibold">PR.00</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span className="text-white/85">Live cost configurator</span>
          </div>

          <h2
            id="pr-00-heading"
            className="mt-5 font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.05] max-w-3xl"
          >
            Build the configuration{' '}
            <em className="not-italic font-serif italic font-normal text-[#D6B575]">
              your programme actually needs.
            </em>
          </h2>

          <p className="mt-5 text-base lg:text-lg text-white/75 leading-[1.65] max-w-2xl">
            Pick a level, layer feature modules, choose a deployment
            substrate and a region. Total pricing band, delivery window
            and an exportable estimate update live.
          </p>

          <ul className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-3">
            {META.map((m) => {
              const Icon = m.icon;
              return (
                <li
                  key={m.label}
                  className="flex items-center gap-2 px-3 py-2 rounded-md bg-white/[0.06] border border-white/10"
                >
                  <Icon size={12} strokeWidth={1.75} aria-hidden="true" className="text-[#D6B575] flex-shrink-0" />
                  <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-white/85">
                    {m.label}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/pricing"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#D6B575] text-[#0A1F3D] text-sm font-semibold tracking-tight rounded-lg hover:bg-[#D6B575]/90 motion-safe:transition-colors"
            >
              Open the live cost configurator · PR.00
              <ArrowUpRight
                size={14}
                className="motion-safe:transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">
              Pricing bands indicative · final pricing confirmed after scoping engagement (SE.04)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
