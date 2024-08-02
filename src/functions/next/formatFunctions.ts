import type { Variant } from '@/types/medusa'


export const findVariantId = (variants: Variant[], selectedOptions: string[]): string | null => {
    return (
      variants.find(
        (variant) =>
          selectedOptions.length === variant.options.length &&
          selectedOptions.every((option) =>
            variant.options.some((variantOption) => variantOption.value === option),
          ),
      )?.id || null
    )
  }
  
  export const formatPrice = (amount: number) => {
    const price = Math.floor(amount) / 100
    return `${price.toFixed(2)} bgn`
  }