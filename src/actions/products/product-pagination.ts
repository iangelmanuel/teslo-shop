'use server'

import prisma from '@/lib/prisma'
import type { Gender } from '@prisma/client'

interface PaginationOptions {
  page?: number
  take?: number
  gender?: Gender
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1
  if (page < 1) page = 1

  try {
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        images: {
          take: 2,
          select: {
            url: true
          }
        }
      },
      where: { gender }
    })

    const totalCount = await prisma.product.count({
      where: { gender }
    })
    const totalPages = Math.ceil(totalCount / take)

    return {
      currentPage: 1,
      totalPages,
      products: products.map(product => ({
        ...product,
        images: product.images.map(image => image.url)
      }))
    }
  } catch (error) {
    throw new Error('No products found')
  }
}
