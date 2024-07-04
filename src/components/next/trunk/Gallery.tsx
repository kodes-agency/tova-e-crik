'use client'

import Image from 'next/image'
import { useState } from 'react'

export type GalleryProps = {
  images: {
    image: {
      url: string
      alt: string
    }
  }[]
}

export const Gallery = ({ gallery }: { gallery: GalleryProps }) => {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    // <div className="md:col-span-2 md:mr-10 lg:mr-20 flex flex-col space-y-3">
    //   {gallery.images.map((image, index) => {
    //     return (
    //       <Image
    //         className={`object-contain ${index === selectedImage ? 'block' : 'hidden'}`}
    //         key={index}
    //         src={image.image.url} alt={image.image.alt}
    //         width={800}
    //         height={800}
    //         priority
    //       />
    //     )
    //   })}
    //   <div className="flex flex-row space-x-3 overflow-x-scroll no-scrollbar">
    //     {
    //     gallery.images.length > 1 &&
    //     gallery.images.map((image, index) => {
    //       return (
    //         <button
    //             key={index}
    //             className="mt-0 pt-0"
    //             onClick={() => setSelectedImage(index)}
    //         >
    //           <Image
    //             key={index}
    //             className={`object-cover min-w-60 aspect-video ${index === selectedImage ? 'border-4 border-black' : 'border-4 border-transparent'}`}
    //             src={image.image.url}
    //             alt={image.image.alt}
    //             width={250}
    //             height={250}
    //             priority
    //           />
    //         </button>
    //       )
    //     })}
    //   </div>
    // </div>
    <div className="md:col-span-2 md:mr-10 lg:mr-20 flex flex-col space-y-3">
      {gallery.images.map((image, index) => {
        return (
          <Image
            className={`object-contain ${index === selectedImage ? 'block' : 'hidden lg:block'}`}
            key={index}
            src={image.image.url}
            alt={image.image.alt}
            width={800}
            height={800}
            priority
          />
        )
      })}
      <div className="flex lg:hidden flex-row space-x-3 overflow-x-scroll no-scrollbar">
        {gallery.images.length > 1 &&
          gallery.images.map((image, index) => {
            return (
              <button key={index} className="mt-0 pt-0" onClick={() => setSelectedImage(index)}>
                <Image
                  key={index}
                  className={`object-cover min-w-48 md:min-w-60 aspect-video ${
                    index === selectedImage
                      ? 'border-4 border-black'
                      : 'border-4 border-transparent'
                  }`}
                  src={image.image.url}
                  alt={image.image.alt}
                  width={250}
                  height={250}
                  priority
                />
              </button>
            )
          })}
      </div>
    </div>
  )
}
