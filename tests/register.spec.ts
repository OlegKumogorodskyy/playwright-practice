import { test, expect } from '@playwright/test';
import { Register } from '../page-objects/forms/register';


test.describe('All tests', () => {
  let register: Register;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    register = new Register(page);
    await register.open();
  });

  test('Successful registration with valid data', async ({ page }) => {
    await register.registerValidData('Oleg', 'Kumogorodskyy', 'kyym13+aqe6@gmail.com', 'Qa12345678', 'Qa12345678');
    await expect(page.getByRole('heading')).toContainText('Garage');
  });

  // test.afterAll('Delete user after successful registration', async ({ page }) => {
  //   await page.goto('/');
  //   await page.getByRole('button', { name: 'Sign In' }).click();
  //   await page.getByLabel('Email').fill('kyym13+aqe6@gmail.com');
  //   await page.getByLabel('Password').fill('Qa12345678');
  //   await page.getByRole('button', { name: 'Login' }).click();
  //   await page.getByRole('button', { name: 'User photo My profile' }).click();
  //   await page.getByRole('link', { name: 'Settings', exact: true }).click();
  //   await page.getByRole('button', { name: 'Remove my account' }).click();
  //   await page.getByRole('button', { name: 'Remove' }).click();
  // });

  test.describe('Field: Name', () => {
    let register: Register;

    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      register = new Register(page);
      await register.open();
    });

    test('Empty field', async () => {
      await register.nameInput.click();
      await register.lastNameInput.click();
      await register.checkNameFieldValidation('Name required');
    });

    test('Wrong data', async () => {
      await register.nameInput.fill('123qwe');
      await register.lastNameInput.click();
      await register.checkNameFieldValidation('Name is invalid');
    });

    test('Wrong length ', async () => {
      await register.nameInput.fill('a');
      await register.lastNameInput.click();
      await register.checkNameFieldValidation('Name has to be from 2 to 20 characters long');
    });

    test('Border color red', async () => {
      await register.nameInput.fill('a');
      await register.lastNameInput.click();
      await register.checkNameFieldBorderColor();
    });
  });

  test.describe('Field: Last Name', () => {
    let register: Register;

    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      register = new Register(page);
      await register.open();
    });


    test('Empty field', async () => {
      await register.lastNameInput.click();
      await register.nameInput.click();
      await register.checkLastNameFieldValidation('Last name required');
    });

    test('Wrong data last name', async () => {
      await register.lastNameInput.fill('qwe123');
      await register.nameInput.click();
      await register.checkLastNameFieldValidation('Last name is invalid');
    });

    test('Wrong length last name ', async () => {
      await register.lastNameInput.fill('q');
      await register.nameInput.click();
      await register.checkLastNameFieldValidation('Last name has to be from 2 to 20 characters long');
    });

    test('Border color red last name', async () => {
      await register.lastNameInput.fill('q');
      await register.nameInput.click();
      await register.checkLastNameFieldBorderColor();
    });
  });

  test.describe('Field: Email', () => {
    let registerPO: Register;

    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      register = new Register(page);
      await register.open();
    });


    test('Wrong data Email', async () => {
      await register.fillEmail('qwe@');
      await register.passwordInput.click();
      await register.checkEmailFieldValidation('Email is incorrect');
    });

    test('For empty field Email', async () => {
      await register.emailInput.click();
      await register.passwordInput.click(); 
      await register.checkEmailFieldValidation('Email required');
    });

    test('Border color red Email', async () => {
      await register.emailInput.click();
      await register.passwordInput.click(); 
      await register.checkEmailFieldValidation('Email required');
      await register.checkEmailFieldBorderColor();
    });
  });
  test.describe('Field: Re-enter Password', () => {
    let register: Register;

    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      register = new Register(page);
      await register.open();
    });
    test('Wrong data', async () => {
      await register.fillPassword('Qa12345678', 'Qawsed1234');
      await register.submitRegistration();
      await register.checkReenterPasswordValidation('Passwords do not match');
    });

    test('For empty field Re-enter Password', async () => {
      await register.fillPassword('Qa12345678', '');
      await register.submitRegistration();
      await register.checkReenterPasswordValidation('Re-enter password required');
    });

    test('Border color red Re-enter Password', async () => {
      await register.fillPassword('Qa12345678', '');
      await register.submitRegistration();
      await register.checkReenterPasswordValidation('Re-enter password required');
      await register.checkReenterPasswordFieldBorderColor();
    });
  });
  test.describe('Button "Register"', () => {

    let register: Register;

    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      register = new Register(page);
      await register.open();
    });

    test('The button is disabled if data incorrect', async () => {
      await register.buttonIsDisabled('Oleg', 'Kumogorodskyy', 'kyym13+aqe6@gmail.com', 'Qa12345678', 'Qa12345679');
      await register.isRegisterButtonDisabled();
    });
  })
})