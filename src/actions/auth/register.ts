'use server'

import prisma from '@/lib/prisma'
import bcryptjs from 'bcryptjs'

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: bcryptjs.hashSync(password, 10)
      }
    })

    const { password: _, ...rest } = user

    return {
      ok: true,
      message: 'Usuario registrado correctamente',
      rest
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al registrar el usuario'
    }
  }
}
