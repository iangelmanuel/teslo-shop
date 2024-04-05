import { redirect } from 'next/navigation'
import { getPaginatedProductsWithImages } from '@/actions'
import { Pagination, ProductGrid, Title } from '@/components'
import type { Gender } from '@prisma/client'

interface Props {
  params: {
    gender: string
  }
  searchParams: {
    page?: string
  }
}

export const revalidate = 60

export default async function CategoryIdPage ({
  params: { gender },
  searchParams
}: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    gender: gender as Gender
  })

  if (products.length === 0) {
    redirect(`/gender/${gender}`)
  }

  const checkGender = gender === 'men'
    ? 'hombres'
    : gender === 'women'
      ? 'mujeres'
      : gender === 'kid'
        ? 'niños'
        : 'todos'
  return (
    <>
      <Title
        title={`Articulos para ${checkGender}`}
        subtitle={`Todos nuestros productos para ${checkGender}`}
        className="mb-2"
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  )
}
