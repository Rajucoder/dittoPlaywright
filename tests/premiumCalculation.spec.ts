import { test, expect } from '@playwright/test';
import { DittoPremiumPage } from './pages/DittoPremiumPage';

test('list cover amounts and addons; verify premium updates when toggling addons', async ({ page }) => {
  const dittoPremiumPage = new DittoPremiumPage(page);

  // Navigate to the app
  await dittoPremiumPage.navigateToApp('https://stag-app.joinditto.in/fq');

  // Select product
  await dittoPremiumPage.selectProduct();

  // Proceed through quick flow
  await dittoPremiumPage.proceedThroughQuickFlow();

  // Select gender and continue
  await dittoPremiumPage.selectGenderAndContinue();

  // Fill details and calculate premium
  await dittoPremiumPage.fillDetailsAndCalculatePremium('30', '400001');

  // Get and verify cover amounts
  const coverAmounts = await dittoPremiumPage.getCoverAmounts();
  expect(coverAmounts.length).toEqual(9);

  // Get premium without add-ons
  const totalPremiumValue = await dittoPremiumPage.getTotalPremiumWithoutAddOns();

  // Toggle add-ons and get updated premiums
  await dittoPremiumPage.toggleClaimProtectAddOn();
  await dittoPremiumPage.toggleSuperCreditAddOn();

  const claimProtectValue = await dittoPremiumPage.getPremiumWithClaimProtect();
  const superCreditValue = await dittoPremiumPage.getPremiumWithSuperCredit();
  const expectedTotal = totalPremiumValue + claimProtectValue + superCreditValue;

  // Get premium with add-ons
  const updatedTotalPremium = await dittoPremiumPage.getTotalPremiumWithoutAddOns();

    expect(updatedTotalPremium).toEqual(expectedTotal);
});

