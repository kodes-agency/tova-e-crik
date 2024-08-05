'use client'

import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { OptionsArray, Variant } from '@/types/medusa'
import { useEffect, useState } from 'react'
import { addToCart } from '@/actions/CartActions'
import { findVariantId, formatPrice } from '@/functions/next/formatFunctions'
import { useCartStore } from '@/store/store'

export const ProductOptions = ({
  options,
  variants,
}: {
  options: OptionsArray | undefined
  variants: Variant[]
}) => {
  const [selectedOptions, setSelectedOptions] = useState({})
  const [variantId, setVariantId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [price, setPrice] = useState<number | undefined>(variants[0].prices[0].amount)
  const { setCart } = useCartStore((state) => state)

  useEffect(() => {
    if (!options) return
    const selectedOptionsArray = Object.values(selectedOptions) as string[]
    const variantId = findVariantId(variants, selectedOptionsArray)
    setVariantId(variantId)
    if (!variantId) return
    setPrice(variants.find((variant) => variant.id === variantId)?.prices[0].amount)
  }, [selectedOptions])
  return (
    <div className="space-y-4 flex flex-col items-center">
      <p className=" font-black text-3xl">{formatPrice(price || 0)}</p>
      {
        variants &&
        variants?.length > 1 && (
          <div className="flex flex-col">
            {options?.map((option, id) => (
              <div key={id} className="p-3  rounded-md flex flex-col space-y-2 ">
                <h2 className="font-medium text-center">Choose your {option.title}</h2>
                <ToggleGroup
                  key={option.id}
                  className=""
                  type="single"
                  size="sm"
                  onValueChange={(value) => {
                    setSelectedOptions((prev) => ({
                      ...prev,
                      [option.title]: value,
                    }))
                  }}
                >
                  {option.values.map((value, idx) => (
                    <ToggleGroupItem
                      value={value}
                      key={idx}
                      className=" data-[state=on]:bg-white data-[state=on]:ring-1 data-[state=on]:ring-black"
                    >
                      {value}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            ))}
          </div>
        )
      }
      <Button
        className={`${variantId ? '' : 'disabled:cursor-not-allowed'} w-full ${
          isLoading ? 'bg-green-300 text-black hover:bg-green-300' : 'bg-black'
        }`}
        disabled={variants.length > 1 && !variantId}
        onClick={async () => {
          const variant = variants.length > 1 ? variantId : variants[0].id
          setIsLoading(true)
          const cart = await addToCart(variant as string, 1)
          // @ts-expect-error
          setCart(cart)
          setIsLoading(false)
        }}
      >
        {isLoading ? 'Adding to cart...' : 'Add to cart'}
      </Button>
    </div>
  )
}
