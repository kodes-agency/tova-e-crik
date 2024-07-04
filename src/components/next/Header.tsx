'use client'

import Image from 'next/image'
import { Separator } from "@/components/ui/separator"
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Link from 'next/link'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const menuItems = [
  { title: 'home', link: '/' },
  { title: 'shop', link: '/shop' },
  { title: 'films', link: 'https://www.patreon.com/tsuro' },
  { title: 'trunk', link: '/trunk' },
  { title: 'about', link: '/about' },
  { title: 'social', link: '/social' },
]

const cartItems = [
  {
    name: 'Fancy Fluffy jacket',
    quantity: 1,
    price: 149.99,
    color: 'beige',
    img: '/files/product-img-1.webp'
  },
  {
    name: 'Posh Puffy pillow',
    quantity: 3,
    price: 79.49,
    color: 'gray',
    img: '/files/product-img-2.webp'
  },
]

export const Header = ({}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed flex justify-between items-center invert mix-blend-difference w-full pt-5 px-5 md:px-10 z-40 ">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger className=" font-bold text-xl w-24 md:w-32 text-start">menu</PopoverTrigger>
        <PopoverContent className="border border-black w-24 md:-ml-10 bg-rose-100 flex flex-col *:hover:font-normal hover:*:hover:font-bold">
          {menuItems.map((menuItem, index) => {
            return (
              <Link
                key={index}
                href={menuItem.link}
                target={menuItem.link.includes('http') ? '_blank' : '_self'}
                className="font-bold text-lg "
                onClick={() => setIsOpen(false)}
              >
                {menuItem.title}
              </Link>
            )
          })}
        </PopoverContent>
      </Popover>
      <Link href="/">
        <Image
            src="/files/logo.webp"
            alt="TOVA E CIRK LOGO"
            width={90}
            height={90}
            priority={true}
            className="w-14 h-14 md:w-20 md:h-20"
        />
      </Link>
      <Popover>
        <PopoverTrigger className=" font-bold text-xl w-24 md:w-32 text-end">
          cart(2)
        </PopoverTrigger>
        <PopoverContent className="border w-80 border-black mr-5 md:mr-10 bg-rose-100">
          <div className='flex flex-col space-y-2'>
            {
              cartItems.map((item, index) => {
                return (
                  <div key={index} className='flex flex-col'>
                    <div className="flex items-center space-x-4">
                      <Image
                          src={item.img}
                          alt={item.name}
                          width={50}
                          height={50}
                          priority
                          className='w-20 h-20 aspect-square object-cover'
                      />
                      <div>
                        <p className='font-bold'>{item.name}</p>
                        <p className=' opacity-50'>{item.color}</p>
                        <p>{item.quantity} x {item.price} bgn</p>
                      </div>
                    </div>
                  </div>
                )
              })
            }
            <div className='bg-black w-full h-px'></div>
            <div className='flex justify-between'>
              <p>total:</p>
              <p>388.46 bgn</p>
            </div>
            <div className='flex flex-col items-end w-full '>
              <button className='bg-black p-2 px-4 rounded-md text-white w-fit'>
                checkout
              </button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </header>
  )
}
