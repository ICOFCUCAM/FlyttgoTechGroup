import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseServerClient } from '@/lib/supabase';
import { clientIp, rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// /api/estimates — receives a snapshot of the live pricing
// configurator (PR.00) and persists it into public.project_estimates
// for administrator retrieval. The configurator continues to work
// without persistence; this endpoint is for visitors who want their
// estimate logged inside FlyttGo's engagement-desk register.

const MAX_BODY_BYTES = 16 * 1024;
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const inputSchema = z.object({
  architecture_level: z.string().regex(/^L\.0[1-6]$/),
  selected_modules: z.array(z.string().regex(/^AO\.\d{2}$/)).max(20),
  deployment_model: z.string().regex(/^DM\.(0[1-3]|OR)$/),
  region: z.string().regex(/^RG\.[A-Z]{2}$/),
  pathway: z.union([z.string().regex(/^PA\.0[1-5]$/), z.literal(''), z.null()]).optional(),
  cost_estimate_low_usd: z.number().nonnegative().max(1e10),
  cost_estimate_high_usd: z.number().nonnegative().max(1e10),
  timeline_weeks_low: z.number().int().nonnegative().max(520),
  timeline_weeks_high: z.number().int().nonnegative().max(520),
  timeline_bucket: z.string().min(1).max(60),
  contact_email: z.string().trim().email().max(200).optional(),
  contact_name: z.string().trim().min(1).max(120).optional(),
  contact_org: z.string().trim().max(200).optional(),
});

function siteOrigin(): string | null {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) return null;
  try {
    return new URL(raw).origin;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const expected = siteOrigin();
  const origin = request.headers.get('origin');
  if (expected && origin && origin !== expected) {
    return NextResponse.json({ error: 'Origin not allowed.' }, { status: 403 });
  }

  const ip = clientIp(request.headers);
  const rl = rateLimit(`estimates:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS);
  if (!rl.ok) {
    const retryAfter = Math.max(1, Math.ceil((rl.resetAt - Date.now()) / 1000));
    return NextResponse.json(
      { error: 'Too many requests. Please wait a few minutes.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(retryAfter),
          'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.ceil(rl.resetAt / 1000)),
        },
      },
    );
  }

  const contentLength = request.headers.get('content-length');
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: 'Request body too large.' },
      { status: 413 },
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
    return NextResponse.json(
      { error: 'Invalid estimate payload.' },
      { status: 400 },
    );
  }
  const data = parsed.data;
  if (data.cost_estimate_high_usd < data.cost_estimate_low_usd) {
    return NextResponse.json(
      { error: 'Invalid cost band: high < low.' },
      { status: 400 },
    );
  }
  if (data.timeline_weeks_high < data.timeline_weeks_low) {
    return NextResponse.json(
      { error: 'Invalid timeline band: high < low.' },
      { status: 400 },
    );
  }

  let supabase;
  try {
    supabase = getSupabaseServerClient();
  } catch {
    return NextResponse.json(
      { error: 'Estimate persistence not configured on this environment.' },
      { status: 503 },
    );
  }

  const { data: row, error } = await supabase
    .from('project_estimates')
    .insert({
      architecture_level: data.architecture_level,
      selected_modules: data.selected_modules,
      deployment_model: data.deployment_model,
      region: data.region,
      pathway: data.pathway || null,
      cost_estimate_low_usd: data.cost_estimate_low_usd,
      cost_estimate_high_usd: data.cost_estimate_high_usd,
      timeline_weeks_low: data.timeline_weeks_low,
      timeline_weeks_high: data.timeline_weeks_high,
      timeline_bucket: data.timeline_bucket,
      contact_email: data.contact_email ?? null,
      contact_name: data.contact_name ?? null,
      contact_org: data.contact_org ?? null,
      source: 'pricing_configurator',
      client_ip: ip,
      user_agent: request.headers.get('user-agent')?.slice(0, 400) ?? null,
    })
    .select('id, created_at')
    .single();

  if (error || !row) {
    return NextResponse.json(
      { error: 'Could not persist estimate.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, id: row.id, created_at: row.created_at });
}
