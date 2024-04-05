import { redirect } from 'next/navigation'
import { getPaginatedProductsWithImages } from '@/actions'
import { Pagination, ProductGrid, Title } from '@/components'

interface Props {
  searchParams: {
    page?: string
  }
}

export const revalidate = 60

export default async function ShopPage ({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { products, totalPages } = await getPaginatedProductsWithImages({
    page
  })

  if (products.length === 0) {
    redirect('/')
  }

  return (
    <>
      <Title
        title="Tienda"
        subtitle="Productos de calidad"
        className="mb-2"
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  )
}
