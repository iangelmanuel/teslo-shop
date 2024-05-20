'use client'

import { useEffect, useState, Fragment } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store'
import { ProductImage, QuantitySelector } from '@/components'

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const productsInCart = useCartStore(state => state.cart)
  const updateProductQuantity = useCartStore(state => state.updateProductInCart)
  const removeProduct = useCartStore(state => state.removeProductFromCart)

  if (!loaded) {
    return <p>Loading...</p>
  }

  return productsInCart?.map(product => (
    <Fragment key={`${product.slug}-${product.size}`}>
      <section className="flex gap-5">
        <ProductImage
          src={product.image}
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
          <Link
            href={`/product/${product.slug}`}
            className="hover:underline cursor-pointer"
          >
            {product.size} - {product.title}
          </Link>
          <p>${product.price}</p>
          <QuantitySelector
            quantity={product.quantity}
            onQuantityChange={
              value => { updateProductQuantity(product, value) }
            }
          />

          <button
            className="underline mt-3"
            onClick={() => { removeProduct(product) }}
          >
              Remover
            </button>
        </div>
      </section>
    </Fragment>
  ))
}
