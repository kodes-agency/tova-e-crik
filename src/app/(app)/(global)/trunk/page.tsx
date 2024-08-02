import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'

export default async function Page() {
  const payload = await getPayloadHMR({ config })

  const page = await payload.find({
    collection: 'trunk',
  })

  const trunk = page.docs

  return (
    <section className="flex flex-col min-h-screen items-center">
      <div className="flex flex-col py-40 px-5 md:px-10 items-center space-y-5">
        <h1 className="text-4xl font-bold text-black">Trunk ({page.docs.length})</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {trunk.map((item, index) => {
            return (
              <Link
                key={index}
                href={`/trunk/${item.slug}`}
                aria-label={'Link to article about ' + item.title}
                className="aspect-square object-cover group"
              >
                <article className="relative flex items-center justify-center">
                  <Image
                    className="group-hover:mix-blend-luminosity    transition-all duration-300 group-hover:ring-4 group-hover:ring-white"
                    // @ts-expect-error
                    src={item.images.images[0].image.url} alt={item.images.images[0].image.alt}
                    width={800}
                    height={800}
                  />
                  <h2 className="absolute text-white text-3xl text-center font-black max-w-[200px]">
                    {item.title}
                  </h2>
                </article>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
