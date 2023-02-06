import { Page } from '@playwright/test';
import { FACTORIAL_PATH } from '../data';

export const mockGetFactorialWith500Error = (page: Page): Promise<void> =>
    page.route(FACTORIAL_PATH, route => route.abort());

export const mockGetFactorialWith400Error = (page: Page): Promise<void> =>
    page.route(FACTORIAL_PATH, route => route.fulfill({
        status: 400,
        contentType: 'text/plain',
        body: 'Bad request'
    }));