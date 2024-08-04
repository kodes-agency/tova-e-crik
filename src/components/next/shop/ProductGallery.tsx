'use client'

import Image from 'next/image'
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing'
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import { Share, Counter, Zoom } from 'yet-another-react-lightbox/plugins'
import { ScrollArea } from "@/components/ui/scroll-area"
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import 'yet-another-react-lightbox/plugins/counter.css'

export const ProductGallery = ({ products }: { products: PricedProduct[] }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  const gallery = [
    {
      src: products[0].thumbnail || '',
      alt: products[0].title || '',
    },
    ...(products[0]?.images?.map((image, id) => ({
      src: image.url,
      alt: `${products[0].title} ${id}`,
    })) || []),
  ]

  return (
    <ScrollArea className="space-y-10 h-[60vh] md:h-auto">
      {gallery.map((image, id) => (
        <button
          className="w-full"
          key={id}
          aria-label={`Open image ${id + 1} in lightbox`}
          onClick={() => {
            setSelectedImage(id)
            setIsOpen(true)
          }}
        >
          <Image
            key={id}
            src={image.src}
            alt={image.alt}
            width={200}
            height={200}
            priority
            className="w-full"
          />
        </button>
      ))}
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        plugins={[Counter, Zoom, Share]}
        index={selectedImage}
        slides={gallery}
        controller={{ closeOnBackdropClick: true }}
      />
    </ScrollArea>
  )
}
