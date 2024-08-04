'use server'

import { z } from 'zod'
import { formSchema } from '@/schemas/checkoutFormSchema'
import Medusa from '@medusajs/medusa-js'
import { cookies } from 'next/headers'
const medusa = new Medusa({
  maxRetries: 3,
  baseUrl: process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000',
})

export async function initCheckout(values: z.infer<typeof formSchema>) {
  try {
    const cookieStore = cookies()
    let cartId = cookieStore.get('cart_id')?.value

    if (!cartId) return { error: 'No cart found' }

    const initialCart = await medusa.carts.update(cartId, {
      email: values.email,
      billing_address: {
        first_name: values.firstName,
        last_name: values.lastName,
        address_1: values.address,
        city: values.city,
        country_code: 'bg',
        phone: values.phone,
      },
      shipping_address: {
        first_name: values.firstName,
        last_name: values.lastName,
        address_1: values.address,
        city: values.city,
        phone: values.phone,
      },
    })

    if (initialCart.cart.payment_session) return { cart: initialCart.cart }

    await medusa.carts.createPaymentSessions(cartId)

    const { cart } = await medusa.carts.setPaymentSession(cartId, {
      provider_id: 'stripe',
    })

    console.log('Cart updated')
    return { cart }
  } catch (error) {
    console.error('Error completing checkout:', error)
    throw new Error('Failed to complete checkout')
  }
}

export async function addShippingOption(shippingOption: string) {
  try {
    const cookieStore = cookies()
    let cartId = cookieStore.get('cart_id')?.value

    if (!cartId) return { error: 'No cart found' }

    const {cart} = await medusa.carts.addShippingMethod(cartId, {
      option_id: shippingOption,
    })

    return { cart }
  } catch (error) {
    console.error('Error adding shipping option:', error)
  }
}

export async function completeCheckout() {
  try {
    const cookieStore = cookies()
    let cartId = cookieStore.get('cart_id')?.value

    if (!cartId) return { error: 'No cart found' }

    await medusa.carts.retrieve(cartId)
    const { data } = await medusa.carts.complete(cartId)
    const newCart = await medusa.carts.create()
    cookieStore.set('cart_id', newCart.cart.id)
    return { data }
  } catch (error) {
    console.error('Error completing checkout:', error)
    throw new Error('Failed to complete checkout')
  }
}

export async function getCheckoutCart() {
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
    const { shipping_options } = await medusa.shippingOptions.listCartOptions(cartId)

    console.log('Cart retrieved')
    return { cart, shipping_options }
  } catch (error) {
    console.error('Error retrieving cart:', error)
  }
}

export async function getOrder(cartId: string) {
  try {
    if (!cartId) return { error: 'No cart found' }

    const { order } = await medusa.orders.retrieveByCartId(cartId)

    return { order }
  } catch (error) {
    console.error('Error retrieving order:', error)
  }
}

export async function applyDiscount(code: string) {
  try {
    const cookieStore = cookies()
    let cartId = cookieStore.get('cart_id')?.value

    if (!cartId) return { error: 'No cart found' }

    const { cart } = await medusa.carts.update(cartId, {
      discounts: [
        {
          code: code,
        },
      ],
    })

    return { cart }
  } catch (error) {
    console.error('Error applying discount:', error)
  }
}

export async function deleteDiscount(code: string) {
  try {
    const cookieStore = cookies()
    let cartId = cookieStore.get('cart_id')?.value

    if (!cartId) return { error: 'No cart found' }

    const { cart } = await medusa.carts.deleteDiscount(cartId, code)

    return { cart }
  } catch (error) {
    console.error('Error applying discount:', error)
  }
}
