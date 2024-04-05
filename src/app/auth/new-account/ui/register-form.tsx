'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'
import { login, registerUser } from '@/actions'

interface FormInputs {
  name: string
  email: string
  password: string
}

export const RegisterForm = () => {
  const [error, setError] = useState<string>('')

  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()

  const onSubmit = async (data: FormInputs) => {
    const { name, email, password } = data
    const res = await registerUser(name, email, password)

    if (!res.ok) {
      setError(res.message)
    }

    setError('')
    const isAuthenticated = await login(email.toLowerCase(), password)
    console.log(isAuthenticated)

    if (isAuthenticated.ok) {
      window.location.replace('/')
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col"
    >
      <label htmlFor="name">Nombre Completo</label>
      <input
        type="name"
        id="name"
        autoFocus
        {...register('name', { required: true })}
        className={clsx(
          'px-5 py-2 border bg-gray-200 rounded mb-5',
          { 'border-red-500': errors.name }
        )}
      />

      <label htmlFor="email">Correo Electrónico</label>
      <input
        type="email"
        id="email"
        autoFocus
        {...register('email', {
          required: true,
          pattern: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        })}
        className={clsx(
          'px-5 py-2 border bg-gray-200 rounded mb-5',
          { 'border-red-500': errors.email }
        )}
      />

      <label htmlFor="email">Contraseña</label>
      <input
        type="password"
        id="password"
        autoFocus
        {...register('password', { required: true, minLength: 6 })}
        className={clsx(
          'px-5 py-2 border bg-gray-200 rounded mb-5',
          { 'border-red-500': errors.password }
        )}
      />

      {error && <p className="text-red-500">* {error}</p>}

      <button className="btn-primary">Crear Cuenta</button>

      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/login"
        className="btn-secondary text-center"
      >
        Ingresar
      </Link>

    </form>
  )
}
