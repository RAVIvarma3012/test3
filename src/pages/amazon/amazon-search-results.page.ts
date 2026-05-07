import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

/**
 * Amazon Search Results page object.
 *
 * Covers recorded step:
 * - Step 4: Open the selected product from search results.
 */
export class AmazonSearchResultsPage extends BasePage {
    /** Recorded locator for the selected product link (from the recording). */
    private readonly selectedProductLink: Locator;

    constructor(page: Page) {
        super(page);
        this.selectedProductLink = this.page.getByRole('link', {
            name: 'Logitech M185 Wireless Mouse, 2.4GHz with USB Mini Receiver, 12-Month Battery Life, 1000 DPI Optical Tracking, Ambidextrous PC/Mac/Laptop - Swift Grey',
            exact: true,
        });
    }

    /**
     * Helper to verify the search results page is loaded.
     *
     * Uses a lightweight URL assertion and also ensures the recorded product link is visible.
     */
    async verifyResultsLoaded(): Promise<void> {
        this.logStep('Verify Amazon search results loaded');
        await expect(this.page).toHaveURL(/\/s\?k=/);
        await expect(this.selectedProductLink).toBeVisible();
    }

    /**
     * Step 4 (recorded): Open the selected product from search results.
     *
     * Recorded Playwright step:
     * `await page.getByRole('link', { name: 'Logitech M185 Wireless Mouse, 2.4GHz with USB Mini Receiver, 12-Month Battery Life, 1000 DPI Optical Tracking, Ambidextrous PC/Mac/Laptop - Swift Grey', exact: true }).click();`
     */
    async openSelectedProduct(): Promise<void> {
        this.logStep('Open selected product from search results');
        await ActionUtils.click(this.selectedProductLink, { page: this.page });
    }

    /**
     * OPTIONAL (recommended enhancement): Open the first non-sponsored product.
     *
     * Note: The requirement says "first non-sponsored". Implementing this robustly typically
     * requires additional locators/logic to detect and exclude sponsored results (e.g., badges,
     * "Sponsored" labels, or specific result containers). Those locators were not provided in
     * the recorded steps, so this method is intentionally left unimplemented.
     *
     * @throws Error always, until non-sponsored locators are provided.
     */
    // eslint-disable-next-line @typescript-eslint/require-await
    async openFirstNonSponsoredProduct(): Promise<void> {
        throw new Error(
            'openFirstNonSponsoredProduct() is not implemented: requires additional locators to identify non-sponsored results.'
        );
    }
}
