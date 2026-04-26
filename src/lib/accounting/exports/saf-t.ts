import 'server-only';

import type { SupabaseClient } from '@supabase/supabase-js';
import { XML_PROLOG, el, group, renderXml, type XmlNode } from './xml';

/**
 * Norway SAF-T Financial XML generator.
 *
 * Targets the Skatteetaten "SAF-T Financial Data — Technical
 * Description" v1.30 schema shape. The element ordering and naming
 * follow the OECD SAF-T 2.0 standard that Skatteetaten profiles.
 *
 * Disclaimer: this generator produces a structurally-conformant
 * document, but no SAF-T file is "ready to file" without:
 *   - Standard Account ID mapping reviewed for the chart in use
 *   - Customer/Supplier master records with valid orgnr / CountryCode
 *   - Taxonomy review against the current published Skatteetaten XSD
 * Treat the output as a starting point for accountant review prior
 * to upload via Altinn.
 */

export type SafTRange = { from: string; to: string };

export type SafTHeader = {
  organization_name: string;
  organization_id: string;
  registration_number: string | null;
  vat_number: string | null;
  base_currency: string;
  fiscal_year_start_month: number;
  generated_by_email: string;
};

type AccountRow = { code: string; name: string; account_type: string };
type LineRow = {
  id: string;
  entry_id: string;
  line_number: number;
  side: 'debit' | 'credit';
  amount: number;
  currency: string;
  exchange_rate: number;
  amount_base_currency: number;
  description: string | null;
  account: { code: string; name: string } | null;
};
type EntryRow = {
  id: string;
  entry_number: number;
  entry_date: string;
  description: string | null;
  posted_at: string | null;
  journal_lines: LineRow[];
};
type TaxCodeRow = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  vat_rates: Array<{ rate_percent: number; effective_from: string; effective_to: string | null; reverse_charge: boolean }>;
};

function n2(value: number): string {
  return (Math.round(value * 100) / 100).toFixed(2);
}

function num(n: number | null | undefined): number {
  return Number(n ?? 0);
}

export async function buildSaftXml(
  supabase: SupabaseClient,
  organizationId: string,
  range: SafTRange,
  header: SafTHeader,
): Promise<string> {
  // ---- 1) MasterFiles · GeneralLedgerAccounts -----------------------
  const { data: accountsRaw } = await supabase
    .from('accounts')
    .select('code, name, account_type, is_statutory, is_active')
    .eq('organization_id', organizationId)
    .order('code');
  const accounts = (accountsRaw ?? []) as AccountRow[];

  // ---- 2) MasterFiles · TaxTable ------------------------------------
  const { data: taxCodesRaw } = await supabase
    .from('tax_codes')
    .select('id, code, name, description, vat_rates(rate_percent, effective_from, effective_to, reverse_charge)')
    .eq('organization_id', organizationId)
    .order('code');
  const taxCodes = (taxCodesRaw ?? []) as unknown as TaxCodeRow[];

  // ---- 3) GeneralLedgerEntries · Journal/Transaction ----------------
  const { data: entriesRaw } = await supabase
    .from('journal_entries')
    .select(`
      id, entry_number, entry_date, description, posted_at,
      journal_lines(
        id, entry_id, line_number, side, amount, currency, exchange_rate, amount_base_currency, description,
        account:accounts(code, name)
      )
    `)
    .eq('organization_id', organizationId)
    .eq('status', 'posted')
    .gte('entry_date', range.from)
    .lte('entry_date', range.to)
    .order('entry_date')
    .order('entry_number');
  const entries = (entriesRaw ?? []) as unknown as EntryRow[];

  // ---- 4) Header ----------------------------------------------------
  // The SoftwareCompanyName / SoftwareID / SoftwareVersion elements
  // here are the SAF-T-native location for the regulator-compatibility
  // metadata (Phase 34 footer equivalent). No separate footer block
  // is added to the XML — the OECD schema doesn't recognize one and
  // any non-schema element risks rejection at upload time.
  const now = new Date();
  const headerNode = group('Header', [
    el('AuditFileVersion', '1.30'),
    el('AuditFileCountry', 'NO'),
    el('AuditFileDateCreated', now.toISOString().slice(0, 10)),
    el('SoftwareCompanyName', 'FlyttGo Technologies Group'),
    el('SoftwareID', 'FlyttGo Financial Control System'),
    el('SoftwareVersion', '1.0.0'),
    group('Company', [
      el('RegistrationNumber', header.registration_number ?? ''),
      el('Name', header.organization_name),
      header.vat_number
        ? el('TaxRegistrationNumber', header.vat_number)
        : { tag: 'TaxRegistrationNumber', text: '' },
    ]),
    el('DefaultCurrencyCode', header.base_currency),
    group('SelectionCriteria', [
      el('SelectionStartDate', range.from),
      el('SelectionEndDate', range.to),
    ]),
  ]);

  // ---- 5) MasterFiles ----------------------------------------------
  const accountNodes: XmlNode[] = accounts.map((a) =>
    group('Account', [
      el('AccountID', a.code),
      el('AccountDescription', a.name),
      el('StandardAccountID', a.code),
      el('AccountType', mapAccountTypeForSaft(a.account_type)),
      el('OpeningDebitBalance', '0.00'),
      el('OpeningCreditBalance', '0.00'),
    ]),
  );

  const taxNodes: XmlNode[] = taxCodes.map((tc) => {
    const active =
      tc.vat_rates.find((r) => r.effective_from <= range.from && (r.effective_to === null || r.effective_to >= range.to)) ??
      tc.vat_rates[0];
    return group('TaxCodeDetails', [
      el('TaxCode', tc.code),
      el('Description', tc.name),
      el('TaxPercentage', n2(num(active?.rate_percent))),
      el('Country', 'NO'),
    ]);
  });

  const masterFiles = group('MasterFiles', [
    group('GeneralLedgerAccounts', accountNodes),
    // Customers / Suppliers — empty containers; integrators populate
    // when the platform's CRM/AP module wires up.
    group('Customers', []),
    group('Suppliers', []),
    group('TaxTable', [
      group('TaxTableEntry', [
        el('TaxType', 'MVA'),
        el('Description', 'Norwegian VAT (Merverdiavgift)'),
        ...taxNodes,
      ]),
    ]),
  ]);

  // ---- 6) GeneralLedgerEntries -------------------------------------
  const totalDebit = entries.reduce(
    (sum, e) => sum + e.journal_lines.filter((l) => l.side === 'debit').reduce((s, l) => s + num(l.amount_base_currency), 0),
    0,
  );
  const totalCredit = entries.reduce(
    (sum, e) => sum + e.journal_lines.filter((l) => l.side === 'credit').reduce((s, l) => s + num(l.amount_base_currency), 0),
    0,
  );

  const transactionNodes: XmlNode[] = entries.map((e) => {
    const lineNodes: XmlNode[] = (e.journal_lines ?? [])
      .sort((a, b) => a.line_number - b.line_number)
      .map((l) =>
        group(l.side === 'debit' ? 'DebitLine' : 'CreditLine', [
          el('RecordID', `${e.entry_number}-${l.line_number}`),
          el('AccountID', l.account?.code ?? ''),
          el('Description', (l.description ?? e.description) ?? ''),
          el('Amount', n2(num(l.amount_base_currency))),
          ...(l.currency !== header.base_currency
            ? [
                group('CurrencyCode', [el('Currency', l.currency)]),
                el('CurrencyAmount', n2(num(l.amount))),
                el('ExchangeRate', String(num(l.exchange_rate))),
              ]
            : []),
        ]),
      );
    return group('Transaction', [
      el('TransactionID', String(e.entry_number)),
      el('Period', String(new Date(e.entry_date).getUTCMonth() + 1)),
      el('PeriodYear', String(new Date(e.entry_date).getUTCFullYear())),
      el('TransactionDate', e.entry_date),
      el('SourceID', header.generated_by_email),
      el('Description', e.description ?? ''),
      el('SystemEntryDate', (e.posted_at ?? new Date().toISOString()).slice(0, 10)),
      el('GLPostingDate', e.entry_date),
      ...lineNodes,
    ]);
  });

  const generalLedger = group('GeneralLedgerEntries', [
    el('NumberOfEntries', String(entries.length)),
    el('TotalDebit', n2(totalDebit)),
    el('TotalCredit', n2(totalCredit)),
    group('Journal', [
      el('JournalID', 'GENERAL'),
      el('Description', 'General journal'),
      el('Type', 'GL'),
      ...transactionNodes,
    ]),
  ]);

  // ---- 7) Root document --------------------------------------------
  const root = group(
    'AuditFile',
    [headerNode, masterFiles, generalLedger],
    {
      xmlns: 'urn:StandardAuditFile-Taxation-Financial:NO',
    },
  );

  return `${XML_PROLOG}\n${renderXml(root)}\n`;
}

function mapAccountTypeForSaft(t: string): string {
  switch (t) {
    case 'asset': return 'A';
    case 'liability': return 'L';
    case 'equity': return 'E';
    case 'revenue': return 'I'; // Income
    case 'expense': return 'X'; // eXpense
    case 'contra': return 'A';  // Contra accounts default to Asset side per OECD
    default: return 'A';
  }
}
