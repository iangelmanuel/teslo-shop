'use server'

import prisma from '@/lib/prisma'

export const setTransactionId = async (
  orderId: string,
  transactionId: string
) => {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { transactionId }
    })

    if (!order) {
      return {
        ok: false,
        message: 'No se pudo encontrar la orden'
      }
    }

    return {
      ok: true,
      message: 'Orden actualizada correctamente'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al actualizar la orden'
    }
  }
}
