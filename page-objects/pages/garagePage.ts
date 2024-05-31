import { expect, type Locator, type Page } from '@playwright/test';
import { SignInForm } from '../forms/signinForm';
import { correctEmail, correctPassword } from '../../test-data/credentials';

export class GaragePage {
    readonly page: Page;
    readonly addCarButton: Locator;
    readonly brandDropdown: Locator;
    readonly modelDropdown: Locator;
    readonly mileageField: Locator;
    readonly addButton: Locator;
    readonly saveButton: Locator;
    readonly firstCarName: Locator;
    readonly updateMileageField: Locator;
    readonly updateButton: Locator;
    readonly editCarIcon: Locator;
    readonly editCarDate: Locator;
    readonly errorMileage: Locator;
    readonly removeCarButton: Locator;
    readonly acceptCarRemovingButton: Locator;
    readonly closeIcon: Locator;
    readonly logoAudi: Locator;
    readonly profileLink: Locator;


    constructor(page: Page) {
        this.page = page;
        this.addCarButton = page.getByText('Add car');
        this.brandDropdown = page.locator('#addCarBrand');
        this.modelDropdown = page.locator('#addCarModel');
        this.mileageField = page.locator('#addCarMileage');
        this.addButton = page.getByText('Add', { exact: true });
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.firstCarName = page.locator('.car_name').first();
        this.updateMileageField = page.locator('app-garage .panel-page_content .car-body app-update-mileage-form > form > input');
        this.updateButton = page.getByRole('button', { name: 'Update' })
        this.editCarIcon = page.locator('.icon-edit').first();
        this.editCarDate = page.locator('#carCreationDate');
        this.errorMileage = page.locator('.invalid-feedback');
        this.removeCarButton = page.locator('.btn-outline-danger');
        this.acceptCarRemovingButton = page.locator('.btn-danger');
        this.closeIcon = page.locator('.close');
        this.logoAudi = page.locator('div .car-logo_img');
        this.profileLink = page.locator('a.btn.btn-white.btn-sidebar.sidebar_btn.-profile');

    }

    async open() {
        await this.page.goto('/');
    }

    async openAsLoggedUser(email: string, password: string) {
        const signInForm = new SignInForm(this.page);
        await signInForm.open();
        await signInForm.loginWithCredentials(correctEmail, correctPassword);
        await expect(this.page.locator('h1')).toHaveText('Garage');
    }

    async clickProfileLink() {
        await this.profileLink.click();
        await expect(this.page.locator('h1')).toHaveText('Profile');
    }

    async clickCloseIcon() {
        await this.closeIcon.click();
    }

    async clickEditCarDate() {
        await this.editCarDate.click();
    }

    async clickSaveButton() {
        await this.saveButton.click();
    }

    async clickAddCarButton() {
        await this.addCarButton.click();
    }

    async selectBrand(brand: string) {
        await this.brandDropdown.selectOption({ label: brand });
    }

    async selectModel(model: string) {
        await this.page.waitForTimeout(1000);
        await this.modelDropdown.selectOption({ label: model });
    }

    async enterMileage(mileage: string) {
        await this.mileageField.fill(mileage);
    }

    async clickAddButton() {
        await this.addButton.click();
    }

    async clickEditCarIcon() {
        await this.editCarIcon.click();
    }

    async fillUpdateMileageField(mileage: string) {
        await this.updateMileageField.fill(mileage);
        await this.updateButton.click();

    }



    async getFirstCarName() {
        return this.firstCarName;
    }

    async removeLastCar() {
        const carsNumberBefore = await this.page.locator('.icon-edit').count();
        await this.editCarIcon.click();
        await this.removeCarButton.click();
        await this.acceptCarRemovingButton.click();
        await expect(this.editCarIcon).toHaveCount(carsNumberBefore - 1);

    }
}