import Link from 'next/link'
import { titleFont } from '@/config/fonts'

export default function LoginPage () {
  return (
    <main className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Nueva Cuenta</h1>

      <div className="flex flex-col">
        <label htmlFor="email">Nombre Completo</label>
        <input
          type="email"
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
        />

        <label htmlFor="email">Contraseña</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email" />

        <button className="btn-primary">Crear Cuenta</button>

        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/new-account"
          className="btn-secondary text-center">
          Ingresar
        </Link>

      </div>
    </main>
  )
}
