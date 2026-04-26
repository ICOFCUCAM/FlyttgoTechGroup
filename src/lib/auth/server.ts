import 'server-only';

import { cache } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { type SupabaseClient } from '@supabase/supabase-js';
import {
  type PlatformRole,
  isPlatformRole,
  hasAtLeastRole,
  defaultLandingPath,
} from './roles';

/**
 * Build a cookie-bound Supabase client for use in Server Components,
 * Server Actions and Route Handlers. Each request gets its own client —
 * cookie reads/writes are scoped to that request via next/headers.
 */
export function getSupabaseAuthClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url) throw new Error('Missing env: NEXT_PUBLIC_SUPABASE_URL');
  if (!anonKey) throw new Error('Missing env: NEXT_PUBLIC_SUPABASE_ANON_KEY');

  const cookieStore = cookies();
  return createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          // Server Components cannot set cookies — only Actions/Routes can.
          // The auth flows that need to set cookies (sign-in, sign-out,
          // callback) all run inside Route Handlers or Server Actions.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options });
        } catch {
          /* see above */
        }
      },
    },
  });
}

export type AuthenticatedSession = {
  userId: string;
  email: string;
  role: PlatformRole;
  organizationId: string | null;
};

/**
 * Resolve the current session — user identity + platform role + the
 * organization they belong to. Cached for the lifetime of the request
 * so repeated calls inside the same render are free.
 */
export const getSession = cache(async (): Promise<AuthenticatedSession | null> => {
  const supabase = getSupabaseAuthClient();
  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userData.user) return null;

  const { data: roleRow, error: roleErr } = await supabase
    .from('users_roles')
    .select('role, organization_id')
    .eq('user_id', userData.user.id)
    .single();

  if (roleErr || !roleRow) {
    return {
      userId: userData.user.id,
      email: userData.user.email ?? '',
      role: 'finance_viewer',
      organizationId: null,
    };
  }

  const role: PlatformRole = isPlatformRole(roleRow.role) ? roleRow.role : 'finance_viewer';
  return {
    userId: userData.user.id,
    email: userData.user.email ?? '',
    role,
    organizationId: roleRow.organization_id ?? null,
  };
});

/**
 * Server-side guard. Use at the top of Server Components or Server
 * Actions that should only be reachable by an authorized role. On
 * mismatch the user is sent to /sign-in or to the role-appropriate
 * landing page so the deep link doesn't leak the route hierarchy.
 */
export async function requireRole(required: PlatformRole): Promise<AuthenticatedSession> {
  const session = await getSession();
  if (!session) {
    redirect('/sign-in');
  }
  if (!hasAtLeastRole(session.role, required)) {
    redirect(defaultLandingPath(session.role));
  }
  return session;
}
