import { test, expect } from '@playwright/test';

test('should render the Docs page', async ({ page }) => {
    await page.route('*/**/api/docs', async (route) => {
        const mockDocsResponse = {
            endpoints: [
                {
                    method: 'POST',
                    path: '/api/auth',
                    description: 'Register a new user',
                    example: `curl -X POST localhost:3000/api/auth -d '{"name":"pizza diner", "email":"d@jwt.com", "password":"diner"}' -H 'Content-Type: application/json'`,
                    response: { user: { id: 2, name: 'pizza diner', email: 'd@jwt.com', roles: [{ role: 'diner' }] }, token: 'tttttt' },
                },
                {
                    method: 'PUT',
                    path: '/api/auth',
                    description: 'Login existing user',
                    example: `curl -X PUT localhost:3000/api/auth -d '{"email":"a@jwt.com", "password":"admin"}' -H 'Content-Type: application/json'`,
                    response: { user: { id: 1, name: '常用名字', email: 'a@jwt.com', roles: [{ role: 'admin' }] }, token: 'tttttt' },
                },
                {
                    method: 'DELETE',
                    path: '/api/auth',
                    requiresAuth: true,
                    description: 'Logout a user',
                    example: `curl -X DELETE localhost:3000/api/auth -H 'Authorization: Bearer tttttt'`,
                    response: { message: 'logout successful' },
                },
            ]
        };
        await route.fulfill({ json: mockDocsResponse });
    });

    await page.goto('/docs');

    await expect(page.getByRole('heading', { name: 'JWT Pizza API' })).toBeVisible();
    await expect(page.getByText('Register a new user')).toBeVisible();
    await expect(page.getByText('🔐')).toBeVisible();
});