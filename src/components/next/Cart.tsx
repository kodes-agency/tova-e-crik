'use client'

import Image from 'next/image'
import { removeFromCart, updateCart } from '@/actions/CartActions'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { formatPrice } from '@/functions/next/formatFunctions'
import { X, ChevronDown, ChevronUp } from 'lucide-react'
import { useCartStore } from '@/store/store'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'

export const Cart = ({setIsOpen}: {setIsOpen: Dispatch<SetStateAction<boolean>>}) => {
  const [isLoading, setIsLoading] = useState(false)
  const { cart, setCart } = useCartStore((state) => state)


  if (cart?.items?.length === 0)
    return <div>No items added. Find something you like and add it to your cart!</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <div className="flex flex-col space-y-2 relative">
      <div className="flex flex-col space-y-2">
        {cart?.items?.map((item: any, index: number) => {
          return (
            <div key={index} className="flex flex-col">
              <div className="flex items-center justify-between">
                <Link key={index} href={`/shop/product/${item.variant.product.handle}`}>
                  <div className="space-x-4 flex items-center">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      width={50}
                      height={50}
                      priority
                      className="w-20 h-20 aspect-square object-cover"
                    />
                    <div>
                      <p className="font-bold">{item.title}</p>
                      <p className=" opacity-50">{item.variant.title}</p>
                      <p>
                        {item.quantity} x {formatPrice(item.unit_price)}
                      </p>
                    </div>
                  </div>
                </Link>
                
                <div className="flex items-center space-x-2">
                  <div className="flex flex-col">
                    <button
                      onClick={async () => {
                        setIsLoading(true)
                        const cart = await updateCart(item.id, item.quantity + 1)
                        // @ts-expect-error
                        setCart(cart)
                        setIsLoading(false)
                      }}
                    >
                      <ChevronUp size={26} />
                    </button>
                    <button
                      disabled={item.quantity === 1}
                      className="disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={async () => {
                        setIsLoading(true)
                        const cart = await updateCart(item.id, item.quantity - 1)
                        // @ts-expect-error
                        setCart(cart)
                        setIsLoading(false)
                      }}
                    >
                      <ChevronDown size={26} />
                    </button>
                  </div>
                  <button
                    className="h-4 w-4 bg-gray-500 hover:bg-slate-900 transition-all duration-300 text-white text-xs flex items-center justify-center rounded-full"
                    onClick={async () => {
                      setIsLoading(true)
                      const cart = await removeFromCart(item.id)
                      // @ts-expect-error
                      setCart(cart)
                      setIsLoading(false)
                    }}
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
        <div className="bg-black w-full h-px"></div>
        <div className="flex justify-between">
          <p>total:</p>
          <p>{formatPrice(cart?.total || 0)}</p>
        </div>
        <div className="flex flex-col items-end w-full">
          <Link onClick={()=> setIsOpen(false)} href={"/checkout"} className={buttonVariants({variant:'default'})}>Checkout</Link>
        </div>
      </div>
    </div>
  )
}
