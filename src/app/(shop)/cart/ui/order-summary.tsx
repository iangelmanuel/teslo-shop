'use client'

import { useEffect, useState } from 'react'
import { useCartStore } from '@/store'
import { currencyFormat } from '@/utils'

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false)
  const {
    subTotal,
    tax,
    total,
    itemsInCart
  } = useCartStore(state => state.getSummaryInfo())

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) return <p>Loading...</p>

  return (
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
  )
}
