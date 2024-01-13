'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { SeedProduct } from '@/interfaces'

interface Props {
  product: SeedProduct
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0])
  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={`/products/${displayImage}`}
          alt={product.title}
          width={500}
          height={500}
          onMouseEnter={() => { setDisplayImage(product.images[1]) }}
          onMouseLeave={() => { setDisplayImage(product.images[0]) }}
          className="w-full object-cover rounded"
        />
        <div className="p-4 flex flex-col">
          <span
            className="hover:text-blue-600"
          >{product.title}</span>
          <span className="font-bold">${product.price}</span>
        </div>
      </Link>
    </div>
  )
}
