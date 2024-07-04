import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { Gallery } from '@/components/next/trunk/Gallery'

export default async function Page({ params }: { params: { slug: string } }) {
  const payload = await getPayloadHMR({ config })

  const page = await payload.find({
    collection: 'trunk',
    where: {
      slug: {
        equals: params.slug,
      },
    },
  })

  const trunk = page.docs[0]

  return (
    <section className="flex flex-col min-h-screen items-center">
      <article className="grid grid-cols-1 gap-10 md:gap-0 md:grid-cols-4 pt-32 md:pt-40 pb-40 md:pb-20 px-5 md:px-10">
        {/* @ts-ignore */}
        <Gallery gallery={trunk.images} />
        <div className="md:col-span-2">
            <div className='flex flex-col space-y-4 sticky top-40'>
                <h1 className="text-4xl font-bold text-black">{trunk.title}</h1>
                <div
                    className="
                            [&_blockquote]:font-bold [&_blockquote]:pl-5 md:[&_blockquote]:pl-10 [&_blockquote]:text-lg [&_blockquote]:max-w-3xl
                            space-y-4
                            [&_h3]:text-4xl [&_h3]:pt-3
                            [&_img]:w-full [&_img]:h-[50vh] [&_img]:object-cover
                            [&_h4]:text-2xl
                            [&_ul]:list-disc [&_ul]:pl-6 md:[&_ul]:pl-12 [&_ul]:space-y-1
                            [&_ol]:list-decimal [&_ol]:pl-6 md:[&_ol]:pl-12 [&_ol]:space-y-1
                        "
                    dangerouslySetInnerHTML={{ __html: trunk.content?.text_html || '' }}
                ></div>
            </div>
        </div>
      </article>
    </section>
  )
}
