import { Page, Browser, BrowserContext } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

/**
 * Page Object Model for Freshteam jobs listing and job details pages.
 *
 * Covers interactions for:
 * - Navigating to the jobs listing
 * - Filtering by department/work type/location
 * - Searching by job title
 * - Opening a job and clicking "Apply Now"
 */
export class CareersJobsPage extends BasePage {
    /**
     * Creates an instance of CareersJobsPage.
     *
     * @param page Playwright Page instance.
     * @param context Optional Playwright BrowserContext.
     * @param browser Optional Playwright Browser.
     */
    constructor(page: Page, context?: BrowserContext, browser?: Browser) {
        super(page, context, browser);
    }

    /**
     * Step 1: Click the "Careers" link.
     */
    async clickCareers(): Promise<void> {
        this.logStep('Click Careers link');
        await ActionUtils.click(this.page.getByRole('link', { name: 'Careers', exact: true }), { page: this.page });
    }

    /**
     * Step 2: Navigate to the jobs listing page.
     */
    async gotoJobs(): Promise<void> {
        this.logStep('Navigate to Freshteam jobs listing');
        await this.page.goto('https://joinditto.freshteam.com/jobs');
    }

    /**
     * Step 3: Open the "Choose Department" dropdown/searchbox.
     */
    async openDepartmentDropdown(): Promise<void> {
        this.logStep('Open Choose Department dropdown');
        await ActionUtils.click(this.page.getByRole('searchbox', { name: 'Choose Department' }), { page: this.page });
    }

    /**
     * Step 4: Select the "Marketing" department option.
     */
    async selectMarketingDepartment(): Promise<void> {
        this.logStep('Select Marketing department');
        await ActionUtils.click(this.page.getByRole('option', { name: 'Marketing' }), { page: this.page });
    }

    /**
     * Step 5: Select the "Full Time" work type.
     *
     * NOTE: Selector/action was not provided in the recorded steps.
     * This method is intentionally left as a placeholder until selectors are provided/re-recorded.
     */
    async selectFullTimeWorkType(): Promise<void> {
        this.logStep('Select Full Time work type (TODO: selector required)');
        throw new Error(
            'TODO(selectFullTimeWorkType): Selector/action for "Full Time" work type is missing. Please provide the primarySelector or re-record Step 5.'
        );
    }

    /**
     * Step 6: Select the "Bengaluru, India" location.
     *
     * NOTE: Selector/action was not provided in the recorded steps.
     * This method is intentionally left as a placeholder until selectors are provided/re-recorded.
     */
    async selectBengaluruLocation(): Promise<void> {
        this.logStep('Select Bengaluru, India location (TODO: selector required)');
        throw new Error(
            'TODO(selectBengaluruLocation): Selector/action for "Bengaluru, India" location is missing. Please provide the primarySelector or re-record Step 6.'
        );
    }

    /**
     * Step 7: Fill the "Search Job Title" field with the provided value.
     *
     * @param title Job title text to search for.
     */
    async searchJobTitle(title: string = 'Content'): Promise<void> {
        this.logStep(`Search job title: ${title}`);
        await ActionUtils.fill(this.page.getByRole('textbox', { name: 'Search Job Title' }), title, { page: this.page });
    }

    /**
     * Step 8: Click the first available matching job result link.
     */
    async openFirstJobResult(): Promise<void> {
        this.logStep('Open first job result');
        await ActionUtils.click(this.page.getByRole('link', { name: 'Content Writer Where Your' }), { page: this.page });
    }

    /**
     * Step 9: Click the "Apply Now" link/button.
     */
    async clickApplyNow(): Promise<void> {
        this.logStep('Click Apply Now');
        await ActionUtils.click(this.page.getByRole('link', { name: 'Apply Now' }), { page: this.page });
    }
}
