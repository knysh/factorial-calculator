import { FACTORIAL_PATH } from './../data/path';
import { APIRequestContext, APIResponse } from "playwright-core";

export const getFactorial = async (request: APIRequestContext, number: number): Promise<APIResponse> => {
    return request.post(FACTORIAL_PATH, {
        data: `number=${number}`,
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    });
}