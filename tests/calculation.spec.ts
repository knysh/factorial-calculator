import { expect } from '@playwright/test';
import { test } from '../fixtures/page.fixture';

test('Factorial calculation', async ({ factorialCalcPage }) => {
  const value = '3';
  const factorialOfValue = '6';

  await factorialCalcPage.calculateFactorial(value);
  const actualResult = await factorialCalcPage.getResult();
  const expectedResult = `The factorial of ${value} is: ${factorialOfValue}`;

  expect(actualResult).toEqual(expectedResult);
});
