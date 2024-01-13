import { notFound } from 'next/navigation'
import { initialData } from '@/seed/seed'
import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector } from '@/components'
import { titleFont } from '@/config/fonts'

interface Props {
  params: {
    slug: string
  }
}

export default function ProductPage ({ params: { slug } }: Props) {
  const product = initialData.products.find(product => product.slug === slug)

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
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />

        <QuantitySelector quantity={1} />

        <button
          className="btn-primary my-5"
        >
          Agregar al carrito
        </button>

        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </section>
    </article>
  )
}
