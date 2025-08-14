// For now, we'll use sample data without Prisma to get the app running
// TODO: Integrate with Prisma when database is set up

export async function getProducts() {
  // Return sample products for MVP demonstration
  return getSampleProducts()
}

export async function getProductById(id: string) {
  const products = getSampleProducts()
  return products.find(product => product.id === id) || null
}

function getSampleProducts() {
  return [
    {
      id: 'sample-1',
      name: 'Wireless Bluetooth Headphones',
      description: 'High-quality wireless headphones with noise cancellation and long battery life. Perfect for music lovers and professionals.',
      price: 89.99,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      category: 'Electronics',
      stock: 25,
      seller: { name: 'TechStore', email: 'tech@example.com' },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'sample-2',
      name: 'Organic Cotton T-Shirt',
      description: 'Comfortable and sustainable organic cotton t-shirt. Available in multiple colors and sizes.',
      price: 24.99,
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      category: 'Clothing',
      stock: 50,
      seller: { name: 'EcoFashion', email: 'fashion@example.com' },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'sample-3',
      name: 'Stainless Steel Water Bottle',
      description: 'Durable stainless steel water bottle with vacuum insulation. Keeps drinks cold for 24 hours or hot for 12 hours.',
      price: 19.99,
      imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop',
      category: 'Home & Garden',
      stock: 100,
      seller: { name: 'OutdoorGear', email: 'outdoor@example.com' },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'sample-4',
      name: 'Smart Fitness Watch',
      description: 'Advanced fitness tracking watch with heart rate monitor, GPS, and smartphone connectivity.',
      price: 199.99,
      imageUrl: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500&h=500&fit=crop',
      category: 'Electronics',
      stock: 15,
      seller: { name: 'TechStore', email: 'tech@example.com' },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'sample-5',
      name: 'Handcrafted Wooden Bowl',
      description: 'Beautiful handcrafted wooden bowl made from sustainable materials. Perfect for serving or decoration.',
      price: 45.00,
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
      category: 'Home & Garden',
      stock: 8,
      seller: { name: 'ArtisanCrafts', email: 'crafts@example.com' },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'sample-6',
      name: 'Premium Coffee Beans',
      description: 'Single-origin premium coffee beans from sustainable farms. Rich flavor with notes of chocolate and caramel.',
      price: 18.99,
      imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=500&fit=crop',
      category: 'Food & Beverage',
      stock: 75,
      seller: { name: 'CoffeeRoasters', email: 'coffee@example.com' },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
}
