import { Page, Locator, expect } from '@playwright/test';

export class FactorialCalcPage {

    readonly headerLabel: Locator;
    readonly numberInput: Locator;
    readonly calculateButton: Locator;
    readonly resultLabel: Locator;

    constructor(readonly page: Page) {
        this.headerLabel = this.page.locator('h1');
        this.numberInput = this.page.locator('#number');
        this.calculateButton = this.page.locator('//button[@id="getFactorial"]');
        this.resultLabel = this.page.locator('#resultDiv');
    }

    async calculateFactorial(value: string): Promise<void> {
        await this.numberInput.fill(value);
        return this.calculateButton.click();
    }

    async getResult(): Promise<string | null> {
        await expect(this.resultLabel).toBeVisible();
        return this.resultLabel.textContent();
    }
}