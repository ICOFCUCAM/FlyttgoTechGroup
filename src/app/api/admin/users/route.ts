import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession } from '@/lib/auth/server';
import { getSupabaseServerClient } from '@/lib/supabase';
import { PLATFORM_ROLES, type PlatformRole } from '@/lib/auth/roles';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const inputSchema = z.object({
  email: z.string().trim().email().max(200),
  password: z.string().min(8).max(200),
  role: z.enum(PLATFORM_ROLES),
  full_name: z.string().trim().max(120).optional().or(z.literal('').transform(() => undefined)),
});

/**
 * What the caller may provision. Super-admins can mint anything
 * including other super_admins. Admins can mint accountant/auditor/
 * finance_viewer but never another admin or super_admin (privilege
 * escalation guard).
 */
function rolesGrantableBy(actor: PlatformRole): PlatformRole[] {
  if (actor === 'super_admin') {
    return ['super_admin', 'admin', 'accountant', 'auditor', 'finance_viewer'];
  }
  if (actor === 'admin') {
    return ['accountant', 'auditor', 'finance_viewer'];
  }
  return [];
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || !session.organizationId) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const grantable = rolesGrantableBy(session.role);
  if (grantable.length === 0) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
  const parsed = inputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Validation failed.',
        issues: parsed.error.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
      },
      { status: 422 },
    );
  }
  if (!grantable.includes(parsed.data.role)) {
    return NextResponse.json(
      { error: `Your role (${session.role}) cannot grant ${parsed.data.role}.` },
      { status: 403 },
    );
  }

  // Service-role client — needed for auth.admin.createUser and to bypass
  // the users_roles RLS policy when seeding the row from this server
  // route. Never expose to client code.
  const admin = getSupabaseServerClient();

  // 1) Create the auth user. email_confirm:true skips the verification
  //    email since this is admin-driven provisioning.
  const { data: created, error: createErr } = await admin.auth.admin.createUser({
    email: parsed.data.email,
    password: parsed.data.password,
    email_confirm: true,
    user_metadata: parsed.data.full_name
      ? { full_name: parsed.data.full_name }
      : undefined,
  });
  if (createErr || !created.user) {
    return NextResponse.json(
      { error: `Failed to create auth user: ${createErr?.message ?? 'unknown'}` },
      { status: 422 },
    );
  }

  // 2) Insert the role row scoped to the actor's organization. If this
  //    fails we delete the auth user so the system doesn't end up with
  //    a half-provisioned account (auth user with no role row would
  //    fall back to finance_viewer on next login, which is wrong).
  const { error: roleErr } = await admin.from('users_roles').insert({
    user_id: created.user.id,
    organization_id: session.organizationId,
    role: parsed.data.role,
  });
  if (roleErr) {
    await admin.auth.admin.deleteUser(created.user.id).catch(() => {});
    return NextResponse.json(
      { error: `Failed to assign role: ${roleErr.message}` },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      ok: true,
      user_id: created.user.id,
      email: created.user.email,
      role: parsed.data.role,
    },
    { status: 201 },
  );
}
