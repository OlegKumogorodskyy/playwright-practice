import { test, expect } from '@playwright/test';
import { RegisterPOM } from '../page-objects/forms/registerPOM';


test.describe('All tests', () => {
  let registerPOM: RegisterPOM;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    registerPOM = new RegisterPOM(page);
    await registerPOM.open();
  });

  test('Successful registration with valid data', async ({ page }) => {
    await registerPOM.registerValidData('Oleg', 'Kumogorodskyy', 'kyym13+aqe6@gmail.com', 'Qa12345678', 'Qa12345678');
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
    let registerPOM: RegisterPOM;

    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      registerPOM = new RegisterPOM(page);
      await registerPOM.open();
    });

    test('Empty field', async () => {
      await registerPOM.nameInput.click();
      await registerPOM.lastNameInput.click();
      await registerPOM.checkNameFieldValidation('Name required');
    });

    test('Wrong data', async () => {
      await registerPOM.nameInput.fill('123qwe');
      await registerPOM.lastNameInput.click();
      await registerPOM.checkNameFieldValidation('Name is invalid');
    });

    test('Wrong length ', async () => {
      await registerPOM.nameInput.fill('a');
      await registerPOM.lastNameInput.click();
      await registerPOM.checkNameFieldValidation('Name has to be from 2 to 20 characters long');
    });

    test('Border color red', async () => {
      await registerPOM.nameInput.fill('a');
      await registerPOM.lastNameInput.click();
      await registerPOM.checkNameFieldBorderColor();
    });
  });

  test.describe('Field: Last Name', () => {
    let registerPOM: RegisterPOM;

    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      registerPOM = new RegisterPOM(page);
      await registerPOM.open();
    });


    test('Empty field', async () => {
      await registerPOM.lastNameInput.click();
      await registerPOM.nameInput.click();
      await registerPOM.checkLastNameFieldValidation('Last name required');
    });

    test('Wrong data last name', async () => {
      await registerPOM.lastNameInput.fill('qwe123');
      await registerPOM.nameInput.click();
      await registerPOM.checkLastNameFieldValidation('Last name is invalid');
    });

    test('Wrong length last name ', async () => {
      await registerPOM.lastNameInput.fill('q');
      await registerPOM.nameInput.click();
      await registerPOM.checkLastNameFieldValidation('Last name has to be from 2 to 20 characters long');
    });

    test('Border color red last name', async () => {
      await registerPOM.lastNameInput.fill('q');
      await registerPOM.nameInput.click();
      await registerPOM.checkLastNameFieldBorderColor();
    });
  });

  test.describe('Field: Email', () => {
    let registerPOM: RegisterPOM;

    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      registerPOM = new RegisterPOM(page);
      await registerPOM.open();
    });


    test('Wrong data Email', async () => {
      await registerPOM.fillEmail('qwe@');
      await registerPOM.passwordInput.click();
      await registerPOM.checkEmailFieldValidation('Email is incorrect');
    });

    test('For empty field Email', async () => {
      await registerPOM.emailInput.click();
      await registerPOM.passwordInput.click(); 
      await registerPOM.checkEmailFieldValidation('Email required');
    });

    test('Border color red Email', async () => {
      await registerPOM.emailInput.click();
      await registerPOM.passwordInput.click(); 
      await registerPOM.checkEmailFieldValidation('Email required');
      await registerPOM.checkEmailFieldBorderColor();
    });
  });
  test.describe('Field: Re-enter Password', () => {
    let registerPOM: RegisterPOM;

    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      registerPOM = new RegisterPOM(page);
      await registerPOM.open();
    });
    test('Wrong data', async () => {
      await registerPOM.fillPassword('Qa12345678', 'Qawsed1234');
      await registerPOM.submitRegistration();
      await registerPOM.checkReenterPasswordValidation('Passwords do not match');
    });

    test('For empty field Re-enter Password', async () => {
      await registerPOM.fillPassword('Qa12345678', '');
      await registerPOM.submitRegistration();
      await registerPOM.checkReenterPasswordValidation('Re-enter password required');
    });

    test('Border color red Re-enter Password', async () => {
      await registerPOM.fillPassword('Qa12345678', '');
      await registerPOM.submitRegistration();
      await registerPOM.checkReenterPasswordValidation('Re-enter password required');
      await registerPOM.checkReenterPasswordFieldBorderColor();
    });
  });
  // test.describe('Button "Register"', () => {

  //   let registerPOM: RegisterPOM;

  //   test.beforeEach(async ({ page }) => {
  //     await page.goto('/');
  //     registerPOM = new RegisterPOM(page);
  //     await registerPOM.open();
  //   });

  //   test('The button is disabled if data incorrect', async () => {
  //     await registerPOM.registerValidData('Oleg', 'Kumogorodskyy', 'kyym13+aqe6@gmail.com', 'Qa12345678', 'Qa12345679');
  //     await registerPOM.isRegisterButtonDisabled();
  //   });
  // })
})