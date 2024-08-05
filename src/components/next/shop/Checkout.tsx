'use client'

import React from 'react'
import { Cart } from '@medusajs/medusa'
import { X, ChevronLeft } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  addShippingOption,
  applyDiscount,
  deleteDiscount,
  getCheckoutCart,
  initCheckout,
} from '@/actions/CheckoutActions'
import { StripeProvider } from '@/components/next/shop/stripe/StripeProvider'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import Image from 'next/image'
import { formatPrice } from '@/functions/next/formatFunctions'
import Link from 'next/link'
import { formSchema } from '@/schemas/checkoutFormSchema'
import { Label } from '@/components/ui/label'
import { PricedShippingOption } from '@medusajs/medusa/dist/types/pricing'

export const Checkout = ({
  initialCart,
  shipping_options,
}: {
  initialCart?: Omit<Cart, 'refundable_amount' | 'refunded_total'> | undefined
  shipping_options?: PricedShippingOption[] | undefined
}) => {
  const [clientSecret, setClientSecret] = useState('')
  const [cart, setCart] = useState(initialCart)
  console.log(cart)
  const [discountCode, setDiscountCode] = useState('')
  const [selectedShippingOption, setSelectedShippingOption] = useState({
    id: '',
    name: '',
    price: 0,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: cart?.shipping_address?.first_name || '',
      lastName: cart?.shipping_address?.last_name || '',
      email: cart?.email || '',
      phone: cart?.shipping_address?.phone || '',
      address: cart?.shipping_address?.address_1 || '',
      city: cart?.shipping_address?.city || '',
    },
  })

  const handleApplyDiscount = async () => {
    if (!discountCode) return

    await applyDiscount(discountCode)
    const data = await getCheckoutCart() // Fetch the updated cart data
    setCart(data?.cart) // Update the cart state with the new data
  }

  const handleDeleteDiscount = async () => {
    await deleteDiscount(cart?.discounts[0].code || '')
    const data = await getCheckoutCart() // Fetch the updated cart data
    setCart(data?.cart) // Update the cart state with the new data
  }

  const handleShippingOptionChange = async (value: string) => {
    console.log(value)
    const selected = shipping_options?.find((option) => option.id === value)
    const data = await addShippingOption(selected?.id || '')
    setSelectedShippingOption({
      id: selected?.id || '',
      name: selected?.name || '',
      price: selected?.amount || 0,
    })
    setCart(data?.cart) // Update the cart state with the new data
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { cart } = await initCheckout(values)
    setClientSecret(cart?.payment_session?.data?.client_secret as string)
  }

  return (
    <div className="max-w-5xl w-full">
      <div className="grid grid-cols-3 w-full mb-5">
        <div className='flex items-end'>
          <Link href="/shop" className="flex items-center text-xs uppercase md:normal-case  md:text-xl font-bold hover:underline hover:underline-offset-2">
            <ChevronLeft size={30} />
            Back to shop
          </Link>
        </div>
        <div className='flex items-center justify-center'>
          <Link href="/">
            <Image
              src="/files/logo.webp"
              alt="TOVA E CIRK LOGO"
              width={60}
              height={60}
              priority={true}
              className="w-14 h-14 md:w-20 md:h-20"
            />
          </Link>
        </div>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        <div className="">
          <div className="sticky top-10 space-y-5">
            <Card className="">
              <CardHeader>
                <CardTitle>Order summary</CardTitle>
                <CardDescription>
                  Review your order before completing the checkout process.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {cart?.items.map((item) => (
                    <div key={item.id} className="grid grid-cols-4">
                      <Link href={`/shop/product/${item.variant.product.handle}`} className=" col-span-3">
                        <div className="flex space-x-2 items-center">
                          <Image
                            src={item.thumbnail || ''}
                            alt={item.title}
                            width={50}
                            height={50}
                            className='aspect-square object-cover rounded-sm'
                          />
                          <div>
                            <p className='leading-none'>{item.title}</p>
                            <p className="text-sm text-gray-500">{item.variant.title}</p>
                          </div>
                        </div>
                      </Link>
                      <div className='flex flex-col justify-center'>
                        <p className="text-end text-sm lg:text-base">
                          {item.quantity} x
                        </p>
                        <p className='text-sm lg:text-base text-end'>{formatPrice(item.unit_price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-col w-full">
                  <div className="h-px w-full bg-black"></div>
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>{formatPrice(cart?.subtotal || 0)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping</p>
                    <p>
                      {cart?.shipping_methods && cart?.shipping_methods.length > 0
                        ? formatPrice(cart?.shipping_methods[0].price || 0)
                        : 'Choose shipping option'
                      }
                    </p>
                  </div>
                  {cart?.discounts && cart?.discounts.length > 0 && (
                    <div className="flex justify-between">
                      <p>Discount</p>
                      <p>{formatPrice(cart?.discount_total || 0)}</p>
                    </div>
                  )}
                  <div className="flex justify-between font-bold">
                    <p>Total</p>
                    <p>{formatPrice(cart?.total || 0)}</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
            <Card className="">
              <CardHeader>
                <CardTitle>Discount code</CardTitle>
                <CardDescription>Add your discount code to apply it to your order.</CardDescription>
              </CardHeader>
              <CardContent>
                {cart?.discounts && cart?.discounts.length > 0 && (
                  <div className="flex flex-col">
                    <div>
                      <p>Applied discount codes:</p>
                    </div>
                    {cart?.discounts.map((discount) => (
                      <div key={discount.id} className="flex justify-between w-full pb-4">
                        <p>{discount.rule.description}</p>
                        <Button
                          variant={'secondary'}
                          className="h-auto w-auto p-0 hover:bg-cyan-200 group"
                          onClick={handleDeleteDiscount}
                        >
                          <X size={20} className="text-gray-400 group-hover:text-black" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
                  <Input
                    className='text-base'
                    placeholder="Enter discount code"
                    onChange={({ target }) => {
                      setDiscountCode(target.value)
                    }}
                  />
                  <Button
                    className=" hover:bg-cyan-200 bg-cyan-100 disabled:cursor-not-allowed"
                    variant={'secondary'}
                    disabled={discountCode === ''}
                    onClick={handleApplyDiscount}
                  >
                    Apply discount
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex flex-col space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>Checkout form</CardTitle>
              <CardDescription>Fill in your details to complete the order process.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1.5">
                  <div className="flex flex-col md:flex-row w-full space-y-1.5 md:space-y-0 md:space-x-5">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="space-y-0.5 w-full">
                          <FormLabel>First name</FormLabel>
                          <FormControl>
                            <Input className='text-base' {...field} placeholder="John" />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem className="space-y-0.5 w-full">
                          <FormLabel>Last name</FormLabel>
                          <FormControl>
                            <Input className='text-base' {...field} placeholder="Doe" />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col md:flex-row w-full space-y-1.5 md:space-y-0 md:space-x-5">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-0.5 w-full">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input className='text-base' {...field} type="email" placeholder="johndoe@email.com" />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="space-y-0.5 w-full">
                          <FormLabel>Phone number</FormLabel>
                          <FormControl>
                            <Input className='text-base' {...field} placeholder="+359 888 11 22 33" />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="space-y-0.5">
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input className='text-base' {...field} placeholder="ul. Neznayna 69" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="space-y-0.5">
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input className='text-base' {...field} placeholder="Burgas" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col items-start space-y-1.5 pt-2">
                    <Label className="">Shipping options</Label>
                    <ToggleGroup
                      type="single"
                      variant={'outline'}
                      aria-required
                      defaultValue={cart?.shipping_methods[0]?.shipping_option_id || ''}
                      onValueChange={(value) => {
                        handleShippingOptionChange(value)
                      }}
                      className="w-full"
                    >
                      {shipping_options?.map((option) => (
                        <ToggleGroupItem
                          key={option.id}
                          value={option.id || ''}
                          className="h-auto p-2 w-full data-[state=on]:bg-cyan-100 data-[state=on]:ring-black data-[state=on]:ring-1"
                        >
                          <div className="flex flex-col items-start w-full">
                            <p className="font-bold">{option.name}</p>
                            <p>{formatPrice(option.amount || 0)}</p>
                          </div>
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </div>
                  <Button
                    className="!mt-5 ring-1 ring-black hover:bg-cyan-200 w-full bg-cyan-100"
                    type="submit"
                    variant={'secondary'}
                    disabled={!cart?.shipping_methods || cart?.shipping_methods.length === 0}
                  >
                    Save and continue
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          {clientSecret && (
            <Card>
              <CardHeader>
                <CardTitle>Card payment via Stripe</CardTitle>
                <CardDescription>Fill in your cart details and comlete the order.</CardDescription>
              </CardHeader>
              <CardContent>
                <StripeProvider cartId={cart?.id || ''} clientSecret={clientSecret} />
              </CardContent>
              <CardFooter>
                <p className="max-w-sm text-xs">
                  By clicking on the button "Order now" you agree with our terms and conditions our
                  privacy policy.
                </p>
              </CardFooter>
            </Card>
          )}
        </div>
      </section>
    </div>
  )
}
