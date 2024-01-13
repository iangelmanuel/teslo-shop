import { ProductGrid, Title } from '@/components'
import { initialData } from '@/seed/seed'

const products = initialData.products

export default function ShopPage () {
  return (
    <>
      <Title
        title="Tienda"
        subtitle="Productos de calidad"
        className="mb-2"
      />

      <ProductGrid products={products} />
    </>
  )
}
