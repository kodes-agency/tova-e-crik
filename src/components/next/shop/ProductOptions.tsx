'use client'

import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { OptionsArray, Variant } from '@/types/medusa'
import { useEffect, useState } from 'react'
import { addToCart } from '@/actions/CartActions'
import { findVariant, formatPrice } from '@/functions/next/formatFunctions'
import { useCartStore } from '@/store/store'
import { useToast } from "@/components/ui/use-toast"


export const ProductOptions = ({
  options,
  variants,
}: {
  options: OptionsArray | undefined
  variants: Variant[]
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Object | null>(null)
  const [variant, setVariant] = useState<Variant | null>(variants[0])
  const [isLoading, setIsLoading] = useState(false)
  const [price, setPrice] = useState<number | undefined>(variants[0].prices[0].amount)
  const { setCart } = useCartStore((state) => state)
  const { toast } = useToast()


  useEffect(() => {
    if (!selectedOptions) return
    setVariant(findVariant(variants, Object.values(selectedOptions)))
  }, [selectedOptions])

  useEffect(() => {
    if (!selectedOptions) return
    setPrice(variant?.prices[0].amount)
  }, [variant])

  async function handleAddToCart() {
    const thisVariant = variants.length > 1 ? variant?.id : variants[0].id
    setIsLoading(true)
    const cart = await addToCart(thisVariant as string, 1)
    setCart()
    toast({
      variant: cart.success ? 'default' : 'destructive',
      title: cart.success ? 'Yess!' : 'Oops, an error occurred!',
      description: cart.message,
      duration: 4000,
    })
    setIsLoading(false)
  }

  return (
    <div className="space-y-4 flex flex-col items-center">
      <p className=" font-black text-3xl">{formatPrice(price || 0)}</p>
      {variants && variants?.length > 1 && (
        <div className="flex flex-col">
          {options?.map((option, id) => (
            <div key={id} className="p-3  rounded-md flex flex-col space-y-2 ">
              <h2 className="font-medium text-center">Choose your {option.title}</h2>
              <ToggleGroup
                key={option.id}
                className=""
                type="single"
                size="sm"
                defaultValue={option.values[0]}
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
      )}
      {
        variant &&
        variant.inventory_quantity > 0 ? (
          <Button
            className={`${variant?.id ? '' : 'disabled:cursor-not-allowed'} w-full ${
              isLoading ? 'bg-green-300 text-black hover:bg-green-300' : 'bg-black'
            }`}
            disabled={variants.length > 1 && !variant}
            onClick={handleAddToCart}
          >
            {isLoading ? 'Adding to cart...' : 'Add to cart'}
          </Button>
        ) : (
          <Button className="bg-red-500 w-full cursor-not-allowed" disabled>
            Out of stock
          </Button>
        )
      }
    </div>
  )
}
