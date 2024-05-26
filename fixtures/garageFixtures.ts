import { test as base } from '@playwright/test';
import { GaragePage } from '../page-objects/pages/garagePage';

export const test = base.extend({
    garagePageAsUser: async ({ page }, use) => {
        await page.context().addInitScript('storageState.json');

        let garagePage = new GaragePage(page);
        await page.goto('/panel/garage'); 
        await garagePage.clickAddCarButton();
        await use(garagePage);
        await garagePage.removeLastCar();
    },
});
