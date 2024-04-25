import { test, expect, Page } from '@playwright/test';
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

    expect(await QuizCountHelper.getCorrect(page).innerHTML()).not.toContain(
      '0'
    );
  });
});

test(`Quiz: Sorting Modes`, async ({ page }) => {
  await NavigationHelper.navigateQuiz(page);
  const selectorHelper = new QuizSelectorHelper(page);
  await selectorHelper.clearForm();

  const item = await selectorHelper.selectItem('Sorting Modes');
  expect(await QuizCountHelper.getCorrect(page).innerHTML()).toContain('0');
  await item.click();
  await selectorHelper.backdropClick();
  expect(await page.locator('.cdk-overlay-backdrop')).not.toBeVisible();

  const list = selectorHelper.getDropList();
  const ionian = selectorHelper.getDropListItem('Ionian');
  expect(await ionian.innerHTML()).toContain('Ionian');

  const originElementBox = await ionian.boundingBox();
  const destinationElementBox = await list.boundingBox();

  await page.mouse.move(
    originElementBox.x + originElementBox.width / 2,
    originElementBox.y + originElementBox.height / 2
  );
  await page.mouse.down();
  await page.mouse.move(0, 0, { steps: 20 });
  await page.mouse.up();

  expect(
    await selectorHelper.getDropListItemTest().nth(0).innerHTML()
  ).toContain('Ionian');
});
