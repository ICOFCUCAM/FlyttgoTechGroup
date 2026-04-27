'use client';

import React, { useMemo, useState } from 'react';
import { Trash2, Plus, FileDown, Sparkles } from 'lucide-react';

/**
 * Ledgera in-browser sandbox.
 *
 * Mirrors the production /accounting/journal/new composer at a
 * miniature scale: account picker, side, amount, currency, exchange
 * rate, with a live debit/credit balance bar and a SAF-T XML preview
 * rendered from the lines — all client-side, no backend round-trip.
 *
 * Not a WASM-compiled core (yet) but the user-facing promise is the
 * same: try the platform without signup, your data never leaves the
 * device. The disclosure makes that explicit.
 */

type Line = {
  account: string;
  side: 'debit' | 'credit';
  amount: string;
  currency: string;
  rate: string;
  description: string;
};

const SAMPLE_ACCOUNTS = [
  { code: '1500', name: 'Kundefordringer (AR)' },
  { code: '1920', name: 'Bankinnskudd' },
  { code: '2400', name: 'Leverandørgjeld (AP)' },
  { code: '2700', name: 'Utgående MVA 25%' },
  { code: '2710', name: 'Inngående MVA 25%' },
  { code: '3000', name: 'Salgsinntekt avgiftspliktig' },
  { code: '6300', name: 'Leie lokaler' },
  { code: '6700', name: 'Fremmed tjeneste' },
  { code: '7770', name: 'Bankgebyrer' },
];

const PRESETS: Record<string, Line[]> = {
  invoice_sale: [
    { account: '1500', side: 'debit', amount: '12500', currency: 'NOK', rate: '1', description: 'Sale to customer' },
    { account: '3000', side: 'credit', amount: '10000', currency: 'NOK', rate: '1', description: 'Net sales' },
    { account: '2700', side: 'credit', amount: '2500', currency: 'NOK', rate: '1', description: 'VAT 25%' },
  ],
  rent_payment: [
    { account: '6300', side: 'debit', amount: '20000', currency: 'NOK', rate: '1', description: 'Q1 rent' },
    { account: '2710', side: 'debit', amount: '5000', currency: 'NOK', rate: '1', description: 'Input VAT' },
    { account: '1920', side: 'credit', amount: '25000', currency: 'NOK', rate: '1', description: 'From bank' },
  ],
  fx_purchase: [
    { account: '6700', side: 'debit', amount: '500', currency: 'EUR', rate: '11.85', description: 'EU subcontractor' },
    { account: '2710', side: 'debit', amount: '125', currency: 'EUR', rate: '11.85', description: 'VAT' },
    { account: '2400', side: 'credit', amount: '7406.25', currency: 'NOK', rate: '1', description: 'AP in NOK' },
  ],
};

const blankLine = (): Line => ({
  account: '',
  side: 'debit',
  amount: '',
  currency: 'NOK',
  rate: '1',
  description: '',
});

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function n2(n: number): string {
  return (Math.round(n * 100) / 100).toFixed(2);
}

export default function LedgeraTryItNow() {
  const [entryDate, setEntryDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState('Sample posting');
  const [lines, setLines] = useState<Line[]>(PRESETS.invoice_sale);

  const totals = useMemo(() => {
    let debits = 0;
    let credits = 0;
    for (const l of lines) {
      const base = (Number(l.amount) || 0) * (Number(l.rate) || 1);
      if (l.side === 'debit') debits += base;
      else credits += base;
    }
    debits = Math.round(debits * 100) / 100;
    credits = Math.round(credits * 100) / 100;
    return {
      debits,
      credits,
      delta: Math.round((debits - credits) * 100) / 100,
      balanced: debits === credits && debits > 0,
    };
  }, [lines]);

  const safTPreview = useMemo(() => {
    const txDate = entryDate;
    const period = String(new Date(txDate).getUTCMonth() + 1);
    const year = String(new Date(txDate).getUTCFullYear());
    const lineXml = lines
      .filter((l) => l.account && l.amount)
      .map((l, i) => {
        const base = (Number(l.amount) || 0) * (Number(l.rate) || 1);
        const tag = l.side === 'debit' ? 'DebitLine' : 'CreditLine';
        return `      <${tag}>
        <RecordID>1-${i + 1}</RecordID>
        <AccountID>${escapeXml(l.account)}</AccountID>
        <Description>${escapeXml(l.description || description)}</Description>
        <Amount>${n2(base)}</Amount>${
          l.currency !== 'NOK'
            ? `
        <CurrencyCode><Currency>${escapeXml(l.currency)}</Currency></CurrencyCode>
        <CurrencyAmount>${n2(Number(l.amount) || 0)}</CurrencyAmount>
        <ExchangeRate>${escapeXml(l.rate)}</ExchangeRate>`
            : ''
        }
      </${tag}>`;
      })
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<AuditFile xmlns="urn:StandardAuditFile-Taxation-Financial:NO">
  <Header>
    <AuditFileVersion>1.30</AuditFileVersion>
    <AuditFileCountry>NO</AuditFileCountry>
    <SoftwareCompanyName>FlyttGo Technologies Group</SoftwareCompanyName>
    <SoftwareID>FlyttGo Financial Control System (browser sandbox)</SoftwareID>
    <DefaultCurrencyCode>NOK</DefaultCurrencyCode>
  </Header>
  <GeneralLedgerEntries>
    <NumberOfEntries>1</NumberOfEntries>
    <TotalDebit>${n2(totals.debits)}</TotalDebit>
    <TotalCredit>${n2(totals.credits)}</TotalCredit>
    <Journal>
      <JournalID>SANDBOX</JournalID>
      <Type>GL</Type>
      <Transaction>
        <TransactionID>1</TransactionID>
        <Period>${period}</Period>
        <PeriodYear>${year}</PeriodYear>
        <TransactionDate>${escapeXml(txDate)}</TransactionDate>
        <Description>${escapeXml(description)}</Description>
${lineXml}
      </Transaction>
    </Journal>
  </GeneralLedgerEntries>
</AuditFile>`;
  }, [lines, entryDate, description, totals]);

  function setLine(i: number, patch: Partial<Line>) {
    setLines((prev) => prev.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));
  }
  function add() {
    setLines((prev) => [...prev, blankLine()]);
  }
  function remove(i: number) {
    setLines((prev) => prev.filter((_, idx) => idx !== i));
  }
  function loadPreset(key: keyof typeof PRESETS) {
    setLines(PRESETS[key].map((l) => ({ ...l })));
  }
  function downloadXml() {
    const blob = new Blob([safTPreview], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `saf_t_sandbox_${entryDate}.xml`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-8">
      {/* Disclosure banner */}
      <div className="p-4 rounded-2xl border border-emerald-300/60 bg-emerald-50/60 dark:bg-emerald-900/15">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-400 font-semibold inline-flex items-center gap-2">
          <Sparkles size={11} aria-hidden="true" />
          Sandbox mode — runs entirely in your browser
        </div>
        <p className="mt-1 text-[12px] text-emerald-800 dark:text-emerald-200 leading-snug">
          No signup. No backend. No data uploaded. Edit the sample
          lines, change the preset, generate the SAF-T XML — every byte
          stays on this device.
        </p>
      </div>

      {/* Preset picker */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 mr-1">
          Sample postings:
        </span>
        {[
          { key: 'invoice_sale', label: 'Customer invoice' },
          { key: 'rent_payment', label: 'Rent payment' },
          { key: 'fx_purchase', label: 'FX purchase' },
        ].map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => loadPreset(p.key as keyof typeof PRESETS)}
            className="px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-900"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
            Entry date
          </label>
          <input
            type="date"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
            className="mt-2 w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm tabular-nums"
          />
        </div>
        <div>
          <label className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
          />
        </div>
      </div>

      {/* Lines */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
            Lines · double-entry
          </span>
          <button
            type="button"
            onClick={add}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-900"
          >
            <Plus size={12} /> Add line
          </button>
        </div>
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/60 overflow-hidden">
          <table className="w-full text-sm tabular-nums">
            <thead className="bg-slate-50 dark:bg-slate-900/60 text-left">
              <tr className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                <th className="px-3 py-2.5">Account</th>
                <th className="px-3 py-2.5 w-24">Side</th>
                <th className="px-3 py-2.5 w-32 text-right">Amount</th>
                <th className="px-3 py-2.5 w-24">Curr.</th>
                <th className="px-3 py-2.5 w-24 text-right">Rate</th>
                <th className="px-3 py-2.5">Memo</th>
                <th className="px-3 py-2.5 w-12" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
              {lines.map((l, i) => (
                <tr key={i}>
                  <td className="px-2 py-1.5">
                    <select
                      value={l.account}
                      onChange={(e) => setLine(i, { account: e.target.value })}
                      className="w-full px-2 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-[13px] font-mono"
                    >
                      <option value="">— select —</option>
                      {SAMPLE_ACCOUNTS.map((a) => (
                        <option key={a.code} value={a.code}>
                          {a.code} · {a.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <select
                      value={l.side}
                      onChange={(e) => setLine(i, { side: e.target.value as 'debit' | 'credit' })}
                      className="w-full px-2 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-[13px] font-mono uppercase tracking-[0.14em]"
                    >
                      <option value="debit">Debit</option>
                      <option value="credit">Credit</option>
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      type="number"
                      step="0.01"
                      value={l.amount}
                      onChange={(e) => setLine(i, { amount: e.target.value })}
                      className="w-full text-right px-2 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-[13px] tabular-nums"
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <select
                      value={l.currency}
                      onChange={(e) => setLine(i, { currency: e.target.value })}
                      className="w-full px-2 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-[13px] font-mono uppercase"
                    >
                      <option value="NOK">NOK</option>
                      <option value="EUR">EUR</option>
                      <option value="USD">USD</option>
                      <option value="GBP">GBP</option>
                      <option value="SEK">SEK</option>
                    </select>
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      type="number"
                      step="0.0001"
                      value={l.rate}
                      onChange={(e) => setLine(i, { rate: e.target.value })}
                      disabled={l.currency === 'NOK'}
                      className="w-full text-right px-2 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-[13px] tabular-nums disabled:bg-slate-50 dark:disabled:bg-slate-900/50 disabled:text-slate-400"
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <input
                      type="text"
                      value={l.description}
                      onChange={(e) => setLine(i, { description: e.target.value })}
                      className="w-full px-2 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-[13px]"
                    />
                  </td>
                  <td className="px-2 py-1.5">
                    <button
                      type="button"
                      onClick={() => remove(i)}
                      disabled={lines.length <= 2}
                      className="p-1.5 rounded text-slate-400 hover:text-rose-600 disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Remove line"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Balance card */}
      <div className="grid sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/60">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Debits (NOK base)</div>
          <div className="mt-1 text-lg font-semibold tracking-tight tabular-nums">{n2(totals.debits)}</div>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Credits (NOK base)</div>
          <div className="mt-1 text-lg font-semibold tracking-tight tabular-nums">{n2(totals.credits)}</div>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Status</div>
          <div className={`mt-1 text-lg font-semibold tracking-tight tabular-nums ${totals.balanced ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
            {totals.balanced ? 'Balanced' : `Δ ${n2(totals.delta)}`}
          </div>
        </div>
      </div>

      {/* SAF-T preview */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
            <span className="text-[#0A3A6B] dark:text-[#9ED0F9] font-semibold">SAF-T.PREVIEW</span>
            <span className="mx-2 text-slate-300 dark:text-slate-700">·</span>
            Skatteetaten v1.30 / OECD 2.0
          </div>
          <button
            type="button"
            onClick={downloadXml}
            disabled={!totals.balanced}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0A3A6B] text-white text-xs font-semibold hover:bg-[#0A3A6B]/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileDown size={12} />
            Download XML
          </button>
        </div>
        <pre className="px-4 py-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-slate-900 text-[11px] leading-[1.55] font-mono whitespace-pre-wrap break-all text-slate-700 dark:text-slate-300 max-h-[400px] overflow-auto">
{safTPreview}
        </pre>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 leading-relaxed">
          Sandbox emits a structurally-conformant SAF-T fragment for
          inspection. Real Altinn submission requires the full
          MasterFiles + Customer/Supplier records + accounting-firm
          sign-off — see /accounting/exports.
        </p>
      </div>
    </div>
  );
}
