import { test, expect } from '@playwright/test';
import {
  NavigationHelper,
  QuizCountHelper,
  QuizSelectorHelper,
} from '../helpers';
import { MODES_ARRAY } from '@guitar/interfaces';

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
test(`Quiz: Sorting Modes`, async ({ page }) => {
  // Navigate to the quiz page and set the quiz type to 'Sorting Modes'
  await NavigationHelper.navigateQuiz(page);
  const selectorHelper = new QuizSelectorHelper(page);
  await selectorHelper.clearForm();
  const item = await selectorHelper.selectItem('Sorting Modes');
  await item.click();
  await selectorHelper.backdropClick();

  // Define the correct order of modes
  const correctOrder = MODES_ARRAY;

  // Select the drag-and-drop list items (Material CDK drag items)
  const listItems = await page.locator('.list-group-item');

  // Height of each item (42px)
  const itemHeight = 42;
  const steps = 10; // Number of steps for the drag

  for (let i = 0; i < correctOrder.length; i++) {
    // Traverse the list and find the correct mode in the current randomized order
    const currentIndex = await listItems.evaluateAll(
      (elements, correctMode) => {
        return elements.findIndex(
          (el) => el.textContent?.trim() === correctMode
        );
      },
      correctOrder[i]
    );

    // If the item is not already in the correct position, drag it
    if (currentIndex !== i) {
      const startElement = listItems.nth(currentIndex);
      const endElement = listItems.nth(i); // Target element

      // Get the bounding boxes for the start and target positions
      const startBox = await startElement.boundingBox();
      const endBox = await endElement.boundingBox();
      if (startBox && endBox) {
        const startX = startBox.x + startBox.width / 2; // Center X of the current element
        const startY = startBox.y + startBox.height / 2; // Center Y of the current element

        const targetX = endBox.x + endBox.width / 2; // Center X of the target element
        const targetY = endBox.y + endBox.height / 2; // Center Y of the target element

        const deltaX = (targetX - startX) / steps; // Divide the X distance by steps
        const deltaY = (targetY - startY) / steps; // Divide the Y distance by steps

        // Drag item from its current position to the target position in steps
        await startElement.hover();
        await page.mouse.down();

        for (let step = 1; step <= steps; step++) {
          await page.mouse.move(startX + deltaX * step, startY + deltaY * step);
          await page.waitForTimeout(100); // Pause between steps to slow down the drag
        }

        await page.mouse.up();

        // Wait for the list to update
        await page.waitForTimeout(500);
      }
    }
  }

  // Click the 'Submit' button to confirm the order
  await page.getByRole('button', { name: 'Submit' }).click();

  // Assert that the correct answer was submitted
  expect(parseInt(await QuizCountHelper.getCorrect(page))).toBe(1);
});
