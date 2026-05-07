import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/status/feed
 *
 * Returns the latest event per service from public.status_latest. The
 * /status page reads from this endpoint server-side at request time so
 * the page stays current without requiring a build.
 *
 * Falls back to the canonical synthetic baseline when Supabase is
 * unreachable. Both paths return the same wire shape.
 */

type StatusEvent = {
  service_code:    string;
  service_name:    string;
  status:          'operational' | 'degraded' | 'partial-outage' | 'major-outage' | 'maintenance';
  region:          string;
  uptime_pct:      number;
  p99_latency_ms:  number;
  recorded_at:     string;
};

const BASELINE: StatusEvent[] = [
  { service_code: 'ST.PL.01', service_name: 'Transify — Mobility API',         status: 'operational', region: 'EU',     uptime_pct: 99.998, p99_latency_ms: 184, recorded_at: new Date().toISOString() },
  { service_code: 'ST.PL.02', service_name: 'Workverge — Workforce API',       status: 'operational', region: 'EU',     uptime_pct: 99.992, p99_latency_ms: 211, recorded_at: new Date().toISOString() },
  { service_code: 'ST.PL.03', service_name: 'Civitas — Government Services',   status: 'operational', region: 'EU',     uptime_pct: 99.989, p99_latency_ms: 192, recorded_at: new Date().toISOString() },
  { service_code: 'ST.PL.04', service_name: 'EduPro — Education API',          status: 'operational', region: 'EU',     uptime_pct: 99.999, p99_latency_ms: 167, recorded_at: new Date().toISOString() },
  { service_code: 'ST.PL.05', service_name: 'Identra — Identity & Auth',       status: 'operational', region: 'EU',     uptime_pct: 99.991, p99_latency_ms: 142, recorded_at: new Date().toISOString() },
  { service_code: 'ST.PL.06', service_name: 'Payvera — Payment Orchestration', status: 'operational', region: 'EU',     uptime_pct: 99.985, p99_latency_ms: 248, recorded_at: new Date().toISOString() },
  { service_code: 'ST.PL.07', service_name: 'Ledgera — Financial Ops',         status: 'operational', region: 'EU',     uptime_pct: 99.997, p99_latency_ms: 178, recorded_at: new Date().toISOString() },
  { service_code: 'ST.PL.08', service_name: 'FlyttGo Marketplace',             status: 'operational', region: 'EU',     uptime_pct: 99.993, p99_latency_ms: 198, recorded_at: new Date().toISOString() },
  { service_code: 'ST.RG.EU', service_name: 'Regional ingress — EU',           status: 'operational', region: 'EU',     uptime_pct: 99.999, p99_latency_ms:  84, recorded_at: new Date().toISOString() },
  { service_code: 'ST.RG.AF', service_name: 'Regional ingress — Africa',       status: 'operational', region: 'Africa', uptime_pct: 99.987, p99_latency_ms: 124, recorded_at: new Date().toISOString() },
  { service_code: 'ST.RG.MN', service_name: 'Regional ingress — MENA',         status: 'operational', region: 'MENA',   uptime_pct: 99.995, p99_latency_ms:  97, recorded_at: new Date().toISOString() },
  { service_code: 'ST.DV.01', service_name: 'Developer portal',                 status: 'operational', region: 'global', uptime_pct: 99.999, p99_latency_ms:  72, recorded_at: new Date().toISOString() },
];

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from('status_latest')
      .select('service_code, service_name, status, region, uptime_pct, p99_latency_ms, recorded_at')
      .order('service_code', { ascending: true });
    if (error) throw new Error(error.message);
    if (!data || data.length === 0) {
      return NextResponse.json({ backend: 'baseline', events: BASELINE });
    }
    return NextResponse.json({ backend: 'supabase', events: data });
  } catch {
    return NextResponse.json({ backend: 'baseline', events: BASELINE });
  }
}
