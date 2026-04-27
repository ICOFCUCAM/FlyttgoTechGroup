import { describe, it, expect } from 'vitest';
import { platformList } from '@/data/platforms';
import { industrySectors } from '@/data/industries';
import { deploymentModes } from '@/data/deployment-modes';
import { insights } from '@/data/insights';

const unique = <T,>(values: T[]) => new Set(values).size === values.length;

describe('data/platforms', () => {
  it('has at least one platform', () => {
    expect(platformList.length).toBeGreaterThan(0);
  });

  it('every platform has required fields', () => {
    for (const p of platformList) {
      expect(p.slug, `platform ${p.slug} slug`).toMatch(/^[a-z][a-z0-9-]*$/);
      expect(p.name, `platform ${p.slug} name`).toBeTruthy();
      expect(p.subtitle, `platform ${p.slug} subtitle`).toBeTruthy();
      expect(p.color, `platform ${p.slug} color`).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });

  it('platform slugs are unique', () => {
    expect(unique(platformList.map((p) => p.slug))).toBe(true);
  });
});

describe('data/industries', () => {
  it('has at least one sector', () => {
    expect(industrySectors.length).toBeGreaterThan(0);
  });

  it('every sector has the expected shape', () => {
    for (const s of industrySectors) {
      expect(s.slug).toMatch(/^[a-z][a-z0-9-]*$/);
      expect(s.name).toBeTruthy();
      expect(s.headline).toBeTruthy();
      expect(s.description).toBeTruthy();
      expect(s.challenges.length).toBeGreaterThan(0);
      expect(s.outcomes.length).toBeGreaterThan(0);
      expect(s.platforms.length).toBeGreaterThan(0);
      expect(s.accent).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });

  it('sector slugs are unique', () => {
    expect(unique(industrySectors.map((s) => s.slug))).toBe(true);
  });

  it('every sector platform reference resolves to a real platform', () => {
    const validSlugs = new Set(platformList.map((p) => p.slug));
    for (const s of industrySectors) {
      for (const ref of s.platforms) {
        expect(
          validSlugs.has(ref),
          `industry "${s.slug}" references unknown platform "${ref}"`,
        ).toBe(true);
      }
    }
  });
});

describe('data/deployment-modes', () => {
  it('ships exactly the three canonical modes', () => {
    expect(deploymentModes.map((m) => m.slug).sort()).toEqual(
      ['customer-cloud', 'managed', 'sovereign'].sort(),
    );
  });

  it('every mode has the expected shape', () => {
    for (const m of deploymentModes) {
      expect(m.name).toBeTruthy();
      expect(m.headline).toBeTruthy();
      expect(m.characteristics.length).toBeGreaterThan(0);
      expect(m.bestFor.length).toBeGreaterThan(0);
      expect(m.timeline).toBeTruthy();
      expect(m.regions.length).toBeGreaterThan(0);
    }
  });
});

describe('data/insights', () => {
  it('has at least one insight', () => {
    expect(insights.length).toBeGreaterThan(0);
  });

  it('every insight has the expected shape', () => {
    for (const i of insights) {
      expect(i.slug).toMatch(/^[a-z][a-z0-9-]*$/);
      expect(i.title).toBeTruthy();
      expect(i.dek).toBeTruthy();
      expect(i.author).toBeTruthy();
      expect(i.readMinutes).toBeGreaterThan(0);
      expect(i.tags.length).toBeGreaterThan(0);
      expect(i.content.length).toBeGreaterThan(0);
      // publishedOn is a parseable ISO date
      expect(Number.isFinite(Date.parse(i.publishedOn))).toBe(true);
    }
  });

  it('insight slugs are unique', () => {
    expect(unique(insights.map((i) => i.slug))).toBe(true);
  });

  it('every content block uses a known type', () => {
    const allowed = new Set(['p', 'h2', 'h3', 'ul', 'quote', 'callout']);
    for (const i of insights) {
      for (const block of i.content) {
        expect(
          allowed.has(block.type),
          `insight ${i.slug} has unknown block type ${block.type}`,
        ).toBe(true);
      }
    }
  });
});
