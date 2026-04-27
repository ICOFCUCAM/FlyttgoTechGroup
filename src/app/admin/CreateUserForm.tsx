'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { PLATFORM_ROLES, type PlatformRole } from '@/lib/auth/roles';

type Props = {
  /** Roles the actor is allowed to grant — restricted at the API too. */
  grantableRoles: PlatformRole[];
};

const ROLE_DESCRIPTION: Record<PlatformRole, string> = {
  super_admin: 'Full platform access · cannot be revoked if last',
  admin: 'Manages members + workspace, no super-admin powers',
  accountant: 'Posts journals, manages chart, edits VAT',
  auditor: 'Read-only · annotations only · export access',
  finance_viewer: 'Read-only · no annotations · no export',
};

export default function CreateUserForm({ grantableRoles }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<PlatformRole>(grantableRoles[0] ?? 'accountant');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function generatePassword() {
    const bytes = new Uint8Array(12);
    crypto.getRandomValues(bytes);
    const alpha = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let out = '';
    for (const b of bytes) out += alpha[b % alpha.length];
    setPassword(out);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password,
          role,
          full_name: fullName.trim() || undefined,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string; email?: string; role?: string };
      if (!res.ok) {
        setError(json.error || 'Failed to create user.');
        return;
      }
      setSuccess(`Created ${json.email} as ${json.role}. Share the password with them — it is not shown again.`);
      setEmail('');
      setPassword('');
      setFullName('');
      router.refresh();
    });
  }

  return (
    <form
      onSubmit={submit}
      className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 space-y-4"
    >
      <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase">
        <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">AD.04</span>
        <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60 max-w-[200px]" />
        <span className="text-slate-400">Provision member</span>
      </div>
      <h3 className="text-base font-semibold tracking-tight">Create accountant or auditor account</h3>
      <p className="text-[12px] text-slate-500 dark:text-slate-500 leading-snug">
        Auth user is created in Supabase + the role row is written to
        users_roles in this organization. Email verification is skipped —
        the user can sign in immediately with the password you set here.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Email *">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@organization.tld"
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
          />
        </Field>
        <Field label="Full name">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Optional"
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
          />
        </Field>
      </div>

      <Field label="Password *">
        <div className="flex gap-2">
          <input
            type="text"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="≥ 8 characters"
            className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono tabular-nums"
          />
          <button
            type="button"
            onClick={generatePassword}
            className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Generate
          </button>
        </div>
      </Field>

      <Field label="Role *">
        <div className="grid sm:grid-cols-2 gap-2">
          {PLATFORM_ROLES.filter((r) => grantableRoles.includes(r)).map((r) => {
            const isSelected = role === r;
            return (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                aria-pressed={isSelected}
                className={`text-left p-3 rounded-lg border motion-safe:transition-colors ${
                  isSelected
                    ? 'border-[#0A3A6B] bg-[#0A3A6B]/5 dark:bg-[#9ED0F9]/10'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
                  {r}
                </div>
                <div className="mt-1 text-[12px] text-slate-600 dark:text-slate-400 leading-snug">
                  {ROLE_DESCRIPTION[r]}
                </div>
              </button>
            );
          })}
        </div>
      </Field>

      {error && (
        <p role="alert" className="text-sm text-rose-600 dark:text-rose-400 font-mono tracking-tight">
          {error}
        </p>
      )}
      {success && (
        <p role="status" className="text-sm text-emerald-700 dark:text-emerald-400 font-mono tracking-tight">
          {success}
        </p>
      )}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={pending || !email || !password}
          className="px-5 py-2.5 rounded-lg bg-[#0A3A6B] text-white text-sm font-semibold hover:bg-[#0A3A6B]/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? 'Provisioning…' : 'Create user'}
        </button>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
          Audit-logged · password is shared once
        </span>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
