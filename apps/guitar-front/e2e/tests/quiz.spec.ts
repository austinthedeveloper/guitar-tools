import { test, expect } from '@playwright/test';
import {
  NavigationHelper,
  QuizCountHelper,
  QuizSelectorHelper,
} from '../helpers';

test('Quiz Count: Init', async ({ page }) => {
  await NavigationHelper.navigateQuiz(page);
  const correct = QuizCountHelper.getCorrect(page);
  const incorrect = QuizCountHelper.getInCorrect(page);
  const total = QuizCountHelper.getTotal(page);
  expect(await correct.innerText()).toContain('0');
  expect(await incorrect.innerText()).toContain('0');
  expect(await total.innerText()).toContain('0/0');
});
test('Quiz Selector', async ({ page }) => {
  await NavigationHelper.navigateQuiz(page);
  const selectorHelper = new QuizSelectorHelper(page);
  await selectorHelper.clearForm();
  const item = await selectorHelper.selectItem('Sorting Modes');
  expect(await page.locator('.cdk-overlay-pane')).toBeVisible();
  const checkbox = item.locator('mat-pseudo-checkbox');
  expect(await item.innerText()).toContain('Sorting Modes');
  expect(await checkbox).toHaveAttribute('ng-reflect-state', 'unchecked');

  await item.click();
  expect(await checkbox).toHaveAttribute('ng-reflect-state', 'checked');
});
test('Quiz Selector Checking Selected Items', async ({ page }) => {
  await NavigationHelper.navigateQuiz(page);
  const selectorHelper = new QuizSelectorHelper(page);
  const menu = selectorHelper.selectMenu();
  expect(await menu.innerText()).toContain('1 Types');
  const item = await selectorHelper.selectItem('Sorting Modes');
  await item.click();
  await selectorHelper.closeMenu();
  expect(await menu.innerText()).toContain('2 Types');
});

test('Quiz: Relative Minor ', async ({ page }) => {
  await NavigationHelper.navigateQuiz(page);
  const selectorHelper = new QuizSelectorHelper(page);
  await selectorHelper.clearForm();
  const item = await selectorHelper.selectItem('Relative Minor');
  expect(await QuizCountHelper.getCorrect(page).innerHTML()).toContain('0');
  await item.click();
  await selectorHelper.backdropClick();
  expect(await page.locator('.cdk-overlay-backdrop')).not.toBeVisible();

  // looper
  const items = selectorHelper.getSelectItems();
  const elementsCount = await items.count();

  for (var index = 0; index < elementsCount; index++) {
    await items.nth(index).click();
  }

  expect(await QuizCountHelper.getCorrect(page).innerHTML()).not.toContain('0');
});
test('Quiz: Relative Major ', async ({ page }) => {
  await NavigationHelper.navigateQuiz(page);
  const selectorHelper = new QuizSelectorHelper(page);
  await selectorHelper.clearForm();
  const item = await selectorHelper.selectItem('Relative Major');
  expect(await QuizCountHelper.getCorrect(page).innerHTML()).toContain('0');
  await item.click();
  await selectorHelper.backdropClick();
  expect(await page.locator('.cdk-overlay-backdrop')).not.toBeVisible();

  // looper
  const items = selectorHelper.getSelectItems();
  const elementsCount = await items.count();

  for (var index = 0; index < elementsCount; index++) {
    await items.nth(index).click();
  }

  expect(await QuizCountHelper.getCorrect(page).innerHTML()).not.toContain('0');
});
test('Quiz: Mode Note ', async ({ page }) => {
  await NavigationHelper.navigateQuiz(page);
  const selectorHelper = new QuizSelectorHelper(page);
  await selectorHelper.clearForm();
  const item = await selectorHelper.selectItem('Mode Note');
  expect(await QuizCountHelper.getCorrect(page).innerHTML()).toContain('0');
  await item.click();
  await selectorHelper.backdropClick();
  expect(await page.locator('.cdk-overlay-backdrop')).not.toBeVisible();

  // looper
  const items = selectorHelper.getSelectItems();
  const elementsCount = await items.count();

  for (var index = 0; index < elementsCount; index++) {
    await items.nth(index).click();
  }

  expect(await QuizCountHelper.getCorrect(page).innerHTML()).not.toContain('0');
});
test('Quiz: Mode Name ', async ({ page }) => {
  await NavigationHelper.navigateQuiz(page);
  const selectorHelper = new QuizSelectorHelper(page);
  await selectorHelper.clearForm();
  const item = await selectorHelper.selectItem('Mode Name');
  expect(await QuizCountHelper.getCorrect(page).innerHTML()).toContain('0');
  await item.click();
  await selectorHelper.backdropClick();
  expect(await page.locator('.cdk-overlay-backdrop')).not.toBeVisible();

  // looper
  const items = selectorHelper.getSelectItems();
  const elementsCount = await items.count();

  for (var index = 0; index < elementsCount; index++) {
    await items.nth(index).click();
  }

  expect(await QuizCountHelper.getCorrect(page).innerHTML()).not.toContain('0');
});
test('Quiz: Guess Chord ', async ({ page }) => {
  await NavigationHelper.navigateQuiz(page);
  const selectorHelper = new QuizSelectorHelper(page);
  await selectorHelper.clearForm();
  const item = await selectorHelper.selectItem('Guess Chord');
  expect(await QuizCountHelper.getCorrect(page).innerHTML()).toContain('0');
  await item.click();
  await selectorHelper.backdropClick();
  expect(await page.locator('.cdk-overlay-backdrop')).not.toBeVisible();

  // looper
  const items = selectorHelper.getSelectItems();
  const elementsCount = await items.count();

  for (var index = 0; index < elementsCount; index++) {
    await items.nth(index).click();
  }

  expect(await QuizCountHelper.getCorrect(page).innerHTML()).not.toContain('0');
});
test('Quiz: Guess Triad ', async ({ page }) => {
  await NavigationHelper.navigateQuiz(page);
  const selectorHelper = new QuizSelectorHelper(page);
  await selectorHelper.clearForm();
  const item = await selectorHelper.selectItem('Guess Triad');
  expect(await QuizCountHelper.getCorrect(page).innerHTML()).toContain('0');
  await item.click();
  await selectorHelper.backdropClick();
  expect(await page.locator('.cdk-overlay-backdrop')).not.toBeVisible();

  // looper
  const items = selectorHelper.getSelectItems();
  const elementsCount = await items.count();

  for (var index = 0; index < elementsCount; index++) {
    await items.nth(index).click();
  }

  expect(await QuizCountHelper.getCorrect(page).innerHTML()).not.toContain('0');
});
