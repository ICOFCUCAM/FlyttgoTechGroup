import { describe, it, expect } from 'vitest';
import { DICTIONARIES } from '@/lib/i18n/dictionaries';
import { LOCALES, DEFAULT_LOCALE } from '@/lib/i18n/locales';

const LOCALE_CODES = LOCALES.map((l) => l.code);

describe('i18n/locales', () => {
  it('default locale is English', () => {
    expect(DEFAULT_LOCALE).toBe('EN');
  });

  it('locale codes are unique and uppercase', () => {
    expect(new Set(LOCALE_CODES).size).toBe(LOCALE_CODES.length);
    for (const code of LOCALE_CODES) {
      expect(code).toBe(code.toUpperCase());
    }
  });

  it('Arabic is marked RTL', () => {
    const ar = LOCALES.find((l) => l.code === 'AR');
    expect(ar?.rtl).toBe(true);
  });
});

describe('i18n/dictionaries', () => {
  it('covers every declared locale', () => {
    for (const code of LOCALE_CODES) {
      expect(
        DICTIONARIES[code],
        `missing dictionary entry for locale ${code}`,
      ).toBeDefined();
    }
  });

  it('every dictionary value is a non-empty string', () => {
    for (const [code, dict] of Object.entries(DICTIONARIES)) {
      for (const [key, value] of Object.entries(dict)) {
        expect(
          typeof value === 'string' && value.length > 0,
          `${code}:${key} is not a non-empty string`,
        ).toBe(true);
      }
    }
  });

  it('English is the source of truth and contains the largest key set', () => {
    const enKeys = new Set(Object.keys(DICTIONARIES.EN));
    for (const [code, dict] of Object.entries(DICTIONARIES)) {
      if (code === 'EN') continue;
      // Other locales must not introduce keys the English dictionary lacks
      // — that would mean a key has no defined fallback.
      for (const key of Object.keys(dict)) {
        expect(
          enKeys.has(key),
          `locale ${code} has key "${key}" that is missing from English`,
        ).toBe(true);
      }
    }
  });

  it('critical surfaces are translated in every locale', () => {
    // These keys drive the most visible surfaces — nav + utility bar +
    // footer + hero — and must exist in every locale, not fall back.
    const CRITICAL_KEYS = [
      'utility.tagline',
      'nav.platforms',
      'nav.industries',
      'nav.deployment',
      'nav.technology',
      'nav.company',
      'nav.contact',
      'nav.cta.primary',
      'hero.title.part1',
      'hero.title.part2',
      'hero.cta.primary',
      'hero.cta.secondary',
      'footer.deploy',
      'footer.status',
    ];
    for (const [code, dict] of Object.entries(DICTIONARIES)) {
      for (const key of CRITICAL_KEYS) {
        expect(
          dict[key],
          `locale ${code} is missing critical key "${key}"`,
        ).toBeTruthy();
      }
    }
  });
});
