import { test, expect } from '@playwright/test';
import { NavigationHelper } from '../helpers';

test('Basic Navigation: Home', async ({ page }) => {
  await NavigationHelper.navigateHome(page);
  expect(await page.locator('.navbar-brand').innerText()).toContain(
    'Guitar Tools'
  );
  expect(await page.url()).toContain('/');
});

test('Basic Navigation: Quiz', async ({ page }) => {
  await NavigationHelper.navigateHome(page);
  await NavigationHelper.clickQuiz(page);
  expect(await page.url()).toContain('/quiz');
});

test('Basic Navigation: Options', async ({ page }) => {
  await NavigationHelper.navigateHome(page);
  await NavigationHelper.clickOptions(page);
  expect(await page.url()).toContain('/options');
});
