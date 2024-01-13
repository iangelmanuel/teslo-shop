import { Title } from '@/components'
import { initialData } from '@/seed/seed'
import Image from 'next/image'
import clsx from 'clsx'
import { IoCardOutline } from 'react-icons/io5'

interface Props {
  params: {
    id: string
  }
}

const productInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2]
]

export default function OrderPage ({ params: { id } }: Props) {
  return (
    <article className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <section className="flex flex-col w-[1000px]">
        <Title title={`Orden numero ${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <article className="flex flex-col mt-5">
            <section
              className={clsx(
                'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                {
                  'bg-red-500': false,
                  'bg-green-700': true
                }
              )}
            >
              <IoCardOutline size={30} />
              <span className="mx-2">Pendiente de pago</span>
            </section>

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
                    <p>${product.price} x 3</p>
                    <p className="font-bold">Subtotal: ${product.price * 3}</p>

                    <button className="underline mt-3">Remover</button>
                  </div>
                </div>
              ))}
            </section>
          </article>

          <article className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <section className="mb-10">
              <p>Angel De La Torre</p>
              <p>Av. Siempre Viva 123</p>
              <p>Col. Centro</p>
              <p>Alcaldía Cuauhtémoc</p>
              <p>CP 123123123</p>
              <p>123.123.123</p>
            </section>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-5" />

            <section className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 artículos</span>

              <span>Subtotal</span>
              <span className="text-right">$100</span>

              <span>Impuestos</span>
              <span className="text-right">$100</span>

              <span className="text-2xl mt-5">Total</span>
              <span className="text-2xl text-right mt-5">$100</span>
            </section>

            <section className="mt-5 mb-2 w-full">
              <section
                className={clsx(
                  'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                  {
                    'bg-red-500': false,
                    'bg-green-700': true
                  }
                )}
              >
                <IoCardOutline size={30} />
                {/* <span className="mx-2">Pendiente de pago</span> */}
                <span className="mx-2">Pagada</span>
              </section>
            </section>
          </article>
        </div>
      </section>
    </article>
  )
}
