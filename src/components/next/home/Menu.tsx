'use client'

import { isMobile } from 'react-device-detect'
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

  const handleMouseEnter = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const video = document.querySelector(`video[data-video="${menu.buttonLink}"]`) as HTMLVideoElement
    if (video) {
      video.play()
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const video = document.querySelector(`video[data-video="${menu.buttonLink}"]`) as HTMLVideoElement
    if (video) {
      video.currentTime = 0
      video.play()
    }
  }

  const handleMouseLeave = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const video = document.querySelector(`video[data-video="${menu.buttonLink}"]`) as HTMLVideoElement
    if (video) {
      video.pause()
    }
  }

  if(isMobile) {
    <div key={index} className="w-full flex flex-col items-center">
    <button 
      className='font-black peer text-center lowercase text-6xl py-2 relative z-10 w-full hover:invert hover:mix-blend-difference'
      data-video={menu.buttonLink}
      onMouseEnter={handleClick}
    >{menu.buttonText}</button>
    <video
      // @ts-expect-error
      src={menu.thumbnail.url} alt={menu.thumbnail.alt}
      className="fixed top-0 left-0 w-full object-cover h-full pointer-events-none z-0 opacity-0 peer-hover:opacity-100 transition-opacity duration-300 ease-in-out"
      data-video={menu.buttonLink}
      muted
      // onEnded={()=>{
      //   router.push(menu.buttonLink)
      // }}
      disablePictureInPicture
      disableRemotePlayback
      playsInline
      preload="auto"
    >
      {/* @ts-ignore */}
       <source src={menu.thumbnail.url} type="video/webm"/>
    </video>
  </div>
  } else {
    return (
      <div key={index} className="w-full flex flex-col items-center">
        <Link 
          className='font-black peer text-center lowercase text-6xl py-2 relative z-10 w-full hover:invert hover:mix-blend-difference'
          href={menu.buttonLink}
          data-video={menu.buttonLink}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >{menu.buttonText}</Link>
        <video
          // @ts-expect-error
          src={menu.thumbnail.url} alt={menu.thumbnail.alt}
          className="fixed top-0 left-0 w-full object-cover h-full pointer-events-none z-0 opacity-0 peer-hover:opacity-100 transition-opacity duration-300 ease-in-out"
          loop
          data-video={menu.buttonLink}
          muted
          disablePictureInPicture
          disableRemotePlayback
          playsInline
          preload="auto"
        >
          {/* @ts-ignore */}
           <source src={menu.thumbnail.url} type="video/webm"/>
        </video>
      </div>
    )
  }

}

