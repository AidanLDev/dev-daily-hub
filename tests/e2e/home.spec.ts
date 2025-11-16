import { test, expect } from '@playwright/test'

test('Home page shows a link with the home page text', async ({ page }) => {
  await page.goto('/')
  await expect(
    page.getByRole('link', {
      name: 'Dev Daily Hub',
    }),
  ).toBeVisible()
})
