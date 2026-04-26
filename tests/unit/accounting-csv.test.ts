import { describe, it, expect } from 'vitest';
import { toCsv } from '@/lib/accounting/exports/csv';

describe('toCsv', () => {
  it('emits a UTF-8 BOM and CRLF line endings', () => {
    const out = toCsv(['a', 'b'], [['1', '2']]);
    expect(out.charCodeAt(0)).toBe(0xfeff);
    expect(out).toContain('\r\n');
  });

  it('quotes cells containing commas, quotes, and newlines', () => {
    const out = toCsv(['x'], [['hello, world'], ['she said "hi"'], ['line1\nline2']]);
    expect(out).toContain('"hello, world"');
    expect(out).toContain('"she said ""hi"""');
    expect(out).toContain('"line1\nline2"');
  });

  it('defuses Excel formula injection by prefixing with a single quote', () => {
    const out = toCsv(['v'], [['=1+1'], ['+SUM(1,1)'], ['-1+1'], ['@cmd|"/c calc"!A1']]);
    expect(out).toContain("'=1+1");
    expect(out).toContain("'+SUM(1,1)");
    expect(out).toContain("'-1+1");
    // The "@cmd…" line also contains a quote, so it gets fully RFC-quoted;
    // the leading apostrophe still neutralises Excel's formula parser.
    expect(out).toContain("'@cmd");
  });

  it('renders null/undefined as empty cells', () => {
    const out = toCsv(['a', 'b', 'c'], [[null, undefined, 'ok']]);
    expect(out).toContain(',,ok');
  });

  it('serialises numbers without quoting', () => {
    const out = toCsv(['n'], [[123.45]]);
    expect(out).toContain('123.45');
    expect(out).not.toContain('"123.45"');
  });
});
