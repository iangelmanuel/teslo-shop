'use server'

import prisma from '@/lib/prisma'

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findUnique({
      include: {
        images: true
      },
      where: { slug }
    })

    if (!product) return null

    const { images, ...rest } = product

    return {
      ...rest,
      images: product.images.map(image => image.url)
    }
  } catch (error) {
    console.log(error)
    throw new Error('Error getting product by slug')
  }
}
