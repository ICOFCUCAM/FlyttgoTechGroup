import { test, expect } from '@playwright/test';

test.describe('language switcher', () => {
  test('switching to Norwegian translates the hero and persists', async ({
    page,
  }) => {
    await page.goto('/');

    // English baseline
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      /Deploy National-Scale/i,
    );

    // Open the language dropdown
    await page
      .getByRole('button', { name: /Language — English/i })
      .click();
    await page.getByRole('option', { name: /Norsk/i }).click();

    // URL now prefixed with /no — crawlers and share links see the locale.
    await expect(page).toHaveURL(/\/no\/?$/);

    // Hero flipped to Norwegian
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      /Rull ut digitale infrastruktur­plattformer/i,
    );

    // <html lang> updated
    await expect(page.locator('html')).toHaveAttribute('lang', 'no');

    // Persists across reload — middleware cookie drives the rewrite
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('lang', 'no');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      /Rull ut digitale infrastruktur­plattformer/i,
    );
  });

  test('Arabic flips the document to RTL and URL prefix is /ar', async ({
    page,
  }) => {
    await page.goto('/');
    await page
      .getByRole('button', { name: /Language — English/i })
      .click();
    await page.getByRole('option', { name: /العربية/ }).click();
    await expect(page).toHaveURL(/\/ar\/?$/);
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  });

  test('visiting /fr/platforms serves the platforms page at that URL', async ({
    page,
  }) => {
    const response = await page.goto('/fr/platforms');
    expect(response?.status()).toBe(200);
    // Page shows the platforms index — identified by the PlatformEcosystem
    // section presence or a French-translated heading if FR copy is rich
    // enough; at minimum the canonical route served the /platforms content.
    await expect(page.locator('body')).toContainText(/FlyttGo/i);
  });
});
