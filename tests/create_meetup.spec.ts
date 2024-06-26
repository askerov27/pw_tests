import { test, expect } from '@playwright/test';
import { LoginPage } from '../pom/login-page';
import { MeetupSetupPage } from '../pom/meetup_setup_page';
import { TeacherPage } from '../pom/teachers_page';
import { getDate, getTime } from '../helper_modules/recieve_date';

test('create meetup', async ({ page }) => {
  test.slow();
  let templateNumber: string = process.env.DATA_TEST!;

  const loginPage = new LoginPage(page);
  const meetupSetupPage = new MeetupSetupPage(page);
  const teachersPage = new TeacherPage(page);
  await loginPage.goto();
  await loginPage.login('teacher1@test.edu', 'edu_password');
  await expect(page).toHaveURL(
    'https://edu-ya-dev.tcsbank.ru/educate/courses/published'
  );
  await teachersPage.createBtn.click();

  await teachersPage.selectMeetup.click();

  await meetupSetupPage.meetupTemplateInput.pressSequentially(templateNumber, {
    delay: 200,
  });

  await expect(
    page.locator('[automation-id="tui-data-list-wrapper__option"]').nth(0)
  ).toContainText(templateNumber);
  await page
    .locator('[automation-id="tui-data-list-wrapper__option"]')
    .nth(0)
    .click();

  await page.waitForLoadState('domcontentloaded');
  await expect(meetupSetupPage.nextBtn).toBeVisible();
  await meetupSetupPage.nextBtn.click();
  await meetupSetupPage.nextBtn.click();

  await meetupSetupPage.datePicker.fill(getDate(2));

  await meetupSetupPage.startTimePicker.fill(getTime(5, 30));
  await meetupSetupPage.locationInput.fill('1');
  await meetupSetupPage.selectTeacher('Валиев Карл Фридрихович');
  await meetupSetupPage.selectTeacherRole('Ведущий');

  await meetupSetupPage.createMeetupBtn.click();
  await page.waitForLoadState();
  await expect(page).toHaveURL(/.*meetup-overview/);

  console.log(page.url());
});
