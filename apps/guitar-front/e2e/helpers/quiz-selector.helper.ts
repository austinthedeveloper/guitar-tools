import { Locator, Page } from '@playwright/test';

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
    return this.page.getByText(name, { exact: true });
  }
  getDropListItemTest() {
    return this.page.locator(`.list-group-item`);
  }

  getSubmitbutton() {
    return this.page.getByRole('button', { name: 'Submit' });
  }

  async moveDND(origin: Locator, index: number) {
    const list = this.getDropList();
    const originElementBox = await origin.boundingBox();
    const destinationElementBox = await list.boundingBox();

    await this.page.mouse.move(
      originElementBox.x + originElementBox.width / 2,
      originElementBox.y + originElementBox.height / 2
    );
    await this.page.mouse.down();
    await this.page.mouse.move(
      destinationElementBox.x + destinationElementBox.width / 2,
      destinationElementBox.y + originElementBox.height * index + 5,
      { steps: 20 }
    );
    await this.page.mouse.up();
  }
}
