'use client';

import { useEffect } from 'react';
import Link from '@/components/flytt/LocaleLink';
import { AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [error]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0A1F3D] text-white grid place-items-center px-6">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(900px 500px at 30% 20%, rgba(220,38,38,0.25), transparent 60%),' +
            'radial-gradient(900px 500px at 75% 80%, rgba(30,111,217,0.4), transparent 60%)',
        }}
      />
      <div className="relative max-w-xl w-full text-center">
        <p className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur border border-white/15 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em]">
          <AlertTriangle size={11} className="text-rose-300" aria-hidden="true" />
          Unexpected error
        </p>
        <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.08]">
          Something went wrong on this route.
        </h1>
        <p className="mt-5 text-base text-white/75 leading-relaxed">
          The platform recorded this incident. You can retry the request, or head back to
          the home page and continue from there.
        </p>
        {error.digest && (
          <p className="mt-4 text-xs font-mono text-white/40">
            Incident ID · {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0A3A6B] text-sm font-semibold rounded-lg hover:bg-slate-100 motion-safe:transition-all shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-[3px] focus-visible:ring-offset-[#0A1F3D]"
          >
            <RotateCcw size={15} aria-hidden="true" />
            Retry
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold rounded-lg hover:bg-white/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-[3px] focus-visible:ring-offset-[#0A1F3D]"
          >
            Back to home
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
}
