import { getProductBySlug } from "@/actions"
import { Title } from "@/components"
import { redirect } from "next/navigation"


interface Props {
  params: {
    slug: string
  }
}

export default async function ProductPage ({ params }: Props) {
  const { slug } = params
  const product = await getProductBySlug(slug)

  if (!product) {
    redirect('/admin/products')
  }

  const title = (slug === 'new') ? 'Nuevo producto' : 'Editar producto'
  return (
    <>
      <Title title={product?.title ?? 'No encontrado'} />
    </>
  )
}
