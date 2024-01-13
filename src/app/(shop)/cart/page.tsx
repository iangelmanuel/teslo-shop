import Link from 'next/link'
import { QuantitySelector, Title } from '@/components'
import { initialData } from '@/seed/seed'
import Image from 'next/image'
// import { redirect } from 'next/navigation'

const productInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2]
]

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
              {productInCart.map(product => (
                <div key={product.slug} className="flex gap-5">
                  <Image
                    src={`/products/${product.images[0]}`}
                    alt={product.title}
                    width={100}
                    height={100}
                    className="mr-5 rounded"
                    style={{
                      width: '100px',
                      height: '100px'
                    }}
                  />

                  <div>
                    <p>{product.title}</p>
                    <p>${product.price}</p>
                    <QuantitySelector quantity={3} />

                    <button className="underline mt-3">Remover</button>
                  </div>
                </div>
              ))}
            </section>
          </article>

          <article className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <section className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 artículos</span>

              <span>Subtotal</span>
              <span className="text-right">$100</span>

              <span>Impuestos</span>
              <span className="text-right">$100</span>

              <span className="text-2xl">Total</span>
              <span className="text-2xl text-right mt-5">$100</span>
            </section>

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
