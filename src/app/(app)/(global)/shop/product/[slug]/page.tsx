import { ProductOptions } from '@/components/next/shop/ProductOptions'
import Medusa from '@medusajs/medusa-js'
import Link from 'next/link'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { ProductGallery } from '@/components/next/shop/ProductGallery'
const medusa = new Medusa({
  maxRetries: 3,
  baseUrl: process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000',
})

export default async function Page({ params }: { params: { slug: string } }) {
  const { products } = await medusa.products.list({
    handle: params.slug,
    limit: 1,
  })

  const options = products[0].options?.map((option) => {
    const values = option.values.map((value) => value.value)
    const uniqueValues = [...new Set(values)]
    return {
      id: option.id,
      title: option.title,
      values: uniqueValues,
    }
  })

  return (
    <section className="flex flex-col p items-center min-h-screen pt-20 md:pt-32 pb-40 md:pb-20 px-5 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        <ProductGallery products={products} />
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col items-center sticky top-52 max-w-sm pt-5 md:p-10 lg:p-0">
            <div className="flex items-center sticky">
              <Link
                href="/"
                className="flex items-center font-medium hover:underline hover:underline-offset-2"
              >
                home
              </Link>
              <ChevronRight size={20} />
              <Link
                href="/shop"
                className="flex items-center font-medium hover:underline hover:underline-offset-2"
              >
                shop
              </Link>
              <ChevronDown size={20} />
            </div>
            <h1 className="text-3xl font-black text-cyan-500 text-center my-2">
              {products[0].title}
            </h1>
            {/* @ts-ignore */}
            <ProductOptions variants={products[0].variants} options={options} product={products[0]}/>
            <div className="mt-5">
              <div className="flex flex-col">
                <div className="w-full h-px bg-black my-2"></div>
                <h2 className=" font-bold uppercase text-sm">Description</h2>
                <p className="text-sm">{products[0].description}</p>
              </div>
              {products[0].material && (
                <div className="flex flex-col">
                  <div className="w-full h-px bg-black my-2"></div>
                  <h2 className=" font-bold uppercase text-sm">Material</h2>
                  <p className="text-sm">{products[0].material}</p>
                </div>
              )}
            </div>
            <div className="w-full h-px bg-black my-2"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
