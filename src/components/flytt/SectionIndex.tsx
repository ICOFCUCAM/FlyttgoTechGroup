import React from 'react';

type Props = {
  /** Engineering identifier — e.g. "PL.01", "DP.02". JetBrains Mono. */
  code: string;
  /** Section name — e.g. "Platform Ecosystem Architecture". */
  title: string;
  /** Optional supporting line shown beneath, smaller scale. */
  meta?: React.ReactNode;
  className?: string;
  /** Inverts colours for dark hero / footer surfaces. */
  inverted?: boolean;
};

/**
 * Engineering section header used across the site to give every major
 * surface an indexable identifier. Visual language borrows from
 * Palantir / Stripe infrastructure pages: monospace code on the left,
 * a hairline rule running across, the title underneath.
 */
const SectionIndex: React.FC<Props> = ({ code, title, meta, className, inverted }) => {
  const base = inverted
    ? {
        code: 'text-[#9ED0F9]',
        title: 'text-white',
        rule: 'bg-white/15',
        meta: 'text-white/55',
      }
    : {
        code: 'text-[#0A3A6B] dark:text-[#9ED0F9]',
        title: 'text-slate-900 dark:text-white',
        rule: 'bg-slate-200/80 dark:bg-slate-800/60',
        meta: 'text-slate-500 dark:text-slate-500',
      };

  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        <span className={`font-mono text-[11px] tracking-[0.22em] font-semibold ${base.code}`}>
          {code}
        </span>
        <span aria-hidden="true" className={`flex-1 h-px ${base.rule}`} />
      </div>
      <div className={`mt-2 font-mono text-[11px] uppercase tracking-[0.22em] font-medium ${base.title}`}>
        {title}
      </div>
      {meta && (
        <div className={`mt-1 font-mono text-[10px] tracking-[0.18em] ${base.meta}`}>
          {meta}
        </div>
      )}
    </div>
  );
};

export default SectionIndex;
