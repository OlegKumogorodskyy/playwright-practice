import { test as base } from '@playwright/test'
import { GaragePage } from '../page-objects/pages/garagePage';


export const test = base.extend({
    garagePageAsUser: async ({ page }, use) => {
        let garagePage = new GaragePage(page);

        await page.goto('/');
        await garagePage.open();
        await garagePage.clickAddCarButton();
        await use(garagePage);
        await garagePage.removeLastCar();
    },
   
});