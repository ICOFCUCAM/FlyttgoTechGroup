import { describe, it, expect, beforeEach } from 'vitest';
import {
  rateLimit,
  clientIp,
  __resetRateLimitStore,
} from '@/lib/rate-limit';

describe('rateLimit()', () => {
  beforeEach(() => __resetRateLimitStore());

  it('allows the first N requests and blocks the (N+1)th', () => {
    const KEY = 'test:ip';
    const LIMIT = 3;
    const WIN = 60_000;
    const now = 1_700_000_000_000;

    expect(rateLimit(KEY, LIMIT, WIN, now).ok).toBe(true);
    expect(rateLimit(KEY, LIMIT, WIN, now + 1).ok).toBe(true);
    expect(rateLimit(KEY, LIMIT, WIN, now + 2).ok).toBe(true);
    // 4th request inside the window is blocked
    const fourth = rateLimit(KEY, LIMIT, WIN, now + 3);
    expect(fourth.ok).toBe(false);
    expect(fourth.remaining).toBe(0);
    expect(fourth.resetAt).toBeGreaterThan(now);
  });

  it('reports decreasing remaining counts on successful requests', () => {
    const KEY = 'decreasing';
    const LIMIT = 5;
    const WIN = 10_000;
    const now = 1_700_000_000_000;

    expect(rateLimit(KEY, LIMIT, WIN, now).remaining).toBe(4);
    expect(rateLimit(KEY, LIMIT, WIN, now).remaining).toBe(3);
    expect(rateLimit(KEY, LIMIT, WIN, now).remaining).toBe(2);
    expect(rateLimit(KEY, LIMIT, WIN, now).remaining).toBe(1);
    expect(rateLimit(KEY, LIMIT, WIN, now).remaining).toBe(0);
    expect(rateLimit(KEY, LIMIT, WIN, now).ok).toBe(false);
  });

  it('drops requests that fall out of the sliding window', () => {
    const KEY = 'slide';
    const LIMIT = 2;
    const WIN = 1_000;
    const t0 = 1_700_000_000_000;

    rateLimit(KEY, LIMIT, WIN, t0);
    rateLimit(KEY, LIMIT, WIN, t0 + 100);
    expect(rateLimit(KEY, LIMIT, WIN, t0 + 200).ok).toBe(false);
    // Jump past the window — old hits drop off
    expect(rateLimit(KEY, LIMIT, WIN, t0 + 1_500).ok).toBe(true);
  });

  it('keys are independent (one IP exhausting does not block another)', () => {
    const LIMIT = 1;
    const WIN = 60_000;
    const now = 1_700_000_000_000;

    expect(rateLimit('a', LIMIT, WIN, now).ok).toBe(true);
    expect(rateLimit('a', LIMIT, WIN, now).ok).toBe(false);
    // Different IP — fresh bucket
    expect(rateLimit('b', LIMIT, WIN, now).ok).toBe(true);
  });
});

describe('clientIp()', () => {
  it('prefers the first hop of x-forwarded-for', () => {
    const h = new Headers({ 'x-forwarded-for': '1.2.3.4, 10.0.0.1, 172.16.0.1' });
    expect(clientIp(h)).toBe('1.2.3.4');
  });

  it('falls back to x-real-ip when XFF is absent', () => {
    const h = new Headers({ 'x-real-ip': '5.6.7.8' });
    expect(clientIp(h)).toBe('5.6.7.8');
  });

  it('falls back to cf-connecting-ip', () => {
    const h = new Headers({ 'cf-connecting-ip': '9.9.9.9' });
    expect(clientIp(h)).toBe('9.9.9.9');
  });

  it('returns "unknown" when no IP headers are present', () => {
    expect(clientIp(new Headers())).toBe('unknown');
  });

  it('trims whitespace from the XFF first hop', () => {
    const h = new Headers({ 'x-forwarded-for': '  1.2.3.4  , 10.0.0.1' });
    expect(clientIp(h)).toBe('1.2.3.4');
  });
});
