import Link from 'next/link'
import { Title } from '@/components'
import { ProductsInCart } from './ui/products-in-cart'
import { PlaceOrder } from './ui/place-order'

export default function CheckoutPage () {
  return (
    <article className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <section className="flex flex-col w-[1000px]">
        <Title title="Verificar orden" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <article className="flex flex-col mt-5">
            <span className="text-xl">Ajustar elementos</span>
            <Link
              href="/cart"
              className="underline mb-5"
            >Editar carrito comprando</Link>

            <section>
              <ProductsInCart />
            </section>
          </article>

        <PlaceOrder />
        </div>
      </section>
    </article>
  )
}
