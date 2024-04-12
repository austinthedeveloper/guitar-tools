import { Page } from '@playwright/test';

export class QuizSelectorHelper {
  constructor(private page: Page) {}
  selectMenu() {
    return this.page.locator(`.mat-mdc-form-field`);
  }
  async openMenu() {
    const menu = this.selectMenu();
    return await menu.click();
  }

  async closeMenu() {
    const menu = this.selectMenu();
    return await menu.press('Escape');
  }
  async selectItem(name: string) {
    const item = this.page.getByRole('option', { name: name });
    await this.openMenu();
    return item;
  }
}
