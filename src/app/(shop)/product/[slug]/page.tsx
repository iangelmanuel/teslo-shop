import { notFound } from 'next/navigation'
import {
  ProductMobileSlideShow,
  ProductSlideShow,
  StockLabel
} from '@/components'
import { titleFont } from '@/config/fonts'
import { getProductBySlug } from '@/actions'
import type { Metadata, ResolvingMetadata } from 'next'
import { AddCart } from './ui/add-cart'

interface Props {
  params: {
    slug: string
  }
}

export const revalidate = 604800

export async function generateMetadata (
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params?.slug

  const product = await getProductBySlug(slug)

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      images: [`/products/${product?.images[1]}`]
    }
  }
}

export default async function ProductPage ({ params: { slug } }: Props) {
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <article className="mt-5 mb-20 grid gap-3 md:grid-cols-3">
      <section className="col-span-1 md:col-span-2">
        <ProductMobileSlideShow
          images={product.images}
          title={product.title}
          className="block md:hidden"
        />

        <ProductSlideShow
          images={product.images}
          title={product.title}
          className="hidden md:block"
        />
      </section>

      <section className="col-span-1 px-5">
        <StockLabel slug={product.slug} />

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        <AddCart product={product} />

        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </section>
    </article>
  )
}
