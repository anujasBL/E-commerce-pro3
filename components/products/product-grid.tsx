import { getProducts } from '@/lib/products'
import { ProductCard } from './product-card'

export async function ProductGrid() {
  const products = await getProducts()

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-muted-foreground mb-2">
          No products found
        </h3>
        <p className="text-sm text-muted-foreground">
          Check back later for new products!
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
