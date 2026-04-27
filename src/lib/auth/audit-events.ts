import 'server-only';

import { getSupabaseServerClient } from '@/lib/supabase';

/**
 * Append a row to the audit log for a non-DML auth event. Uses the
 * service-role client so the write succeeds even when there is no
 * authenticated user yet (failed login, anonymous sign-in attempt).
 *
 * Failures are swallowed — auth flows must not break because the
 * audit-log write happened to fail. The catch logs to stderr so the
 * platform's log aggregator surfaces it.
 */
export async function logAuthEvent(opts: {
  event: 'sign_in_succeeded' | 'sign_in_failed' | 'sign_out' | 'session_refreshed';
  organizationId: string | null;
  userId: string | null;
  details?: Record<string, unknown>;
}): Promise<void> {
  try {
    const supabase = getSupabaseServerClient();
    await supabase.rpc('audit_log_event', {
      p_organization_id: opts.organizationId,
      p_action: opts.event,
      p_subject: 'auth',
      p_user_id: opts.userId,
      p_details: (opts.details ?? {}) as object,
    });
  } catch (err) {
    console.error('[audit] logAuthEvent failed', err);
  }
}
