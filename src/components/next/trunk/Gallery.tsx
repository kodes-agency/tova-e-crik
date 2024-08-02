'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import { Share, Counter, Zoom } from "yet-another-react-lightbox/plugins";
import 'yet-another-react-lightbox/styles.css'
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";

export type GalleryProps = {
  images: {
    image: {
      url: string
      alt: string
    }
  }[]
}

export const Gallery = ({ gallery }: { gallery: GalleryProps }) => {
  const images = gallery.images.map((image) => {
    return {
      src: image.image.url,
      alt: image.image.alt,
    }
  })

  const [selectedImage, setSelectedImage] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const firstButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      // When the lightbox is open, move focus to the first button or the lightbox itself
      firstButtonRef.current?.focus()
    }
  }, [isOpen])

  console.log(gallery.images.length)
  return (
    <div className='md:col-span-2 md:mr-10 lg:mr-20 md:sticky md:top-40 h-fit'>
      <div className="flex flex-col space-y-3">
        <div>
          {gallery.images.map((image, index) => {
            return (
              <button
                key={index}
                ref={index === 0 ? firstButtonRef : null}
                aria-label={`Open image ${index + 1} in lightbox`}
                onClick={() => {
                  setSelectedImage(index)
                  setIsOpen(true)
                }}
              >
                <Image
                  className={`object-cover aspect-square ${
                    index === selectedImage ? 'block' : 'hidden'
                  }`}
                  src={image.image.url}
                  alt={image.image.alt}
                  width={800}
                  height={800}
                  priority
                  loading='eager'
                />
              </button>
            )
          })}
        </div>
        <div className="flex flex-row space-x-3 overflow-x-scroll no-scrollbar">
          {gallery.images.length > 1 &&
            gallery.images.map((image, index) => {
              return (
                <button key={index} className="mt-0 pt-0" onClick={() => setSelectedImage(index)} aria-label='Additional image'>
                  <Image
                    className={`object-cover min-w-48 lg:min-w-60 aspect-video ${
                      index === selectedImage
                        ? 'border-4 border-black'
                        : 'border-4 border-transparent'
                    }`}
                    src={image.image.url}
                    alt={image.image.alt}
                    draggable={false}
                    width={250}
                    height={250}
                    loading="eager"
                  />
                </button>
              )
            })}
        </div>
      </div>
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        plugins={[Counter, Zoom, Share]}
        index={selectedImage}
        slides={images}
        controller={{closeOnBackdropClick: true}}
      />
    </div>
  )
}
