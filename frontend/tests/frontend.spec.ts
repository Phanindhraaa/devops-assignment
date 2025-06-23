import { test, expect } from '@playwright/test';

test('displays message from backend', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Look for the paragraph and check for partial text only
  const messageLocator = page.locator('p');

  await expect(messageLocator).toContainText('Hello from backend!');
});


test.skip('shows error message when backend is unavailable', async ({ page }) => {
  // Simulate backend being down by navigating to a broken endpoint (optional: stop backend manually)
  // Temporarily modify the fetch URL in page.tsx to a non-existent port if you want to force failure

  await page.goto('http://localhost:3000');
  const messageLocator = page.locator('p');
  await expect(messageLocator).toContainText('Error fetching message');
});
