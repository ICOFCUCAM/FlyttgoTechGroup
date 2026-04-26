import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSession, getSupabaseAuthClient } from '@/lib/auth/server';
import { isWriteRole } from '@/lib/auth/roles';
import {
  journalEntrySchema,
  lineTotals,
} from '@/lib/accounting/journal-schema';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const requestSchema = z.object({
  intent: z.enum(['save_draft', 'post']),
  entry: journalEntrySchema,
});

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || !isWriteRole(session.role)) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  }
  if (!session.organizationId) {
    return NextResponse.json({ error: 'No organization assigned.' }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Validation failed.',
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join('.'),
          message: i.message,
        })),
      },
      { status: 422 },
    );
  }
  const { intent, entry } = parsed.data;

  // Client-side balance preview is informative; the real gate is
  // guard_balanced_journal_entry on the database. Reject early when we
  // can — saves a round trip on obvious mistakes.
  if (intent === 'post') {
    const totals = lineTotals(entry.lines);
    if (!totals.balanced) {
      return NextResponse.json(
        {
          error: `Entry must balance before posting. Debits ${totals.debits}, credits ${totals.credits}.`,
        },
        { status: 422 },
      );
    }
  }

  const supabase = getSupabaseAuthClient();

  const { data: header, error: headerErr } = await supabase
    .from('journal_entries')
    .insert({
      organization_id: session.organizationId,
      entry_date: entry.entry_date,
      description: entry.description ?? null,
      status: 'draft',
      created_by: session.userId,
    })
    .select('id, entry_number')
    .single();

  if (headerErr || !header) {
    return NextResponse.json(
      { error: `Failed to create entry: ${headerErr?.message ?? 'unknown'}` },
      { status: 500 },
    );
  }

  const lineRows = entry.lines.map((l, idx) => ({
    entry_id: header.id,
    organization_id: session.organizationId,
    line_number: idx + 1,
    account_id: l.account_id,
    side: l.side,
    amount: l.amount,
    currency: l.currency,
    exchange_rate: l.exchange_rate,
    vat_code_id: l.vat_code_id ?? null,
    vat_amount: l.vat_amount ?? null,
    description: l.description ?? null,
  }));

  const { error: linesErr } = await supabase.from('journal_lines').insert(lineRows);
  if (linesErr) {
    // Roll back the header — RLS lets the accountant delete their own
    // draft. The DB will refuse if the entry has somehow already been
    // posted, which is the desired safety net.
    await supabase.from('journal_entries').delete().eq('id', header.id);
    return NextResponse.json(
      { error: `Failed to write lines: ${linesErr.message}` },
      { status: 500 },
    );
  }

  if (intent === 'post') {
    const { error: postErr } = await supabase
      .from('journal_entries')
      .update({
        status: 'posted',
        posted_at: new Date().toISOString(),
        posted_by: session.userId,
      })
      .eq('id', header.id);

    if (postErr) {
      return NextResponse.json(
        { error: `Posting failed: ${postErr.message}` },
        { status: 422 },
      );
    }
  }

  return NextResponse.json(
    {
      ok: true,
      entry_id: header.id,
      entry_number: header.entry_number,
      status: intent === 'post' ? 'posted' : 'draft',
    },
    { status: 201 },
  );
}
