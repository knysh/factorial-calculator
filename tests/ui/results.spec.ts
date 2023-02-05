import { mockGetFactorialWith400Error } from './../../utils/mockUtil';
import { INTEGER_ERROR_MESSAGE, SERVER_ERROR_MESSAGE, BAD_REQUEST_ERROR_MESSAGE } from './../../data/constants';
import { expect } from '@playwright/test';
import { getResultTemplate } from '../../data/constants';
import { test } from '../../fixtures/page.fixture';
import { mockGetFactorialWith500Error } from '../../utils/mockUtil';

const data = [
  {
    value: ' 1 ',
    expectedResult: getResultTemplate('1', '1'),
  }, {
    value: '170',
    expectedResult: getResultTemplate('170', '7.257415615307999e+306'),
  }, {
    value: '171',
    expectedResult: getResultTemplate('171', 'Infinity'),
  }, {
    value: '1.1',
    expectedResult: INTEGER_ERROR_MESSAGE,
  }, {
    value: '1,1',
    expectedResult: INTEGER_ERROR_MESSAGE,
  }, {
    value: '@#$&%!~a',
    expectedResult: INTEGER_ERROR_MESSAGE,
  }, {
    value: '1text1',
    expectedResult: INTEGER_ERROR_MESSAGE,
  }, {
    value: '1 1',
    expectedResult: INTEGER_ERROR_MESSAGE,
  }, {
    value: '',
    expectedResult: INTEGER_ERROR_MESSAGE,
  }
];

test.describe('Result of factorial calculation', () => {
  for (const keyValue of data) {
    test(`Factorial of '${keyValue.value}'`, async ({ factorialCalcPage }) => {
      await factorialCalcPage.calculateFactorial(keyValue.value);
      const actualResult = await factorialCalcPage.getResult();
      expect(actualResult).toEqual(keyValue.expectedResult);
    });
  }
});

test('Server error test', async ({ page, factorialCalcPage }) => {
  await mockGetFactorialWith500Error(page);
  await factorialCalcPage.calculateFactorial('1');
  const actualResult = await factorialCalcPage.getResult();
  expect(actualResult).toEqual(SERVER_ERROR_MESSAGE);
});

test('Bad request error test', async ({ page, factorialCalcPage }) => {
  await mockGetFactorialWith400Error(page);
  await factorialCalcPage.calculateFactorial('-1');
  const actualResult = await factorialCalcPage.getResult();
  expect(actualResult).toEqual(BAD_REQUEST_ERROR_MESSAGE);
});
