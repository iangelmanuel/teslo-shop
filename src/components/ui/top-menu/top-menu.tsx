'use client'

import Link from 'next/link'
import { IoSearchOutline, IoCartOutline } from 'react-icons/io5'
import { useUIStore } from '@/store'
import { titleFont } from '@/config/fonts'

export const TopMenu = () => {
  const openSideMenu = useUIStore(state => state.openSideMenu)
  return (
    <nav className="w-full flex justify-between items-center px-5">
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>Teslo </span>
          <span>| Shop</span>
        </Link>
      </div>

      <div className="hidden sm:block">
        <Link
          href="/category/men"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >Hombres</Link>
        <Link
          href="/category/women"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >Mujeres</Link>
        <Link
          href="/category/kid"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >Niños</Link>
      </div>

      <div className="flex items-center">
        <Link href="/search" >
          <IoSearchOutline className="w-5 h-5 cursor-pointer" />
        </Link>
        <Link href="/cart" className="mx-2">
          <div className="relative">
            <span className="absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
              2
            </span>
            <IoCartOutline className="w-5 h-5 cursor-pointer" />
          </div>
        </Link>

        <button
          onClick={() => { openSideMenu() }}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Menú
        </button>
      </div>
    </nav>
  )
}
