'use server'

import Medusa from '@medusajs/medusa-js'
import { cookies } from 'next/headers'
const medusa = new Medusa({
  maxRetries: 3,
  baseUrl: process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000',
})

export async function getCart() {
  try {
    const cookieStore = cookies()
    let cartId = cookieStore.get('cart_id')?.value

    if (!cartId) {
      const { cart } = await medusa.carts.create()
      cartId = cart.id
      cookieStore.set('cart_id', cartId)
      console.log('Cart created')
    }

    const { cart } = await medusa.carts.retrieve(cartId)

    console.log('Cart retrieved')
    
    return cart
  } catch (error) {
    const cookieStore = cookies()
    const { cart } = await medusa.carts.create()
    cookieStore.set('cart_id', cart.id)
    console.error('Error retrieving cart:', error)
  }
}

export async function addToCart(variant_id: string, quantity: number) {
  try {
    console.log('Adding item to cart')
    const cookieStore = cookies()
    let cartId = cookieStore.get('cart_id')?.value

    console.log('Checking cookie store')
    if (!cartId) {
      const { cart } = await medusa.carts.create()
      cartId = cart.id
      cookieStore.set('cart_id', cartId)
      console.log('Cart created')
    }

    const { cart } = await medusa.carts.lineItems.create(cartId, {
      variant_id,
      quantity,
    })

    console.log('Item added to cart')
    return cart
  } catch (error) {
    console.error('Error adding item to cart:', error)
    throw new Error('Failed to add item to cart')
  }
}

export async function removeFromCart(lineItemId: string) {
  try {
    const cookieStore = cookies()

    let cartId = cookieStore.get('cart_id')?.value

    if (!cartId) {
      throw new Error('Cart not found')
    }

    console.log('Item removed from cart')
    const { cart } = await medusa.carts.lineItems.delete(cartId, lineItemId)
    return cart
  } catch (error) {
    console.error('Error removing item from cart:', error)
    throw new Error('Failed to remove item from cart')
  }
}

export async function updateCart(lineItemId: string, quantity: number) {
  try {
    const cookieStore = cookies()

    let cartId = cookieStore.get('cart_id')?.value

    if (!cartId) {
      throw new Error('Cart not found')
    }

    const { cart } = await medusa.carts.lineItems.update(cartId, lineItemId, {
      quantity,
    })
    console.log('Cart updated')
    return cart
  } catch (error) {
    console.error('Error updating cart:', error)
    throw new Error('Failed to update cart')
  }
}

export async function getShippingOptions() {
  try {
    const cookieStore = cookies()
    let cartId = cookieStore.get('cart_id')?.value

    if (!cartId) {
      throw new Error('Cart not found')
    }

    const { shipping_options } = await medusa.shippingOptions.listCartOptions(cartId)
    console.log('Shipping options retrieved')
    return shipping_options
  } catch (error) {
    console.error('Error retrieving shipping options:', error)
    throw new Error('Failed to retrieve shipping options')
  }
}
