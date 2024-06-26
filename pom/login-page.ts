import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly nextBtn: Locator;
  readonly loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('[autocomplete="email"]');
    this.passwordInput = page.locator(
      '[automation-id="tui-primitive-textfield__native-input"]'
    );
    this.nextBtn = page.locator(
      '[test-automation-id="7423e08e-2241-11ee-be56-0242ac120002"]'
    );
    this.loginBtn = page.locator(
      '[test-automation-id="75a541cc-dec6-4fa1-bd84-092e21440f9c"]'
    );
  }

  async goto() {
    await this.page.goto(process.env.EDU_DEV_URL!);
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.nextBtn.click();
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }
}
