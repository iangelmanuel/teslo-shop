import { notFound } from 'next/navigation'
import { initialData } from '@/seed/seed'
import { ProductGrid, Title } from '@/components'

interface Props {
  params: {
    gender: string
  }
}

const seedProducts = initialData.products

export default function CategoryIdPage ({ params: { gender } }: Props) {
  const products = seedProducts.filter(product => product.gender === gender)
  const checkGender = gender === 'men'
    ? 'hombres'
    : gender === 'women'
      ? 'mujeres'
      : gender === 'kid'
        ? 'niños'
        : 'todos'

  if (!products) {
    return notFound()
  }

  return (
    <>
      <Title
        title={`Articulos para ${checkGender}`}
        subtitle={`Todos nuestros productos para ${checkGender}`}
        className="mb-2"
      />
      <ProductGrid
        products={products}
      />
    </>
  )
}
