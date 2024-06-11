import { test as base } from '@playwright/test'
import { FuelExpenses } from '../page-objects/pages/fuelExpenses';
import { expect } from '@playwright/test';

// type MyFixtures = {
//     garagePageAsUser: GaragePage;
//     garagePageAsGuest: GaragePage;
// };

export const test = base.extend({
    fuelExpensesAsGust: async ({ page }, use) => {
        await page.goto('/');
        await page.getByText('Guest log in').click();
        let fuelExpenses = new FuelExpenses(page);
        await expect(page.locator('h1')).toHaveText('Garage');
        await page.locator('[routerlink="expenses"]').click();
        await expect(fuelExpenses.pageHeader).toBeVisible();
        use(fuelExpenses);
    },



});