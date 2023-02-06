import { FactorialCalcPage } from './../pages/factorialCalc.page';
import { test as baseTest } from '@playwright/test';
import * as fs from 'fs';

type MyFixtures = {
  openPage: void;
  saveLogs: void;
  factorialCalcPage: FactorialCalcPage;
};

export const test = baseTest.extend<MyFixtures>({
  openPage: [async ({ baseURL, page }, use) => {
    if (baseURL) {
      await page.goto(baseURL);
    }

    await use();
  }, { auto: true }],

  saveLogs: [async ({ page }, use, testInfo) => {
    await use();

    const pageSource = await page.content();
    const screenshot = await page.screenshot();
    if (testInfo.status !== testInfo.expectedStatus) {
      const logFile = testInfo.outputPath('pageSource.txt');
      await fs.promises.writeFile(logFile, pageSource, 'utf8');
      testInfo.attachments.push({ name: 'logs', contentType: 'text/plain', path: logFile });
      await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
    }
  }, { auto: true }],

  factorialCalcPage: ({ page }, use) => use(new FactorialCalcPage(page)),
});