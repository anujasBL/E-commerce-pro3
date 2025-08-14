import { Suspense } from 'react'
import { ProductGrid } from '@/components/products/product-grid'
import { ProductGridSkeleton } from '@/components/products/product-grid-skeleton'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Welcome to QuickCart Pro
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover amazing products from trusted sellers
          </p>
        </div>
        
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid />
        </Suspense>
      </main>
    </div>
  )
}
