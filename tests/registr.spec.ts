import { test, expect } from '@playwright/test';
import { RegisterButton } from '../page-objects/components/RegisterButton';
import { RegisterPOM } from '../page-objects/forms/registerPOM';
test.describe('All tests', () => {
  let registerButton: RegisterButton;
  let registerPOM: RegisterPOM;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    registerButton = new RegisterButton(page);
    registerPOM = new RegisterPOM(page);
  });
  test('Successful registration with valid data', async ({ page }) => {
     
    await page.locator('#signupLastName').fill('Kumogorodskyy');
    await page.getByLabel('Email').fill('kyym13+aqe6@gmail.com');
    await page.getByLabel('Password', { exact: true }).fill('Qa12345678');
    await page.getByLabel('Re-enter password').fill('Qa12345678');
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page.getByRole('heading')).toContainText('Garage');
  });


  test.afterAll('Delete user after successful registration', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByLabel('Email').fill('kyym13+aqe6@gmail.com');
    await page.getByLabel('Password').fill('Qa12345678');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('button', { name: 'User photo My profile' }).click();
    await page.getByRole('link', { name: 'Settings', exact: true }).click();
    await page.getByRole('button', { name: 'Remove my account' }).click();
    await page.getByRole('button', { name: 'Remove' }).click();

  });


  test.describe('Field: Name', () => {
    test('Empty field', async ({ page }) => {
      await page.locator('#signupName').click();
      await page.locator('div').filter({ hasText: /^Last name$/ }).click();
      await expect(page.getByText('Name required', { exact: true })).toBeVisible();
    });

    test('Wrong data', async ({ page }) => {
      await page.locator('#signupName').fill('123qwe');
      await page.locator('#signupLastName').click();
      await expect(page.locator('form')).toContainText('Name is invalid');
    });
    test('Wrong length ', async ({ page }) => {
      await page.locator('#signupName').fill('a');
      await page.locator('#signupLastName').click();
      await expect(page.getByRole('paragraph')).toContainText('Name has to be from 2 to 20 characters long');
    });
    test('Border color red', async ({ page }) => {
      await page.locator('#signupName').fill('a');
      await page.locator('#signupLastName').click();
      await expect(page.getByRole('paragraph')).toContainText('Name has to be from 2 to 20 characters long');
      await expect(page.getByRole('paragraph')).toHaveCSS('color', 'rgb(220, 53, 69)')
    });
  });

  test.describe('Field: Last Name', () => {
    test('Empty field', async ({ page }) => {
      await page.locator('#signupLastName').click();
      await page.getByLabel('Name').click();
      await expect(page.locator('form')).toContainText('Last name required');
    });

    test('Wrong data last name', async ({ page }) => {
      await page.locator('#signupLastName').fill('qwe123');
      await page.getByLabel('Name').click();
      await expect(page.locator('form')).toContainText('Last name is invalid');
    });
    test('Wrong length last name ', async ({ page }) => {
      await page.locator('#signupLastName').fill('q');
      await page.getByLabel('Name').click();
      await expect(page.locator('form')).toContainText('Last name has to be from 2 to 20 characters long');
    });
    test('Border color red last name', async ({ page }) => {
      await page.locator('#signupLastName').fill('q');
      await page.getByLabel('Name').click();
      await expect(page.locator('form')).toContainText('Last name has to be from 2 to 20 characters long');
      await expect(page.locator('form')).toHaveCSS('color', 'rgb(55, 58, 60)')
    });
  });
  test.describe('Field: Email', () => {
    test('Wrong data Email', async ({ page }) => {

      await page.getByLabel('Name').fill('qwe@');
      await page.getByLabel('Password', { exact: true }).click();

      await expect(page.locator('form')).toContainText('Email is incorrect');
    });


    test('For empty field Email', async ({ page }) => {
      await page.getByLabel('Name').click();
      await page.getByLabel('Password', { exact: true }).click();

      await expect(page.locator('form')).toContainText('Email required');
    });
    test('Border color red Email', async ({ page }) => {
      await page.getByLabel('Name').click();
      await page.getByLabel('Password', { exact: true }).click();

      await expect(page.locator('form')).toContainText('Email required');
      await expect(page.locator('form')).toHaveCSS('color', 'rgb(55, 58, 60)')
    });
  });
  test.describe('Field: Password', () => {
    test('Wrong data', async ({ page }) => {

      await page.getByLabel('Password', { exact: true }).fill('q');
      await page.getByLabel('Re-enter password').click();

      await expect(page.locator('form')).toContainText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });

    test('For empty field Password', async ({ page }) => {
      await page.getByLabel('Password', { exact: true }).click();
      await page.getByLabel('Re-enter password').click();

      await expect(page.locator('form')).toContainText('Password required');
    });
    test('Border color red Password', async ({ page }) => {
      await page.getByLabel('Password', { exact: true }).click();
      await page.getByLabel('Re-enter password').click();

      await expect(page.locator('form')).toContainText('Password required');
      await expect(page.locator('form')).toHaveCSS('color', 'rgb(55, 58, 60)')
    });
  });
  test.describe('Field: Re-enter Password', () => {
    test('Wrong data', async ({ page }) => {

      await page.getByLabel('Password', { exact: true }).fill('Qa12345678');

      await page.getByLabel('Re-enter password').fill('Qawsed1234');
      await page.locator('div').filter({ hasText: /^Register$/ }).click();

      await expect(page.getByRole('paragraph')).toContainText('Passwords do not match');
    });

    test('For empty field Re-enter Password', async ({ page }) => {

      await page.getByLabel('Password', { exact: true }).fill('Qa12345678');
      await page.getByLabel('Re-enter password').click();
      await page.locator('div').filter({ hasText: /^Register$/ }).click();

      await expect(page.getByRole('paragraph')).toContainText('Re-enter password required');
    });
    test('Border color red Re-enter Password', async ({ page }) => {

      await page.getByLabel('Password', { exact: true }).fill('Qa12345678');
      await page.getByLabel('Re-enter password').click();
      await page.locator('div').filter({ hasText: /^Register$/ }).click();

      await expect(page.getByRole('paragraph')).toContainText('Re-enter password required');
      await expect(page.getByRole('paragraph')).toHaveCSS('color', 'rgb(220, 53, 69)')
    });
  });

  test.describe('Button "Register"', () => {
    test('The button is disabled if data incorrect', async ({ page }) => {
     
      await page.locator('#signupName').fill('Oleg');

      await page.locator('#signupLastName').fill('Kumogorodskyy');

      await page.getByLabel('Name').fill('kyym13+aqe6@gmail.com');

      await page.getByLabel('Password', { exact: true }).fill('Qa12345678');

      await page.getByLabel('Re-enter password').fill('Qa12345679');
      const registerButton = page.getByRole('button', { name: 'Register' });
      await expect(registerButton).toBeDisabled();
    });
  });

});
