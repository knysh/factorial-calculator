export const getResultTemplate = (value: string, expectedResult: string): string =>
    `The factorial of ${value} is: ${expectedResult}`;

export const INTEGER_ERROR_MESSAGE: string = 'Please enter an integer';
export const SERVER_ERROR_MESSAGE: string = 'Oops, smth went wrong, please try again';
export const BAD_REQUEST_ERROR_MESSAGE: string = 'Please enter an valid integer';
export const RED_COLOR: string = 'rgb(255, 0, 0)';