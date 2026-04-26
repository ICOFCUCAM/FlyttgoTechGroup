/**
 * Platform role hierarchy for the FlyttGo accounting subsystem.
 *
 * The order in this array reflects authority — index 0 is the highest.
 * Use {@link hasAtLeastRole} to compare without leaking integers into
 * call-sites. Role names mirror the Postgres `platform_role` enum
 * defined in the 0002 migration.
 */
export const PLATFORM_ROLES = [
  'super_admin',
  'admin',
  'accountant',
  'auditor',
  'finance_viewer',
] as const;

export type PlatformRole = (typeof PLATFORM_ROLES)[number];

const RANK: Record<PlatformRole, number> = {
  super_admin: 100,
  admin: 80,
  accountant: 60,
  auditor: 40,
  finance_viewer: 20,
};

export function isPlatformRole(value: unknown): value is PlatformRole {
  return typeof value === 'string' && (PLATFORM_ROLES as readonly string[]).includes(value);
}

export function hasAtLeastRole(actual: PlatformRole, required: PlatformRole): boolean {
  return RANK[actual] >= RANK[required];
}

/**
 * Whether a role is permitted to mutate accounting data. Auditors and
 * finance_viewers are read-only by policy; the `audit_log` trigger plus
 * RLS enforce this at the database layer too.
 */
export function isWriteRole(role: PlatformRole): boolean {
  return role === 'super_admin' || role === 'admin' || role === 'accountant';
}

/**
 * Default landing route for a freshly-authenticated session. Login
 * routing reads this to avoid hard-coded redirect logic in
 * `/sign-in` and the auth callback.
 */
export function defaultLandingPath(role: PlatformRole): string {
  switch (role) {
    case 'accountant':
      return '/accounting';
    case 'auditor':
      return '/audit';
    case 'finance_viewer':
      return '/audit';
    case 'admin':
    case 'super_admin':
    default:
      return '/admin';
  }
}

/**
 * Route prefixes that require authentication. The middleware enforces
 * role-based redirects against this list.
 */
export const PROTECTED_PREFIXES = ['/accounting', '/audit', '/admin'] as const;

export function requiredRoleForPath(pathname: string): PlatformRole | null {
  if (pathname === '/accounting' || pathname.startsWith('/accounting/')) {
    return 'accountant';
  }
  if (pathname === '/audit' || pathname.startsWith('/audit/')) {
    return 'auditor';
  }
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return 'admin';
  }
  return null;
}
