import { z } from 'zod';

export const journalLineSchema = z.object({
  account_id: z.string().uuid(),
  side: z.enum(['debit', 'credit']),
  amount: z.coerce.number().positive().finite().max(1_000_000_000_000),
  currency: z.string().trim().length(3).toUpperCase(),
  exchange_rate: z.coerce.number().positive().finite().max(1_000_000).default(1),
  vat_code_id: z.string().uuid().optional().nullable(),
  vat_amount: z.coerce.number().nonnegative().finite().optional().nullable(),
  description: z.string().trim().max(400).optional().or(z.literal('').transform(() => undefined)),
});

export const journalEntrySchema = z.object({
  entry_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD.'),
  description: z.string().trim().max(2000).optional().or(z.literal('').transform(() => undefined)),
  lines: z.array(journalLineSchema).min(2, 'A journal entry needs at least two lines.'),
});

export type JournalLineInput = z.infer<typeof journalLineSchema>;
export type JournalEntryInput = z.infer<typeof journalEntrySchema>;

/**
 * Compute the base-currency totals for client-side balance preview. The
 * authoritative balance check runs in the database trigger
 * guard_balanced_journal_entry.
 */
export function lineTotals(lines: JournalLineInput[]) {
  let debit = 0;
  let credit = 0;
  for (const l of lines) {
    const base = l.amount * (l.exchange_rate || 1);
    if (l.side === 'debit') debit += base;
    else credit += base;
  }
  const debits = Math.round(debit * 10000) / 10000;
  const credits = Math.round(credit * 10000) / 10000;
  return { debits, credits, balanced: debits === credits && debits > 0 };
}
