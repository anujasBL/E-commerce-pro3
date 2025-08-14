import { prisma } from './db'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
  stock: number
  sellerId: string
  reviews: Array<{
    id: string
    rating: number
    comment?: string
    createdAt: Date
    updatedAt: Date
    userId: string
    productId: string
  }>
  createdAt: Date
  updatedAt: Date
}

// Type for Prisma query results
interface PrismaProductWithReviews {
  id: string
  name: string
  description: string
  price: { toString(): string }
  imageUrl: string
  category: string
  stock: number
  sellerId: string
  reviews: Array<{
    id: string
    rating: number
    comment: string | null
    createdAt: Date
    updatedAt: Date
    userId: string
    productId: string
  }>
  createdAt: Date
  updatedAt: Date
}

// Sample products data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 99.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Electronics',
    stock: 50,
    sellerId: 'sample-seller-1',
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest smartphone with advanced features',
    price: 699.99,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
    category: 'Electronics',
    stock: 30,
    sellerId: 'sample-seller-1',
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Laptop',
    description: 'Powerful laptop for work and gaming',
    price: 1299.99,
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
    category: 'Electronics',
    stock: 20,
    sellerId: 'sample-seller-1',
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Coffee Maker',
    description: 'Automatic coffee maker with timer',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
    category: 'Home & Kitchen',
    stock: 40,
    sellerId: 'sample-seller-1',
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'Running Shoes',
    description: 'Comfortable running shoes for athletes',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    category: 'Sports',
    stock: 60,
    sellerId: 'sample-seller-1',
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    name: 'Backpack',
    description: 'Durable backpack for everyday use',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'Fashion',
    stock: 80,
    sellerId: 'sample-seller-1',
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '7',
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with great sound',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    category: 'Electronics',
    stock: 35,
    sellerId: 'sample-seller-1',
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '8',
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat for home workouts',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500',
    category: 'Sports',
    stock: 100,
    sellerId: 'sample-seller-1',
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export async function getProducts(): Promise<Product[]> {
  try {
    // Try to get products from database first
    const dbProducts = await prisma.product.findMany({
      include: { reviews: true },
      orderBy: { createdAt: 'desc' },
    })
    
    if (dbProducts.length > 0) {
      // Transform Prisma types to our Product interface
      return dbProducts.map((product: PrismaProductWithReviews) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: Number(product.price),
        imageUrl: product.imageUrl,
        category: product.category,
        stock: product.stock,
        sellerId: product.sellerId,
        reviews: product.reviews.map((review) => ({
          id: review.id,
          rating: review.rating,
          comment: review.comment || undefined,
          createdAt: review.createdAt,
          updatedAt: review.updatedAt,
          userId: review.userId,
          productId: review.productId,
        })),
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      }))
    }
    
    // Fallback to sample products if database is empty
    return sampleProducts
  } catch (error) {
    console.error('Error fetching products:', error)
    // Return sample products as fallback
    return sampleProducts
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    // Try to get product from database first
    const dbProduct = await prisma.product.findUnique({
      where: { id },
      include: { reviews: true },
    })
    
    if (dbProduct) {
      // Transform Prisma types to our Product interface
      const product = dbProduct as PrismaProductWithReviews
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: Number(product.price),
        imageUrl: product.imageUrl,
        category: product.category,
        stock: product.stock,
        sellerId: product.sellerId,
        reviews: product.reviews.map((review) => ({
          id: review.id,
          rating: review.rating,
          comment: review.comment || undefined,
          createdAt: review.createdAt,
          updatedAt: review.updatedAt,
          userId: review.userId,
          productId: review.productId,
        })),
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      }
    }
    
    // Fallback to sample products if database product not found
    return sampleProducts.find(product => product.id === id) || null
  } catch (error) {
    console.error('Error fetching product:', error)
    // Return sample product as fallback
    return sampleProducts.find(product => product.id === id) || null
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  if (!query.trim()) {
    return []
  }
  
  try {
    // Try to search in database first
    const dbProducts = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { category: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: { reviews: true },
    })
    
    if (dbProducts.length > 0) {
      // Transform Prisma types to our Product interface
      return dbProducts.map((product: PrismaProductWithReviews) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: Number(product.price),
        imageUrl: product.imageUrl,
        category: product.category,
        stock: product.stock,
        sellerId: product.sellerId,
        reviews: product.reviews.map((review) => ({
          id: review.id,
          rating: review.rating,
          comment: review.comment || undefined,
          createdAt: review.createdAt,
          updatedAt: review.updatedAt,
          userId: review.userId,
          productId: review.productId,
        })),
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      }))
    }
    
    // Fallback to sample products search if database is empty
    const lowercaseQuery = query.toLowerCase()
    return sampleProducts.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
    )
  } catch (error) {
    console.error('Error searching products:', error)
    // Return sample products search as fallback
    const lowercaseQuery = query.toLowerCase()
    return sampleProducts.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
    )
  }
}
