import { NextResponse } from 'next/server';
import {
  consultationInputSchema,
  consultationTypeForPurpose,
} from '@/lib/consultation-schema';
import { getSupabaseServerClient } from '@/lib/supabase';
import { clientIp, rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 32 * 1024;
const RATE_LIMIT_MAX = 8;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

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
  const rl = rateLimit(`consult:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS);
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

  const parsed = consultationInputSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid consultation request.' },
      { status: 400 },
    );
  }
  const data = parsed.data;

  // Reject obviously past times. The DB has a soft check (>= created_at
  // - 1 hour) but UX is better when the API returns 400 explicitly.
  const requestedAt = new Date(data.requested_time);
  if (Number.isNaN(requestedAt.getTime()) || requestedAt.getTime() < Date.now() - 60 * 60 * 1000) {
    return NextResponse.json(
      { error: 'Requested time is in the past.' },
      { status: 400 },
    );
  }

  const consultationType = consultationTypeForPurpose(data.consultation_purpose);

  let supabase;
  try {
    supabase = getSupabaseServerClient();
  } catch {
    return NextResponse.json(
      { error: 'Consultation persistence not configured on this environment.' },
      { status: 503 },
    );
  }

  const { data: row, error } = await supabase
    .from('consultation_requests')
    .insert({
      organization_type:    data.organization_type,
      organization_name:    data.organization_name ?? null,
      consultation_purpose: data.consultation_purpose,
      consultation_type:    consultationType,
      deployment_region:    data.deployment_region,
      deployment_model:     data.deployment_model,
      architecture_level:   data.architecture_level,
      requested_time:       requestedAt.toISOString(),
      requested_timezone:   data.requested_timezone,
      contact_name:         data.contact_name,
      contact_email:        data.contact_email,
      contact_role:         data.contact_role ?? null,
      notes:                data.notes ?? null,
      status:               'requested',
      source:               'consultation_engine',
      client_ip:            ip,
      user_agent:           request.headers.get('user-agent')?.slice(0, 400) ?? null,
    })
    .select('id, created_at, consultation_type')
    .single();

  if (error || !row) {
    return NextResponse.json(
      { error: 'Could not persist consultation request.' },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    id: row.id,
    consultation_type: row.consultation_type,
    created_at: row.created_at,
  });
}
