'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'

export const getPaginatedOrders = async () => {
  const session = await auth()

  if (session?.user.role !== 'ADMIN') {
    return {
      ok: false,
      message: 'Debe de estar autorizado'
    }
  }

  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    })

    return {
      ok: true,
      orders
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al obtener las ordenes'
    }
  }
}
