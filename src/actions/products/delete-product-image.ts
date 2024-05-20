'use server'

import prisma from '@/lib/prisma'
import { v2 as cloudinary } from 'cloudinary'
import { revalidatePath } from 'next/cache'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_URL ?? ''
})

export const deleteProductImage = async (imageId: string, imageUrl: string) => {
  if (!imageId.startsWith('http')) {
    return {
      ok: false,
      error: 'No se puede borrar imagenes de FS'
    }
  }

  const imageName = imageUrl
    .split('/')
    .at(-1)
    ?.split('?')
    .at(0)

  try {
    await cloudinary.uploader.destroy(imageName ?? '')
    const deletedImage = await prisma.productImage.delete({
      where: {
        id: Number(imageId)
      },
      select: {
        product: {
          select: {
            slug: true
          }
        }
      }
    })

    revalidatePath('/admin/product')
    revalidatePath(`/admin/product/${deletedImage.product.slug}`)
    revalidatePath(`/product/${deletedImage.product.slug}`)

    return {
      ok: true,
      deletedImage
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      error: 'Error al borrar la imagen'
    }
  }
}
