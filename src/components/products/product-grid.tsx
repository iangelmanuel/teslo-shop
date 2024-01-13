import { ProductGridItem } from '..'
import type { SeedProduct } from '@/interfaces'

interface Props {
  products: SeedProduct[]
}

export const ProductGrid = ({ products }: Props) => {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
      {products.map(product => (
        <ProductGridItem
          key={product.slug}
          product={product}
        />
      ))}
    </section>
  )
}
