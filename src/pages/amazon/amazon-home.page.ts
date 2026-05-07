import { expect } from '@playwright/test';
import { test } from '@test-setup/fixtures';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

/**
 * Amazon Home page object.
 *
 * Covers recorded steps:
 * 1) Navigate to Amazon homepage
 * 2) Enter search term into Amazon search bar
 * 3) Click the search submit button
 */
export class AmazonHomePage extends BasePage {
    // ==================== Locators ====================

    /** Amazon search input (searchbox). */
    private readonly searchField = this.page.getByRole('searchbox', { name: 'Search Amazon' });

    /** Search submit button (Go). */
    private readonly searchGoButton = this.page.getByRole('button', { name: 'Go', exact: true });

    // ==================== Actions ====================

    /**
     * Step 1: Navigate to https://www.amazon.com.
     */
    async gotoAmazonHome(): Promise<void> {
        await test.step('Navigate to Amazon homepage', async () => {
            // Recorded step:
            // await page.goto('https://www.amazon.com');
            await this.page.goto('https://www.amazon.com');
        });
    }

    /**
     * Assertion helper: verify the Amazon home page is loaded.
     * Verifies the search box is visible and URL contains amazon.com.
     */
    async verifyHomeLoaded(): Promise<void> {
        await test.step('Verify Amazon homepage loaded', async () => {
            await expect(this.searchField).toBeVisible();
            await expect(this.page).toHaveURL(/amazon\.com/);
        });
    }

    /**
     * Step 2: Fill the Amazon search bar with the provided term.
     */
    async fillSearch(term: string): Promise<void> {
        await test.step(`Fill Amazon search with: ${term}`, async () => {
            // Recorded step:
            // await page.getByRole('searchbox', { name: 'Search Amazon' }).fill('Wireless Mouse');
            await ActionUtils.fill(this.searchField, term, { page: this.page });
        });
    }

    /**
     * Step 3: Submit the search.
     */
    async submitSearch(): Promise<void> {
        await test.step('Submit Amazon search', async () => {
            // Recorded step:
            // await page.getByRole('button', { name: 'Go', exact: true }).click();
            await ActionUtils.click(this.searchGoButton, { page: this.page });
        });
    }
}
