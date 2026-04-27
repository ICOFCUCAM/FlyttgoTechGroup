import { describe, it, expect } from 'vitest';
import { formatAmount, formatDate } from '@/lib/accounting/frameworks';

describe('formatAmount', () => {
  it('formats Norwegian numbers with space thousands and comma decimal', () => {
    expect(formatAmount(1_250_000, 'NO')).toBe('1 250 000,00 NOK');
    expect(formatAmount(0.5, 'NO')).toBe('0,50 NOK');
    expect(formatAmount(-1234.56, 'NO')).toBe('-1 234,56 NOK');
  });

  it('formats UK numbers with comma thousands and dot decimal', () => {
    expect(formatAmount(1_250_000, 'UK')).toBe('1,250,000.00 GBP');
    expect(formatAmount(99.9, 'UK')).toBe('99.90 GBP');
  });

  it('formats US numbers with comma thousands and dot decimal', () => {
    expect(formatAmount(1_250_000, 'US')).toBe('1,250,000.00 USD');
    expect(formatAmount(-50, 'US')).toBe('-50.00 USD');
  });

  it('honours an explicit currency override', () => {
    expect(formatAmount(100, 'NO', { currency: 'EUR' })).toBe('100,00 EUR');
    expect(formatAmount(100, 'UK', { currency: 'USD' })).toBe('100.00 USD');
  });

  it('formats IFRS as space-comma matching the brief default', () => {
    expect(formatAmount(2500.5, 'IFRS')).toBe('2 500,50 EUR');
  });
});

describe('formatDate', () => {
  it('emits YYYY-MM-DD for NO', () => {
    expect(formatDate('2026-04-26', 'NO')).toBe('2026-04-26');
  });

  it('emits DD/MM/YYYY for UK', () => {
    expect(formatDate('2026-04-26', 'UK')).toBe('26/04/2026');
  });

  it('emits MM/DD/YYYY for US', () => {
    expect(formatDate('2026-04-26', 'US')).toBe('04/26/2026');
  });
});
