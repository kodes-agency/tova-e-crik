import { create } from 'zustand'
import { getCart } from '@/actions/CartActions'
import { Cart } from '@medusajs/medusa'

interface CartStore {
  cart: Omit<Cart, 'refundable_amount' | 'refunded_total'> | undefined
  setCart: () => void
}

export const useCartStore = create<CartStore>()((set) => ({
  cart: undefined,
  setCart: async () => set({ cart: await getCart() }),
}))




