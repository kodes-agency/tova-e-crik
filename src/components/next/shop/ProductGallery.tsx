import Medusa from '@medusajs/medusa-js'
import Image from 'next/image'
import Link from 'next/link'
const medusa = new Medusa({
  maxRetries: 3,
  baseUrl: 'http://localhost:9000',
})

export const ProductGallery = async () => {
  const { collections } = await medusa.collections.list()
  const { products, limit, offset, count } = await medusa.products.list()
  return (
    <div>
      {collections.map((collection, id) => (
        <div key={id} className='flex flex-col space-y-10'>
          <h2 className="text-center font-black lowercase">{collection.title} - {new Date(collection.created_at).toLocaleDateString()}</h2>
          <div className='flex space-x-10'>
            {products.map((product, id) => (
              <div key={id} className="bg-rose-100 rounded-md ring-1 ring-black p-2 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                {product.collection_id === collection.id && (
                  <Link href={'/shop/product/' + product.handle} className="flex flex-col items-center justify-between h-full">
                    <Image
                      src={product.thumbnail || ''}
                      alt={product.title || ''}
                      width={250}
                      height={250}
                    />
                    <h2>{product.title}</h2>
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
