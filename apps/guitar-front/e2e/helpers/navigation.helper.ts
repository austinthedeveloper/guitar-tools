import { Page } from '@playwright/test';

export class NavigationHelper {
  static clickHome(page: Page) {
    return page.getByRole('link', { name: 'Home' }).click();
  }
  static clickQuiz(page: Page) {
    return page.getByRole('link', { name: 'Quiz' }).click();
  }
  static clickOptions(page: Page) {
    return page.getByRole('link', { name: 'Options' }).click();
  }
  static navigateQuiz(page: Page) {
    return page.goto('/quiz');
  }
  static navigateHome(page: Page) {
    return page.goto('/');
  }
  static navigateOptions(page: Page) {
    return page.goto('/options');
  }
}
