import { redirect } from 'next/navigation'
import Image from 'next/image'
import { getOrderById } from '@/actions'
import { OrderStatus, PayPalButton, Title } from '@/components'
import { currencyFormat } from '@/utils'

interface Props {
  params: {
    id: string
  }
}

export default async function OrderPage ({ params: { id } }: Props) {
  const { ok, order } = await getOrderById(id)

  if (!ok) {
    redirect('/')
  }

  const address = order!.OrderAddress
  return (
    <article className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <section className="flex flex-col w-[1000px]">
        <Title title={`Orden numero ${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <article className="flex flex-col mt-5">
            <OrderStatus isPaid={order!.isPaid} />
            <section>
              {order!.OrderItem.map(item => (
                <div key={item.product.slug + '-' + item.size} className="flex gap-5">
                  <Image
                    src={`/products/${item.product.images[0].url}`}
                    alt={item.product.title}
                    width={100}
                    height={100}
                    className="mr-5 rounded"
                    style={{
                      width: '100px',
                      height: '100px'
                    }}
                  />

                  <div>
                    <p>{item.product.title}</p>
                    <p>${item.price} x {item.quantity}</p>
                    <p className="font-bold">
                      Subtotal: {currencyFormat(item.price * item.quantity)}
                    </p>

                    <button className="underline mt-3">Remover</button>
                  </div>
                </div>
              ))}
            </section>
          </article>

          <article className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <h3 className="text-2xl mb-2">Dirección de entrega</h3>
            <section className="mb-10">
              <p>{address!.firstName} {address!.lastName}</p>
              <p>{address!.address}</p>
              <p>{address!.address2}</p>
              <p>{address!.postalCode}</p>
              <p>{address!.city} - {address!.countryId}</p>
              <p>{address!.phone}</p>
            </section>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-5" />

            <section className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">
                {order!.itemsInOrder === 1 ? '1 artículo' : `${order!.subtotal}`}
              </span>

              <span>Subtotal</span>
              <span className="text-right">
                {currencyFormat(order!.subtotal)}
              </span>

              <span>Impuestos</span>
              <span className="text-right">
                {currencyFormat(order!.tax)}
              </span>

              <span className="text-2xl">Total</span>
              <span className="text-2xl text-right mt-5">
                {currencyFormat(order!.total)}
              </span>
            </section>

            <section className="mt-5 mb-2 w-full">
              {order?.isPaid
                ? (
                    <OrderStatus isPaid={true} />
                  )
                : (
                    <PayPalButton
                      orderId={order!.id}
                      amount={order!.total}
                    />
                  )}
            </section>
          </article>
        </div>
      </section>
    </article>
  )
}
