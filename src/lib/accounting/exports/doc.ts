/**
 * Word-compatible HTML rendering. Microsoft Word opens an .htm/.html
 * payload served as application/msword and renders it as a Word
 * document — preserving tables, basic styling and headings. The brief
 * specifies "Word-compatible HTML rendering" rather than a true .docx
 * binary, which avoids the OOXML-builder dependency.
 */

import { escapeHtml } from './html';
import { footerForHtml, type FooterMeta } from './footer';

export type DocSection = {
  heading: string;
  rows: Array<Array<string | number | null | undefined>>;
  columnHeaders: string[];
  totals?: Array<string | number | null | undefined>;
};

export function renderWordDoc(opts: {
  title: string;
  subtitle?: string;
  generatedAt: string;
  sections: DocSection[];
  /** Phase 34 — appends the regulator-compatibility footer metadata. */
  footer?: FooterMeta;
}): string {
  const sections = opts.sections
    .map((s) => {
      const headers = s.columnHeaders.map((h) => `<th>${escapeHtml(h)}</th>`).join('');
      const rows = s.rows
        .map(
          (row) =>
            `<tr>${row
              .map((c) => `<td>${escapeHtml(c == null ? '' : String(c))}</td>`)
              .join('')}</tr>`,
        )
        .join('');
      const totals = s.totals
        ? `<tfoot><tr>${s.totals
            .map((c) => `<td><strong>${escapeHtml(c == null ? '' : String(c))}</strong></td>`)
            .join('')}</tr></tfoot>`
        : '';
      return `
        <h2>${escapeHtml(s.heading)}</h2>
        <table border="1" cellspacing="0" cellpadding="6" style="border-collapse:collapse;width:100%;font-family:Calibri,Arial,sans-serif;font-size:11pt;">
          <thead><tr>${headers}</tr></thead>
          <tbody>${rows}</tbody>
          ${totals}
        </table>
      `;
    })
    .join('');

  return `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8" />
  <meta name="ProgId" content="Word.Document" />
  <meta name="Generator" content="FlyttGo accounting workspace" />
  <title>${escapeHtml(opts.title)}</title>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
    </w:WordDocument>
  </xml>
  <style>
    body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; color: #0F172A; margin: 24pt; }
    h1   { font-family: Cambria, Georgia, serif; font-size: 18pt; margin: 0 0 4pt 0; }
    h2   { font-family: Cambria, Georgia, serif; font-size: 13pt; margin: 18pt 0 6pt 0; }
    .meta{ font-family: Consolas, monospace; font-size: 9pt; color: #475569; letter-spacing: 1px; text-transform: uppercase; }
    table{ page-break-inside: auto; }
    tr   { page-break-inside: avoid; page-break-after: auto; }
    th   { background: #F1F5F9; text-align: left; }
  </style>
</head>
<body>
  <h1>${escapeHtml(opts.title)}</h1>
  ${opts.subtitle ? `<div class="meta">${escapeHtml(opts.subtitle)}</div>` : ''}
  <div class="meta">Generated ${escapeHtml(opts.generatedAt)} · FlyttGo accounting</div>
  ${sections}
  ${opts.footer ? footerForHtml(opts.footer) : ''}
</body>
</html>`;
}
