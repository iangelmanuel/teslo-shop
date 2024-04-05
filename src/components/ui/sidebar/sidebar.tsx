'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import clsx from 'clsx'
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline
} from 'react-icons/io5'
import { logout } from '@/actions'
import { useUIStore } from '@/store'

export const Sidebar = () => {
  const { data: session } = useSession()

  const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen)
  const closeMenu = useUIStore(state => state.closeSideMenu)

  const isAuthenticated = !!session?.user

  return (
    <aside>
      {isSideMenuOpen && (
        <section className="fixed top-0 left-0 h-screen w-screen z-10 bg-black opacity-30" />
      )}

      {isSideMenuOpen && (
        <section onClick={() => { closeMenu() }} className="fade-in fixed top-0 left-0 h-screen w-screen z-10 backdrop-filter backdrop-blur-sm" />
      )}

      <nav
        className={clsx(
          'fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
          { 'translate-x-full': !isSideMenuOpen }
        )}
      >
        <IoCloseOutline
          size={30}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => { closeMenu() }}
        />

        <div className="relative mt-14">
          <IoSearchOutline
            size={20}
            className="absolute top-2 left-2"
          />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-400 transition-all duration-300"
          />
        </div>

        {session?.user && (
          <>
            <Link
              href="/profile"
              onClick={() => { closeMenu() }}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all duration-300"
            >
              <IoPersonOutline size={30} />
              <span className="ml-3 text-xl">Perfil</span>
            </Link>

            <Link
              href="/orders"
              onClick={() => { closeMenu() }}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all duration-300"
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>
          </>
        )}

        {isAuthenticated && (
          <button
            type="button"
            onClick={async () => { await logout() }}
            className="w-full flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all duration-300"
          >
            <IoLogOutOutline size={30} />
            <span className="ml-3 text-xl">Salir</span>
          </button>
        )}

        {!isAuthenticated && (
          <Link
            href="/auth/login"
            onClick={() => { closeMenu() }}
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all duration-300"
          >
            <IoLogInOutline size={30} />
            <span className="ml-3 text-xl">Ingresar</span>
          </Link>
        )}

        {session?.user?.role === 'admin' && (
          <>
            <div className="w-full h-px bg-gray-200 my-10" />

            <Link
              href="/admin/products"
              onClick={() => { closeMenu() }}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all duration-300"
            >
              <IoShirtOutline size={30} />
              <span className="ml-3 text-xl">Productos</span>
            </Link>

            <Link
              href="/"
              onClick={() => { closeMenu() }}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all duration-300"
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>

            <Link
              href="/admin/users"
              onClick={() => { closeMenu() }}
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all duration-300"
            >
              <IoPeopleOutline size={30} />
              <span className="ml-3 text-xl">Usuarios</span>
            </Link>
          </>
        )}

      </nav>
    </aside>
  )
}
