import { expect } from '@playwright/test';
import { test } from '../fixtures/garageFixtures';

test.describe('Garage tests', () => {

    test.describe('Tests with [Audi] [A8]', () => {
        test('Add [Audi] [A8] car to the garage', async ({ garagePageAsUser }) => {
            await garagePageAsUser.selectBrand('Audi');
            await garagePageAsUser.selectModel('A8');
            await garagePageAsUser.enterMileage('222');
            await garagePageAsUser.clickAddButton();
            await expect(garagePageAsUser.firstCarName).toHaveText('Audi A8');
        });

        test('Сhange creation date', async ({ garagePageAsUser }) => {
            await garagePageAsUser.selectBrand('Audi');
            await garagePageAsUser.selectModel('A8');
            await garagePageAsUser.enterMileage('222');
            await garagePageAsUser.clickAddButton();
            await garagePageAsUser.fillUpdateMileageField('235');
            await expect(garagePageAsUser.updateMileageField).toBeVisible();
        })

        test('Change model car', async ({ garagePageAsUser, }) => {
            await garagePageAsUser.selectBrand('Audi');
            await garagePageAsUser.selectModel('A8');
            await garagePageAsUser.enterMileage('222');
            await garagePageAsUser.clickAddButton();
            await garagePageAsUser.clickEditCarIcon();
            await garagePageAsUser.selectModel('TT');
            await garagePageAsUser.clickSaveButton();
            await expect(garagePageAsUser.firstCarName).toHaveText('Audi TT');
        })

        test('Change brand car', async ({ garagePageAsUser, }) => {
            await garagePageAsUser.selectBrand('Audi');
            await garagePageAsUser.selectModel('A8');
            await garagePageAsUser.enterMileage('222');
            await garagePageAsUser.clickAddButton();
            await garagePageAsUser.clickEditCarIcon();
            await garagePageAsUser.selectBrand('BMW');
            await garagePageAsUser.selectModel('X5');
            await garagePageAsUser.clickSaveButton();
            await expect(garagePageAsUser.firstCarName).toHaveText('BMW X5');
        })

        test('Check mileage field', async ({ garagePageAsUser, }) => {
            await garagePageAsUser.selectBrand('Audi');
            await garagePageAsUser.selectModel('A8');
            await garagePageAsUser.enterMileage('222');
            await garagePageAsUser.clickAddButton();
            await garagePageAsUser.clickEditCarIcon();
            await garagePageAsUser.enterMileage('3333333333');
            await garagePageAsUser.clickEditCarDate();
            await expect(garagePageAsUser.errorMileage).toHaveText('Mileage has to be from 0 to 999999');
            await garagePageAsUser.clickCloseIcon();
        })

        test('Logo Audi', async ({ garagePageAsUser, }) => {
            await garagePageAsUser.selectBrand('Audi');
            await garagePageAsUser.selectModel('A8');
            await garagePageAsUser.enterMileage('222');
            await garagePageAsUser.clickAddButton();
            await expect(garagePageAsUser.logoAudi).toBeVisible();
        })

    });
    test('Add [BMW] [X5] car to the garage', async ({ garagePageAsUser }) => {
        await garagePageAsUser.selectBrand('BMW');
        await garagePageAsUser.selectModel('X5');
        await garagePageAsUser.enterMileage('666');
        await garagePageAsUser.clickAddButton();
        await expect(garagePageAsUser.firstCarName).toHaveText('BMW X5');
    })

    test('Add [Ford] [Fiesta] car to the garage', async ({ garagePageAsUser }) => {
        await garagePageAsUser.selectBrand('Ford');
        await garagePageAsUser.selectModel('Fiesta');
        await garagePageAsUser.enterMileage('999');
        await garagePageAsUser.clickAddButton();
        await expect(garagePageAsUser.firstCarName).toHaveText('Ford Fiesta');
    })

    test('Add [Ford] [Focus] car to the garage', async ({ garagePageAsUser }) => {
        await garagePageAsUser.selectBrand('Ford');
        await garagePageAsUser.selectModel('Focus');
        await garagePageAsUser.enterMileage('888');
        await garagePageAsUser.clickAddButton();
        await expect(garagePageAsUser.firstCarName).toHaveText('Ford Focus');
    })

    test('Add [Porsche] [911] car to the garage', async ({ garagePageAsUser }) => {
        await garagePageAsUser.selectBrand('Porsche');
        await garagePageAsUser.selectModel('911');
        await garagePageAsUser.enterMileage('777');
        await garagePageAsUser.clickAddButton();
        await expect(garagePageAsUser.firstCarName).toHaveText('Porsche 911');
    })

});



