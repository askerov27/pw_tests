import { expect, type Locator, type Page } from '@playwright/test';

// enum Role {
//     'Ведущий',
// 'Тренер',
// 'Координатор'
// }

export class MeetupSetupPage {
  readonly page: Page;
  readonly meetupTemplateInput: Locator;
  readonly nextBtn: Locator;
  readonly datePicker: Locator;
  readonly startTimePicker: Locator;
  readonly locationInput: Locator;
  readonly teacherNameInput: Locator;
  readonly teacherNamesDropdown: Locator;
  readonly teacherRoleInput: Locator;
  readonly teacherRoleDropdown: Locator;
  readonly createMeetupBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.meetupTemplateInput = page.locator('[tuitextfield]');
    this.nextBtn = page.locator(
      '[test-automation-id="b0e930eb-183f-4c70-953b-7b7be47274a3"]'
    );
    this.datePicker = page
      .locator('[automation-id="tui-primitive-textfield__native-input"]')
      .nth(0);
    this.startTimePicker = page.locator('[inputmode="numeric"]').nth(0);
    this.locationInput = page
      .locator('[automation-id="tui-primitive-textfield__native-input"]')
      .nth(3);
    this.teacherNameInput = page
      .locator('[automation-id="tui-primitive-textfield__wrapper"]')
      .nth(4);
    this.teacherNamesDropdown = page.locator(
      '[automation-id="tui-data-list-wrapper__option"]'
    );
    this.teacherRoleInput = page
      .locator('[automation-id="tui-primitive-textfield__wrapper"]')
      .nth(5);
    this.teacherRoleDropdown = page.locator(
      '[test-automation-id="c45ab67c-5300-487c-ab01-3b73ac891692"]'
    );
    this.createMeetupBtn = page.locator(
      '[test-automation-id="b1d05b3c-78ca-4a97-988d-e6a88804075f"]'
    );
  }

  async selectTeacher(teacherName: string) {
    await this.teacherNameInput.click();
    await this.teacherNamesDropdown.getByText(`${teacherName}`).click();
  }

  async selectTeacherRole(role: string) {
    await this.teacherRoleInput.click();
    await this.teacherRoleDropdown.getByText(`${role}`).click();
  }
}
