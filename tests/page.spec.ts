import { expect } from '@playwright/test';
import { test } from '../fixtures/page.fixture';

test('Page has title', async ({ page }) => {
  await expect(page).toHaveTitle(/Factoriall/);
});
