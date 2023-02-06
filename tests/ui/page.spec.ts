import { expect } from '@playwright/test';
import { INTEGER_ERROR_MESSAGE, RED_COLOR } from '../../data';
import { test } from '../../fixtures';

test('Factorial page should have title', async ({ page }) => {
  await expect(page).toHaveTitle(/Factoriall/);
});

test('Error integer should have red indication', async ({ factorialCalcPage }) => {
  expect(await factorialCalcPage.getNumberBorderColor()).not.toContain(RED_COLOR);

  await factorialCalcPage.calculateFactorial('test');
  expect(await factorialCalcPage.getResult()).toEqual(INTEGER_ERROR_MESSAGE);
  expect(await factorialCalcPage.getNumberBorderColor()).toContain(RED_COLOR);
});
