import { Page, Locator, expect } from '@playwright/test';

export class FactorialCalcPage {
    private readonly numberInput: Locator;
    private readonly calculateButton: Locator;
    private readonly resultLabel: Locator;

    constructor(readonly page: Page) {
        this.numberInput = this.page.locator('#number');
        this.calculateButton = this.page.locator('//button[@id="getFactorial"]');
        this.resultLabel = this.page.locator('#resultDiv');
    }

    async calculateFactorial(value: string): Promise<void> {
        await this.numberInput.fill(value);
        return this.calculateButton.click();
    }

    async getResult(): Promise<string | null> {
        await this.resultLabel.waitFor({ state: 'visible' });
        await expect(this.resultLabel).toBeVisible();
        return this.resultLabel.textContent();
    }
}