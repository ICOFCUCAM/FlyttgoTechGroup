import { describe, it, expect } from 'vitest';
import { industrySectors } from '@/data/industries';
import { localizeIndustry, INDUSTRY_I18N } from '@/data/industries.i18n';
import { deploymentModes } from '@/data/deployment-modes';
import {
  localizeDeploymentMode,
  DEPLOYMENT_MODE_I18N,
} from '@/data/deployment-modes.i18n';
import { platformList } from '@/data/platforms';
import { localizePlatform, PLATFORM_I18N } from '@/data/platforms.i18n';

describe('localizeIndustry', () => {
  it('returns the English default when no override is registered', () => {
    const gov = industrySectors.find((s) => s.slug === 'government')!;
    const localized = localizeIndustry(gov, 'SV');
    expect(localized.name).toBe(gov.name);
    expect(localized.challenges).toEqual(gov.challenges);
  });

  it('applies a Norwegian override when one exists', () => {
    const gov = industrySectors.find((s) => s.slug === 'government')!;
    const localized = localizeIndustry(gov, 'NO');
    expect(localized.name).not.toBe(gov.name);
    expect(localized.challenges.length).toBe(gov.challenges.length);
    // Preserves non-overridden fields
    expect(localized.icon).toBe(gov.icon);
    expect(localized.accent).toBe(gov.accent);
    expect(localized.platforms).toEqual(gov.platforms);
  });

  it('covers NO + FR for every industry sector', () => {
    for (const s of industrySectors) {
      expect(
        INDUSTRY_I18N[s.slug]?.NO,
        `industry "${s.slug}" missing NO override`,
      ).toBeDefined();
      expect(
        INDUSTRY_I18N[s.slug]?.FR,
        `industry "${s.slug}" missing FR override`,
      ).toBeDefined();
    }
  });

  it('NO + FR overrides keep challenges and outcomes the same length', () => {
    for (const s of industrySectors) {
      for (const locale of ['NO', 'FR'] as const) {
        const override = INDUSTRY_I18N[s.slug]![locale]!;
        expect(
          override.challenges?.length,
          `${s.slug} ${locale} challenges count`,
        ).toBe(s.challenges.length);
        expect(
          override.outcomes?.length,
          `${s.slug} ${locale} outcomes count`,
        ).toBe(s.outcomes.length);
      }
    }
  });
});

describe('localizePlatform', () => {
  it('returns the English default when no override is registered', () => {
    const transify = platformList.find((p) => p.slug === 'transify')!;
    const localized = localizePlatform(transify, 'SV');
    expect(localized.subtitle).toBe(transify.subtitle);
    expect(localized.tagline).toBe(transify.tagline);
    expect(localized.description).toBe(transify.description);
  });

  it('applies a Norwegian override when one exists', () => {
    const transify = platformList.find((p) => p.slug === 'transify')!;
    const localized = localizePlatform(transify, 'NO');
    expect(localized.subtitle).not.toBe(transify.subtitle);
    expect(localized.tagline).not.toBe(transify.tagline);
    // Non-overridden product fields preserved
    expect(localized.color).toBe(transify.color);
    expect(localized.modules).toBe(transify.modules);
    expect(localized.pricing).toBe(transify.pricing);
  });

  it('covers NO + FR for every platform', () => {
    for (const p of platformList) {
      expect(
        PLATFORM_I18N[p.slug]?.NO,
        `platform "${p.slug}" missing NO override`,
      ).toBeDefined();
      expect(
        PLATFORM_I18N[p.slug]?.FR,
        `platform "${p.slug}" missing FR override`,
      ).toBeDefined();
    }
  });

  it('NO + FR overrides include subtitle, tagline, and description', () => {
    for (const p of platformList) {
      for (const locale of ['NO', 'FR'] as const) {
        const override = PLATFORM_I18N[p.slug]![locale]!;
        expect(override.subtitle, `${p.slug} ${locale} subtitle`).toBeTruthy();
        expect(override.tagline, `${p.slug} ${locale} tagline`).toBeTruthy();
        expect(override.description, `${p.slug} ${locale} description`).toBeTruthy();
      }
    }
  });
});

describe('localizeDeploymentMode', () => {
  it('returns the English default when no override is registered', () => {
    const managed = deploymentModes.find((m) => m.slug === 'managed')!;
    const localized = localizeDeploymentMode(managed, 'SV');
    expect(localized.name).toBe(managed.name);
    expect(localized.characteristics).toEqual(managed.characteristics);
  });

  it('applies a French override when one exists', () => {
    const sov = deploymentModes.find((m) => m.slug === 'sovereign')!;
    const localized = localizeDeploymentMode(sov, 'FR');
    expect(localized.name).not.toBe(sov.name);
    expect(localized.characteristics.length).toBe(sov.characteristics.length);
    // Non-overridden fields preserved
    expect(localized.icon).toBe(sov.icon);
    expect(localized.accent).toBe(sov.accent);
  });

  it('covers NO + FR for every deployment mode', () => {
    for (const m of deploymentModes) {
      expect(
        DEPLOYMENT_MODE_I18N[m.slug]?.NO,
        `mode "${m.slug}" missing NO override`,
      ).toBeDefined();
      expect(
        DEPLOYMENT_MODE_I18N[m.slug]?.FR,
        `mode "${m.slug}" missing FR override`,
      ).toBeDefined();
    }
  });

  it('NO + FR overrides keep characteristics + bestFor + regions aligned', () => {
    for (const m of deploymentModes) {
      for (const locale of ['NO', 'FR'] as const) {
        const override = DEPLOYMENT_MODE_I18N[m.slug]![locale]!;
        expect(
          override.characteristics?.length,
          `${m.slug} ${locale} characteristics count`,
        ).toBe(m.characteristics.length);
        expect(
          override.bestFor?.length,
          `${m.slug} ${locale} bestFor count`,
        ).toBe(m.bestFor.length);
        expect(
          override.regions?.length,
          `${m.slug} ${locale} regions count`,
        ).toBeGreaterThan(0);
      }
    }
  });
});
