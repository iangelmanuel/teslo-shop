import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartProduct } from '@/interfaces'

interface State {
  cart: CartProduct[]
  getTotalItems: () => number
  getSummaryInfo: () => {
    subTotal: number
    tax: number
    total: number
    itemsInCart: number
  }
  addProductToCart: (product: CartProduct) => void
  updateProductInCart: (product: CartProduct, quantity: number) => void
  removeProductFromCart: (product: CartProduct) => void

  clearCart: () => void
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      getTotalItems: () => {
        const { cart } = get()
        return cart.reduce((total, item) => total + item.quantity, 0)
      },

      getSummaryInfo: () => {
        const { cart } = get()

        const subTotal = cart.reduce(
          (subtotal, product) => (product.quantity * product.price) + subtotal, 0
        )

        const tax = subTotal * 0.15
        const total = subTotal + tax
        const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0)
        return { subTotal, tax, total, itemsInCart }
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get()

        const productInCart = cart.some(
          item => (item.id === product.id && item.size === product.size)
        )

        if (!productInCart) {
          set({ cart: [...cart, product] })
          return
        }

        const updatedCartProducts = cart.map(item => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity }
          }
          return item
        })
        set({ cart: updatedCartProducts })
      },

      updateProductInCart: (product: CartProduct, quantity: number) => {
        const { cart } = get()

        const updatedCartProducts = cart.map(item => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity }
          }
          return item
        })
        set({ cart: updatedCartProducts })
      },

      removeProductFromCart: (product: CartProduct) => {
        const { cart } = get()

        const updatedCartProducts = cart.filter(
          item => (item.id !== product.id || item.size !== product.size)
        )
        set({ cart: updatedCartProducts })
      },

      clearCart: () => {
        set({ cart: [] })
      }
    }),
    { name: 'shopping-cart' }
  )
)
