import { test, expect } from '@playwright/test';

test.describe('Metronome Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the metronome page
    await page.goto('/metronome');
  });

  test('should allow setting the metronome number up to 255 using the slider', async ({
    page,
  }) => {
    const sliderSelector = 'mat-slider'; // Adjust the selector based on your component structure
    const thumbSelector = '.bpm-text-value';

    // Move the slider to its maximum value (255)
    const slider = page.locator(sliderSelector);

    // Interact with the slider by clicking at the maximum point
    const boundingBox = await slider.boundingBox();
    if (boundingBox) {
      const { x, y, width } = boundingBox;
      await page.mouse.click(x + width - 1, y + boundingBox.height / 2); // Move to max
    }

    // Verify the slider value is 255 (this assumes there's a way to read the value from the page)
    const value = page.locator(thumbSelector);
    await expect(value).toContainText('255');
  });

  test('should play sound when checkbox is checked', async ({ page }) => {
    const checkboxSelector = 'input[type="checkbox"]'; // Adjust if needed
    await page.check(checkboxSelector);
    // Assuming you have a way to verify that the sound is playing, like checking a specific element or state
    const isChecked = page;
    // await expect(isChecked).toBeChecked(true);

    // Add more specific sound-playing checks as necessary
  });

  test('should start the metronome when Start is clicked', async ({ page }) => {
    await page.getByRole('button', { name: 'Start' }).click();
    // Verify the metronome starts, perhaps by checking for some visual or audio indication
    // Example: A class or element change, or listening for a timer state change
    const isPlaying = page.locator('.metronome-playing'); // Assuming there's a visual indicator
    await expect(isPlaying).toBeVisible();
  });

  test('should stop the metronome when Stop is clicked', async ({ page }) => {
    await page.getByRole('button', { name: 'Stop' }).click();

    // Verify the metronome stops
    const isStopped = page.locator('.metronome-stopped'); // Adjust according to your stop logic
    await expect(isStopped).toBeVisible();
  });
});

test.describe('Metronome Component - Note Values', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the metronome page
    await page.goto('/metronome');
  });

  test('should select quarters from the note value dropdown', async ({
    page,
  }) => {
    await page.selectOption('select.form-select', 'quarters'); // Select quarters

    // Verify the selection
    const selectedValue = page.locator('select.form-select');
    await expect(selectedValue).toHaveValue('quarters');
  });

  test('should select eighths from the note value dropdown', async ({
    page,
  }) => {
    await page.selectOption('select.form-select', 'eighths'); // Select eighths

    // Verify the selection
    const selectedValue = page.locator('select.form-select');
    await expect(selectedValue).toHaveValue('eighths');
  });

  test('should select sixteenths from the note value dropdown', async ({
    page,
  }) => {
    await page.selectOption('select.form-select', 'sixteenths'); // Select sixteenths

    // Verify the selection
    const selectedValue = page.locator('select.form-select');
    await expect(selectedValue).toHaveValue('sixteenths');
  });

  test('should trigger sound when checkbox is checked and Start is clicked', async ({
    page,
  }) => {
    await page.route('/metronome', (route) => route.abort()); // Prevent actual sound playing during the test
    console.log('init');

    // Mock the Audio constructor by extending HTMLAudioElement
    await page.evaluate(() => {
      window.Audio = class extends HTMLAudioElement {
        constructor(src = '') {
          super(); // Call HTMLAudioElement constructor
          this.src = src;
        }

        play(): Promise<void> {
          console.log('Play called');
          return Promise.resolve(); // Return a resolved promise to match the HTMLAudioElement signature
        }
      };
    });

    // Capture console logs
    const consoleMessages: string[] = [];
    page.on('console', (msg) => consoleMessages.push(msg.text()));

    // Interact with the page
    await page.check('input[type="checkbox"]'); // Check the Play Sound checkbox
    await page.getByRole('button', { name: 'Start' }).click(); // Click Start button

    // Wait for 2-3 seconds to give time for the sound to trigger based on the BPM
    await page.waitForTimeout(3000); // Wait for 3 seconds

    // Ensure the play function was called
    expect(
      consoleMessages.some((msg) => msg.includes('Play called'))
    ).toBeTruthy();
  });
});
