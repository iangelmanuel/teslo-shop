'use client'

import { useEffect, useState, Fragment } from 'react'
import Image from 'next/image'
import { useCartStore } from '@/store'

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const productsInCart = useCartStore(state => state.cart)

  if (!loaded) {
    return <p>Loading...</p>
  }

  return productsInCart?.map(product => (
    <Fragment key={`${product.slug}-${product.size}`}>
      <section className="flex gap-5">
        <Image
          src={`/products/${product.image}`}
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
          <span className="hover:underline cursor-pointer">
            {product.size} - {product.title} ({product.quantity})
          </span>
          <p className="font-bold">${product.price * product.quantity}</p>

        </div>
      </section>
    </Fragment>
  ))
}
