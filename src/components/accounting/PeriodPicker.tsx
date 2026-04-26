'use client';

type Props = {
  from: string;
  to: string;
  basePath: string;
  exportFormats?: Array<'csv' | 'doc' | 'pdf'>;
};

/**
 * Server-rendered period picker rendered as a plain HTML form. No
 * client JS required — the GET form rebuilds the URL with `from` and
 * `to` query params on submit. Export buttons link to the same path
 * with format=csv|doc|pdf.
 */
export default function PeriodPicker({ from, to, basePath, exportFormats = [] }: Props) {
  return (
    <div className="flex flex-wrap items-end gap-3 print:hidden">
      <form method="get" className="flex flex-wrap items-end gap-3">
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
            From
          </label>
          <input
            type="date"
            name="from"
            defaultValue={from}
            className="mt-1 px-2 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm tabular-nums"
          />
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
            To
          </label>
          <input
            type="date"
            name="to"
            defaultValue={to}
            className="mt-1 px-2 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm tabular-nums"
          />
        </div>
        <button
          type="submit"
          className="px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-900"
        >
          Apply
        </button>
      </form>
      {exportFormats.length > 0 && (
        <div className="flex items-center gap-2 ml-auto">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
            Export
          </span>
          {exportFormats.map((fmt) => (
            <a
              key={fmt}
              href={`${basePath}?from=${from}&to=${to}&format=${fmt}`}
              className="px-2.5 py-1 rounded-md border border-slate-300 dark:border-slate-700 font-mono text-[10px] uppercase tracking-[0.18em] hover:bg-slate-50 dark:hover:bg-slate-900"
            >
              {fmt.toUpperCase()}
            </a>
          ))}
          <button
            type="button"
            onClick={() => window.print()}
            className="px-2.5 py-1 rounded-md border border-slate-300 dark:border-slate-700 font-mono text-[10px] uppercase tracking-[0.18em] hover:bg-slate-50 dark:hover:bg-slate-900"
          >
            Print
          </button>
        </div>
      )}
    </div>
  );
}
