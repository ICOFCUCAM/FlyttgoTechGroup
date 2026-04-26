import { describe, it, expect } from 'vitest';
import { resolveExchangeRate } from '@/lib/accounting/fx';

/**
 * Multi-currency compliance — invariant tests.
 *
 * These don't hit a real Supabase; they exercise the priority-order
 * branches of resolveExchangeRate to lock in:
 *   - explicit override always wins
 *   - same-currency identity always succeeds without DB
 *   - cross-currency without a rate row → error (no silent 1.0)
 */

const fakeSupabase = (rows: Array<{ rate: number; rate_date: string }>) => ({
  from() {
    let onDate: string | null = null;
    return {
      select() { return this; },
      eq() { return this; },
      lte(_col: string, value: string) {
        onDate = value;
        return this;
      },
      order() { return this; },
      limit() { return this; },
      maybeSingle: async () => {
        const candidates = rows.filter((r) => onDate === null || r.rate_date <= onDate);
        candidates.sort((a, b) => (a.rate_date > b.rate_date ? -1 : 1));
        return { data: candidates[0] ?? null, error: null };
      },
    };
  },
});

describe('resolveExchangeRate', () => {
  it('returns the override when one is provided', async () => {
    const r = await resolveExchangeRate({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      supabase: fakeSupabase([]) as any,
      organizationId: 'org-1',
      fromCurrency: 'EUR',
      toCurrency: 'NOK',
      onDate: '2026-01-01',
      override: 11.85,
    });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.rate).toBe(11.85);
      expect(r.source).toBe('override');
    }
  });

  it('returns identity (1.0) when from === to', async () => {
    const r = await resolveExchangeRate({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      supabase: fakeSupabase([]) as any,
      organizationId: 'org-1',
      fromCurrency: 'NOK',
      toCurrency: 'NOK',
      onDate: '2026-01-01',
    });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.rate).toBe(1);
      expect(r.source).toBe('identity');
    }
  });

  it('errors when no rate is on file for the cross-currency pair', async () => {
    const r = await resolveExchangeRate({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      supabase: fakeSupabase([]) as any,
      organizationId: 'org-1',
      fromCurrency: 'EUR',
      toCurrency: 'NOK',
      onDate: '2026-01-01',
    });
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.error).toContain('EUR');
      expect(r.error).toContain('NOK');
    }
  });

  it('picks the latest rate at-or-before the entry date', async () => {
    const rows = [
      { rate: 11.5, rate_date: '2025-01-01' },
      { rate: 11.8, rate_date: '2025-06-01' },
      { rate: 12.0, rate_date: '2026-01-01' },
    ];
    const r = await resolveExchangeRate({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      supabase: fakeSupabase(rows) as any,
      organizationId: 'org-1',
      fromCurrency: 'EUR',
      toCurrency: 'NOK',
      onDate: '2025-09-01',
    });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.rate).toBe(11.8);
      expect(r.source).toBe('snapshot');
    }
  });
});
