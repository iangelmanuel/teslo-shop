'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { IoSearchOutline, IoCartOutline } from 'react-icons/io5'
import { useCartStore, useUIStore } from '@/store'
import { titleFont } from '@/config/fonts'

export const TopMenu = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const openSideMenu = useUIStore(state => state.openSideMenu)
  const getTotalItemsInCart = useCartStore(state => state.getTotalItems())
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
          href="/gender/men"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >Hombres</Link>
        <Link
          href="/gender/women"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >Mujeres</Link>
        <Link
          href="/gender/kid"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >Niños</Link>
      </div>

      <div className="flex items-center">
        <Link href="/search" >
          <IoSearchOutline className="w-5 h-5 cursor-pointer" />
        </Link>
        <Link
          href={((getTotalItemsInCart === 0) && loaded) ? '/empty' : '/cart'}
          className="mx-2 fade-in"
        >
          <div className="relative">
            {loaded && getTotalItemsInCart > 0 && (
              <span className="absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                {getTotalItemsInCart}
              </span>
            )}
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
