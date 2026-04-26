import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/server';
import { defaultLandingPath } from '@/lib/auth/roles';
import SignInForm from './SignInForm';

export const metadata: Metadata = {
  title: 'Sign in — FlyttGo accounting',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function SignInPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  const session = await getSession();
  if (session) {
    redirect(searchParams?.next || defaultLandingPath(session.role));
  }

  return (
    <main
      id="main"
      className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center px-6 py-12"
    >
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase text-slate-400">
          <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">
            AU.00
          </span>
          <span aria-hidden="true" className="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/60" />
          <span>Authentication</span>
        </div>
        <h1 className="mt-6 font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-white leading-[1.05]">
          Sign in to{' '}
          <em className="not-italic font-serif italic font-normal text-[#0A3A6B] dark:text-[#9ED0F9]">
            the financial workspace.
          </em>
        </h1>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 leading-[1.65]">
          Accountants, auditors and platform administrators only. Sessions are
          scoped to the organization on the account record.
        </p>

        <div className="mt-8">
          <SignInForm next={searchParams?.next} />
        </div>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 leading-relaxed">
          Audit log retains every authentication attempt — successful or otherwise.
        </p>
      </div>
    </main>
  );
}
