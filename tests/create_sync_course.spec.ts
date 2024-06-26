import { test, expect } from '@playwright/test';
import { LoginPage } from '../pom/login-page';
import { TeacherPage } from '../pom/teachers_page';
import { CourseSetupPage } from '../pom/course_setup_page';
import { getDate, getTime } from '../helper_modules/recieve_date';

test('create course', async ({ page }) => {
  let asyncCourse: string = process.env.DATA_TEST!;
  let courseName: string;
  let courseTechName: string;
  if (asyncCourse == 'async') {
    courseName = 'Асинхронный курс';
    courseTechName = 'Асинхронный курс';
  } else {
    courseName = 'Синхронный курс';
    courseTechName = 'Синхронный курс';
  }
  test.slow();
  const loginPage = new LoginPage(page);
  const teachersPage = new TeacherPage(page);
  const courseSetupPage = new CourseSetupPage(page);
  await loginPage.goto();
  await loginPage.login('teacher1@test.edu', 'edu_password');
  await expect(page).toHaveURL(
    'https://edu-ya-dev.tcsbank.ru/educate/courses/published'
  );
  await teachersPage.createBtn.click();
  await teachersPage.selectCourse.click();

  //name input
  await page
    .locator('[automation-id="tui-input__textfield"]')
    .getByLabel('Название', { exact: true })
    .fill(courseName);

  //technical name input
  await page
    .locator('[automation-id="tui-input__textfield"]')
    .getByLabel('Техническое название')
    .fill(courseTechName);
  //fill description
  await page.getByPlaceholder('Описание').click();
  await page.keyboard.type('Описание курса');

  //select sync or async
  if (asyncCourse == 'async') {
    await page
      .locator('[test-automation-id="4eafbf33-bfbc-4021-83da-1b4b33feab03"]')
      .click();
  }

  //click owner input
  await page
    .locator('[automation-id="tui-primitive-textfield__native-input"]')
    .nth(3)
    .click();

  //select owner from dropdown
  await page
    .locator('[automation-id="tui-data-list-wrapper__option"]')
    .getByText('Т-Образование')
    .click();

  await page
    .locator('[automation-id="tui-primitive-textfield__native-input"]')
    .nth(4)
    .click();

  await page
    .locator('[automation-id="tui-data-list-wrapper__option"]')
    .getByText('Тинькофф Образование')
    .click();

  await page
    .locator('[automation-id="tui-primitive-textfield__native-input"]')
    .nth(5)
    .click();

  await page
    .locator('[automation-id="tui-data-list-wrapper__option"]')
    .getByText('Внешние пользователи + сотрудники')
    .click();

  //select complexity
  await page
    .locator('[automation-id="tui-primitive-textfield__native-input"]')
    .nth(6)
    .click();

  await page
    .locator('[automation-id="tui-data-list-wrapper__option"]')
    .getByText('Для любого уровня')
    .click();

  //tags
  await page.locator('[automation-id="tui-multi-select__input"]').click();
  await page
    .locator('[automation-id="tui-data-list-wrapper__option"]')
    .getByText('Самостоятельно')
    .click();

  //skills
  await page
    .locator('[automation-id="tui-primitive-textfield__native-input"]')
    .nth(7)
    .click();

  await page
    .locator('[automation-id="tui-data-list-wrapper__option"]')
    .getByText('Хард-скиллы')
    .click({ delay: 200 });

  //streams
  await page
    .locator('[automation-id="tui-multi-select__arrow"]')
    .nth(1)
    .click();

  await page.locator('[type="button"]').getByText('Редактура').click();

  //specialization
  await page
    .locator('[automation-id="tui-multi-select__arrow"]')
    .nth(2)
    .click();

  await page.getByLabel('Все специализации').click();

  //select pic
  //courseSetupPage.selectPicForCourse();
  await page
    .locator('[test-automation-id="1bf8078c-47c6-4a5e-a192-8d572c07416c"]')
    .click();
  await page.locator('[class="dialog-item"]').nth(0).click({ delay: 500 });
  await page.locator('[class="dialog-button"]').getByText('Сохранить').click();
  await page.locator('app-save-cancel-buttons').getByText('Сохранить').click();
  await page.waitForLoadState();
  await expect(page).toHaveURL(/.*overview/);

  console.log(page.url());
});
