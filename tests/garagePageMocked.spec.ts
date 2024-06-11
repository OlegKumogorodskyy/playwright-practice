import { test, expect } from '@playwright/test';
import { GaragePage } from '../page-objects/pages/garagePage';
import { correctEmail, correctPassword } from '../test-data/credentials'


test.describe('Tests with mocking API', () => {
    let garagePage: GaragePage;

    test.beforeEach(async ({ page }) => {
        garagePage = new GaragePage(page);
        await page.goto('/');
    })

    test('User name change to Joe Biden', async ({ page }) => {

        const resp = {
            "status": "ok",
            "data": {
                "userId": 126359,
                "photoFilename": "default-user.png",
                "name": "Joe",
                "lastName": "Biden"
            }
        }
        await page.goto('/panel/profile');
        await page.route('**/api/users/profile', route => route.fulfill({
            status: 200,
            body: JSON.stringify(resp),
        }));
        await garagePage.openAsLoggedUser(correctEmail, correctPassword);
        await page.pause();
        await garagePage.clickProfileLink();
        await page.goto('/panel/profile');
        const userName = await page.textContent('div .profile_name');
        expect(userName).toBe('Joe Biden');
    });
});


    
         
                

            
            
