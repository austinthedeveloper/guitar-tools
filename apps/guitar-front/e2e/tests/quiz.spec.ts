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
  expect(await correct).toContain('0');
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

const tests = [
  {
    value: 'Relative Minor',
  },
  {
    value: 'Relative Major',
  },
  {
    value: 'Mode Note',
  },
  {
    value: 'Mode Name',
  },
  {
    value: 'Guess Chord',
  },
  {
    value: 'Guess Triad',
  },
  {
    value: 'Guess Minor Triad',
  },
  {
    value: 'Guess Augmented Triad',
  },
  {
    value: 'Guess Diminished Triad',
  },
];

tests.forEach((t) => {
  test(`Quiz: ${t.value}`, async ({ page }) => {
    await NavigationHelper.navigateQuiz(page);
    const selectorHelper = new QuizSelectorHelper(page);
    await selectorHelper.clearForm();
    const item = await selectorHelper.selectItem(t.value);
    await item.click();
    await selectorHelper.backdropClick();
    let initialCorrectCount = parseInt(await QuizCountHelper.getCorrect(page));

    expect(initialCorrectCount).toBe(0);

    const items = selectorHelper.getSelectItems();
    const elementsCount = await items.count();

    let foundCorrectAnswer = false;

    for (let index = 0; index < elementsCount; index++) {
      await items.nth(index).click();
      // await selectorHelper.backdropClick();
      expect(await page.locator('.cdk-overlay-backdrop')).not.toBeVisible();

      let currentCorrectCount = parseInt(
        await QuizCountHelper.getCorrect(page)
      );

      if (currentCorrectCount > initialCorrectCount) {
        foundCorrectAnswer = true;
        break;
      }
    }

    expect(foundCorrectAnswer).toBe(true);
  });
});
