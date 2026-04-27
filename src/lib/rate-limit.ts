/**
 * Simple in-memory sliding-window rate limiter. Good enough for single-
 * instance deployments; in a multi-instance serverless environment each
 * instance tracks its own counters, so the effective limit is roughly
 * LIMIT × INSTANCE_COUNT. Swap for an Upstash / Redis backend when you
 * need global consistency (the public check/record interface below is
 * stable for that refactor).
 */

type Bucket = {
  // Sliding window of request timestamps (ms). Oldest first.
  hits: number[];
};

const store = new Map<string, Bucket>();

// Periodic cleanup — don't let the Map grow unbounded. Best-effort; in a
// serverless environment this runs on each invocation warm-path.
const CLEANUP_EVERY = 500;
let sinceCleanup = 0;

function cleanup(now: number, windowMs: number) {
  sinceCleanup = 0;
  for (const [key, bucket] of store) {
    bucket.hits = bucket.hits.filter((t) => now - t < windowMs);
    if (bucket.hits.length === 0) store.delete(key);
  }
}

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  resetAt: number;
};

/**
 * Check whether `key` (typically a client IP) has exceeded `limit`
 * requests within the given `windowMs`. Each call records one hit.
 * Returns { ok, remaining, resetAt } so the caller can emit headers.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
  now: number = Date.now(),
): RateLimitResult {
  if (++sinceCleanup >= CLEANUP_EVERY) cleanup(now, windowMs);

  let bucket = store.get(key);
  if (!bucket) {
    bucket = { hits: [] };
    store.set(key, bucket);
  }

  // Drop hits that fell out of the window.
  const cutoff = now - windowMs;
  while (bucket.hits.length > 0 && bucket.hits[0] <= cutoff) bucket.hits.shift();

  if (bucket.hits.length >= limit) {
    const resetAt = bucket.hits[0] + windowMs;
    return { ok: false, remaining: 0, resetAt };
  }

  bucket.hits.push(now);
  return {
    ok: true,
    remaining: Math.max(0, limit - bucket.hits.length),
    resetAt: now + windowMs,
  };
}

/**
 * Extract the best-effort client IP from the request headers. Returns
 * the first forwarded-for hop when present, otherwise falls back to
 * x-real-ip, cf-connecting-ip, or a synthetic "unknown" key (so calls
 * without any IP source still share one bucket).
 */
export function clientIp(headers: Headers): string {
  const xff = headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return (
    headers.get('x-real-ip') ??
    headers.get('cf-connecting-ip') ??
    headers.get('fly-client-ip') ??
    'unknown'
  );
}

/** Test helper — reset in-memory state between test runs. */
export function __resetRateLimitStore() {
  store.clear();
  sinceCleanup = 0;
}
