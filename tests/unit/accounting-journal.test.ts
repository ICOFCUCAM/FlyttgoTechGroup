import { describe, it, expect } from 'vitest';
import { lineTotals } from '@/lib/accounting/journal-schema';

describe('lineTotals', () => {
  it('returns balanced=true when debits equal credits in base currency', () => {
    const r = lineTotals([
      { account_id: 'a', side: 'debit', amount: 100, currency: 'NOK', exchange_rate: 1 },
      { account_id: 'b', side: 'credit', amount: 100, currency: 'NOK', exchange_rate: 1 },
    ]);
    expect(r.debits).toBe(100);
    expect(r.credits).toBe(100);
    expect(r.balanced).toBe(true);
  });

  it('uses exchange rate to convert into base currency before checking balance', () => {
    // 80 EUR @ 11.50 = 920 NOK debit · 920 NOK credit
    const r = lineTotals([
      { account_id: 'a', side: 'debit', amount: 80, currency: 'EUR', exchange_rate: 11.5 },
      { account_id: 'b', side: 'credit', amount: 920, currency: 'NOK', exchange_rate: 1 },
    ]);
    expect(r.balanced).toBe(true);
  });

  it('reports imbalanced when debits and credits differ', () => {
    const r = lineTotals([
      { account_id: 'a', side: 'debit', amount: 100, currency: 'NOK', exchange_rate: 1 },
      { account_id: 'b', side: 'credit', amount: 99.99, currency: 'NOK', exchange_rate: 1 },
    ]);
    expect(r.balanced).toBe(false);
  });

  it('rejects empty entries', () => {
    const r = lineTotals([]);
    expect(r.balanced).toBe(false);
  });
});
