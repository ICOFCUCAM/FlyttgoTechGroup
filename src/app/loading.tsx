export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="relative min-h-[60vh] grid place-items-center bg-white dark:bg-slate-950"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12" aria-hidden="true">
          <span className="absolute inset-0 rounded-full border-2 border-slate-200 dark:border-slate-800" />
          <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#1E6FD9] motion-safe:animate-spin" />
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-500 font-semibold">
          Loading platform…
        </p>
      </div>
    </div>
  );
}
