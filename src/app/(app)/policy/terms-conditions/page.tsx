import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'

export default async function Page() {
    const payload = await getPayloadHMR({ config })

    const page = await payload.findGlobal({
      slug: 'terms-conditions-page',
    })

    return (
        <section className="flex flex-col justify-center min-h-screen items-center">
         <div className='max-w-5xl col-span-1 flex flex-col space-y-4 pt-32 md:pt-40 pb-40 md:pb-20 px-5 md:px-10'>
            <h1 className='text-3xl font-bold text-black'>{page.content.title}</h1>
            <div 
                className='
                    [&_blockquote]:font-bold [&_blockquote]:pl-5 md:[&_blockquote]:pl-10 [&_blockquote]:text-lg [&_blockquote]:max-w-3xl
                    [&_h2]:text-2xl [&_h2]:mt-4
                    [&_h3]:text-xl [&_h3]:mt-3
                    [&_h4]:text-lg [&_h4]:mt-2
                    [&_p]:mt-1
                    [&_img]:w-full [&_img]:h-[50vh] [&_img]:object-cover
                    [&_ul]:list-disc [&_ul]:pl-6 md:[&_ul]:pl-12 [&_ul]:space-y-1
                    [&_ol]:list-decimal [&_ol]:pl-6 md:[&_ol]:pl-12 [&_ol]:space-y-1
                '
                dangerouslySetInnerHTML={{__html: page.content.content_html || ""}}></div>
        </div>
        </section>
    )
}