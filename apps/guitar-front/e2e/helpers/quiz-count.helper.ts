import { Page } from '@playwright/test';

export class QuizCountHelper {
  static getCorrect(page: Page) {
    return page.locator('.quiz-count-correct');
  }
  static getInCorrect(page: Page) {
    return page.locator('.quiz-count-incorrect');
  }
  static getTotal(page: Page) {
    return page.locator('.quiz-count-total');
  }
}
