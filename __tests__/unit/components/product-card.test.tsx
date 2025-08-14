import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ProductCard } from '@/components/product-card'
// Mock data generator
const generateMockProduct = (overrides = {}) => ({
  id: '1',
  name: 'Test Product',
  description: 'Test product description',
  price: 29.99,
  image: 'https://example.com/product.jpg',
  category: 'Electronics',
  stock: 100,
  rating: 4.5,
  reviews: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
})

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}))

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

describe('ProductCard Component', () => {
  const mockProduct = generateMockProduct({
    id: '1',
    name: 'Test Product',
    price: 29.99,
    rating: 4.5,
    reviews: [],
  })

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$29.99')).toBeInTheDocument()
    expect(screen.getByText('4.5')).toBeInTheDocument()
    expect(screen.getByAltText('Test Product')).toBeInTheDocument()
  })

  it('displays correct product image', () => {
    render(<ProductCard product={mockProduct} />)
    
    const image = screen.getByAltText('Test Product')
    expect(image).toHaveAttribute('src', mockProduct.image)
  })

  it('shows correct rating with star icon', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('4.5')).toBeInTheDocument()
    // Check if star icon is present (SVG icon)
    expect(screen.getByTestId('star-icon')).toBeInTheDocument()
  })

  it('displays review count correctly', () => {
    const productWithReviews = generateMockProduct({
      ...mockProduct,
      reviews: [{ id: '1' }, { id: '2' }],
    })
    
    render(<ProductCard product={productWithReviews} />)
    
    expect(screen.getByText('(2 reviews)')).toBeInTheDocument()
  })

  it('shows "No reviews" when there are no reviews', () => {
    render(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('(No reviews)')).toBeInTheDocument()
  })

  it('renders add to cart button', () => {
    render(<ProductCard product={mockProduct} />)
    
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i })
    expect(addToCartButton).toBeInTheDocument()
  })

  it('handles add to cart button click', () => {
    const mockAddToCart = jest.fn()
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />)
    
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i })
    fireEvent.click(addToCartButton)
    
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct)
  })

  it('renders product link correctly', () => {
    render(<ProductCard product={mockProduct} />)
    
    const productLinks = screen.getAllByRole('link', { name: /test product/i })
    expect(productLinks).toHaveLength(2) // Image link and title link
    expect(productLinks[0]).toHaveAttribute('href', `/products/${mockProduct.id}`)
    expect(productLinks[1]).toHaveAttribute('href', `/products/${mockProduct.id}`)
  })

  it('applies custom className when provided', () => {
    render(<ProductCard product={mockProduct} className="custom-class" />)
    
    const card = screen.getByRole('button', { name: /add to cart/i }).closest('div')
    expect(card?.parentElement).toHaveClass('custom-class')
  })

  it('displays stock information when available', () => {
    const productWithStock = generateMockProduct({
      ...mockProduct,
      stock: 5,
    })
    
    render(<ProductCard product={productWithStock} />)
    
    expect(screen.getByText('5 in stock')).toBeInTheDocument()
  })

  it('shows out of stock when stock is 0', () => {
    const productOutOfStock = generateMockProduct({
      ...mockProduct,
      stock: 0,
    })
    
    render(<ProductCard product={productOutOfStock} />)
    
    expect(screen.getByText('Out of stock')).toBeInTheDocument()
  })

  it('disables add to cart button when out of stock', () => {
    const productOutOfStock = generateMockProduct({
      ...mockProduct,
      stock: 0,
    })
    
    render(<ProductCard product={productOutOfStock} />)
    
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i })
    expect(addToCartButton).toBeDisabled()
  })

  it('formats price correctly for different values', () => {
    const expensiveProduct = generateMockProduct({
      ...mockProduct,
      price: 1299.99,
    })
    
    render(<ProductCard product={expensiveProduct} />)
    
    expect(screen.getByText('$1,299.99')).toBeInTheDocument()
  })

  it('handles missing product image gracefully', () => {
    const productWithoutImage = generateMockProduct({
      ...mockProduct,
      image: '',
    })
    
    render(<ProductCard product={productWithoutImage} />)
    
    const image = screen.getByAltText('Test Product')
    expect(image).toHaveAttribute('src', '')
  })
})
