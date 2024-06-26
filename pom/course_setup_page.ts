import { expect, type Locator, type Page } from '@playwright/test';

export class CourseSetupPage {
  readonly page: Page;
  readonly courseNameInput: Locator;
  readonly technicalNameInput: Locator;
  readonly courseOwnerInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.courseNameInput = page
      .locator('[automation-id="tui-primitive-textfield__native-input"]')
      .nth(0);
    this.technicalNameInput = page
      .locator('[automation-id="tui-input__textfield"]')
      .getByLabel('Техническое название', { exact: true });

    this.courseOwnerInput = page
      .locator('[automation-id="tui-primitive-textfield__native-input"]')
      .nth(3);
  }

  async selectPicForCourse() {
    await this.page
      .locator('[test-automation-id="1bf8078c-47c6-4a5e-a192-8d572c07416c"]')
      .click();
    await this.page
      .locator('[class="dialog-item"]')
      .nth(0)
      .click({ delay: 500 });
    await this.page
      .locator('[class="dialog-button"]')
      .getByText('Сохранить')
      .click();
  }
}
