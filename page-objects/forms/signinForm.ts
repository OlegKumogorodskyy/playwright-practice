import { expect, type Locator, type Page } from '@playwright/test';

export class SignInForm {
    readonly page: Page;
    readonly signInButton: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly errorMessageBox: Locator;
    readonly formHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
        this.emailField = page.getByLabel('Email');
        this.passwordField = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessageBox = page.locator('.alert-danger');
        this.formHeader = page.getByRole('heading', { name: 'Log in' });
    }
    async clickSignUpButton() {
        await this.signInButton.click();
    }

    async open() {
        await this.clickSignUpButton();
        await expect(this.formHeader).toBeVisible();

    }

    async loginWithCredentials(email: string, password: string) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}