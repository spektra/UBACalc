import { test, expect, type Page } from '@playwright/test'

async function gotoApp(page: Page) {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
}

test('page loads and shows title', async ({ page }) => {
  await gotoApp(page)
  await expect(page.getByText('Build Your Player')).toBeVisible()
})

test('shows upgrade calculator in header', async ({ page }) => {
  await gotoApp(page)
  await expect(page.locator('header')).toContainText('Upgrade Calculator')
})

test('has all major sections', async ({ page }) => {
  await gotoApp(page)
  await expect(page.getByRole('heading', { name: 'Build Setup' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'UC Budget' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Attributes' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Badges' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Submission' })).toBeVisible()
})
