'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  next?: string;
};

export default function SignInForm({ next }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        router.replace(next || json.redirectTo || '/');
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Network error.');
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
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
          className="mt-2 w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E6FD9]/40 focus:border-[#1E6FD9]"
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
          className="mt-2 w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E6FD9]/40 focus:border-[#1E6FD9]"
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
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
