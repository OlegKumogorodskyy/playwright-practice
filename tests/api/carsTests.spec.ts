import { test, expect } from '@playwright/test';
import { correctEmail, correctPassword } from '../../test-data/credentials';

test.describe('Garage API tests', () => {
    
    test('/cars/models public request', async ({ request }) => {
        const response = await request.get('/api/cars/models');

        const body = await response.json();
        console.log(response);
        console.log('---------------------------')
        console.log(body);
        console.log('---------------------------')
        const allCars = body.data;
        const carTitle = body.data[10].title;

        expect(carTitle).toEqual('Fiesta');
        expect(allCars.length).toEqual(23);
    });

    test('/cars/ private request', async ({ request }) => {
        console.log('---------STORAGE STATE:------------------');
        console.log(await request.storageState());
        console.log('---------------------------');

        const authRequest = await request.post('/api/auth/signin', {
            data: {
                "email": correctEmail,
                "password": correctPassword,
                "remember": true
            }
        })

        const response = await request.get('/api/cars/');

        const body = await response.json();
        console.log(response);
        console.log('---------------------------');
        console.log(body);
        console.log('---------STORAGE STATE:------------------');
        console.log(await request.storageState());
        console.log('---------------------------');

    });

    test('/cars/ private request 2 Failed', async ({ request }) => {
        console.log('---------STORAGE STATE2:------------------');
        console.log(await request.storageState());
        console.log('---------------------------');

        const response = await request.get('/api/cars/');
        const body = await response.json();
        console.log(response);
        console.log('---------------------------');
        console.log(body);
        console.log('---------STORAGE STATE:------------------');
        console.log(await request.storageState());
        console.log('---------------------------');

    });

});


test.describe('Garage API tests with auth in beforeEach', () => {
    test.beforeEach(async ({ request }) => {
        const authRequest = await request.post('/api/auth/signin', {
            data: {
                "email": correctEmail,
                "password": correctPassword,
                "remember": true
            }
        })
    })

    // test.afterEach(async () => {
    //     await garagePage.removeLastCar();


    test('/cars/ private request', async ({ request }) => {
        const response = await request.get('/api/cars/');

        const body = await response.json();
        console.log(response);
        console.log('---------------------------');
        console.log(body);

    });

    test('/cars/ private request 2', async ({ request }) => {
        const response = await request.get('/api/cars/');

        const body = await response.json();
        console.log(response);
        console.log('---------------------------');
        console.log(body);

    });

    test('/cars/ private request 3', async ({ request }) => {
        const response = await request.get('/api/cars/');

        const body = await response.json();
        console.log(response);
        console.log('---------------------------');
        console.log(body);

    });

    test('/cars/ private request 4', async ({ request }) => {
        const response = await request.get('/api/cars/');

        const body = await response.json();
        console.log(response);
        console.log('---------------------------');
        console.log(body);

    });
});




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


    test('/cars/ private request', async ({ request }) => {

        const response = await request.get('/api/cars/', {
            headers: {
                'Cookie': `sid=${sid}`
            }
        });

        const body = await response.json();
        console.log(response);
        console.log('---------------------------');
        console.log(body);

    });


    test('/cars/ private request 2', async ({ request }) => {

        const response = await request.get('/api/cars/', {
            headers: {
                'Cookie': `sid=${sid}`
            }
        });

        const body = await response.json();
        console.log(response);
        console.log('---------------------------');
        console.log(body);

    });


    test('/cars/ private request 3', async ({ request }) => {

        const response = await request.get('/api/cars/', {
            headers: {
                'Cookie': `sid=${sid}`
            }
        });

        const body = await response.json();
        console.log(response);
        console.log('---------------------------');
        console.log(body);

    });


    test('/cars/ private request 4', async ({ request }) => {

        const response = await request.get('/api/cars/', {
            headers: {
                'Cookie': `sid=${sid}`
            }
        });

        const body = await response.json();
        console.log(response);
        console.log('---------------------------');
        console.log(body);

    });
});


