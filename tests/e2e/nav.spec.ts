import { test, expect } from '@playwright/test';

test.describe('primary navigation', () => {
  test('top-level links route to their pages', async ({ page }) => {
    await page.goto('/');
    const checks: [RegExp, RegExp][] = [
      [/^Industries$/, /\/industries$/],
      [/^Deployment$/, /\/deployment$/],
      [/^Company$/, /\/company$/],
      [/^Contact$/, /\/contact$/],
    ];
    for (const [label, urlRe] of checks) {
      await page.goto('/');
      await page.getByRole('navigation', { name: 'Primary' })
        .getByRole('link', { name: label })
        .first()
        .click();
      await expect(page).toHaveURL(urlRe);
    }
  });

  test('status page is reachable from footer and renders operational state', async ({
    page,
  }) => {
    await page.goto('/');
    await page.getByRole('contentinfo').getByRole('link', { name: /All systems operational/i }).click();
    await expect(page).toHaveURL(/\/status$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      /All systems operational/i,
    );
  });

  test('skip-to-content link lands on main landmark', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: /Skip to content/i });
    await expect(skip).toBeFocused();
    await skip.press('Enter');
    // url gains #main and the main landmark exists
    await expect(page).toHaveURL(/#main$/);
    await expect(page.locator('#main')).toBeVisible();
  });
});
