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

    // Hero flipped to Norwegian
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      /Rull ut digitale infrastruktur­plattformer/i,
    );

    // <html lang> updated
    await expect(page.locator('html')).toHaveAttribute('lang', 'no');

    // Persists across reload
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('lang', 'no');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      /Rull ut digitale infrastruktur­plattformer/i,
    );
  });

  test('Arabic flips the document to RTL', async ({ page }) => {
    await page.goto('/');
    await page
      .getByRole('button', { name: /Language — English/i })
      .click();
    await page.getByRole('option', { name: /العربية/ }).click();
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  });
});
