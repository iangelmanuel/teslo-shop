import Link from 'next/link'
import { Title } from '@/components'
import { ProductsInCart } from './ui/products-in-cart'
import { OrderSummary } from './ui/order-summary'
// import { redirect } from 'next/navigation'

export default function CartPage () {
  // redirect('/empty')
  return (
    <article className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <section className="flex flex-col w-[1000px]">
        <Title title="Carrito de compras" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <article className="flex flex-col mt-5">
            <span className="text-xl">Agregar mas items</span>
            <Link
              href={'/'}
              className="underline mb-5"
            >Continua comprando</Link>

            <section>
              <ProductsInCart />
            </section>
          </article>

          <article className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <OrderSummary />

            <section>
              <Link
                href="/checkout/address"
                className="flex btn-primary justify-center w-full mt-5"
              >Checkout</Link>
            </section>
          </article>
        </div>
      </section>
    </article>
  )
}
