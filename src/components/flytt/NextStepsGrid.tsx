import Link from '@/components/flytt/LocaleLink';
import { ArrowUpRight, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

/**
 * Shared next-steps grid component. Renders the 4-card cross-cluster
 * routing pattern used at the bottom of major surfaces (PL.NX, DM.NX,
 * IN.NX, SO.NX, WL.NX, etc).
 *
 * Card geometry matches HP.IDX (HomeCapabilityPathways) and SE.IDX so
 * the visual hand-off pattern reads identically across the site.
 */

export type NextStep = {
  href: string;
  code: string;
  icon: LucideIcon;
  title: string;
  body: string;
  meta: string;
};

type Props = {
  /** Section index code, e.g. 'IN.NX'. Rendered in the eyebrow rail. */
  code: string;
  /** Short label after the code, e.g. 'Where this surface goes next'. */
  eyebrow: string;
  /** Heading parts; the second clause becomes italic-emphasis. */
  titleLead: ReactNode;
  titleEmphasis: ReactNode;
  /** Body paragraph beneath the heading. */
  intro: ReactNode;
  /** Up to four next-step cards. */
  steps: NextStep[];
  /** Anchor id for the section. Defaults to lower-cased code. */
  anchorId?: string;
};

export default function NextStepsGrid({
  code,
  eyebrow,
  titleLead,
  titleEmphasis,
  intro,
  steps,
  anchorId,
}: Props) {
  const id = anchorId ?? code.toLowerCase().replace('.', '-');
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="relative bg-gradient-to-b from-white to-[#F5F8FC] dark:from-slate-950 dark:to-slate-900 py-24 lg:py-28 border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">{code}</span>
          <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
          <span>{eyebrow}</span>
        </div>

        <h2
          id={headingId}
          className="mt-6 max-w-3xl font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]"
        >
          {titleLead}{' '}
          <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
            {titleEmphasis}
          </em>
        </h2>
        <p className="mt-4 max-w-3xl text-base text-slate-600 dark:text-slate-400 leading-[1.65]">
          {intro}
        </p>

        <ul className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="group flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E6FD9]/40 focus-visible:ring-offset-[3px]"
                >
                  <div className="flex items-start justify-between">
                    <span
                      className="w-11 h-11 rounded-xl bg-[#0A3A6B]/8 dark:bg-[#9ED0F9]/12 text-[#0A3A6B] dark:text-[#9ED0F9] flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <Icon size={20} strokeWidth={1.75} />
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.22em] font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]">
                      {s.code}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-lg font-medium tracking-tight text-slate-900 dark:text-white leading-snug">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                    {s.body}
                  </p>
                  <div className="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800/60 flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                      {s.meta}
                    </span>
                    <ArrowUpRight
                      size={13}
                      className="text-slate-400 group-hover:text-[#0A3A6B] dark:group-hover:text-[#9ED0F9] motion-safe:transition-colors flex-shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
