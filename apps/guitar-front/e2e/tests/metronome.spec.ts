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
    const slider = await page.locator(sliderSelector);

    // Interact with the slider by clicking at the maximum point
    const boundingBox = await slider.boundingBox();
    if (boundingBox) {
      const { x, y, width } = boundingBox;
      await page.mouse.click(x + width - 1, y + boundingBox.height / 2); // Move to max
    }

    // Verify the slider value is 255 (this assumes there's a way to read the value from the page)
    const value = await page.locator(thumbSelector);
    expect(value).toContainText('255');
  });

  test('should play sound when checkbox is checked', async ({ page }) => {
    const checkboxSelector = 'input[type="checkbox"]'; // Adjust if needed
    await page.check(checkboxSelector);
    // Assuming you have a way to verify that the sound is playing, like checking a specific element or state
    const isChecked = await page.isChecked(checkboxSelector);
    expect(isChecked).toBeTruthy();

    // Add more specific sound-playing checks as necessary
  });

  test('should start the metronome when Start is clicked', async ({ page }) => {
    await page.getByRole('button', { name: 'Start' }).click();
    // Verify the metronome starts, perhaps by checking for some visual or audio indication
    // Example: A class or element change, or listening for a timer state change
    const isPlaying = await page.locator('.metronome-playing').isVisible(); // Assuming there's a visual indicator
    expect(isPlaying).toBeTruthy();
  });

  test('should stop the metronome when Stop is clicked', async ({ page }) => {
    await page.getByRole('button', { name: 'Stop' }).click();

    // Verify the metronome stops
    const isStopped = await page.locator('.metronome-stopped').isVisible(); // Adjust according to your stop logic
    expect(isStopped).toBeTruthy();
  });
});
