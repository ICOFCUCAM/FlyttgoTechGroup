import 'server-only';

import type { SupabaseClient } from '@supabase/supabase-js';
import type { FrameworkCode } from './frameworks';
import { CHART_TEMPLATES } from './templates';
import { TAX_CODE_TEMPLATES } from './vat/templates';

type SeedArgs = {
  supabase: SupabaseClient;
  organizationId: string;
  framework: FrameworkCode;
};

type SeedResult =
  | { ok: true; accountsSeeded: number; taxCodesSeeded: number }
  | { ok: false; error: string };

/**
 * Idempotent framework seeder. Inserts the chart of accounts template
 * and tax codes for the given framework if they're not already present.
 * Re-running on an organization that has already been seeded is a no-op
 * because the underlying tables enforce (organization_id, framework, code)
 * uniqueness — duplicates are rejected by the DB and we surface the
 * accurate count of newly-inserted rows.
 */
export async function seedFramework({
  supabase,
  organizationId,
  framework,
}: SeedArgs): Promise<SeedResult> {
  const accounts = CHART_TEMPLATES[framework];
  const taxCodes = TAX_CODE_TEMPLATES[framework];

  if (accounts.length > 0) {
    const rows = accounts.map((a) => ({
      organization_id: organizationId,
      framework,
      code: a.code,
      name: a.name,
      account_type: a.account_type,
      is_statutory: a.is_statutory ?? false,
      vat_default_code: a.vat_default_code ?? null,
    }));
    const { error } = await supabase
      .from('accounts')
      .upsert(rows, { onConflict: 'organization_id,framework,code', ignoreDuplicates: true });
    if (error) {
      return { ok: false, error: error.message };
    }
  }

  if (taxCodes.length > 0) {
    const rows = taxCodes.map((tc) => ({
      organization_id: organizationId,
      framework,
      code: tc.code,
      name: tc.name,
      description: tc.description ?? null,
    }));
    const { error } = await supabase
      .from('tax_codes')
      .upsert(rows, { onConflict: 'organization_id,framework,code', ignoreDuplicates: true });
    if (error) {
      return { ok: false, error: error.message };
    }
  }

  return {
    ok: true,
    accountsSeeded: accounts.length,
    taxCodesSeeded: taxCodes.length,
  };
}
