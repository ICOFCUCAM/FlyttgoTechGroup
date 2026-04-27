type Props = {
  code: string;
  eyebrow: string;
  title: string;
  description?: string;
  meta?: React.ReactNode;
};

export default function SectionHeader({
  code,
  eyebrow,
  title,
  description,
  meta,
}: Props) {
  return (
    <div className="border-b border-slate-200/70 dark:border-slate-800/60 pb-6">
      <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
        <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
          {code}
        </span>
        <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
        <span>{eyebrow}</span>
      </div>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
        <h1 className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.1]">
          {title}
        </h1>
        {meta && (
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
            {meta}
          </div>
        )}
      </div>
      {description && (
        <p className="mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-400 leading-[1.65]">
          {description}
        </p>
      )}
    </div>
  );
}
