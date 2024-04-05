'use client'

import { useState } from 'react'
import { QuantitySelector, SizeSelector } from '@/components'
import type { CartProduct, SeedProduct, Size } from '@/interfaces'
import { useCartStore } from '@/store'

interface Props {
  product: SeedProduct
}

export const AddCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>()
  const [quantity, setQuantity] = useState<number>(1)
  const [error, setError] = useState(false)

  const addProductToCart = useCartStore(state => state.addProductToCart)

  const addToCart = () => {
    if (!size) {
      setError(true)
      return
    }

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity,
      size,
      image: product.images[0]
    }

    addProductToCart(cartProduct)
    setError(false)
    setQuantity(1)
    setSize(undefined)
  }

  return (
    <>
      {error && !size && (
        <span className="mt-2 text-red-500">
          Debe de seleccionar una talla
        </span>
      )}

      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChange={size => { setSize(size) }}
      />

      <QuantitySelector
        quantity={quantity}
        onQuantityChange={quantity => { setQuantity(quantity) }}
      />

      <button
        onClick={addToCart}
        className="btn-primary my-5"
      >
        Agregar al carrito
      </button>
    </>
  )
}
