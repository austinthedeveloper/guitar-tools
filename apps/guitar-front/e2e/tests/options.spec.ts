import { test, expect } from '@playwright/test';
import { NavigationHelper } from '../helpers';

test(`Change Chart-Row Count`, async ({ page }) => {
  // Step 1: Navigate to the main page and get the chart-row count (default is 15)
  await NavigationHelper.navigateHome(page);
  const defaultChartRows = page
    .locator('.chart-row-container .chart-row')
    .count();
  expect(await defaultChartRows).toBe(15 + 1);

  // Step 2: Navigate to /options and target the input with id="frets"
  await NavigationHelper.clickOptions(page);
  const fretsInput = page.locator('#frets');

  // Clear the input and set it to '10'
  await fretsInput.click();
  await fretsInput.fill(''); // Clear any existing value
  await fretsInput.type('10'); // Type '10'

  // Confirm the value is set correctly
  await expect(fretsInput).toHaveValue('10');

  // Step 3: Navigate back to the root page
  await NavigationHelper.clickHome(page);

  // Step 4: Get the chart-row count again and expect it to be 10
  const updatedChartRows = page
    .locator('.chart-row-container .chart-row')
    .count();
  expect(await updatedChartRows).toBe(10 + 1);
});
