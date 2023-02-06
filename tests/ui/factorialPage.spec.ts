import { expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { BAD_REQUEST_ERROR_MESSAGE, getResultTemplate, INTEGER_ERROR_MESSAGE, SERVER_ERROR_MESSAGE } from '../../data';
import { test } from '../../fixtures';
import { mockGetFactorialWith400Error, mockGetFactorialWith500Error } from '../../mocks';

const data = [
  { value: ' 1 ', expectedResult: getResultTemplate('1', '1') },
  { value: '170', expectedResult: getResultTemplate('170', '7.257415615307999e+306') },
  { value: '171', expectedResult: getResultTemplate('171', 'Infinity') },
  { value: '1.1', expectedResult: INTEGER_ERROR_MESSAGE },
  { value: '1,1', expectedResult: INTEGER_ERROR_MESSAGE },
  { value: '@#$&%!~a', expectedResult: INTEGER_ERROR_MESSAGE },
  { value: '1text1', expectedResult: INTEGER_ERROR_MESSAGE },
  { value: '1 1', expectedResult: INTEGER_ERROR_MESSAGE },
  { value: '', expectedResult: INTEGER_ERROR_MESSAGE },
];

test.describe('Factorial page', () => {
  test('should have title', async ({ page }) => {
    await expect(page).toHaveTitle(/Factoriall/);
  });

  data.forEach(({ value, expectedResult }) => {
    test(`should display result of factorial of '${value}'`, async ({ factorialCalcPage }) => {
      await factorialCalcPage.calculateFactorial(value);
      expect(await factorialCalcPage.getResult()).toEqual(expectedResult);
    });
  });

  test('should display server error message', async ({ page, factorialCalcPage }) => {
    allure.issue({
      url: 'none',
      name: 'Nothing happened if server error'
    });

    await mockGetFactorialWith500Error(page);
    await factorialCalcPage.calculateFactorial('1');
    expect(await factorialCalcPage.getResult()).toEqual(SERVER_ERROR_MESSAGE);
  });

  test('should display bad request error meesage', async ({ page, factorialCalcPage }) => {
    allure.issue({
      url: 'none',
      name: 'Nothing happened if request error'
    });

    await mockGetFactorialWith400Error(page);
    await factorialCalcPage.calculateFactorial('-1');
    expect(await factorialCalcPage.getResult()).toEqual(BAD_REQUEST_ERROR_MESSAGE);
  });
});
