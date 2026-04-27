import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { logAuthEvent } from '@/lib/auth/audit-events';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const cookieStore = cookies();
  let userId: string | null = null;
  let organizationId: string | null = null;

  if (url && anonKey) {
    const supabase = createServerClient(url, anonKey, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    });
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      userId = data.user.id;
      const { data: roleRow } = await supabase
        .from('users_roles')
        .select('organization_id')
        .eq('user_id', userId)
        .maybeSingle();
      organizationId = roleRow?.organization_id ?? null;
    }
    await supabase.auth.signOut();
  }

  cookieStore.set({
    name: 'flyttgo_role',
    value: '',
    path: '/',
    maxAge: 0,
  });

  await logAuthEvent({
    event: 'sign_out',
    organizationId,
    userId,
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}
