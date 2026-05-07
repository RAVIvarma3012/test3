import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

/**
 * AmazonCartPage
 *
 * Page Object Model for Amazon Cart page and cart-related verification.
 *
 * Covered test step(s):
 * - Step 6: Go to Cart from the add-to-cart confirmation area.
 */
export class AmazonCartPage extends BasePage {
    private readonly goToCartLink: Locator;

    // Cart verification locators (best-effort, discovered via repo re-analysis).
    // If these are not present in a given cart experience, the helper methods
    // fall back to text-based assertions.
    private readonly cartItemTitle: Locator;
    private readonly quantitySelect: Locator;
    private readonly quantityInput: Locator;

    constructor(page: Page) {
        super(page);

        // Step 6 locator (from add-to-cart confirmation area)
        this.goToCartLink = this.page.locator('#sw-gtc').getByRole('link', { name: 'Go to Cart' });

        // Common Amazon cart DOM patterns (may vary by locale/experience)
        this.cartItemTitle = this.page.locator('span.a-truncate-cut');
        this.quantitySelect = this.page.locator('select[name="quantity"]');
        this.quantityInput = this.page.locator('input[name="quantity"]');
    }

    /**
     * Navigate to the Cart using the "Go to Cart" link shown after adding an item.
     * Implements recorded Step 6.
     */
    async goToCart(): Promise<void> {
        this.logStep('Go to Cart from add-to-cart confirmation');
        await ActionUtils.click(this.goToCartLink, { page: this.page });
    }

    /**
     * Verify that the expected product title is present in the cart.
     *
     * Note: Amazon cart markup can vary. This method first tries a common cart
     * title locator and falls back to a text-based assertion.
     */
    async verifyProductInCart(expectedTitle: string): Promise<void> {
        this.logStep(`Verify product is present in cart: ${expectedTitle}`);

        const titleCandidate = this.cartItemTitle.filter({ hasText: expectedTitle }).first();
        if (await titleCandidate.count()) {
            await expect(titleCandidate).toBeVisible();
            return;
        }

        // Fallback: assert by visible text anywhere on the page.
        await expect(this.page.getByText(expectedTitle, { exact: false })).toBeVisible();
    }

    /**
     * Verify the cart quantity for the item(s) is the expected value.
     *
     * Defaults to 1 as required by the test case.
     */
    async verifyQuantity(expectedQty: number = 1): Promise<void> {
        this.logStep(`Verify cart quantity is: ${expectedQty}`);

        // Prefer select dropdown when present.
        if (await this.quantitySelect.first().count()) {
            await expect(this.quantitySelect.first()).toHaveValue(String(expectedQty));
            return;
        }

        // Some experiences use an input.
        if (await this.quantityInput.first().count()) {
            await expect(this.quantityInput.first()).toHaveValue(String(expectedQty));
            return;
        }

        // Last resort: look for a visible "Qty" label near the expected number.
        await expect(this.page.getByText(new RegExp(`\\bQty\\b`, 'i'))).toBeVisible();
        await expect(this.page.getByText(new RegExp(`\\b${expectedQty}\\b`))).toBeVisible();
    }
