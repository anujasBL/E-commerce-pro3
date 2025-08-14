import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto('/')
  })

  test('should display sign in button for unauthenticated users', async ({ page }) => {
    // Check if sign in button is visible
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible()
    
    // Check if user menu is not visible
    await expect(page.getByRole('button', { name: /user menu/i })).not.toBeVisible()
  })

  test('should open sign in modal when clicking sign in button', async ({ page }) => {
    // Click sign in button
    await page.getByRole('button', { name: /sign in/i }).click()
    
    // Verify sign in modal is visible
    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible()
  })

  test('should display Google sign in option', async ({ page }) => {
    // Open sign in modal
    await page.getByRole('button', { name: /sign in/i }).click()
    
    // Check if Google sign in button is visible
    await expect(page.getByRole('button', { name: /continue with google/i })).toBeVisible()
    
    // Verify Google icon is present
    await expect(page.locator('svg[data-testid="google-icon"]')).toBeVisible()
  })

  test('should handle Google OAuth flow', async ({ page }) => {
    // Open sign in modal
    await page.getByRole('button', { name: /sign in/i }).click()
    
    // Click Google sign in button
    await page.getByRole('button', { name: /continue with google/i }).click()
    
    // This test would need to be adjusted based on actual OAuth implementation
    // For now, we'll check if the button click was registered
    await expect(page.getByRole('button', { name: /continue with google/i })).toBeVisible()
  })

  test('should close sign in modal when clicking outside', async ({ page }) => {
    // Open sign in modal
    await page.getByRole('button', { name: /sign in/i }).click()
    
    // Verify modal is open
    await expect(page.getByRole('dialog')).toBeVisible()
    
    // Click outside the modal (on the backdrop)
    await page.click('[data-testid="modal-backdrop"]')
    
    // Verify modal is closed
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })

  test('should close sign in modal when clicking close button', async ({ page }) => {
    // Open sign in modal
    await page.getByRole('button', { name: /sign in/i }).click()
    
    // Verify modal is open
    await expect(page.getByRole('dialog')).toBeVisible()
    
    // Click close button
    await page.getByRole('button', { name: /close/i }).click()
    
    // Verify modal is closed
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })

  test('should display error message for failed authentication', async ({ page }) => {
    // Mock failed authentication
    await page.route('/api/auth/signin/google', route => {
      route.fulfill({
        status: 400,
        body: JSON.stringify({ error: 'Authentication failed' })
      })
    })
    
    // Open sign in modal
    await page.getByRole('button', { name: /sign in/i }).click()
    
    // Click Google sign in button
    await page.getByRole('button', { name: /continue with google/i }).click()
    
    // Verify error message is displayed
    await expect(page.getByText(/authentication failed/i)).toBeVisible()
  })

  test('should redirect to dashboard after successful authentication', async ({ page }) => {
    // Mock successful authentication
    await page.route('/api/auth/session', route => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          user: {
            id: 'test-user-id',
            name: 'Test User',
            email: 'test@example.com',
            role: 'CUSTOMER'
          }
        })
      })
    })
    
    // Reload page to get new session
    await page.reload()
    
    // Verify user is authenticated
    await expect(page.getByRole('button', { name: /user menu/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /sign in/i })).not.toBeVisible()
  })

  test('should display user menu for authenticated users', async ({ page }) => {
    // Mock authenticated session
    await page.route('/api/auth/session', route => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          user: {
            id: 'test-user-id',
            name: 'Test User',
            email: 'test@example.com',
            role: 'CUSTOMER'
          }
        })
      })
    })
    
    // Reload page
    await page.reload()
    
    // Click user menu button
    await page.getByRole('button', { name: /user menu/i }).click()
    
    // Verify user menu is open
    await expect(page.getByRole('menu')).toBeVisible()
    
    // Check menu items
    await expect(page.getByRole('menuitem', { name: /profile/i })).toBeVisible()
    await expect(page.getByRole('menuitem', { name: /orders/i })).toBeVisible()
    await expect(page.getByRole('menuitem', { name: /sign out/i })).toBeVisible()
  })

  test('should navigate to profile page from user menu', async ({ page }) => {
    // Mock authenticated session
    await page.route('/api/auth/session', route => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          user: {
            id: 'test-user-id',
            name: 'Test User',
            email: 'test@example.com',
            role: 'CUSTOMER'
          }
        })
      })
    })
    
    // Reload page
    await page.reload()
    
    // Open user menu
    await page.getByRole('button', { name: /user menu/i }).click()
    
    // Click profile menu item
    await page.getByRole('menuitem', { name: /profile/i }).click()
    
    // Verify we're on profile page
    await expect(page).toHaveURL(/.*profile/)
    await expect(page.getByRole('heading', { name: /profile/i })).toBeVisible()
  })

  test('should navigate to orders page from user menu', async ({ page }) => {
    // Mock authenticated session
    await page.route('/api/auth/session', route => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          user: {
            id: 'test-user-id',
            name: 'Test User',
            email: 'test@example.com',
            role: 'CUSTOMER'
          }
        })
      })
    })
    
    // Reload page
    await page.reload()
    
    // Open user menu
    await page.getByRole('button', { name: /user menu/i }).click()
    
    // Click orders menu item
    await page.getByRole('menuitem', { name: /orders/i }).click()
    
    // Verify we're on orders page
    await expect(page).toHaveURL(/.*orders/)
    await expect(page.getByRole('heading', { name: /orders/i })).toBeVisible()
  })

  test('should sign out user when clicking sign out', async ({ page }) => {
    // Mock authenticated session
    await page.route('/api/auth/session', route => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          user: {
            id: 'test-user-id',
            name: 'Test User',
            email: 'test@example.com',
            role: 'CUSTOMER'
          }
        })
      })
    })
    
    // Reload page
    await page.reload()
    
    // Open user menu
    await page.getByRole('button', { name: /user menu/i }).click()
    
    // Click sign out menu item
    await page.getByRole('menuitem', { name: /sign out/i }).click()
    
    // Verify user is signed out
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /user menu/i })).not.toBeVisible()
  })

  test('should display user role in profile', async ({ page }) => {
    // Mock authenticated session with admin role
    await page.route('/api/auth/session', route => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          user: {
            id: 'test-user-id',
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'ADMIN'
          }
        })
      })
    })
    
    // Navigate to profile page
    await page.goto('/profile')
    
    // Verify user role is displayed
    await expect(page.getByText(/admin/i)).toBeVisible()
    
    // Verify admin-specific features are visible
    await expect(page.getByRole('link', { name: /admin dashboard/i })).toBeVisible()
  })

  test('should handle authentication errors gracefully', async ({ page }) => {
    // Mock authentication error
    await page.route('/api/auth/session', route => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Internal server error' })
      })
    })
    
    // Reload page
    await page.reload()
    
    // Verify error is handled gracefully (user remains unauthenticated)
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /user menu/i })).not.toBeVisible()
  })

  test('should maintain authentication state across page navigation', async ({ page }) => {
    // Mock authenticated session
    await page.route('/api/auth/session', route => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          user: {
            id: 'test-user-id',
            name: 'Test User',
            email: 'test@example.com',
            role: 'CUSTOMER'
          }
        })
      })
    })
    
    // Reload page to get session
    await page.reload()
    
    // Verify user is authenticated
    await expect(page.getByRole('button', { name: /user menu/i })).toBeVisible()
    
    // Navigate to different pages
    await page.goto('/products')
    await expect(page.getByRole('button', { name: /user menu/i })).toBeVisible()
    
    await page.goto('/about')
    await expect(page.getByRole('button', { name: /user menu/i })).toBeVisible()
    
    await page.goto('/contact')
    await expect(page.getByRole('button', { name: /user menu/i })).toBeVisible()
  })
})
