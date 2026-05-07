import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/artefacts/list
 *
 * Returns the most-recent 50 artefacts from ai_artefacts with redacted
 * context (removes the organisation + intent fields so the public
 * registry doesn't leak buyer-side identifiers — same posture the
 * customer programmes page takes).
 *
 * Falls back to an empty list when Supabase is unavailable so the page
 * still renders.
 */

const REDACT_KEYS = new Set(['organisation', 'org', 'email', 'intent']);

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from('ai_artefacts')
      .select('artefact_code, artefact_kind, context, output_sha256, model, generated_at')
      .order('generated_at', { ascending: false })
      .limit(50);

    if (error) throw new Error(error.message);

    const artefacts = (data ?? []).map((row) => {
      const ctx = (row.context ?? {}) as Record<string, unknown>;
      const redacted = Object.fromEntries(
        Object.entries(ctx).filter(([k]) => !REDACT_KEYS.has(k)),
      );
      return { ...row, context: redacted };
    });

    return NextResponse.json({ backend: 'supabase', artefacts });
  } catch {
    return NextResponse.json({ backend: 'synthetic', artefacts: [] });
  }
}
