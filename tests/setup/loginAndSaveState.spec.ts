import { test, expect, chromium } from '@playwright/test';
import { SignInForm } from '../../page-objects/forms/signinForm';
import { correctEmail, correctPassword } from '../../test-data/credentials';

test('Login and save storage state', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const signInForm = new SignInForm(page);

    await page.goto('/'); 
    await signInForm.open();
    await signInForm.loginWithCredentials(correctEmail, correctPassword);

    
    await expect(page.locator('h1')).toHaveText('Garage');

    await context.storageState({ path: 'storageState.json' });

    await browser.close();
});

