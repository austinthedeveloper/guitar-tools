import { Page } from '@playwright/test';

export class QuizCountHelper {
  static async getCorrect(page: Page): Promise<string> {
    const correctText = await page.locator('.quiz-count-correct').innerText(); // adjust the selector accordingly
    return this.returnNumber(correctText);
  }
  static getInCorrect(page: Page) {
    return page.locator('.quiz-count-incorrect');
  }
  static getTotal(page: Page) {
    return page.locator('.quiz-count-total');
  }

  static returnNumber(correctText: string) {
    const match = correctText.match(/\d+/); // use regex to find the number

    if (match) {
      return match[0]; // return the matched number as a string
    }

    throw new Error('No correct count found');
  }
}
