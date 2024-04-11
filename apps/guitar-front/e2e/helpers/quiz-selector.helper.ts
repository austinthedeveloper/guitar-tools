import { Page } from '@playwright/test';

export class QuizSelectorHelper {
  static async openMenu(page: Page) {
    const menu = page.locator(`.mat-mdc-form-field`);
    return await menu.click();
  }
  static async selectItem(name: string, page: Page) {
    const item = page.getByRole('option', { name });
    await this.openMenu(page);
    return item;
  }
}
