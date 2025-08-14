import { test, expect } from '@playwright/test'

test.describe('Navigation and Basic User Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto('/')
  })

  test('should display the homepage with navigation elements', async ({ page }) => {
    // Check if the main navigation elements are visible
    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.getByRole('navigation')).toBeVisible()
    
    // Check for logo/brand
    await expect(page.getByText(/quickcart/i)).toBeVisible()
    
    // Check for main navigation links
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /products/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /about/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /contact/i })).toBeVisible()
  })

  test('should navigate to products page', async ({ page }) => {
    // Click on the products link
    await page.getByRole('link', { name: /products/i }).click()
    
    // Verify we're on the products page
    await expect(page).toHaveURL(/.*products/)
    await expect(page.getByRole('heading', { name: /products/i })).toBeVisible()
  })

  test('should navigate to about page', async ({ page }) => {
    // Click on the about link
    await page.getByRole('link', { name: /about/i }).click()
    
    // Verify we're on the about page
    await expect(page).toHaveURL(/.*about/)
    await expect(page.getByRole('heading', { name: /about us/i })).toBeVisible()
  })

  test('should navigate to contact page', async ({ page }) => {
    // Click on the contact link
    await page.getByRole('link', { name: /contact/i }).click()
    
    // Verify we're on the contact page
    await expect(page).toHaveURL(/.*contact/)
    await expect(page.getByRole('heading', { name: /contact us/i })).toBeVisible()
  })

  test('should display search functionality', async ({ page }) => {
    // Check if search input is visible
    await expect(page.getByPlaceholder(/search products/i)).toBeVisible()
    
    // Check if search button is visible
    await expect(page.getByRole('button', { name: /search/i })).toBeVisible()
  })

  test('should display user authentication options', async ({ page }) => {
    // Check for sign in button
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible()
    
    // Check for cart icon
    await expect(page.getByRole('link', { name: /cart/i })).toBeVisible()
  })

  test('should maintain navigation state across page loads', async ({ page }) => {
    // Navigate to products page
    await page.getByRole('link', { name: /products/i }).click()
    await expect(page).toHaveURL(/.*products/)
    
    // Navigate back to home
    await page.getByRole('link', { name: /home/i }).click()
    await expect(page).toHaveURL(/.*\/$/)
    
    // Verify navigation elements are still visible
    await expect(page.getByRole('navigation')).toBeVisible()
    await expect(page.getByRole('link', { name: /products/i })).toBeVisible()
  })

  test('should display footer information', async ({ page }) => {
    // Scroll to bottom to see footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    
    // Check if footer is visible
    await expect(page.getByRole('contentinfo')).toBeVisible()
    
    // Check for footer links
    await expect(page.getByRole('link', { name: /privacy policy/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /terms of service/i })).toBeVisible()
  })

  test('should handle responsive navigation on mobile', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Check if mobile menu button is visible
    await expect(page.getByRole('button', { name: /menu/i })).toBeVisible()
    
    // Click mobile menu button
    await page.getByRole('button', { name: /menu/i }).click()
    
    // Check if mobile menu is expanded
    await expect(page.getByRole('navigation')).toBeVisible()
    
    // Verify mobile navigation links
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /products/i })).toBeVisible()
  })

  test('should display breadcrumbs on product pages', async ({ page }) => {
    // Navigate to products page
    await page.getByRole('link', { name: /products/i }).click()
    
    // Check if breadcrumbs are visible
    await expect(page.getByRole('navigation', { name: /breadcrumb/i })).toBeVisible()
    
    // Verify breadcrumb structure
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible()
    await expect(page.getByText(/products/i)).toBeVisible()
  })

  test('should handle 404 page gracefully', async ({ page }) => {
    // Navigate to a non-existent page
    await page.goto('/non-existent-page')
    
    // Check if 404 page is displayed
    await expect(page.getByRole('heading', { name: /404/i })).toBeVisible()
    await expect(page.getByText(/page not found/i)).toBeVisible()
    
    // Check if there's a link back to home
    await expect(page.getByRole('link', { name: /go home/i })).toBeVisible()
  })
})
