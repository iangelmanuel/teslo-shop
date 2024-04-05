'use server'

import prisma from '@/lib/prisma'
import type { Address } from '@/interfaces'

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId)
    return {
      ok: true,
      message: 'Dirección del usuario grabada correctamente',
      address: newAddress
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'No se pudo grabar la dirección del usuario'
    }
  }
}

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: { userId }
    })

    const addressToSave = {
      userId,
      firstName: address.firstName,
      lastName: address.lastName,
      address: address.address,
      address2: address.address2,
      postalCode: address.postalCode,
      countryId: address.country,
      city: address.city,
      phone: address.phone
    }

    if (!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave
      })

      return newAddress
    }

    const updateAddress = await prisma.userAddress.update({
      where: { userId },
      data: addressToSave
    })

    return updateAddress
  } catch (error) {
    console.log(error)
    throw new Error('No se pudo grabar la dirección del usuario')
  }
}
