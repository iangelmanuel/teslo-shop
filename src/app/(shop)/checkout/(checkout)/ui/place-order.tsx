'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { useAddressStore, useCartStore } from '@/store'
import { currencyFormat } from '@/utils'
import { placeOrder } from '@/actions'

export const PlaceOrder = () => {
  const router = useRouter()

  const [loaded, setLoaded] = useState(false)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const address = useAddressStore(state => state.address)

  const {
    subTotal,
    tax,
    total,
    itemsInCart
  } = useCartStore(state => state.getSummaryInfo())

  const cart = useCartStore(state => state.cart)
  const clearCart = useCartStore(state => state.clearCart)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true)

    const productsToOrder = cart.map(item => ({
      productId: item.id,
      quantity: item.quantity,
      size: item.size
    }))

    const res = await placeOrder(productsToOrder, address)

    if (!res.ok) {
      setIsPlacingOrder(false)
      setErrorMessage(res.message as string)
      return
    }

    setIsPlacingOrder(false)
    clearCart()
    router.replace('/orders/' + res.order!.id)
  }

  if (!loaded) {
    return <p>Loading...</p>
  }

  return (
    <article className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2">Resumen de orden</h2>

      <h2 className="text-2xl mb-2">Dirección de entrega</h2>
      <section className="mb-10">
        <p>{address.firstName} {address.lastName}</p>
        <p>{address.address}</p>
        <p>{address.address2 ? address.address2 : 'N/A'}</p>
        <p>{address.postalCode}</p>
        <p>{address.city} {address.country}</p>
        <p>{address.phone}</p>
      </section>

      <div className="w-full h-0.5 rounded bg-gray-200 mb-5" />

      <section className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">
          {itemsInCart === 1 ? '1 artículo' : `${itemsInCart}`}
        </span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Impuestos</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="text-2xl">Total</span>
        <span className="text-2xl text-right mt-5">{currencyFormat(total)}</span>
      </section>

      <section className="mt-2">
        <p className="mb-5">
          <span className="text-xs">
            Al hacer clic en Checkout, aceptas nuestros <a href="#" className="underline">Términos y Condiciones</a> y  nuestras <a href="#" className="underline">Políticas de Privacidad</a>.
          </span>
        </p>

        <p className="text-red-500">{errorMessage}</p>

        <button
          type="button"
          onClick={onPlaceOrder}
          className={clsx({
            'btn-primary': !isPlacingOrder,
            'btn-disabled': isPlacingOrder
          })}
        >
          Checkout
        </button>
      </section>
    </article>
  )
}
