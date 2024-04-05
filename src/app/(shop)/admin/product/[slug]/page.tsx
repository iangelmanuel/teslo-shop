import { getProductBySlug } from "@/actions"
import { Title } from "@/components"


interface Props {
  params: {
    slug: string
  }
}

export default async function ProductPage ({ params }: Props) {
  const { slug } = params
  const product = await getProductBySlug(slug)
  return (
    <>
      <Title title={product?.title ?? 'No encontrado'} />
    </>
  )
}
