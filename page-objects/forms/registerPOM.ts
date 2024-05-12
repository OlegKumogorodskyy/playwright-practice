import { expect, type Locator, type Page } from '@playwright/test';
export class RegisterPOM {
    readonly page: Page;
    readonly signUpButton: Locator;
    readonly nameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly reEnterPasswordInput: Locator;
    readonly registerButton: Locator;
    readonly errorMessage: Locator;
    readonly clickRegister: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signUpButton = page.getByRole('button', { name: 'Sign up' });
        this.nameInput = page.locator('#signupName');
        this.lastNameInput = page.locator('#signupLastName');
        this.emailInput = page.getByLabel('Email');
        this.passwordInput = page.getByLabel('Password', { exact: true });
        this.reEnterPasswordInput = page.getByLabel('Re-enter password');
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.errorMessage = page.getByRole('paragraph');
        this.clickRegister = page.locator('div').filter({ hasText: /^Register$/ });
    }

    async clickSignUpButton() {
        await this.signUpButton.click();
    }

    async open() {
        await this.clickSignUpButton();
    }

    async registerValidData(name: string, lastName: string, email: string, password: string, reenterPassword: string) {
        await this.nameInput.fill(name);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.reEnterPasswordInput.fill(reenterPassword);
        await this.registerButton.click();
    }

    async submitRegistration() {
        await this.clickRegister.click();
    }

    async checkNameFieldValidation(message: string) {
        await expect(this.errorMessage).toHaveText(message);
    }

    async checkLastNameFieldValidation(message: string) {
        await expect(this.errorMessage).toHaveText(message);
    }

    async checkEmailFieldValidation(message: string) {
        await expect(this.errorMessage).toHaveText(message);
    }

    async checkPasswordValidation(message: string) {
        await expect(this.errorMessage).toHaveText(message);
    }

    async checkReenterPasswordValidation(message: string) {
        await expect(this.errorMessage).toHaveText(message);
    }

    async checkNameFieldBorderColor() {
        await expect(this.nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    }

    async checkLastNameFieldBorderColor() {
        await expect(this.lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    }

    async checkEmailFieldBorderColor() {
        await expect(this.emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    }

    async checkPasswordFieldBorderColor() {
        await expect(this.passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    }

    async checkReenterPasswordFieldBorderColor() {
        await expect(this.passwordInput).toHaveCSS('border-color', 'rgb(206, 212, 218)');
    }

    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async fillPassword(password: string, reenterPassword: string) {
        await this.passwordInput.fill(password);
        await this.reEnterPasswordInput.fill(reenterPassword);
    }

    async isRegisterButtonDisabled() {
        await expect(this.registerButton).toBeDisabled();
    }

}