import { test, expect } from 'playwright-test-coverage';
import {loginAsAdmin, loginAsChangingDiner, loginAsDiner2Res, setupMocks} from "../testUtil";

test('updateUser', async ({ page }) => {
    await loginAsChangingDiner(page);
    await setupMocks(page);
    await page.getByRole('link', { name: 'f', exact: true }).click();
    await expect(page.getByRole('main')).toContainText(loginAsDiner2Res.user.name);

    await page.getByRole('button', { name: 'Edit' }).click();
    await expect(page.locator('h3')).toContainText('Edit user');
    await page.getByRole('textbox').first().fill('pizza dinerx');
    await page.getByRole('button', { name: 'Update' }).click();

    await page.waitForSelector('[role="dialog"].hidden', { state: 'attached' });

    await expect(page.getByRole('main')).toContainText('pizza dinerx');

    await page.getByRole('link', { name: 'Logout' }).click();
    await loginAsChangingDiner(page);

    await page.getByRole('link', { name: 'pd', exact: true }).click();

    await expect(page.getByRole('main')).toContainText('pizza dinerx');
});

test('users are displayed', async ({ page }) => {
    await loginAsAdmin(page);
    await setupMocks(page);

    await page.getByRole('link', { name: 'Admin' }).click();
    await expect(page.getByText("Users")).toBeVisible();

    await expect(page.getByText("fullName")).toBeVisible();
    await expect(page.getByText("diner, franchisee")).toBeVisible();
});