import { expect } from '@playwright/test';
import { INTEGER_ERROR_MESSAGE, RED_COLOR } from '../../data/constants';
import { test } from '../../fixtures/page.fixture';

test('Page has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Factoriall/);
});

test('Error integer indication', async ({ factorialCalcPage }) => {
  expect(await factorialCalcPage.getNumberBorderColor()).not.toContain(RED_COLOR);
  await factorialCalcPage.calculateFactorial('test');
  const result = await factorialCalcPage.getResult();
  expect(result).toEqual(INTEGER_ERROR_MESSAGE);
  expect(await factorialCalcPage.getNumberBorderColor()).toContain(RED_COLOR);
});
