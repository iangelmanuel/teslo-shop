'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'
import type { Address, Size } from '@/interfaces'

interface ProductToOrder {
  productId: string
  quantity: number
  size: Size
}

export const placeOrder = async (
  productsId: ProductToOrder[],
  address: Address
) => {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) return { ok: false, message: 'No hay sesión de usuario' }

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsId.map(product => product.productId)
      }
    }
  })

  const itemsInOrder = productsId.reduce((count, p) => count + p.quantity, 0)

  const { subTotal, tax, total } = productsId.reduce((totals, items) => {
    const productQuantity = items.quantity
    const product = products.find(p => p.id === items.productId)

    if (!product) throw new Error(`${items.productId} no existe - 500`)

    const subTotal = product.price * productQuantity
    totals.subTotal += subTotal
    totals.tax += subTotal * 0.15
    totals.total += subTotal + 1.15

    return totals
  }, { subTotal: 0, tax: 0, total: 0 })

  try {
    const prismaTx = await prisma.$transaction(async tx => {
      const updatedProductsPromises = products.map(async product => {
        const productQuantity = productsId.filter(
          p => p.productId === product.id
        ).reduce((acc, item) => item.quantity + acc, 0)

        if (productQuantity === 0) {
          throw new Error(`${product.id}, no tiene cantidad definida`)
        }

        return await tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity
            }
          }
        })
      })

      const updatedProducts = await Promise.all(updatedProductsPromises)

      updatedProducts.forEach(product => {
        if (product.inStock < 0) throw new Error(`${product.title} no tiene inventario suficiente`)
      })

      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subtotal: subTotal,
          tax,
          total,
          OrderItem: {
            createMany: {
              data: productsId.map(p => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price: products.find(product => product.id === p.productId)?.price ?? 0
              }))
            }
          }
        }
      })

      const { country, ...restAddress } = address
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id
        }
      })

      return {
        order,
        updatedProducts,
        orderAddress
      }
    })

    return {
      ok: true,
      message: 'Order placed successfully',
      order: prismaTx.order,
      address: prismaTx.orderAddress
    }
  } catch (error: any) {
    console.error(error)
    return { ok: false, message: error?.message }
  }
}
