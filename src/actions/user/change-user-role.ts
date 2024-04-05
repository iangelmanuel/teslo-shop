'use server'

import { revalidatePath } from "next/cache"
import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export const changeUserRole = async (userId: string, role: string) => {
  const session = await auth()

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'No tienes permisos para realizar esta acción'
    }
  }

  try {
    const newRole = role === 'admin' ? 'admin' : 'user'

    const user = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole }
    })

    revalidatePath('/admin/users')

    return {
      ok: true,
      message: 'Rol actualizado correctamente'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Ocurrió un error al actualizar el rol'
    }
  }
}
