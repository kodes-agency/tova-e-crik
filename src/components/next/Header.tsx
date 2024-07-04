'use client'

import Image from 'next/image'
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
          cart(1)
        </PopoverTrigger>
        <PopoverContent className="border border-black mr-5 md:mr-10 bg-rose-100">
          Place content for the popover here.
        </PopoverContent>
      </Popover>
    </header>
  )
}
