/**
 * RFC-4180-conformant CSV serialization.
 *
 * Escapes commas, double-quotes, CR, LF, and leading equals/plus/at/minus
 * (the Excel formula-injection vector — prefix with a single quote so
 * the cell renders as text rather than executing).
 */

export type CsvCell = string | number | null | undefined;

const FORMULA_INJECTION_RE = /^[=+\-@\t\r]/;

function escapeCell(value: CsvCell): string {
  if (value === null || value === undefined) return '';
  const raw = typeof value === 'number' ? value.toString() : String(value);

  // Defuse Excel/LibreOffice formula injection. The leading apostrophe
  // is rendered as a string in spreadsheet apps and stripped on read.
  const safe = FORMULA_INJECTION_RE.test(raw) ? `'${raw}` : raw;

  if (/[",\r\n]/.test(safe)) {
    return `"${safe.replace(/"/g, '""')}"`;
  }
  return safe;
}

export function toCsv(headers: string[], rows: CsvCell[][]): string {
  const out: string[] = [];
  out.push(headers.map(escapeCell).join(','));
  for (const row of rows) {
    out.push(row.map(escapeCell).join(','));
  }
  // CRLF line endings — required by RFC-4180 and the format Excel
  // expects on Windows. UTF-8 BOM lets Excel auto-detect the encoding.
  return '﻿' + out.join('\r\n') + '\r\n';
}
