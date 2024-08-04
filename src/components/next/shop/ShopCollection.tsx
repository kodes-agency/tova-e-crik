import { AspectRatio } from '@/components/ui/aspect-ratio'
import Medusa from '@medusajs/medusa-js'
import Image from 'next/image'
import Link from 'next/link'
const medusa = new Medusa({
  maxRetries: 3,
  baseUrl: 'http://localhost:9000',
})

export const ShopCollection = async () => {
  const { collections } = await medusa.collections.list()
  const { products, limit, offset, count } = await medusa.products.list()

  const collectionsWithProducts = collections.filter(collection =>
    products.some(product => product.collection_id === collection.id)
  )
  return (
    <div className='space-y-40'>
      {
        collectionsWithProducts.map((collection, id) => (
        <div key={id} className="flex flex-col space-y-10">
          <h2 className="text-center font-black lowercase">
            {collection.title} - {new Date(collection.created_at).toLocaleDateString()}
          </h2>
          <div className="flex gap-5 justify-center">
            {products
              .filter((product) => product.collection_id === collection.id)
              .map((product, id) => (
                <div
                  key={id}
                  className=" group hover:ring-4 hover:ring-black transition-all duration-300"
                >
                  {product.collection_id === collection.id && (
                    <Link
                      href={'/shop/product/' + product.handle}
                      className="flex flex-col items-center justify-between h-full relative"
                    >
                      <Image
                        src={product.thumbnail || ''}
                        alt={product.title || ''}
                        width={350}
                        height={300}
                        priority
                        className="transition-all duration-300 aspect-[3/4] object-cover"
                      />
                      <div className="absolute w-full px-3 top-1/2 -translate-y-1/2 text-center">
                        <h2 className="text-white text-3xl text-center font-black">
                          {product.title}
                        </h2>
                      </div>
                    </Link>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
