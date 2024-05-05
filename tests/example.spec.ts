import { test, expect } from '@playwright/test';

test.describe('Positive testing of the registration form', () => {
  test('Successful registration with valid data', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('#signupName').fill('Oleg');
    await page.locator('#signupLastName').fill('Kumogorodskyy');
    await page.getByLabel('Email').fill('kyym13+aqe6@gmail.com');
    await page.getByLabel('Password', { exact: true }).click();
    await page.getByLabel('Password', { exact: true }).fill('Qa12345678');
    await page.getByLabel('Re-enter password').fill('Qa12345678');
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page.getByRole('heading')).toContainText('Garage');

  });

  test('Delete user after successful registration', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('kyym13+aqe6@gmail.com');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('Qa12345678');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('button', { name: 'User photo My profile' }).click();
    await page.getByRole('link', { name: 'Settings', exact: true }).click();
    await page.getByRole('button', { name: 'Remove my account' }).click();
    await page.getByRole('button', { name: 'Remove' }).click();

  });
});

test.describe('Field: Name', () => {
  test('Empty field', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('#signupName').click();
    await page.locator('div').filter({ hasText: /^Last name$/ }).click();
    await expect(page.getByText('Name required', { exact: true })).toBeVisible();

  });
});
test.describe('Field: Name1', () => {
  test('Wrong data', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('#signupName').click();
    await page.locator('#signupName').fill('123qwe');
    await page.locator('#signupLastName').click();
    await expect(page.locator('form')).toContainText('Name is invalid');
  });
});
test.describe('Field: Name2', () => {
  test('Wrong length ', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('#signupName').click();
    await page.locator('#signupName').fill('a');
    await page.locator('#signupLastName').click();
    await expect(page.getByRole('paragraph')).toContainText('Name has to be from 2 to 20 characters long');
  });
});

test.describe('Field: Name3', () => {
  test('Border color red', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('#signupName').click();
    await page.locator('#signupName').fill('a');
    await page.locator('#signupLastName').click();
    await expect(page.getByRole('paragraph')).toContainText('Name has to be from 2 to 20 characters long');
    await expect(page.getByRole('paragraph')).toHaveCSS('color', 'rgb(220, 53, 69)')
  });
});

test.describe('Field: Last Name', () => {
  test('Empty field', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('#signupLastName').click();
    await page.getByLabel('Name').click();
    await page.getByText('Last name required').click();
    await expect(page.locator('form')).toContainText('Last name required');

  });
});
test.describe('Field: Last Name1', () => {
  test('Wrong data', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('#signupLastName').click();
    await page.locator('#signupLastName').fill('qwe123');
    await page.getByLabel('Name').click();
    await page.getByText('Last name is invalid').click();
    await expect(page.locator('form')).toContainText('Last name is invalid');
  });
});
test.describe('Field: Last Name2', () => {
  test('Wrong length ', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('#signupLastName').click();
    await page.locator('#signupLastName').fill('q');
    await page.getByLabel('Name').click();
    await page.getByText('Last name has to be from 2 to').click();
    await expect(page.locator('form')).toContainText('Last name has to be from 2 to 20 characters long');
  });
});

test.describe('Field: Last Name3', () => {
  test('Border color red', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('#signupLastName').click();
    await page.locator('#signupLastName').fill('q');
    await page.getByLabel('Name').click();
    await page.getByText('Last name has to be from 2 to').click();
    await expect(page.locator('form')).toContainText('Last name has to be from 2 to 20 characters long');
    await expect(page.locator('form')).toHaveCSS('color', 'rgb(55, 58, 60)')
  });
});

test.describe('Field: Email', () => {
  test('Wrong data', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.getByLabel('Name').click();
    await page.getByLabel('Name').fill('qwe@');
    await page.getByLabel('Password', { exact: true }).click();
    await page.getByText('Email is incorrect').click();
    await expect(page.locator('form')).toContainText('Email is incorrect');

  });
});
test.describe('Field: Email1', () => {
  test('For empty field', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.getByLabel('Name').click();
    await page.getByLabel('Password', { exact: true }).click();
    await page.getByText('Email required').click();
    await expect(page.locator('form')).toContainText('Email required');
  });
});
test.describe('Field: Email2', () => {
  test('Border color red', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.getByLabel('Name').click();
    await page.getByLabel('Password', { exact: true }).click();
    await page.getByText('Email required').click();
    await expect(page.locator('form')).toContainText('Email required');
    await expect(page.locator('form')).toHaveCSS('color', 'rgb(55, 58, 60)')
  });
});

test.describe('Field: Password', () => {
  test('Wrong data', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.getByLabel('Password', { exact: true }).click();
    await page.getByLabel('Password', { exact: true }).fill('q');
    await page.getByLabel('Re-enter password').click();
    await page.getByText('Password has to be from 8 to').click();
    await expect(page.locator('form')).toContainText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');

  });
});
test.describe('Field: Password1', () => {
  test('For empty field', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.getByLabel('Password', { exact: true }).click();
    await page.getByLabel('Re-enter password').click();
    await page.getByText('Password required').click();
    await expect(page.locator('form')).toContainText('Password required');
  });
});
test.describe('Field: Password2', () => {
  test('Border color red', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.getByLabel('Password', { exact: true }).click();
    await page.getByLabel('Re-enter password').click();
    await page.getByText('Password required').click();
    await expect(page.locator('form')).toContainText('Password required');
    await expect(page.locator('form')).toHaveCSS('color', 'rgb(55, 58, 60)')
  });
});

test.describe('Field: Re-enter Password', () => {
  test('Wrong data', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.getByLabel('Password', { exact: true }).click();
    await page.getByLabel('Password', { exact: true }).fill('Qa12345678');
    await page.getByLabel('Re-enter password').click();
    await page.getByLabel('Re-enter password').fill('Qawsed1234');
    await page.locator('div').filter({ hasText: /^Register$/ }).click();
    await page.getByText('Passwords do not match').click();
    await expect(page.getByRole('paragraph')).toContainText('Passwords do not match');
  });
});
test.describe('Field: Re-enter Password1', () => {
  test('For empty field', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.getByLabel('Password', { exact: true }).click();
    await page.getByLabel('Password', { exact: true }).fill('Qa12345678');
    await page.getByLabel('Re-enter password').click();
    await page.locator('div').filter({ hasText: /^Register$/ }).click();
    await page.getByText('Re-enter password required').click();
    await expect(page.getByRole('paragraph')).toContainText('Re-enter password required');
  });
});
test.describe('Field: Re-enter Password2', () => {
  test('Border color red', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.getByLabel('Password', { exact: true }).click();
    await page.getByLabel('Password', { exact: true }).fill('Qa12345678');
    await page.getByLabel('Re-enter password').click();
    await page.locator('div').filter({ hasText: /^Register$/ }).click();
    await page.getByText('Re-enter password required').click();
    await expect(page.getByRole('paragraph')).toContainText('Re-enter password required');
    await expect(page.getByRole('paragraph')).toHaveCSS('color', 'rgb(220, 53, 69)')
  });
});

test.describe('Button "Register"', () => {
  test('The button is disabled if data incorrect', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Sign up' }).click();
    await page.locator('#signupName').click();
    await page.locator('#signupName').fill('Oleg');
    await page.locator('#signupLastName').click();
    await page.locator('#signupLastName').fill('Kumogorodskyy');
    await page.getByLabel('Name').click();
    await page.getByLabel('Name').fill('kyym13+aqe123@gmail.com');
    await page.getByLabel('Password', { exact: true }).click();
    await page.getByLabel('Password', { exact: true }).fill('Qa12345678');
    await page.getByLabel('Re-enter password').click();
    await page.getByLabel('Re-enter password').fill('Qa12345679');
    const registerButton = page.getByRole('button', { name: 'Register' });
    await expect(registerButton).toBeDisabled();
  });
});



