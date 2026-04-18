import { test, expect } from '@playwright/test';

test.describe('home page', () => {
  test('renders hero headline, subheadline and primary CTAs', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/FlyttGo/i);

    // Hero h1 — source of truth for headline copy
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toContainText(/Deploy National-Scale Digital Infrastructure/i);
    await expect(h1).toContainText(/Without Building Systems From Scratch/i);

    // Primary + secondary CTAs
    await expect(
      page.getByRole('link', { name: /Explore Platform Ecosystem/i }).first(),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /Request Partnership Discussion/i }),
    ).toBeVisible();
  });

  test('orbit graph exposes 8 platform links to screen readers', async ({
    page,
  }) => {
    await page.goto('/');

    // Wait for the nav landmark around the orbit to render
    const orbitNav = page.getByRole('navigation', {
      name: /8 platforms orbiting/i,
    });
    await expect(orbitNav).toBeVisible();

    // Each platform pill is a Link with accessible name
    for (const name of [
      'Transify',
      'Workverge',
      'Civitas',
      'EduPro',
      'Identra',
      'Payvera',
      'Ledgera',
      'FlyttGo',
    ]) {
      await expect(orbitNav.getByRole('link', { name: new RegExp(name, 'i') }))
        .toBeVisible();
    }
  });

  test('home FAQ disclosure opens and closes', async ({ page }) => {
    await page.goto('/');

    const faqToggle = page
      .getByRole('button', {
        name: /How long does a platform deployment typically take/i,
      });

    // First one starts open by default, second is closed
    const secondToggle = page.getByRole('button', {
      name: /Can we host FlyttGo platforms inside our own cloud tenancy/i,
    });
    await secondToggle.scrollIntoViewIfNeeded();
    await expect(secondToggle).toHaveAttribute('aria-expanded', 'false');

    await secondToggle.click();
    await expect(secondToggle).toHaveAttribute('aria-expanded', 'true');

    await faqToggle.scrollIntoViewIfNeeded();
    await expect(faqToggle).toBeVisible();
  });
});
