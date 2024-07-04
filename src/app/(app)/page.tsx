import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { Menu } from '@/components/next/home/Menu'

export default async function Page() {
  const payload = await getPayloadHMR({ config })

  const page = await payload.findGlobal({
    slug: 'home-page',
  })

  return (
    <div className="h-screen flex items-center justify-center ">
      <section className="flex flex-col items-center lg:[&_a]:hover:opacity-0 lg:hover:[&_a]:hover:opacity-100">
        {page.content.menu.map((menuItem, index) => (
            // @ts-expect-error
            <Menu key={index} menu={menuItem} />
        ))}
      </section>
    </div>
  )
}
