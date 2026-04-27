import { describe, it, expect } from 'vitest';
import { pickAcceptLanguage } from '@/lib/i18n/accept-language';

describe('pickAcceptLanguage', () => {
  it('returns the default locale when the header is missing or empty', () => {
    expect(pickAcceptLanguage(null)).toBe('en');
    expect(pickAcceptLanguage('')).toBe('en');
  });

  it('picks English when the browser primarily speaks English', () => {
    expect(pickAcceptLanguage('en-US,en;q=0.9')).toBe('en');
  });

  it('picks Norwegian for nb / nn / no variants, quality-sorted', () => {
    expect(pickAcceptLanguage('nb-NO,nb;q=0.9,en;q=0.5')).toBe('no');
    expect(pickAcceptLanguage('nn;q=0.9,en-US;q=0.8')).toBe('no');
    expect(pickAcceptLanguage('no-NO,no;q=0.9')).toBe('no');
  });

  it('respects quality ordering when multiple supported locales are listed', () => {
    // German at 0.3, French at 0.9 — French wins.
    expect(
      pickAcceptLanguage('de-DE;q=0.3,fr-FR;q=0.9,en;q=0.1'),
    ).toBe('fr');
  });

  it('falls back to the default when no supported locale is present', () => {
    expect(pickAcceptLanguage('zh-CN,ja;q=0.9')).toBe('en');
  });

  it('strips region subtags before matching', () => {
    expect(pickAcceptLanguage('pt-BR')).toBe('pt');
    expect(pickAcceptLanguage('es-MX;q=0.9')).toBe('es');
    expect(pickAcceptLanguage('ar-SA')).toBe('ar');
  });

  it('handles malformed quality values without throwing', () => {
    expect(pickAcceptLanguage('fr;q=abc,en')).toBe('en');
  });
});
