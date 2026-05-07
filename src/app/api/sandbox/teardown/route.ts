import { NextResponse, type NextRequest } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/sandbox/teardown { token }
 *
 * Marks the workspace torn-down. Idempotent — re-tearing-down a row is
 * a no-op. Returns 200 even if the row doesn't exist (the synthetic
 * client may never have hit Supabase) so the UI doesn't 404.
 */

export async function POST(req: NextRequest) {
  let body: { token?: string };
  try {
    body = (await req.json()) as { token?: string };
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const token = body.token?.trim();
  if (!token || !/^sk_sbx_[a-z0-9_]+$/i.test(token)) {
    return NextResponse.json({ error: 'token invalid' }, { status: 400 });
  }

  try {
    const supabase = getSupabaseServerClient();
    await supabase
      .from('sandbox_workspaces')
      .update({ torn_down_at: new Date().toISOString() })
      .eq('token', token)
      .is('torn_down_at', null);
    return NextResponse.json({ backend: 'supabase', torn_down: true });
  } catch {
    return NextResponse.json({ backend: 'synthetic', torn_down: true });
  }
}
