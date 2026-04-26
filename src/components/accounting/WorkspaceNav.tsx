'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import type { PlatformRole } from '@/lib/auth/roles';

type Tab = {
  href: string;
  code: string;
  label: string;
  visibleTo: PlatformRole[];
};

const TABS: Tab[] = [
  { href: '/accounting', code: 'AC.01', label: 'Journal', visibleTo: ['super_admin', 'admin', 'accountant'] },
  { href: '/accounting/accounts', code: 'AC.02', label: 'Chart', visibleTo: ['super_admin', 'admin', 'accountant'] },
  { href: '/accounting/vat', code: 'AC.03', label: 'VAT center', visibleTo: ['super_admin', 'admin', 'accountant'] },
  { href: '/accounting/reports', code: 'AC.04', label: 'Reports', visibleTo: ['super_admin', 'admin', 'accountant'] },
  { href: '/accounting/exports', code: 'AC.07', label: 'Statutory exports', visibleTo: ['super_admin', 'admin', 'accountant'] },
  { href: '/accounting/profile', code: 'AC.08', label: 'Profile', visibleTo: ['super_admin', 'admin', 'accountant'] },
  { href: '/accounting/settings', code: 'AC.05', label: 'Settings', visibleTo: ['super_admin', 'admin', 'accountant'] },
  { href: '/audit', code: 'AU.01', label: 'Audit workspace', visibleTo: ['super_admin', 'admin', 'auditor'] },
  { href: '/audit/log', code: 'AU.02', label: 'Audit log', visibleTo: ['super_admin', 'admin', 'auditor'] },
  { href: '/audit/reports', code: 'AU.03', label: 'Reports', visibleTo: ['super_admin', 'admin', 'auditor'] },
  { href: '/audit/exports', code: 'AU.04', label: 'Export history', visibleTo: ['super_admin', 'admin', 'auditor'] },
  { href: '/audit/exports/statutory', code: 'AU.05', label: 'Statutory exports', visibleTo: ['super_admin', 'admin', 'auditor'] },
];

export default function WorkspaceNav({
  role,
  email,
  active,
}: {
  role: PlatformRole;
  email: string;
  active: 'accounting' | 'audit' | 'admin';
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, startSignOut] = useTransition();

  const visibleTabs = TABS.filter((t) => {
    if (active === 'accounting') return t.href.startsWith('/accounting') && t.visibleTo.includes(role);
    if (active === 'audit') return t.href.startsWith('/audit') && t.visibleTo.includes(role);
    // admin shell — both workspaces are visible
    return t.visibleTo.includes(role);
  });

  function signOut() {
    startSignOut(async () => {
      await fetch('/api/auth/sign-out', { method: 'POST' });
      // Reload the current URL — the layout will see no session and
      // re-render the inline sign-in form for this workspace.
      router.refresh();
    });
  }

  return (
    <header className="border-b border-slate-200/70 dark:border-slate-800/60 bg-white/80 dark:bg-slate-950/80 backdrop-blur sticky top-0 z-40 print:hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-14 flex items-center gap-6">
        <Link
          href={active === 'audit' ? '/audit' : '/accounting'}
          className="font-mono text-[11px] tracking-[0.22em] uppercase font-semibold text-[#0A3A6B] dark:text-[#9ED0F9]"
        >
          FlyttGo · {active === 'audit' ? 'AU' : 'AC'}
        </Link>

        <nav className="flex items-center gap-1 overflow-x-auto" aria-label="Workspace">
          {visibleTabs.map((t) => {
            const isActive = pathname === t.href || pathname.startsWith(`${t.href}/`);
            return (
              <Link
                key={t.href}
                href={t.href}
                className={`px-3 py-1.5 rounded-md font-mono text-[11px] tracking-[0.16em] uppercase motion-safe:transition-colors ${
                  isActive
                    ? 'bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold mr-2">
                  {t.code}
                </span>
                {t.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
          <span className="hidden md:inline">{role}</span>
          <span className="hidden md:inline text-slate-300 dark:text-slate-700">·</span>
          <span className="hidden md:inline truncate max-w-[200px]">{email}</span>
          <button
            type="button"
            onClick={signOut}
            disabled={signingOut}
            className="px-2 py-1 rounded border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900 disabled:opacity-50"
          >
            {signingOut ? 'Signing out…' : 'Sign out'}
          </button>
        </div>
      </div>
    </header>
  );
}
