import { expect } from '@playwright/test';
import { test } from '../../fixtures/fuelExpensesFixtures'

test.describe('Garage tests in guest mode using Session Storage', () => {
    test('Session Storage is empty by default', async ({ page }) => {
        await page.goto('/');
        await page.getByText('Guest log in').click();
        const data = await page.evaluate(() => window.sessionStorage.getItem('guestData')) ?? '';
        const parsedObject = JSON.parse(data);
        expect(parsedObject.cars).toHaveLength(0);
    })

    test('Verify brand name in Session Storage after car adding', async ({ page }) => {
        await page.goto('/');
        await page.getByText('Guest log in').click();
        await page.getByText('Add car').click();
        await page.locator('#addCarMileage').fill('400');
        await page.waitForTimeout(1000);
        await page.getByText('Add', { exact: true }).click();
        await expect(page.locator('.car_name')).toBeVisible();
        const data = await page.evaluate(() => window.sessionStorage.getItem('guestData')) ?? '';
        const parsedObject = JSON.parse(data);
        const firstCar = parsedObject.cars[0];
        expect(firstCar.brand).toBe('Audi')
    })

    test('Change Session Storage', async ({ page }) => {
        await page.goto('/');
        const data = {
            "expenses": [],
            "cars": [
                {
                    "id": 1,
                    "brand": "Audi",
                    "model": "TT",
                    "logo": "audi.png",
                    "initialMileage": 400,
                    "updatedMileageAt": "2024-05-17T17:43:49.958Z",
                    "carCreatedAt": "2024-05-17T17:43:49.958Z",
                    "carBrandId": 1,
                    "carModelId": 1,
                    "mileage": 400
                },
                {
                    "id": 2,
                    "brand": "Audi",
                    "model": "TT",
                    "logo": "audi.png",
                    "initialMileage": 400,
                    "updatedMileageAt": "2024-05-17T17:43:49.958Z",
                    "carCreatedAt": "2024-05-17T17:43:49.958Z",
                    "carBrandId": 1,
                    "carModelId": 1,
                    "mileage": 400
                },
                {
                    "id": 3,
                    "brand": "Audi",
                    "model": "TT",
                    "logo": "bmw.png",
                    "initialMileage": 400,
                    "updatedMileageAt": "2024-05-17T17:43:49.958Z",
                    "carCreatedAt": "2024-05-17T17:43:49.958Z",
                    "carBrandId": 1,
                    "carModelId": 1,
                    "mileage": 400
                },
                {
                    "id": 4,
                    "brand": "Audi",
                    "model": "TT",
                    "logo": "fsafsafasf.png",
                    "initialMileage": 400,
                    "updatedMileageAt": "2024-05-17T17:43:49.958Z",
                    "carCreatedAt": "2024-05-17T17:43:49.958Z",
                    "carBrandId": 1,
                    "carModelId": 1,
                    "mileage": 400
                }
            ],
            "nextCarId": 2,
            "nextExpenseId": 1
        }
        await page.evaluate((object) => {
            window.sessionStorage.setItem('guestData', JSON.stringify(object))

        }, data)
        await page.getByText('Guest log in').click();
        })

        test('Update car mileage in Session Storage after editing car', async ({ page }) => {
            await page.goto('/');
            await page.getByText('Guest log in').click();
            await page.getByText('Add car').click();
            await page.locator('#addCarMileage').fill('400');
            await page.waitForTimeout(1000);
            await page.getByText('Add', { exact: true }).click();
            await expect(page.locator('.car_name')).toBeVisible();
            await page.locator('.icon-edit').first().click(); 
            await page.locator('#addCarMileage').fill('500'); 
            await page.locator('#addCarMileage').click();
            await page.getByText('Save').click();
            await page.waitForTimeout(1000); 
            const data = await page.evaluate(() => window.sessionStorage.getItem('guestData')) ?? '';
            const parsedObject = JSON.parse(data);
            const updatedCar = parsedObject.cars[0];
            expect(updatedCar.mileage).toBe(500);
        });

        test('Remove car and verify Session Storage update', async ({ page }) => {
            await page.goto('/');
            await page.getByText('Guest log in').click();
            await page.getByText('Add car').click();
            await page.locator('#addCarMileage').fill('400');
            await page.waitForTimeout(1000);
            await page.getByText('Add', { exact: true }).click();
            await expect(page.locator('.car_name')).toBeVisible();
            await page.locator('.icon-edit').first().click();
            await page.getByText('Remove').first().click();
            await page.locator('.btn-danger').first().click(); 
            await page.waitForTimeout(1000);
            const data = await page.evaluate(() => window.sessionStorage.getItem('guestData')) ?? '';
            const parsedObject = JSON.parse(data);
            expect(parsedObject.cars).toHaveLength(0); 
        });

        test('Clear Session Storage after guest logout', async ({ page }) => {
            await page.goto('/');
            await page.getByText('Guest log in').click();
            await page.getByText('Add car').click();
            await page.locator('#addCarMileage').fill('400');
            await page.waitForTimeout(1000);
            await page.getByText('Add', { exact: true }).click();
            await expect(page.locator('.car_name')).toBeVisible();
        
            // Log out as guest
            await page.getByText('Log out').click(); 
            await page.waitForTimeout(1000); 
        
            const data = await page.evaluate(() => window.sessionStorage.getItem('guestData'));
            expect(data).toBeNull(); 
        });
        
        
        
});