import { expect, type Locator, type Page } from '@playwright/test';

export class TeacherPage {
  readonly page: Page;
  readonly createBtn: Locator;
  readonly selectCourse: Locator;
  readonly selectMeetup: Locator;

  readonly whatToCreate = {
    selections: 'Отбор',
    courses: 'Курс',
    meetups: 'Мероприятие',
    learningPlan: 'План обучения',
  };
  constructor(page: Page) {
    this.page = page;

    this.createBtn = page.getByRole('button').getByText('Создать');
    this.selectMeetup = this.page
      .locator('[role="menuitem"]')
      .getByText('Мероприятие');
    this.selectCourse = this.page
      .locator('[role="menuitem"]')
      .getByText('Курс');
  }

  async selectWhatToCreate(whatToCreate: string) {
    await this.page
      .locator('[role="menuitem"]')
      .getByText(whatToCreate)
      .click({ delay: 200 });
  }
}
