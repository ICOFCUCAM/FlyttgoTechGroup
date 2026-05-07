import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/health — top-level probe used by external uptime monitors
 * (UptimeRobot, Better Stack, Pingdom). Pings every dependency with a
 * fast, low-cost check and returns:
 *
 *   {
 *     ok: boolean,                         // overall: false if any required check failed
 *     ts: number,                           // server epoch ms
 *     checks: {
 *       app:      'ok',                    // the route ran
 *       supabase: 'ok' | 'down' | 'unconfigured',
 *       anthropic: 'configured' | 'unconfigured',
 *     }
 *   }
 *
 * Status code 200 if `ok` is true, 503 otherwise. Monitors that watch
 * status code as well as body get clear single-source-of-truth signal.
 *
 * Cache headers explicitly disable any caching so monitors always see
 * the live result.
 */

type Check = 'ok' | 'down' | 'unconfigured' | 'configured';

async function checkSupabase(): Promise<Check> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return 'unconfigured';
  }
  try {
    const supabase = getSupabaseServerClient();
    // Cheap probe — count(0) on a table that exists, with a tight limit.
    const { error } = await supabase
      .from('status_events')
      .select('id', { count: 'exact', head: true })
      .limit(1);
    if (error) return 'down';
    return 'ok';
  } catch {
    return 'down';
  }
}

function checkAnthropic(): Check {
  return process.env.ANTHROPIC_API_KEY ? 'configured' : 'unconfigured';
}

export async function GET() {
  const supabase = await checkSupabase();
  const anthropic = checkAnthropic();

  // App is required; supabase being 'unconfigured' is OK in dev (synthetic
  // fallback covers everything). 'down' is what trips the monitor.
  const ok = supabase !== 'down';

  return NextResponse.json(
    {
      ok,
      ts: Date.now(),
      checks: {
        app:       'ok',
        supabase,
        anthropic,
      },
    },
    {
      status: ok ? 200 : 503,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        'Content-Type':  'application/json; charset=utf-8',
      },
    },
  );
}
