import { test, expect } from 'playwright-test-coverage';
import { loginAsDiner, loginAsDinerReq, loginAsDinerRes, registerReq, registerRes, setupMocks } from "./testUtil";

test('home page', async ({ page }) => {
  await page.goto('/');

  expect(await page.title()).toBe('JWT Pizza');
});

test('Access Each Page, no interaction', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  await page.getByRole('link', { name: 'Order' }).click();
  await expect(page.getByText('Awesome is a click away')).toBeVisible();

  await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
  await expect(page.getByText('So you want a piece of the')).toBeVisible();

  await page.getByRole('link', { name: 'Login', exact: true }).click();
  await expect(page.getByText('Welcome back')).toBeVisible();

  await page.getByRole('main').getByText('Register').click();
  await expect(page.getByText('Welcome to the party')).toBeVisible();

  await page.getByRole('link', { name: 'History' }).click();
  await expect(page.getByText('Mama Rucci, my my')).toBeVisible();

  await page.getByRole('link', { name: 'About' }).click();
  await expect(page.getByText('The secret sauce')).toBeVisible();
});

test('Register', async ({ page }) => {
  await page.route('*/**/api/auth', async (route) => {
    expect(route.request().method()).toBe('POST');
    expect(route.request().postDataJSON()).toMatchObject(registerReq);
    await route.fulfill({ json: registerRes });
  });

  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Register' }).click();

  await page.getByRole('textbox', { name: 'Full name' }).fill(registerReq.name);
  await page.getByRole('textbox', { name: 'Email address' }).fill(registerReq.email);
  await page.getByRole('textbox', { name: 'Password' }).fill(registerReq.password);
  await page.getByRole('button', { name: 'Register' }).click();

  await page.getByRole('link', { name: 'f', exact: true }).click();

  await expect(page.getByRole('link', { name: registerRes.user.name[0] , exact: true })).toBeVisible();
});

test('Login', async ({ page }) => {
  await page.route('*/**/api/auth', async (route) => {
    expect(route.request().method()).toBe('PUT');
    expect(route.request().postDataJSON()).toMatchObject(loginAsDinerReq);
    await route.fulfill({ json: loginAsDinerRes });
  });

  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();

  await page.getByRole('textbox', { name: 'Email address' }).fill(registerReq.email);
  await page.getByRole('textbox', { name: 'Password' }).fill(registerReq.password);
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('link', { name: 'f', exact: true }).click();

  await expect(page.getByRole('link', { name: loginAsDinerRes.user.name[0] , exact: true })).toBeVisible();
});

test('Make an order', async ({ page }) => {
  await loginAsDiner(page);
  await setupMocks(page);

  await page.getByRole('link', { name: 'Order' }).click();
  await page.getByRole('combobox').selectOption('1');

  await expect(page.getByRole('link', { name: 'Image Description Veggie A' })).toBeVisible();
  await page.getByRole('link', { name: 'Image Description Veggie A' }).click();

  await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();
  await page.getByRole('button', { name: 'Checkout' }).click();

  await expect(page.getByRole('button', { name: 'Pay now' })).toBeVisible();
  await page.getByRole('button', { name: 'Pay now' }).click();

  await expect(page.getByRole('button', { name: 'Verify' })).toBeVisible();
  await page.getByRole('button', { name: 'Verify' }).click();

  await expect(page.getByRole('button', { name: 'close' })).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
});

test('Go to broken page', async ({ page }) => {
  await page.goto('http://localhost:5173/does_not_exist');

  await expect(page.getByText('pizza on the floor')).toBeVisible();
})
