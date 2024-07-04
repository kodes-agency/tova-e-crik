'use client'

import { Media } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  buttonText: string
  buttonLink: string
  isExternalLink: boolean
  thumbnail: number | Media
  id?: string | null | undefined
}

export const Menu = ({ menu, index }: { menu: Props; index: number }) => {
  return (
    <div key={index} className="w-full flex flex-col items-center">
      <Link
        href={menu.buttonLink}
        target={menu.isExternalLink ? '_blank' : '_self'}
        className="font-black peer text-center lowercase text-6xl py-2 relative z-10 w-full hover:invert hover:mix-blend-difference"
      >
        {menu.buttonText}
      </Link>
      <Image
        // @ts-expect-error
        src={menu.thumbnail.url} alt={menu.thumbnail.alt}
        width={150}
        height={150}
        className="absolute top-0 left-0 w-full object-cover h-full pointer-events-none z-0 opacity-0 peer-hover:opacity-100 transition-opacity duration-300 ease-in-out"
        unoptimized={true}
      />
    </div>
  )
}
