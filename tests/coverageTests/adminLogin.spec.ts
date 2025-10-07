import { test, expect } from 'playwright-test-coverage';
import {createFranchise, createFranchiseReq, createFranchiseRes, loginAsAdmin, setupMocks} from "../testUtil";

test('login as admin', async ({ page }) => {
    await loginAsAdmin(page);

    await page.getByRole('link', { name: 's', exact: true }).click();
    await expect(page.getByText('admin', { exact: true })).toBeVisible();
});

test('access admin page', async ({ page }) => {
    await loginAsAdmin(page);

    await page.getByRole('link', { name: 'Admin' }).click();
    await expect(page.getByText('Mama Ricci\'s kitchen')).toBeVisible();
});

test('create franchise', async ({ page }) => {
    await loginAsAdmin(page);
    await setupMocks(page);
    await page.getByRole('link', { name: 'Admin' }).click();

    await page.getByRole('button', { name: 'Add Franchise' }).click();

    await expect(page.getByRole('textbox', { name: 'franchise name' })).toBeVisible();
    await page.getByRole('textbox', { name: 'franchise name' }).fill(createFranchiseReq.name);

    await expect(page.getByRole('textbox', { name: 'franchisee admin email' })).toBeVisible();
    await page.getByRole('textbox', { name: 'franchisee admin email' }).fill(createFranchiseReq.admins[0].email);

    await page.getByRole('button', { name: 'Create' }).click();

    await expect(page.getByText(createFranchiseRes.name)).toBeVisible();
    await expect(page.getByText(createFranchiseRes.admins[0].name)).toBeVisible();
});

test('close franchise', async ({ page }) => {
    await loginAsAdmin(page);
    await setupMocks(page);
    await createFranchise(page);

    await page.getByRole('row', { name: 'testFranchise' }).getByRole('button').click();
    await expect(page.getByText('Sorry to see you go')).toBeVisible();
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.getByRole('row', { name: 'testFranchise' })).not.toBeVisible();
})
