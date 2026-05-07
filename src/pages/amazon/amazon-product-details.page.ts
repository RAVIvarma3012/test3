import { Page, BrowserContext, Browser, Locator, expect } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

/**
 * Amazon Product Details Page Object.
 *
 * Encapsulates interactions on an Amazon product details page (PDP), including
 * verifying the page is loaded and adding the product to the cart.
 */
export class AmazonProductDetailsPage extends BasePage {
    // ==================== LOCATORS ====================

    private readonly addToCartButton: Locator;

    /**
     * NOTE: Product title locator is intentionally not implemented in this step.
     * A robust locator must be discovered via repo/app re-analysis.
     *
     * Interim approach: carry forward the expected title from the clicked link text
     * in the search results and verify it later in the cart.
     */
    // private readonly productTitle: Locator;

    constructor(page: Page, context?: BrowserContext, browser?: Browser) {
        super(page, context, browser);

        // Step 5 locator (provided)
        this.addToCartButton = this.page.getByRole('button', { name: 'Add to cart', exact: true });
    }

    // ==================== ACTIONS ====================

    /**
     * Helper to verify the product details page is loaded.
     * Asserts that the "Add to cart" button is visible.
     */
    async verifyProductPageLoaded(): Promise<void> {
        this.logStep('Verify Amazon product details page loaded');
        await expect(this.addToCartButton).toBeVisible();
    }

    /**
     * Clicks the "Add to cart" button on the product details page.
     *
     * Implements test step 5.
     */
    async addToCart(): Promise<void> {
        this.logStep('Add product to cart');

        // Recorded Playwright step (page. -> this.page.)
        await ActionUtils.click(this.addToCartButton, { page: this.page });
    }
}
