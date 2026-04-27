'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ShieldCheck } from 'lucide-react';
import type { PlatformRole } from '@/lib/auth/roles';
import BrandLogo from '@/components/flytt/BrandLogo';

type Props = {
  /** Human-readable workspace label shown above the form. */
  workspaceLabel: string;
  /** Section index code displayed in the eyebrow rail. */
  code: string;
  /** Role this URL is meant for — used in copy and for the post-auth
   *  routing hint shown to the user. */
  requiredRole: PlatformRole;
};

const ROLE_COPY: Record<PlatformRole, { eyebrow: string; sub: string }> = {
  super_admin: {
    eyebrow: 'Super-admin entrance',
    sub: 'Full platform access. Audit log captures every authentication attempt — successful or otherwise.',
  },
  admin: {
    eyebrow: 'Admin entrance',
    sub: 'Workspace administration. Role assignment is immutable once granted; revocation requires a new admin action.',
  },
  accountant: {
    eyebrow: 'Accountant entrance',
    sub: 'Posts journals, edits chart of accounts and VAT center. Posting is final — corrections require reversing entries.',
  },
  auditor: {
    eyebrow: 'Auditor entrance',
    sub: 'Read-only inspection. Annotations are immutable. Every export emission is recorded to the registry.',
  },
  finance_viewer: {
    eyebrow: 'Finance viewer entrance',
    sub: 'Read-only access. No annotations, no exports.',
  },
};

export default function InlineSignIn({ workspaceLabel, code, requiredRole }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const copy = ROLE_COPY[requiredRole];

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        const res = await fetch('/api/auth/sign-in', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const json = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          redirectTo?: string;
          error?: string;
        };
        if (!res.ok || !json.ok) {
          setError(json.error || 'Sign-in failed.');
          return;
        }
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Network error.');
      }
    });
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F7FAFD] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center px-6 py-16">
      {/* Soft editorial background — same radial gradient family the
          home hero uses, dialed way down so it reads as institutional
          stationery, not marketing. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(900px 500px at 22% 12%, rgba(30,111,217,0.08), transparent 60%),' +
            'radial-gradient(800px 420px at 82% 88%, rgba(214,181,117,0.10), transparent 60%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #e2e8f0 1px, transparent 1px),' +
            'linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />

      <div className="relative w-full max-w-lg">
        {/* Big centered mark — the one trust-anchor moment on the
            entire route. Uses the FlyLogo glyph so the mark reads at
            a glance even on small screens. */}
        <div className="flex flex-col items-center text-center">
          <BrandLogo variant="mark" height={64} priority />
          <div className="mt-6 flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
            <span aria-hidden="true" className="h-px w-10 bg-slate-200 dark:bg-slate-800" />
            <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">{code}</span>
            <span aria-hidden="true" className="h-px w-10 bg-slate-200 dark:bg-slate-800" />
          </div>
          <p className="mt-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-500 dark:text-slate-500">
            {copy.eyebrow}
          </p>

          <h1 className="mt-5 font-serif text-3xl md:text-4xl font-medium tracking-tight leading-[1.05] text-slate-900 dark:text-white">
            Sign in to{' '}
            <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
              {workspaceLabel}.
            </em>
          </h1>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 leading-[1.65] max-w-md">
            {copy.sub}
          </p>
        </div>

        {/* Form card — bordered, soft-shadowed, reads as an enterprise
            auth surface (Stripe / Workday / 1Password tier), not a
            marketing form. */}
        <div className="mt-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 shadow-[0_1px_0_0_rgb(255_255_255/0.6)_inset,0_24px_60px_-30px_rgb(10_31_61/0.18)] dark:shadow-[0_24px_60px_-30px_rgb(0_0_0/0.6)] overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200/70 dark:border-slate-800/60 bg-slate-50/60 dark:bg-slate-900/40 flex items-center gap-2.5">
            <span
              className="w-7 h-7 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center"
              aria-hidden="true"
            >
              <Lock size={13} strokeWidth={1.75} className="text-[#0A3A6B] dark:text-[#9ED0F9]" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-semibold tracking-tight text-slate-900 dark:text-white">
                Authenticated workspace
              </div>
              <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-slate-500">
                TLS · session cookie · audit-logged
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="p-6 space-y-5" noValidate>
            <div>
              <label
                htmlFor="email"
                className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold"
              >
                Work email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm tracking-tight focus:outline-none focus:ring-2 focus:ring-[#1E6FD9]/40 focus:border-[#1E6FD9] motion-safe:transition-colors"
                placeholder="name@organization.tld"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-sm tracking-tight focus:outline-none focus:ring-2 focus:ring-[#1E6FD9]/40 focus:border-[#1E6FD9] motion-safe:transition-colors"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="px-3 py-2 rounded-md bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-sm text-rose-700 dark:text-rose-300 font-mono tracking-tight"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#0A3A6B] text-white text-sm font-semibold tracking-tight hover:bg-[#0A3A6B]/90 disabled:opacity-60 disabled:cursor-not-allowed motion-safe:transition-colors shadow-[0_1px_0_0_rgb(10_58_107/0.6),0_8px_24px_-12px_rgb(10_58_107/0.5)]"
            >
              {pending ? 'Authenticating…' : 'Sign in'}
            </button>
          </form>
        </div>

        {/* Trust signals + closing brand mark — the navbar lockup
            ("web page logo") so the entrance and the marketing surface
            speak the same brand. */}
        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
            <ShieldCheck size={11} strokeWidth={1.75} className="text-[#0FB5A6]" aria-hidden="true" />
            <span>Audit log retains every authentication attempt</span>
          </div>
          <BrandLogo variant="lockup" height={20} decorative className="opacity-70" />
        </div>
      </div>
    </main>
  );
}
