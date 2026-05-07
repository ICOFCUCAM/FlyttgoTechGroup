import { Info } from 'lucide-react';

/**
 * IndicativeNotice — page-level disclaimer surfaced on pages where the
 * content is reference-shaped or aspirational rather than live.
 *
 * Single component instead of ad-hoc copy on every page so the visual
 * treatment + tone stay consistent, and so flipping a future feature
 * from "indicative" to "live" is one component-removal per page.
 */

type Props = {
  /** Section index code for the notice itself, e.g. 'CS.IND'. */
  code: string;
  /** One-sentence honest description of what's indicative on this page. */
  body: string;
};

export default function IndicativeNotice({ code, body }: Props) {
  return (
    <section aria-label="Page indicative notice" className="bg-amber-50 dark:bg-amber-900/15 border-y border-amber-200/80 dark:border-amber-900/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex items-start gap-3">
        <Info size={14} className="text-amber-700 dark:text-amber-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
        <div className="flex items-baseline gap-3 flex-wrap min-w-0 flex-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-amber-800 dark:text-amber-300 flex-shrink-0">
            {code}
          </span>
          <span className="text-[12px] text-amber-900 dark:text-amber-200 leading-snug">
            {body}
          </span>
        </div>
      </div>
    </section>
  );
}
