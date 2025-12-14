import { Page, Locator } from '@playwright/test';

export class DittoPremiumPage {
  readonly page: Page;

  // Selectors
  readonly activOneProduct: Locator;
  readonly nextButton: Locator;
  readonly continueButton: Locator;
  readonly nextStepButton: Locator;
  readonly selfGenderMale: Locator;
  readonly ageInput: Locator;
  readonly pinCodeInput: Locator;
  readonly nxtText: Locator;
  readonly calculatePremiumButton: Locator;
  readonly markLabelsSelector: Locator;
  readonly totalPremiumLocator: Locator;
  readonly addOnsRidersRegion: Locator;
  readonly claimProtectCheckbox: Locator;
  readonly superCreditCheckbox: Locator;
  readonly premiumWithClaimProtectLocator: Locator;
  readonly premiumWithSuperCreditLocator: Locator;
  readonly tellUsAboutYouText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.activOneProduct = page.locator('text=Activ One').first();
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.nextStepButton = page.getByRole('button', { name: 'Next step' });
    this.selfGenderMale = page.getByText('Self', { exact: true }).locator('..').getByText('Male').first();
    this.ageInput = page.getByPlaceholder('Your age');
    this.pinCodeInput = page.getByPlaceholder('Enter your pin code');
    this.nxtText = page.getByText('Nxt', { exact: true });
    this.calculatePremiumButton = page.getByRole('button', { name: 'Calculate Premium' });
    this.markLabelsSelector = page.locator('[class*="_markLabel_"]');
    this.totalPremiumLocator = page.locator('//span[text()="Total Premium"]/following-sibling::span');
    this.addOnsRidersRegion = page.getByRole('region', { name: 'Add Ons & Riders' });
    this.claimProtectCheckbox = this.addOnsRidersRegion.locator('input[name="Claim Protect"]');
    this.superCreditCheckbox = this.addOnsRidersRegion.locator('input[name="Super Credit"]');
    this.premiumWithClaimProtectLocator = page.locator('(//span[text()="Premium"]/following-sibling::span)[1]');
    this.premiumWithSuperCreditLocator = page.locator('(//span[text()="Premium"]/following-sibling::span)[5]');
    this.tellUsAboutYouText = page.getByText('Tell us about you');
  }

  // Navigation Methods
  async navigateToApp(url: string) {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  async selectProduct() {
    await this.activOneProduct.click();
    await this.page.waitForLoadState('networkidle');
  }

  async proceedThroughQuickFlow() {
    await this.nextButton.click();
    await this.nextButton.click();
    await this.nextButton.click();
    await this.continueButton.click();
    await this.page.waitForURL('**/members');
    await this.page.waitForLoadState('networkidle');
  }

  async selectGenderAndContinue() {
    await this.selfGenderMale.click();
    await this.nextStepButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async fillDetailsAndCalculatePremium(age: string, pinCode: string) {
    await this.tellUsAboutYouText.isVisible();
    await this.ageInput.fill(age);
    await this.pinCodeInput.fill(pinCode);
    await this.page.waitForLoadState('networkidle');
    await this.nxtText.click();
    await this.page.waitForTimeout(1000);
    await this.calculatePremiumButton.click();
    await this.page.waitForURL('**/plan');
    await this.page.waitForLoadState('networkidle');
  }

  // Cover Amount Methods
  async getCoverAmounts(): Promise<string[]> {
    await this.page.waitForSelector('[class*="_markLabel_"]', {
      state: 'attached',
    });

    const count = await this.markLabelsSelector.count();
    console.log(`Total cover options: ${count}`);

    const coverAmounts: string[] = [];
    for (let i = 0; i < count; i++) {
      const value = await this.markLabelsSelector.nth(i).innerText();
      console.log(`Cover Amount ${i + 1}: ${value}`);
      coverAmounts.push(value);
    }
    return coverAmounts;
  }

  // Premium Methods
  async getTotalPremiumWithoutAddOns(): Promise<number> {
    const totalPremium = await this.totalPremiumLocator.innerText();
    const totalPremiumValue = this.extractNumericValue(totalPremium);
    console.log(`Total Premium without add-ons: ₹${totalPremiumValue}`);
    return totalPremiumValue;
  }

  async toggleClaimProtectAddOn() {
    await this.claimProtectCheckbox.check();
  }

  async toggleSuperCreditAddOn() {
    await this.superCreditCheckbox.check();
  }

  async getPremiumWithClaimProtect(): Promise<number> {
    const premiumWithClaimProtect = await this.premiumWithClaimProtectLocator.innerText();
    const claimProtectValue = this.extractNumericValue(premiumWithClaimProtect);
    console.log(`Total Premium with Claim Protect add-on: ₹${claimProtectValue}`);
    return claimProtectValue;
  }

  async getPremiumWithSuperCredit(): Promise<number> {
    const premiumWithSuperCredit = await this.premiumWithSuperCreditLocator.innerText();
    const superCreditValue = this.extractNumericValue(premiumWithSuperCredit);
    console.log(`Total Premium with Super Credit add-ons: ₹${superCreditValue}`);
    return superCreditValue;
  }

  // Utility Methods
  private extractNumericValue(text: string): number {
    const numericString = text.replace(/[^0-9.]/g, '');
    return parseFloat(numericString);
  }
}
