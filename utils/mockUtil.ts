import { FACTORIAL_PATH } from './../data/path';
import { Page } from '@playwright/test';

export const mockGetFactorialWith500Error = async (page: Page): Promise<void> => {
    return page.route(FACTORIAL_PATH, async route => {
        return route.abort();
    });
};

export const mockGetFactorialWith400Error = async (page: Page): Promise<void> => {
    return page.route(FACTORIAL_PATH, async route => {
        return route.fulfill({
            status: 400,
            contentType: 'text/plain',
            body: 'Bad request'
        });
    });
};