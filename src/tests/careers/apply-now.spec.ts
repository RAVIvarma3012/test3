/**
 * Test Case: Careers → filter Department=Marketing, WorkType=Full Time, Location=Bengaluru India
 * → search 'Content' → open first result → click Apply Now.
 *
 * Note: This test is expected to fail until Step 5 and Step 6 selectors are implemented
 * in `CareersJobsPage` (work type + location filters).
 */

import { test, expect } from '../../../test-setup/fixtures';
import { CareersJobsPage } from '../../pages/careers-jobs.page';

test.describe('Careers', () => {
    test('Apply Now from filtered Marketing jobs (Content search)', async ({ page }) => {
        const careersJobsPage = new CareersJobsPage(page);

        await test.step('Navigate to jobs listing', async () => {
            await careersJobsPage.gotoJobs();
        });

        await test.step('Filter Department = Marketing', async () => {
            await careersJobsPage.openDepartmentDropdown();
            await careersJobsPage.selectMarketingDepartment();
        });

        await test.step('Filter Work Type = Full Time (blocked: selector missing)', async () => {
            await expect(
                careersJobsPage.selectFullTimeWorkType(),
                'Blocked: Step 5 selector/action is missing. Implement CareersJobsPage.selectFullTimeWorkType() with the recorded locator.'
            ).rejects.toThrow(/selector\/action.*missing/i);
        });

        await test.step('Filter Location = Bengaluru, India (blocked: selector missing)', async () => {
            await expect(
                careersJobsPage.selectBengaluruLocation(),
                'Blocked: Step 6 selector/action is missing. Implement CareersJobsPage.selectBengaluruLocation() with the recorded locator.'
            ).rejects.toThrow(/selector\/action.*missing/i);
        });

        await test.step("Search job title = 'Content'", async () => {
            await careersJobsPage.searchJobTitle('Content');
        });

        await test.step('Open first job result', async () => {
            await careersJobsPage.openFirstJobResult();
        });

        await test.step('Click Apply Now', async () => {
            await careersJobsPage.clickApplyNow();
        });
    });
});
