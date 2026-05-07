import { NextResponse, type NextRequest } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/artefacts/log
 *
 * Persist an AI-generated artefact (CAIQ / RFP / proposal / answer) to
 * the ai_artefacts table with a SHA-256 content hash for C2PA-style
 * provenance. The /governance/ai/artefacts page reads the registry.
 *
 * Best-effort: if Supabase is unavailable, the route still computes the
 * hash and returns the artefact_code so the client UI can show it.
 */

type LogBody = {
  kind:    'caiq' | 'rfp' | 'proposal' | 'answer' | 'recommendation';
  output:  string;
  context?: Record<string, unknown>;
  model?:  string;
  workspaceToken?: string;  // optional binding to the originating sandbox
};

const generateArtefactCode = () => {
  const seg = Array.from({ length: 10 }, () =>
    'abcdefghjkmnpqrstuvwxyz23456789'[Math.floor(Math.random() * 31)],
  ).join('');
  return `art_${seg}`;
};

async function sha256Hex(text: string): Promise<string> {
  const enc = new TextEncoder();
  const buf = await crypto.subtle.digest('SHA-256', enc.encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function POST(req: NextRequest) {
  let body: LogBody;
  try {
    body = (await req.json()) as LogBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.kind || !['caiq', 'rfp', 'proposal', 'answer', 'recommendation'].includes(body.kind)) {
    return NextResponse.json({ error: 'kind must be caiq | rfp | proposal | answer | recommendation' }, { status: 400 });
  }
  if (typeof body.output !== 'string' || body.output.length < 16) {
    return NextResponse.json({ error: 'output too short to log' }, { status: 400 });
  }

  const artefactCode = generateArtefactCode();
  const sha          = await sha256Hex(body.output);

  // Resolve workspace_id if a sandbox token is supplied.
  let workspaceId: string | null = null;

  try {
    const supabase = getSupabaseServerClient();

    if (body.workspaceToken) {
      const { data } = await supabase
        .from('sandbox_workspaces')
        .select('id')
        .eq('token', body.workspaceToken)
        .maybeSingle();
      workspaceId = data?.id ?? null;
    }

    const { data, error } = await supabase
      .from('ai_artefacts')
      .insert({
        artefact_code: artefactCode,
        workspace_id:  workspaceId,
        artefact_kind: body.kind,
        context:       body.context ?? {},
        output_md:     body.output,
        output_sha256: sha,
        model:         body.model ?? 'synthetic',
      })
      .select('artefact_code, artefact_kind, output_sha256, generated_at, model')
      .single();

    if (error || !data) {
      throw new Error(error?.message ?? 'insert failed');
    }
    return NextResponse.json({
      backend: 'supabase',
      artefact: data,
    });
  } catch {
    // Synthetic fallback — the artefact still gets a hash and a code so
    // the UI can show provenance even when no DB is connected.
    return NextResponse.json({
      backend: 'synthetic',
      artefact: {
        artefact_code: artefactCode,
        artefact_kind: body.kind,
        output_sha256: sha,
        generated_at:  new Date().toISOString(),
        model:         body.model ?? 'synthetic',
      },
    });
  }
}
