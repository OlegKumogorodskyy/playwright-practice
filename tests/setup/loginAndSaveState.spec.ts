import { test, expect } from '@playwright/test';
import { GaragePage } from '../../page-objects/pages/garagePage';
import { correctEmail, correctPassword } from '../../test-data/credentials'

test.describe('Garage tests with POM', () => {
    let garagePage: GaragePage;

    test('Login As User1 and save state', async ({ page }) => {
        garagePage = new GaragePage(page);
        await page.goto('/');
        await garagePage.openAsLoggedUser(correctEmail, correctPassword);
        await page.context().storageState({
            path: './test-data/states/userOneState.json'
        })
    })
})