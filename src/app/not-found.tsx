import type { Metadata } from 'next';
import Link from '@/components/flytt/LocaleLink';
import { ArrowRight, ArrowUpRight, Home, Network } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

const quickLinks = [
  { label: 'Platform ecosystem', href: '/platforms' },
  { label: 'Deployment modes', href: '/deployment' },
  { label: 'Technology architecture', href: '/technology' },
  { label: 'Industries', href: '/industries' },
  { label: 'Contact', href: '/contact' },
];

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0A1F3D] text-white grid place-items-center px-6">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(1000px 500px at 20% 10%, rgba(30,111,217,0.55), transparent 60%),' +
            'radial-gradient(800px 400px at 80% 90%, rgba(15,181,166,0.25), transparent 60%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.8) 1px, transparent 1px),' +
            'linear-gradient(to bottom, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at center, black 25%, transparent 80%)',
        }}
      />

      <div className="relative max-w-xl w-full text-center">
        <p className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur border border-white/15 rounded-full text-[11px] font-semibold uppercase tracking-[0.2em]">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-300" aria-hidden="true" />
          Error 404 · Route not found
        </p>
        <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.08]">
          This route is not part of the{' '}
          <span className="text-[#9ED0F9]">platform ecosystem.</span>
        </h1>
        <p className="mt-5 text-base text-white/75 leading-relaxed">
          The page you were looking for may have moved, been renamed, or never existed.
          Use one of the routes below to continue.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0A3A6B] text-sm font-semibold rounded-lg hover:bg-slate-100 motion-safe:transition-all shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-[3px] focus-visible:ring-offset-[#0A1F3D]"
          >
            <Home size={15} aria-hidden="true" />
            Back to home
            <ArrowRight size={14} className="motion-safe:transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <Link
            href="/platforms"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold rounded-lg hover:bg-white/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-[3px] focus-visible:ring-offset-[#0A1F3D]"
          >
            <Network size={15} aria-hidden="true" />
            Browse platforms
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-semibold">
            Or continue to
          </p>
          <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group inline-flex items-center gap-1 text-sm text-white/80 hover:text-white motion-safe:transition-colors"
                >
                  {l.label}
                  <ArrowUpRight size={12} className="text-white/40 group-hover:text-white motion-safe:transition-colors" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
