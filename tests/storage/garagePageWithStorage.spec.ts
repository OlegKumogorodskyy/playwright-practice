import { test, expect, Page, chromium } from '@playwright/test';
import { GaragePage } from '../../page-objects/pages/garagePage';
import { correctEmail, correctPassword } from '../../test-data/credentials';

test.describe('Garage tests', () => {

    test.describe('Tests with [Audi] [A8]', () => {
        let garagePage: GaragePage;
        test.use({ storageState: './test-data/states/userOneState.json' })

        test.beforeEach(async ({ page }) => {
            garagePage = new GaragePage(page);
            await garagePage.open();
            await garagePage.clickAddCarButton();
        })

        test.afterEach(async () => {
            await garagePage.removeLastCar();
        })
    
        test(' Add [Audi] [A8] car to the garage', async () => {
            await garagePage.selectBrand('Audi');
            await garagePage.selectModel('A8');
            await garagePage.enterMileage('222');
            await garagePage.clickAddButton();
            await expect(garagePage.firstCarName).toHaveText('Audi A8');
        });

        test(' Сhange creation date', async () => {
            await garagePage.selectBrand('Audi');
            await garagePage.selectModel('A8');
            await garagePage.enterMileage('222');
            await garagePage.clickAddButton();
            await garagePage.fillUpdateMileageField('235');
            await expect(garagePage.updateMileageField).toBeVisible();
        })

        test(' Change model car', async () => {
            await garagePage.selectBrand('Audi');
            await garagePage.selectModel('A8');
            await garagePage.enterMileage('222');
            await garagePage.clickAddButton();
            await garagePage.clickEditCarIcon();
            await garagePage.selectModel('TT');
            await garagePage.clickSaveButton();
            await expect(garagePage.firstCarName).toHaveText('Audi TT');
        })

        test(' Change brand car', async () => {
            await garagePage.selectBrand('Audi');
            await garagePage.selectModel('A8');
            await garagePage.enterMileage('222');
            await garagePage.clickAddButton();
            await garagePage.clickEditCarIcon();
            await garagePage.selectBrand('BMW');
            await garagePage.selectModel('X5');
            await garagePage.clickSaveButton();
            await expect(garagePage.firstCarName).toHaveText('BMW X5');
        })

        test(' Check mileage field', async () => {
            await garagePage.selectBrand('Audi');
            await garagePage.selectModel('A8');
            await garagePage.enterMileage('222');
            await garagePage.clickAddButton();
            await garagePage.clickEditCarIcon();
            await garagePage.enterMileage('3333333333');
            await garagePage.clickEditCarDate();
            await expect(garagePage.errorMileage).toHaveText('Mileage has to be from 0 to 999999');
            await garagePage.clickCloseIcon();
        })

        test(' Logo Audi', async () => {
            await garagePage.selectBrand('Audi');
            await garagePage.selectModel('A8');
            await garagePage.enterMileage('222');
            await garagePage.clickAddButton();
            await expect(garagePage.logoAudi).toBeVisible();
        })

    
    test(' Add [BMW] [X5] car to the garage', async () => {
        await garagePage.selectBrand('BMW');
        await garagePage.selectModel('X5');
        await garagePage.enterMileage('666');
        await garagePage.clickAddButton();
        await expect(garagePage.firstCarName).toHaveText('BMW X5');
    })

    test(' Add [Ford] [Fiesta] car to the garage', async () => {
        await garagePage.selectBrand('Ford');
        await garagePage.selectModel('Fiesta');
        await garagePage.enterMileage('999');
        await garagePage.clickAddButton();
        await expect(garagePage.firstCarName).toHaveText('Ford Fiesta');
    })

    test(' Add [Ford] [Focus] car to the garage', async () => {
        await garagePage.selectBrand('Ford');
        await garagePage.selectModel('Focus');
        await garagePage.enterMileage('888');
        await garagePage.clickAddButton();
        await expect(garagePage.firstCarName).toHaveText('Ford Focus');
    })

    test(' Add [Porsche] [911] car to the garage', async () => {
        await garagePage.selectBrand('Porsche');
        await garagePage.selectModel('911');
        await garagePage.enterMileage('777');
        await garagePage.clickAddButton();
        await expect(garagePage.firstCarName).toHaveText('Porsche 911');
    })
});
});
