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

test(`Quiz: Scale`, async ({ page }) => {
  // Navigate to the quiz page
  await NavigationHelper.navigateQuiz(page);
  const selectorHelper = new QuizSelectorHelper(page);

  // Clear the form and select the 'Scale' quiz item
  await selectorHelper.clearForm();
  const item = await selectorHelper.selectItem('Scale');
  await item.click();
  await selectorHelper.backdropClick();

  // Initial count of correct answers should be 0
  let initialCorrectCount = parseInt(await QuizCountHelper.getCorrect(page));
  expect(initialCorrectCount).toBe(0);

  // Select dropdowns (first is 'Key', second is 'Scale')
  const keysSelect = page.getByRole('combobox').nth(1);
  const scaleSelect = page.getByRole('combobox').nth(2);

  // Get the count of available options in both dropdowns
  const keysCount = await keysSelect.locator('option').count();
  const scaleCount = await scaleSelect.locator('option').count();

  let foundCorrectAnswer = false;

  // Loop through keys and scales as per your steps
  for (let keyIndex = 0; keyIndex < keysCount; keyIndex++) {
    // Select the key by index
    await keysSelect.selectOption({ index: keyIndex });

    for (let scaleIndex = 0; scaleIndex < scaleCount; scaleIndex++) {
      // Select the scale by index
      await scaleSelect.selectOption({ index: scaleIndex });

      // Click the submit button
      await page.getByRole('button', { name: 'Submit' }).click();

      // Check if the answer is correct
      let currentCorrectCount = parseInt(
        await QuizCountHelper.getCorrect(page)
      );

      // If the answer is correct, break out of the loops
      if (currentCorrectCount > initialCorrectCount) {
        foundCorrectAnswer = true;
        break;
      }
    }

    // If the correct answer was found, break out of the outer loop
    if (foundCorrectAnswer) {
      break;
    }
  }

  // Assert that the correct answer was found
  expect(foundCorrectAnswer).toBe(true);
});
