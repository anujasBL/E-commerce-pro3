// Mock Prisma client first
jest.mock('@/lib/db', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    product: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    order: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}))

import { getProducts, getProductById, searchProducts } from '@/lib/products'

describe('Products Library', () => {
  let prisma: any

  beforeEach(() => {
    jest.clearAllMocks()
    prisma = require('@/lib/db').prisma
  })

  describe('getProducts', () => {
    it('should return products from database when available', async () => {
      const mockProducts = [
        { id: '1', name: 'Product 1', price: 29.99 },
        { id: '2', name: 'Product 2', price: 39.99 },
      ]

      prisma.product.findMany.mockResolvedValue(mockProducts)

      const result = await getProducts()

      expect(result).toEqual(mockProducts)
      expect(prisma.product.findMany).toHaveBeenCalledWith({
        include: { reviews: true },
        orderBy: { createdAt: 'desc' },
      })
    })

    it('should return sample products when database is empty', async () => {
      prisma.product.findMany.mockResolvedValue([])

      const result = await getProducts()

      expect(result).toHaveLength(8) // Sample products length
      expect(result[0]).toHaveProperty('id')
      expect(result[0]).toHaveProperty('name')
      expect(result[0]).toHaveProperty('price')
    })

    it('should handle database errors gracefully', async () => {
      prisma.product.findMany.mockRejectedValue(new Error('Database error'))

      const result = await getProducts()

      expect(result).toHaveLength(8) // Fallback to sample products
    })
  })

  describe('getProductById', () => {
    it('should return product by id from database', async () => {
      const mockProduct = { id: '1', name: 'Product 1', price: 29.99 }
      prisma.product.findUnique.mockResolvedValue(mockProduct)

      const result = await getProductById('1')

      expect(result).toEqual(mockProduct)
      expect(prisma.product.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: { reviews: true },
      })
    })

    it('should return sample product when database product not found', async () => {
      prisma.product.findUnique.mockResolvedValue(null)

      const result = await getProductById('1') // Use an ID that exists in sample data

      expect(result).toBeDefined()
      expect(result).toHaveProperty('id')
      expect(result).toHaveProperty('name')
    })

    it('should handle database errors gracefully', async () => {
      prisma.product.findUnique.mockRejectedValue(new Error('Database error'))

      const result = await getProductById('1')

      expect(result).toBeDefined()
      expect(result).toHaveProperty('id')
    })
  })

  describe('searchProducts', () => {
    it('should return filtered products based on search query', async () => {
      const mockProducts = [
        { id: '1', name: 'iPhone', price: 999.99 },
        { id: '2', name: 'Samsung Phone', price: 799.99 },
      ]

      prisma.product.findMany.mockResolvedValue(mockProducts)

      const result = await searchProducts('phone')

      expect(result).toEqual(mockProducts)
      expect(prisma.product.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { name: { contains: 'phone', mode: 'insensitive' } },
            { description: { contains: 'phone', mode: 'insensitive' } },
            { category: { contains: 'phone', mode: 'insensitive' } },
          ],
        },
        include: { reviews: true },
      })
    })

    it('should return empty array when no products match search', async () => {
      prisma.product.findMany.mockResolvedValue([])

      const result = await searchProducts('nonexistent')

      expect(result).toEqual([])
    })

    it('should handle empty search query', async () => {
      const result = await searchProducts('')

      expect(result).toEqual([])
    })
  })
})
