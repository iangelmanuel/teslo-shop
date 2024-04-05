'use client'

import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import Link from 'next/link'
import clsx from 'clsx'
import { authenticate } from '@/actions'
import { IoInformationOutline } from 'react-icons/io5'

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined)

  useEffect(() => {
    if (state === 'Success') {
      window.location.replace('/')
    }
  }, [state])

  return (
    <form
      action={dispatch}
      noValidate
      className="flex flex-col"
    >
      <label htmlFor="email">Correo electrónico</label>
      <input
        type="email"
        name="email"
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
      />

      <label htmlFor="email">Contraseña</label>
      <input
        type="password"
        name="password"
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
      />

      <div
        aria-live="polite"
        aria-atomic="true"
        className="flex h-8 items-end space-x-1"
      >
        {state === 'Invalid credentials.' && (
          <section className="flex flex-row space-x-2 mb-3">
            <IoInformationOutline className="h-5 w-5 bg-red-500" />
            <div className="text-sm text-red-500">Las credenciales no son correctas</div>
          </section>
        )}
      </div>

      <LoginButton />

      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/new-account"
        className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>

    </form>
  )
}

function LoginButton () {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className={clsx({
        'btn-primary': !pending,
        'btn-disabled': pending
      })}
    >Ingresar</button>
  )
}
