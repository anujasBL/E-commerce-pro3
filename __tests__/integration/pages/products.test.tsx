import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import ProductsPage from '@/app/products/page'
// Mock data generator
const generateMockProduct = (overrides = {}) => ({
  id: '1',
  name: 'Product 1',
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

// Mock the products API
jest.mock('@/lib/products', () => ({
  getProducts: jest.fn(),
}))

const mockGetProducts = require('@/lib/products').getProducts

describe('Products Page Integration', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          cacheTime: 0,
        },
      },
    })
    jest.clearAllMocks()
  })

  const renderProductsPage = () => {
    return render(
      <SessionProvider session={null}>
        <QueryClientProvider client={queryClient}>
          <ProductsPage />
        </QueryClientProvider>
      </SessionProvider>
    )
  }

  it('renders products page with loading state initially', () => {
    mockGetProducts.mockResolvedValue([])
    
    renderProductsPage()
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('displays products when data is loaded successfully', async () => {
    const mockProducts = [
      generateMockProduct({ id: '1', name: 'Product 1', price: 29.99 }),
      generateMockProduct({ id: '2', name: 'Product 2', price: 39.99 }),
      generateMockProduct({ id: '3', name: 'Product 3', price: 49.99 }),
    ]
    
    mockGetProducts.mockResolvedValue(mockProducts)
    
    renderProductsPage()
    
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument()
      expect(screen.getByText('Product 2')).toBeInTheDocument()
      expect(screen.getByText('Product 3')).toBeInTheDocument()
    })
    
    expect(screen.getByText('$29.99')).toBeInTheDocument()
    expect(screen.getByText('$39.99')).toBeInTheDocument()
    expect(screen.getByText('$49.99')).toBeInTheDocument()
  })

  it('displays empty state when no products are available', async () => {
    mockGetProducts.mockResolvedValue([])
    
    renderProductsPage()
    
    await waitFor(() => {
      expect(screen.getByText(/no products found/i)).toBeInTheDocument()
    })
  })

  it('handles API errors gracefully', async () => {
    mockGetProducts.mockRejectedValue(new Error('Failed to fetch products'))
    
    renderProductsPage()
    
    await waitFor(() => {
      expect(screen.getByText(/error loading products/i)).toBeInTheDocument()
    })
  })

  it('displays product cards with correct information', async () => {
    const mockProducts = [
      generateMockProduct({
        id: '1',
        name: 'Test Product',
        description: 'Test description',
        price: 99.99,
        rating: 4.8,
        stock: 50,
      }),
    ]
    
    mockGetProducts.mockResolvedValue(mockProducts)
    
    renderProductsPage()
    
    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument()
      expect(screen.getByText('$99.99')).toBeInTheDocument()
      expect(screen.getByText('4.8')).toBeInTheDocument()
      expect(screen.getByText('50 in stock')).toBeInTheDocument()
    })
  })

  it('renders product images correctly', async () => {
    const mockProducts = [
      generateMockProduct({
        id: '1',
        name: 'Product with Image',
        image: 'https://example.com/image.jpg',
      }),
    ]
    
    mockGetProducts.mockResolvedValue(mockProducts)
    
    renderProductsPage()
    
    await waitFor(() => {
      const image = screen.getByAltText('Product with Image')
      expect(image).toHaveAttribute('src', 'https://example.com/image.jpg')
    })
  })

  it('displays correct number of products', async () => {
    const mockProducts = Array.from({ length: 10 }, (_, i) =>
      generateMockProduct({
        id: `${i + 1}`,
        name: `Product ${i + 1}`,
      })
    )
    
    mockGetProducts.mockResolvedValue(mockProducts)
    
    renderProductsPage()
    
    await waitFor(() => {
      expect(screen.getAllByRole('button', { name: /add to cart/i })).toHaveLength(10)
    })
  })

  it('shows product categories when available', async () => {
    const mockProducts = [
      generateMockProduct({
        id: '1',
        name: 'Electronics Product',
        category: 'Electronics',
      }),
    ]
    
    mockGetProducts.mockResolvedValue(mockProducts)
    
    renderProductsPage()
    
    await waitFor(() => {
      expect(screen.getByText('Electronics')).toBeInTheDocument()
    })
  })

  it('handles products with missing optional fields', async () => {
    const mockProducts = [
      generateMockProduct({
        id: '1',
        name: 'Minimal Product',
        description: '',
        image: '',
        category: '',
        stock: 0,
        rating: 0,
      }),
    ]
    
    mockGetProducts.mockResolvedValue(mockProducts)
    
    renderProductsPage()
    
    await waitFor(() => {
      expect(screen.getByText('Minimal Product')).toBeInTheDocument()
      expect(screen.getByText('Out of stock')).toBeInTheDocument()
    })
  })

  it('calls getProducts function on page load', async () => {
    mockGetProducts.mockResolvedValue([])
    
    renderProductsPage()
    
    await waitFor(() => {
      expect(mockGetProducts).toHaveBeenCalledTimes(1)
    })
  })
})
