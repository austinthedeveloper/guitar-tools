import { test, expect } from '@playwright/test';

test('Basic Navigation: Home', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('.navbar-brand').innerText()).toContain(
    'Guitar Tools'
  );
});
