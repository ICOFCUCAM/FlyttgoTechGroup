import React from 'react';
import Breadcrumbs, { type Crumb } from '@/components/flytt/Breadcrumbs';

type Props = {
  /** Mono section-index code rendered above the eyebrow (e.g. "PL.00").
   *  When supplied, the eyebrow renders as an editorial mono rail
   *  matching the home-page sections; if omitted, falls back to the
   *  legacy colored-pill eyebrow for backwards compatibility. */
  code?: string;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  crumbs?: Crumb[];
  accent?: string;
};

const PageHero: React.FC<Props> = ({
  code,
  eyebrow,
  title,
  description,
  crumbs,
  accent = '#0A3A6B',
}) => {
  return (
    <section className="relative py-14 lg:py-20 bg-gradient-to-b from-[#F7FAFD] to-white dark:from-slate-900 dark:to-slate-950 border-b border-slate-200/70 dark:border-slate-800/60">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #e2e8f0 1px, transparent 1px),' +
            'linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at 20% 20%, black 30%, transparent 80%)',
        }}
      />
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        {crumbs && crumbs.length > 0 && <Breadcrumbs items={crumbs} />}
        {code ? (
          <div className="mt-6 flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
            <span className="font-semibold" style={{ color: accent }}>
              {code}
            </span>
            <span
              aria-hidden="true"
              className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[180px]"
            />
            <span className="text-slate-500 dark:text-slate-500">{eyebrow}</span>
          </div>
        ) : (
          <p
            className="mt-6 inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.22em]"
            style={{ backgroundColor: `${accent}0F`, color: accent }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: accent }}
              aria-hidden="true"
            />
            {eyebrow}
          </p>
        )}
        <h1 className="mt-5 font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05] max-w-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            {description}
          </p>
        )}
      </div>
    </section>
  );
};

export default PageHero;

