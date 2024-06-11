import { test, expect } from '@playwright/test';
import { correctEmail, correctPassword } from '../../test-data/credentials';
import { carBrands } from '../../test-data/api/brands';
import getAuthCookies from '../../utils/api/auth/getAuthCookies';
import getModelsList from '../../utils/api/garage/getModelsList';
import createCar from '../../utils/api/garage/createCar';
import getUserCars from '../../utils/api/garage/getUserCars';
import deleteCar from '../../utils/api/garage/deleteCar';

test.describe('Garage API tests with auth in beforeAll', () => {
    let cookiesWithAuth;

    test.beforeAll(async ({ }) => {

        cookiesWithAuth = await getAuthCookies(correctEmail, correctPassword);
    });

    test.afterAll('Delete all cars', async ({ }) => {
        const cars = await getUserCars(cookiesWithAuth);
        for (const car of cars) {
            const responseDeleteCar = await deleteCar(cookiesWithAuth, car.id);
            console.log(await responseDeleteCar);
        }
    })

    test('Create all models of BMW brand', async ({ request }) => {

        const models = await getModelsList(carBrands.bmw.id);

        for (const model of models) {
            const mileage = Math.floor(Math.random() * 200);
            const createCarRequestJson = await createCar(cookiesWithAuth, carBrands.bmw.id, model.id, mileage);
            expect(createCarRequestJson.data.carModelId).toEqual(model.id);
        }
    });

    test('Create all models of AUDI brand', async ({ request }) => {
        const models = await getModelsList(carBrands.audi.id);

        for (const model of models) {
            const mileage = Math.floor(Math.random() * 200);
            const createCarRequestJson = await createCar(cookiesWithAuth, carBrands.audi.id, model.id, mileage);
            expect(createCarRequestJson.data.carModelId).toEqual(model.id);
        }
    });

    test('Create all models of FORD brand', async ({ request }) => {
        const models = await getModelsList(carBrands.ford.id);

        for (const model of models) {
            const mileage = Math.floor(Math.random() * 200);
            const createCarRequestJson = await createCar(cookiesWithAuth, carBrands.ford.id, model.id, mileage);
            expect(createCarRequestJson.data.carModelId).toEqual(model.id);
        }
    });

    test('Create all models of Porsche brand', async ({ request }) => {
        const models = await getModelsList(carBrands.porsche.id);

        for (const model of models) {
            const mileage = Math.floor(Math.random() * 200);
            const createCarRequestJson = await createCar(cookiesWithAuth, carBrands.porsche.id, model.id, mileage);
            expect(createCarRequestJson.data.carModelId).toEqual(model.id);
        }
    });

    test('Create all models of Fiat brand', async ({ request }) => {
        const models = await getModelsList(carBrands.fiat.id);

        for (const model of models) {
            const mileage = Math.floor(Math.random() * 200);
            const createCarRequestJson = await createCar(cookiesWithAuth, carBrands.fiat.id, model.id, mileage);
            expect(createCarRequestJson.data.carModelId).toEqual(model.id);
        }
    });


    test('Negative: Add car with invalid carBrandId', async ({ request }) => {
        const mileage = Math.floor(Math.random() * 200);
        const createCarRequestJson = await createCar(cookiesWithAuth, 'invalid_brand_id', 1, mileage);
        expect(createCarRequestJson.status).toBe('error');
    });


    test('Negative: Add car with invalid carModelId', async ({ request }) => {
        const mileage = Math.floor(Math.random() * 200);
        const createCarRequestJson = await createCar(cookiesWithAuth, carBrands.bmw.id, 'invalid_model_id', mileage);
        expect(createCarRequestJson.status).toBe('error');
    });

    test('Negative: Add car without mileage', async ({ request }) => {
        const createCarRequestJson = await createCar(cookiesWithAuth, carBrands.bmw.id, 1, null);
        expect(createCarRequestJson.status).toBe('error');
    });

    test('Negative: Add car without authentication', async ({ request }) => {

        const mileage = Math.floor(Math.random() * 200);
        const createCarRequestJson = await createCar(cookiesWithAuth, carBrands.bmw.id, 1, mileage);
        expect(createCarRequestJson.status).toBe('error');
    });

    test('Negative: Add car with high mileage', async ({ request }) => {
        const createCarRequestJson = await createCar(cookiesWithAuth, carBrands.bmw.id, 1, 1000000);
        expect(createCarRequestJson.status).toBe('error');
    });
});

