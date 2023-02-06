import { APIRequestContext, APIResponse } from '@playwright/test';
import { FACTORIAL_PATH } from './../data/path';

type GetFactorialFn = (request: APIRequestContext, number: number) => Promise<APIResponse>

export const getFactorial: GetFactorialFn = async (request, number) => request.post(FACTORIAL_PATH, {
    data: `number=${number}`,
    headers: { 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' },
});