import { FactorialCalcPage } from './../pages/factorialCalc.page';
import { test as baseTest } from '@playwright/test';

type MyFixtures = {
  openPage: void;
  factorialCalcPage: FactorialCalcPage;
};

export const test = baseTest.extend<MyFixtures>({
  openPage: [async ({ baseURL, page }, use) => {
    if (baseURL) {
      await page.goto(baseURL);
    }

    await use();
  }, { auto: true }],

  factorialCalcPage: ({ page }, use) => use(new FactorialCalcPage(page)),
});