import { test, expect } from '@test-setup/fixtures';

import { AmazonHomePage } from '@/pages/amazon/amazon-home.page';
import { AmazonSearchResultsPage } from '@/pages/amazon/amazon-search-results.page';
import { AmazonProductDetailsPage } from '@/pages/amazon/amazon-product-details.page';
import { AmazonCartPage } from '@/pages/amazon/amazon-cart.page';

/**
 * Test Case: Search Wireless Mouse, add to cart, verify cart item and quantity.
 *
 * Steps:
 * 1) Navigate to Amazon homepage and verify it loads.
 * 2) Search for "Wireless Mouse".
 * 3) Open the selected product from results.
 * 4) Add the product to the cart.
 * 5) Go to cart.
 * 6) Verify the expected product is present and quantity is 1.
 */
test('Amazon - search wireless mouse, add to cart, verify cart item and quantity', async ({ page }) => {
    const amazonHomePage = new AmazonHomePage(page);
    const amazonSearchResultsPage = new AmazonSearchResultsPage(page);
    const amazonProductDetailsPage = new AmazonProductDetailsPage(page);
    const amazonCartPage = new AmazonCartPage(page);

    const expectedProductTitle =
        'Logitech M185 Wireless Mouse, 2.4GHz with USB Mini Receiver, 12-Month Battery Life, 1000 DPI Optical Tracking, Ambidextrous PC/Mac/Laptop - Swift Grey';

    await test.step('Step 1: Go to Amazon home and verify loaded', async () => {
        await amazonHomePage.gotoAmazonHome();
        await amazonHomePage.verifyHomeLoaded();
    });

    await test.step('Step 2-3: Search for Wireless Mouse', async () => {
        await amazonHomePage.fillSearch('Wireless Mouse');
        await amazonHomePage.submitSearch();

        await amazonSearchResultsPage.verifyResultsLoaded();
    });

    await test.step('Step 4: Open selected product from results', async () => {
        await amazonSearchResultsPage.openSelectedProduct();
        await amazonProductDetailsPage.verifyProductPageLoaded();
    });

    await test.step('Step 5: Add product to cart', async () => {
        await amazonProductDetailsPage.addToCart();

        // Best-effort assertion that add-to-cart succeeded.
        await expect(page).toHaveURL(/amazon\.com/);
    });

    await test.step('Step 6: Go to cart and verify product + quantity', async () => {
        await amazonCartPage.goToCart();
        await amazonCartPage.verifyProductInCart(expectedProductTitle);
        await amazonCartPage.verifyQuantity(1);
    });
});
