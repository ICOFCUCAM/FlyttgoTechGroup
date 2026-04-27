/**
 * Cloudflare Turnstile server-side verification. Env-gated via
 * `TURNSTILE_SECRET_KEY` — when unset, verification is a no-op that
 * returns `{ ok: true, configured: false }` so the contact route stays
 * usable in development without captcha.
 *
 * To enable in production:
 *   1. Create a Turnstile site in Cloudflare dashboard.
 *   2. Set TURNSTILE_SECRET_KEY (server) + NEXT_PUBLIC_TURNSTILE_SITE_KEY (client).
 *   3. Render the widget in the contact form; POST the token as
 *      `turnstile_token` in the request body.
 */

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export type TurnstileResult = {
  ok: boolean;
  configured: boolean;
  /** Present on failures; safe to surface to the client. */
  reason?: string;
};

export async function verifyTurnstile(
  token: string | undefined,
  remoteIp?: string,
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { ok: true, configured: false };

  if (!token) return { ok: false, configured: true, reason: 'missing_token' };

  try {
    const body = new URLSearchParams();
    body.set('secret', secret);
    body.set('response', token);
    if (remoteIp) body.set('remoteip', remoteIp);

    const res = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      // Short timeout — we don't want captcha verification to hang the request.
      signal: AbortSignal.timeout(5_000),
    });

    if (!res.ok) {
      return { ok: false, configured: true, reason: 'verify_unreachable' };
    }
    const json = (await res.json()) as { success: boolean; 'error-codes'?: string[] };
    if (!json.success) {
      return {
        ok: false,
        configured: true,
        reason: (json['error-codes'] ?? ['unknown']).join(','),
      };
    }
    return { ok: true, configured: true };
  } catch {
    return { ok: false, configured: true, reason: 'verify_exception' };
  }
}
