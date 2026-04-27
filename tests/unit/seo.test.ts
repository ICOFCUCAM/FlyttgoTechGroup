import { describe, it, expect } from 'vitest';
import { breadcrumbListLd } from '@/lib/seo/jsonld';

describe('breadcrumbListLd', () => {
  it('produces a valid schema.org BreadcrumbList payload', () => {
    const ld = breadcrumbListLd([
      { name: 'Home', href: '/' },
      { name: 'Insights', href: '/insights' },
      { name: 'Security posture' },
    ]);
    expect(ld['@context']).toBe('https://schema.org');
    expect(ld['@type']).toBe('BreadcrumbList');
    expect(ld.itemListElement).toHaveLength(3);
  });

  it('assigns sequential positions starting at 1', () => {
    const ld = breadcrumbListLd([
      { name: 'A', href: '/a' },
      { name: 'B', href: '/b' },
      { name: 'C' },
    ]);
    expect(ld.itemListElement.map((e) => e.position)).toEqual([1, 2, 3]);
  });

  it('omits item URL on the terminal crumb (current page)', () => {
    const ld = breadcrumbListLd([
      { name: 'Home', href: '/' },
      { name: 'Current' },
    ]);
    const terminal = ld.itemListElement[1] as { item?: string };
    expect(terminal.item).toBeUndefined();
  });

  it('prefixes item URLs with the site URL', () => {
    const ld = breadcrumbListLd([{ name: 'Home', href: '/' }]);
    const first = ld.itemListElement[0] as { item: string };
    expect(first.item).toMatch(/^https?:\/\/.+\/$/);
  });
});
