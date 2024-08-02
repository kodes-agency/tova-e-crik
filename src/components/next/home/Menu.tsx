'use client'

import { Media } from '@/payload-types'
import { useRouter } from 'next/navigation'
import Link from 'next/link';

type Props = {
  buttonText: string
  buttonLink: string
  isExternalLink: boolean
  thumbnail: number | Media
  id?: string | null | undefined
}

export const Menu = ({ menu, index }: { menu: Props; index: number }) => {
  const router = useRouter()

  return (
    <div key={index} className="w-full flex flex-col items-center">
      {
        <Link 
          className='font-black peer text-center lowercase text-6xl py-2 relative z-10 w-full hover:invert hover:mix-blend-difference'
          href={menu.buttonLink}
        >{menu.buttonText}</Link>
      }
      <video
        // @ts-expect-error
        src={menu.thumbnail.url} alt={menu.thumbnail.alt}
        className="absolute top-0 left-0 w-full object-cover h-full pointer-events-none z-0 opacity-0 peer-hover:opacity-100 transition-opacity duration-300 ease-in-out"
        loop
        autoPlay
        muted
        preload="auto"
      >
        {/* @ts-ignore */}
         <source src={menu.thumbnail.url} type="video/webm"/>
      </video>
    </div>
  )
}

