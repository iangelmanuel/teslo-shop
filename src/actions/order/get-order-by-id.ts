'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'

export const getOrderById = async (id: string) => {
  const session = await auth()

  if (!session) {
    return {
      ok: false,
      message: 'Debe de estar autenticado'
    }
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,

            product: {
              select: {
                title: true,
                slug: true,
                images: {
                  select: {
                    url: true
                  },
                  take: 1
                }
              }
            }
          }
        }
      }
    })

    if (!order) throw new Error('No se encontro la orden')

    if (session.user.role === 'user') {
      if (session.user.id !== order.userId) {
        throw new Error(`${id} no es de ese usuario`)
      }
    }

    return {
      ok: true,
      order
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'No se encontro la orden'
    }
  }
}
