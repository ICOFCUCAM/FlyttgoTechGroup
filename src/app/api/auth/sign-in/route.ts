import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { z } from 'zod';
import { defaultLandingPath, isPlatformRole } from '@/lib/auth/roles';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const inputSchema = z.object({
  email: z.string().trim().email().max(200),
  password: z.string().min(8).max(200),
});

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    return NextResponse.json(
      { error: 'Authentication is not configured on this environment.' },
      { status: 503 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = inputSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 400 });
  }

  const cookieStore = cookies();
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

  const { data, error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });
  if (error || !data.user) {
    return NextResponse.json(
      { error: 'Invalid credentials.' },
      { status: 401 },
    );
  }

  const { data: roleRow } = await supabase
    .from('users_roles')
    .select('role')
    .eq('user_id', data.user.id)
    .single();

  const role = isPlatformRole(roleRow?.role) ? roleRow!.role : 'finance_viewer';

  cookieStore.set({
    name: 'flyttgo_role',
    value: role,
    path: '/',
    sameSite: 'lax',
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 12,
  });

  return NextResponse.json(
    { ok: true, redirectTo: defaultLandingPath(role) },
    { status: 200 },
  );
}
