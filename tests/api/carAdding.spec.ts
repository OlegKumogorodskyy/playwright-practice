import { test, expect } from '@playwright/test';
import { correctEmail, correctPassword } from '../../test-data/credentials';
import { carBrands } from '../../test-data/api/brands';

test.describe('Garage API tests with auth in beforeAll', () => {
    let sid: string;

    test.beforeAll(async ({ request }) => {
        const authRequest = await request.post('/api/auth/signin', {
            data: {
                "email": correctEmail,
                "password": correctPassword,
                "remember": true
            }
        })

        const cookies = authRequest.headers()['set-cookie'];

        console.log(authRequest.headers())
        if (cookies) {
            const cookieArray = cookies.split('\n');
            for (const cookie of cookieArray) {
                if (cookie.trim().startsWith('sid=')) {
                    sid = (cookie.trim().split('=')[1]).split(';')[0];
                    break;
                }
            }
        }

    })

    test.afterAll('Delete all cars', async ({ request }) => {
        const responseCars = await request.get('/api/cars', {
            headers: {
                'Cookie': `sid=${sid}`
            }
        });

        const responseCarsJson = await responseCars.json();
        const cars = responseCarsJson.data;

        for (const car of cars) {
           const responseDeleteCar = await request.delete(`/api/cars/${car.id}`, {
                headers: {
                    'Cookie': `sid=${sid}`
                }
            });

            console.log(await responseDeleteCar.json());
        }
    });

    test('Create all models of BMW brand', async ({ request }) => {
        const getModelRequest = await request.get(`/api/cars/models?carBrandId=${carBrands.bmw.id}`);
        const getModelRequestJson = await getModelRequest.json();
        const models = getModelRequestJson.data;
        const mileage = Math.floor(Math.random() * 200);

        for (const model of models) {
            const createCarRequest = await request.post('api/cars', {
                headers: {
                    'Cookie': `sid=${sid}`
                },
                data: {
                    "carBrandId": carBrands.bmw.id,
                    "carModelId": model.id,
                    "mileage": mileage
                }
            });

            const createCarRequestJson = await createCarRequest.json();
            console.log(await createCarRequest.json());
            expect(createCarRequestJson.data.carModelId).toEqual(model.id);
        }
    });

    test('Create all models of AUDI brand', async ({ request }) => {
        const getModelRequest = await request.get(`/api/cars/models?carBrandId=${carBrands.audi.id}`);
        const getModelRequestJson = await getModelRequest.json();
        const models = getModelRequestJson.data;
        const mileage = Math.floor(Math.random() * 200);

        for (const model of models) {
            const createCarRequest = await request.post('api/cars', {
                headers: {
                    'Cookie': `sid=${sid}`
                },
                data: {
                    "carBrandId": carBrands.audi.id,
                    "carModelId": model.id,
                    "mileage": mileage
                }
            });
            const createCarRequestJson = await createCarRequest.json();
            console.log(await createCarRequest.json());
            expect(createCarRequestJson.data.carModelId).toEqual(model.id);
        }
    });

    test('Create all models of FORD brand', async ({ request }) => {
        const getModelRequest = await request.get(`/api/cars/models?carBrandId=${carBrands.ford.id}`);
        const getModelRequestJson = await getModelRequest.json();
        const models = getModelRequestJson.data;
        const mileage = Math.floor(Math.random() * 200);

        for (const model of models) {
            const createCarRequest = await request.post('api/cars', {
                headers: {
                    'Cookie': `sid=${sid}`
                },
                data: {
                    "carBrandId": carBrands.ford.id,
                    "carModelId": model.id,
                    "mileage": mileage
                }
            });

            const createCarRequestJson = await createCarRequest.json();
            console.log(await createCarRequest.json());
            expect(createCarRequestJson.data.carModelId).toEqual(model.id);
        }
    });

    test('Create all models of Porsche brand', async ({ request }) => {
        const getModelRequest = await request.get(`/api/cars/models?carBrandId=${carBrands.porsche.id}`);
        const getModelRequestJson = await getModelRequest.json();
        const models = getModelRequestJson.data;
        const mileage = Math.floor(Math.random() * 200);

        for (const model of models) {
            const createCarRequest = await request.post('api/cars', {
                headers: {
                    'Cookie': `sid=${sid}`
                },
                data: {
                    "carBrandId": carBrands.porsche.id,
                    "carModelId": model.id,
                    "mileage": mileage
                }
            });

            const createCarRequestJson = await createCarRequest.json();
            console.log(await createCarRequest.json());
            expect(createCarRequestJson.data.carModelId).toEqual(model.id);
        }
    });

    test('Create all models of Fiat brand', async ({ request }) => {
        const getModelRequest = await request.get(`/api/cars/models?carBrandId=${carBrands.fiat.id}`);
        const getModelRequestJson = await getModelRequest.json();
        const models = getModelRequestJson.data;
        const mileage = Math.floor(Math.random() * 200);

        for (const model of models) {
            const createCarRequest = await request.post('api/cars', {
                headers: {
                    'Cookie': `sid=${sid}`
                },
                data: {
                    "carBrandId": carBrands.fiat.id,
                    "carModelId": model.id,
                    "mileage": mileage
                }
            });

            const createCarRequestJson = await createCarRequest.json();
            console.log(await createCarRequest.json());
            expect(createCarRequestJson.data.carModelId).toEqual(model.id);
        }
    });


    test('Negative: Add car with invalid carBrandId', async ({ request }) => {
        const createCarRequest = await request.post('api/cars', {
            headers: {
                'Cookie': `sid=${sid}`
            },
            data: {
                "carBrandId": 'invalid_brand_id',
                "carModelId": 1,
                "mileage": Math.floor(Math.random() * 200)
            }
        });

        expect(createCarRequest.status()).toBe(400);
    });

    test('Negative: Add car with invalid carModelId', async ({ request }) => {
        const createCarRequest = await request.post('api/cars', {
            headers: {
                'Cookie': `sid=${sid}`
            },
            data: {
                "carBrandId": carBrands.bmw.id,
                "carModelId": 'invalid_model_id',
                "mileage": Math.floor(Math.random() * 200)
            }
        });

        expect(createCarRequest.status()).toBe(400);
    });

    test('Negative: Add car without mileage', async ({ request }) => {
        const createCarRequest = await request.post('api/cars', {
            headers: {
                'Cookie': `sid=${sid}`
            },
            data: {
                "carBrandId": carBrands.bmw.id,
                "carModelId": 1,
                "mileage": null
            }
        });

        expect(createCarRequest.status()).toBe(400);
    });

    test('Negative: Add car without authentication', async ({ request }) => {
        const createCarRequest = await request.post('api/cars', {
            data: {
                "carBrandId": carBrands.bmw.id,
                "carModelId": 1,
                "mileage": Math.floor(Math.random() * 200)
            }
        });

        expect(createCarRequest.status()).toBe(401);
    });

    test('Negative: Add car with high mileage', async ({ request }) => {
        const createCarRequest = await request.post('api/cars', {
            headers: {
                'Cookie': `sid=${sid}`
            },
            data: {
                "carBrandId": carBrands.bmw.id,
                "carModelId": 1,
                "mileage": 1000000
            }
        });

        expect(createCarRequest.status()).toBe(400);
    });
});

