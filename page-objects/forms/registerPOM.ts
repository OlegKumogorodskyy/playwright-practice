import { expect, type Locator, type Page } from '@playwright/test';
import { RegisterButton } from '../components/RegisterButton';

export class RegisterPOM {
    readonly page: Page;
    readonly nameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly reEnterPasswordInput: Locator;
    readonly registerButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameInput = page.locator('#signupName');
        this.lastNameInput = page.locator('#signupLastName');
        this.emailInput = page.getByLabel('Email');
        this.passwordInput = page.getByLabel('Password', { exact: true });
        this.reEnterPasswordInput = page.getByLabel('Re-enter password');
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.errorMessage = page.getByRole('paragraph');
    }


    async open() {
        const registerButton = new RegisterButton(this.page);
        await registerButton.clickSignUpButton();
    }
    async fillName(name: string) {
        await this.nameInput.fill(name);
    }

    async fillLastName(lastName: string) {
        await this.lastNameInput.fill(lastName);
    }

    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async fillReEnterPassword(password: string) {
        await this.reEnterPasswordInput.fill(password);
    }

    async submitRegistration() {
        await this.registerButton.click();
    }

    async navigate() {
        await this.page.goto('/');
        await this.page.getByRole('button', { name: 'Sign up' }).click();
    }
}
 