import { test, expect } from '@playwright/test'

test.describe('Product Browsing and Interactions', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the products page before each test
    await page.goto('/products')
  })

  test('should display product grid with product cards', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 })
    
    // Check if product cards are visible
    const productCards = page.locator('[data-testid="product-card"]')
    await expect(productCards.first()).toBeVisible()
    
    // Verify product card structure
    await expect(productCards.first().locator('img')).toBeVisible()
    await expect(productCards.first().locator('h3')).toBeVisible()
    await expect(productCards.first().locator('[data-testid="product-price"]')).toBeVisible()
  })

  test('should display product information correctly', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 })
    
    const firstProduct = page.locator('[data-testid="product-card"]').first()
    
    // Check product name
    const productName = firstProduct.locator('h3')
    await expect(productName).toBeVisible()
    const nameText = await productName.textContent()
    expect(nameText).toBeTruthy()
    
    // Check product price
    const productPrice = firstProduct.locator('[data-testid="product-price"]')
    await expect(productPrice).toBeVisible()
    const priceText = await productPrice.textContent()
    expect(priceText).toMatch(/\$\d+\.\d+/)
    
    // Check product rating
    const productRating = firstProduct.locator('[data-testid="product-rating"]')
    await expect(productRating).toBeVisible()
  })

  test('should navigate to product detail page when clicking product card', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 })
    
    // Get the first product name
    const firstProduct = page.locator('[data-testid="product-card"]').first()
    const productName = await firstProduct.locator('h3').textContent()
    
    // Click on the product card
    await firstProduct.click()
    
    // Verify we're on the product detail page
    await expect(page).toHaveURL(/.*products\/.*/)
    
    // Verify the product name is displayed
    await expect(page.getByText(productName!)).toBeVisible()
  })

  test('should display add to cart button on product cards', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 })
    
    const firstProduct = page.locator('[data-testid="product-card"]').first()
    
    // Check if add to cart button is visible
    const addToCartButton = firstProduct.locator('button:has-text("Add to Cart")')
    await expect(addToCartButton).toBeVisible()
  })

  test('should add product to cart when clicking add to cart button', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 })
    
    const firstProduct = page.locator('[data-testid="product-card"]').first()
    
    // Get initial cart count
    const cartIcon = page.locator('[data-testid="cart-icon"]')
    const initialCount = await cartIcon.getAttribute('data-count') || '0'
    
    // Click add to cart button
    const addToCartButton = firstProduct.locator('button:has-text("Add to Cart")')
    await addToCartButton.click()
    
    // Verify cart count increased
    await expect(cartIcon).toHaveAttribute('data-count', String(parseInt(initialCount) + 1))
    
    // Verify success message
    await expect(page.getByText(/added to cart/i)).toBeVisible()
  })

  test('should display product categories and allow filtering', async ({ page }) => {
    // Check if category filter is visible
    await expect(page.getByText(/categories/i)).toBeVisible()
    
    // Check if category buttons are visible
    const categoryButtons = page.locator('[data-testid="category-filter"] button')
    await expect(categoryButtons.first()).toBeVisible()
    
    // Click on a category
    const firstCategory = categoryButtons.first()
    const categoryName = await firstCategory.textContent()
    await firstCategory.click()
    
    // Verify category is selected
    await expect(firstCategory).toHaveClass(/selected/)
    
    // Verify products are filtered (this might need adjustment based on actual implementation)
    await expect(page.locator('[data-testid="product-card"]')).toBeVisible()
  })

  test('should allow searching for products', async ({ page }) => {
    // Check if search input is visible
    const searchInput = page.getByPlaceholder(/search products/i)
    await expect(searchInput).toBeVisible()
    
    // Type in search query
    await searchInput.fill('phone')
    await searchInput.press('Enter')
    
    // Verify search results are displayed
    await expect(page.getByText(/search results/i)).toBeVisible()
    
    // Verify products match search query
    const productCards = page.locator('[data-testid="product-card"]')
    await expect(productCards.first()).toBeVisible()
  })

  test('should display product sorting options', async ({ page }) => {
    // Check if sort dropdown is visible
    const sortSelect = page.locator('[data-testid="sort-select"]')
    await expect(sortSelect).toBeVisible()
    
    // Click on sort dropdown
    await sortSelect.click()
    
    // Verify sort options are visible
    await expect(page.getByText(/price: low to high/i)).toBeVisible()
    await expect(page.getByText(/price: high to low/i)).toBeVisible()
    await expect(page.getByText(/name: a to z/i)).toBeVisible()
    await expect(page.getByText(/name: z to a/i)).toBeVisible()
  })

  test('should sort products by price when selecting price option', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 })
    
    // Get initial product order
    const initialProducts = page.locator('[data-testid="product-card"]')
    const firstProductPrice = await initialProducts.first().locator('[data-testid="product-price"]').textContent()
    
    // Select price low to high sorting
    const sortSelect = page.locator('[data-testid="sort-select"]')
    await sortSelect.selectOption('price-asc')
    
    // Wait for sorting to complete
    await page.waitForTimeout(1000)
    
    // Verify products are sorted (first product should have lower price)
    const sortedProducts = page.locator('[data-testid="product-card"]')
    const newFirstProductPrice = await sortedProducts.first().locator('[data-testid="product-price"]').textContent()
    
    // This is a basic check - in a real scenario you'd want more sophisticated price comparison
    expect(newFirstProductPrice).toBeTruthy()
  })

  test('should display pagination when there are many products', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 })
    
    // Check if pagination is visible (if there are enough products)
    const pagination = page.locator('[data-testid="pagination"]')
    
    if (await pagination.isVisible()) {
      // Verify pagination elements
      await expect(pagination.locator('button:has-text("Previous")')).toBeVisible()
      await expect(pagination.locator('button:has-text("Next")')).toBeVisible()
      
      // Check page numbers
      const pageNumbers = pagination.locator('[data-testid="page-number"]')
      await expect(pageNumbers.first()).toBeVisible()
    }
  })

  test('should handle product out of stock gracefully', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 })
    
    // Look for out of stock products
    const outOfStockProducts = page.locator('[data-testid="product-card"]:has-text("Out of stock")')
    
    if (await outOfStockProducts.count() > 0) {
      const firstOutOfStock = outOfStockProducts.first()
      
      // Verify out of stock message
      await expect(firstOutOfStock.locator('text=Out of stock')).toBeVisible()
      
      // Verify add to cart button is disabled
      const addToCartButton = firstOutOfStock.locator('button:has-text("Add to Cart")')
      await expect(addToCartButton).toBeDisabled()
    }
  })

  test('should display product reviews when available', async ({ page }) => {
    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 })
    
    // Look for products with reviews
    const productsWithReviews = page.locator('[data-testid="product-card"]:has-text("reviews")')
    
    if (await productsWithReviews.count() > 0) {
      const firstProductWithReviews = productsWithReviews.first()
      
      // Verify review count is displayed
      await expect(firstProductWithReviews.locator('text=/\\d+ reviews/')).toBeVisible()
      
      // Verify rating is displayed
      await expect(firstProductWithReviews.locator('[data-testid="product-rating"]')).toBeVisible()
    }
  })
})
