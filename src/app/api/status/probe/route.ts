import { NextResponse, type NextRequest } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/status/probe — external uptime monitor → status_events insert.
 *
 * UptimeRobot / Better Stack / Pingdom configure a webhook on every check.
 * The probe authenticates with `Authorization: Bearer ${STATUS_PROBE_TOKEN}`
 * and posts a single status_events row.
 *
 * Body schema:
 *
 *   {
 *     service_code:    string,   // ST.PL.01 ... ST.DV.01
 *     service_name:    string,
 *     status:          'operational' | 'degraded' | 'partial-outage' | 'major-outage' | 'maintenance',
 *     region:          'EU' | 'MENA' | 'Africa' | 'NA' | 'APAC' | 'global',
 *     uptime_pct:      number,    // 0..100
 *     p99_latency_ms:  number,
 *   }
 *
 * Without STATUS_PROBE_TOKEN configured, returns 503 — the route exists
 * but the probe gate is closed.
 */

type ProbeBody = {
  service_code:    string;
  service_name:    string;
  status:          'operational' | 'degraded' | 'partial-outage' | 'major-outage' | 'maintenance';
  region:          'EU' | 'MENA' | 'Africa' | 'NA' | 'APAC' | 'global';
  uptime_pct:      number;
  p99_latency_ms:  number;
};

const VALID_STATUS = new Set(['operational', 'degraded', 'partial-outage', 'major-outage', 'maintenance']);
const VALID_REGION = new Set(['EU', 'MENA', 'Africa', 'NA', 'APAC', 'global']);

export async function POST(req: NextRequest) {
  const expected = process.env.STATUS_PROBE_TOKEN;
  if (!expected) {
    return NextResponse.json({ error: 'probe gate closed: STATUS_PROBE_TOKEN unset' }, { status: 503 });
  }

  const auth = req.headers.get('authorization') ?? '';
  if (!auth.startsWith('Bearer ') || auth.slice('Bearer '.length).trim() !== expected) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  let body: ProbeBody;
  try {
    body = (await req.json()) as ProbeBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (typeof body.service_code !== 'string' || body.service_code.length < 3) {
    return NextResponse.json({ error: 'service_code required' }, { status: 400 });
  }
  if (!VALID_STATUS.has(body.status)) {
    return NextResponse.json({ error: 'status invalid' }, { status: 400 });
  }
  if (!VALID_REGION.has(body.region)) {
    return NextResponse.json({ error: 'region invalid' }, { status: 400 });
  }

  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase
      .from('status_events')
      .insert({
        service_code:    body.service_code,
        service_name:    body.service_name,
        status:          body.status,
        region:          body.region,
        uptime_pct:      Math.max(0, Math.min(100, Number(body.uptime_pct))),
        p99_latency_ms:  Math.max(0, Math.floor(Number(body.p99_latency_ms))),
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({
      error: err instanceof Error ? err.message : 'insert failed',
    }, { status: 500 });
  }
}
