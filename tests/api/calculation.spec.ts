import { allure } from 'allure-playwright';
import { getFactorial } from './../../clients/factorialClient';
import { test, expect } from '@playwright/test';

const validData = [
  {
    value: 0,
    expectedResult: 1,
  }, {
    value: 1,
    expectedResult: 1,
  }, {
    value: 170,
    expectedResult: 7.257415615307999e+306,
  }, {
    value: 991,
    expectedResult: Infinity,
  }
];

const invalidValues = [992, -1, 1.2];

test.describe('Factorial calculation', () => {
  test.describe('Valid values', () => {
    for (const validValues of validData) {
      test(`Value: '${validValues.value}'`, async ({ request }) => {
        const factorialResult = await getFactorial(request, validValues.value);

        expect(factorialResult.ok()).toBeTruthy();
        expect(await factorialResult.json()).toEqual({
          answer: validValues.expectedResult
        });
      });
    }
  });

  test.describe('Invalid values', () => {
    for (const invalidValue of invalidValues) {
      test(`Value: ${invalidValue}`, async ({ request }) => {
        allure.issue({
          url: 'none',
          name: 'Expected 400 Bad request if provided parameter is invalid'
        });
        const factorialResult = await getFactorial(request, invalidValue);
        expect(factorialResult.status()).toEqual(400);
      });
    }
  });
});
