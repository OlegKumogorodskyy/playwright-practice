import { expect } from '@playwright/test';
import { test } from '../fixtures/fuelExpensesFixtures'

test.describe('Garage tests with POM', () => {
    test('verify empty message for an empty garage', async ({ fuelExpensesAsGust }) => {
        await expect(fuelExpensesAsGust.emptyGarageMessage).toBeVisible();
    })
});