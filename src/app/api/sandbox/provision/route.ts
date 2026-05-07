import { NextResponse, type NextRequest } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/sandbox/provision
 *
 * Allocates a sandbox workspace + scoped token. Persists to the
 * sandbox_workspaces table when Supabase is configured; falls back to
 * returning a synthetic workspace shape otherwise so the marketing-site
 * sandbox flow keeps working in preview deployments.
 */

type ProvisionBody = {
  email:        string;
  organisation: string;
  jurisdiction: string;
  intent:       string;
  modules:      string[];
};

const TTL_MS = 7 * 24 * 60 * 60 * 1000;

const seg = (n: number) =>
  Array.from({ length: n }, () =>
    'abcdef0123456789'[Math.floor(Math.random() * 16)],
  ).join('');

const generateWorkspaceCode = () => `ws_${seg(8)}`;
const generateWorkspaceToken = () => `sk_sbx_${seg(8)}_${seg(24)}`;

function isJurisdictionValid(j: string): j is 'eu'|'uk'|'no'|'sa'|'ae'|'za'|'other' {
  return ['eu', 'uk', 'no', 'sa', 'ae', 'za', 'other'].includes(j);
}

export async function POST(req: NextRequest) {
  let body: ProvisionBody;
  try {
    body = (await req.json()) as ProvisionBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.email || !body.email.includes('@')) {
    return NextResponse.json({ error: 'email required' }, { status: 400 });
  }
  if (!body.organisation || body.organisation.length < 2) {
    return NextResponse.json({ error: 'organisation required' }, { status: 400 });
  }
  if (!isJurisdictionValid(body.jurisdiction)) {
    return NextResponse.json({ error: 'jurisdiction invalid' }, { status: 400 });
  }
  if (!Array.isArray(body.modules) || body.modules.length === 0) {
    return NextResponse.json({ error: 'modules required' }, { status: 400 });
  }

  const workspaceCode = generateWorkspaceCode();
  const token         = generateWorkspaceToken();
  const createdAt     = new Date();
  const expiresAt     = new Date(createdAt.getTime() + TTL_MS);

  const workspace = {
    workspace_code: workspaceCode,
    token,
    email:        body.email,
    organisation: body.organisation,
    jurisdiction: body.jurisdiction,
    intent:       body.intent ?? 'evaluate',
    modules:      body.modules.slice(0, 8),
    created_at:   createdAt.toISOString(),
    expires_at:   expiresAt.toISOString(),
    metadata:     { source: 'web-marketing' },
  };

  // Try the real Supabase path. If env / network unavailable, return a
  // synthetic-but-valid shape. Same wire format either way so the client
  // doesn't branch.
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from('sandbox_workspaces')
      .insert(workspace)
      .select('id, workspace_code, token, email, organisation, jurisdiction, intent, modules, created_at, expires_at')
      .single();

    if (error || !data) {
      throw new Error(error?.message ?? 'insert failed');
    }
    return NextResponse.json({
      backend: 'supabase',
      workspace: data,
    });
  } catch {
    // Synthetic fallback — same shape, no DB row.
    return NextResponse.json({
      backend: 'synthetic',
      workspace: {
        id:             null,
        workspace_code: workspace.workspace_code,
        token:          workspace.token,
        email:          workspace.email,
        organisation:   workspace.organisation,
        jurisdiction:   workspace.jurisdiction,
        intent:         workspace.intent,
        modules:        workspace.modules,
        created_at:     workspace.created_at,
        expires_at:     workspace.expires_at,
      },
    });
  }
}
