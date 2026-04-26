import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { z } from 'zod';
import { defaultLandingPath, isPlatformRole } from '@/lib/auth/roles';
import { logAuthEvent } from '@/lib/auth/audit-events';
import { clientIp, rateLimit } from '@/lib/rate-limit';

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

  // Rate-limit by IP — 8 attempts per 5 minutes is enough for a
  // typo-prone human, low enough to deter password-stuffing.
  const ip = clientIp(request.headers);
  const rl = rateLimit(`signin:${ip}`, 8, 5 * 60 * 1000);
  if (!rl.ok) {
    const retryAfter = Math.max(1, Math.ceil((rl.resetAt - Date.now()) / 1000));
    await logAuthEvent({
      event: 'sign_in_failed',
      organizationId: null,
      userId: null,
      details: { reason: 'rate_limited', ip },
    });
    return NextResponse.json(
      { error: 'Too many sign-in attempts. Please wait a few minutes.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(retryAfter),
          'X-RateLimit-Limit': '8',
          'X-RateLimit-Remaining': '0',
        },
      },
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
    await logAuthEvent({
      event: 'sign_in_failed',
      organizationId: null,
      userId: null,
      details: { email: parsed.data.email },
    });
    return NextResponse.json(
      { error: 'Invalid credentials.' },
      { status: 401 },
    );
  }

  const { data: roleRow } = await supabase
    .from('users_roles')
    .select('role, organization_id')
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

  await logAuthEvent({
    event: 'sign_in_succeeded',
    organizationId: roleRow?.organization_id ?? null,
    userId: data.user.id,
    details: { role },
  });

  return NextResponse.json(
    { ok: true, redirectTo: defaultLandingPath(role) },
    { status: 200 },
  );
}
