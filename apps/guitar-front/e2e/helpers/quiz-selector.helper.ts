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

  async resetForm() {
    const btn = this.page.getByRole('button', { name: 'Reset' });
    return await btn.click();
  }
  async clearForm() {
    const btn = this.page.getByRole('button', { name: 'Clear' });
    return await btn.click();
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

  async backdropClick() {
    const item = this.page.locator('.cdk-overlay-backdrop');
    await item.click();
  }

  getSelectItems() {
    return this.page.locator('.list-group-item');
  }

  getDropList() {
    return this.page.locator('.cdk-drop-list');
  }

  getDropListItem(name: string) {
    return this.page.locator(`.list-group-item:has-text("${name}")`);
  }
  getDropListItemTest() {
    return this.page.locator(`.list-group-item`);
  }
}
