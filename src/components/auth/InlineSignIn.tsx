'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
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
        // On success the page reloads. The layout then sees a valid
        // session and either renders the workspace or — when the
        // signed-in role is below this URL's requirement — redirects
        // the user to the URL that matches their role.
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Network error.');
      }
    });
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <BrandLogo variant="mark-secondary" height={36} />
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">{code}</span>
          <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60" />
          <span>{copy.eyebrow}</span>
        </div>

        <h1 className="mt-6 font-serif text-3xl md:text-4xl font-medium tracking-tight leading-[1.05]">
          Sign in to{' '}
          <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
            {workspaceLabel}.
          </em>
        </h1>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 leading-[1.65]">
          {copy.sub}
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
          <div>
            <label
              htmlFor="email"
              className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E6FD9]/40 focus:border-[#1E6FD9]"
              placeholder="name@organization.tld"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500"
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
              className="mt-2 w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E6FD9]/40 focus:border-[#1E6FD9]"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="text-sm text-rose-600 dark:text-rose-400 font-mono tracking-tight"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-[#0A3A6B] text-white text-sm font-semibold tracking-tight hover:bg-[#0A3A6B]/90 disabled:opacity-60 disabled:cursor-not-allowed motion-safe:transition-colors"
          >
            {pending ? 'Authenticating…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 leading-relaxed">
          Audit log retains every authentication attempt — successful or
          otherwise.
        </p>
      </div>
    </main>
  );
}
