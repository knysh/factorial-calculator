import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 600 * 1000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  retries: 0,
  workers: 4,
  reporter: [
    ['list'],
    ['allure-playwright', {
      detail: true,
      suiteTitle: false,
    },]
  ],
  use: {
    baseURL: 'https://qainterview.pythonanywhere.com',
    headless: true,
    navigationTimeout: 30 * 1000,
    actionTimeout: 5000,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'api',
      use: {},
    },
  ],
  outputDir: 'test-results/',
};

export default config;
