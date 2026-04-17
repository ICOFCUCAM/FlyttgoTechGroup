import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center bg-white text-slate-900 px-6">
      <div className="text-center max-w-md">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold">
          Error 404
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">
          This page could not be found.
        </h1>
        <p className="mt-4 text-slate-600 leading-relaxed">
          The resource you requested is unavailable. Return to the FlyttGo platform home.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-[#0A3A6B] text-white font-semibold rounded-lg hover:bg-[#0a2f57] transition-colors"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
