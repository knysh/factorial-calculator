import { allure } from 'allure-playwright';
import { test, expect } from '@playwright/test';
import { getFactorial } from '../../clients';

const validData = [
  { value: 0, expectedResult: 1, },
  { value: 1, expectedResult: 1, },
  { value: 170, expectedResult: 7.257415615307999e+306, },
  { value: 991, expectedResult: Infinity, }
];

const invalidValues = [992, -1, 1.2];

test.describe('Factorial calculation', () => {
  test.describe('Valid values', () => {
    validData.forEach(({ value, expectedResult }) => {
      test(`Factorial of '${value}' should return '${expectedResult}'`, async ({ request }) => {
        const factorialResult = await getFactorial(request, value);

        expect(factorialResult.ok()).toBeTruthy();
        expect(await factorialResult.json()).toEqual({ answer: expectedResult });
      });
    });
  });

  test.describe('Invalid values', () => {
    invalidValues.forEach(invalidValue => {
      test(`Factorial of '${invalidValue}' should return 400 Bad request`, async ({ request }) => {
        allure.issue({
          url: 'none',
          name: 'Expected 400 Bad request if provided parameter is invalid'
        });
        const factorialResult = await getFactorial(request, invalidValue);
        expect(factorialResult.status()).toEqual(400);
      });
    });
  });
});
