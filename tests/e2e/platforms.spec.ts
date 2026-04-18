import { test, expect } from '@playwright/test';

test.describe('platform detail pages', () => {
  const platforms = [
    'transify',
    'workverge',
    'civitas',
    'edupro',
    'identra',
    'payvera',
    'ledgera',
    'flyttgo',
  ];

  for (const slug of platforms) {
    test(`/platforms/${slug} renders with breadcrumb + structured data`, async ({
      page,
    }) => {
      const response = await page.goto(`/platforms/${slug}`);
      expect(response?.status()).toBe(200);

      // Breadcrumb lists Home → Platforms → {slug name}
      const crumbs = page.getByRole('navigation', { name: /Breadcrumb/i });
      await expect(crumbs).toBeVisible();
      await expect(crumbs.getByRole('link', { name: /Home/i })).toBeVisible();
      await expect(crumbs.getByRole('link', { name: /Platforms/i })).toBeVisible();

      // SoftwareApplication JSON-LD is emitted
      const sa = page
        .locator('script[type="application/ld+json"]', {
          hasText: '"SoftwareApplication"',
        })
        .first();
      await expect(sa).toBeAttached();

      // BreadcrumbList JSON-LD is emitted
      const bc = page
        .locator('script[type="application/ld+json"]', {
          hasText: '"BreadcrumbList"',
        })
        .first();
      await expect(bc).toBeAttached();
    });
  }
});
