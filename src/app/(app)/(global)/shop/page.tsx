import { ShopCollection } from '@/components/next/shop/ShopCollection'
export const dynamic = 'force-dynamic'

export default async function Page() {
  return (
    <section className="flex flex-col items-center min-h-screen pt-32 md:pt-40 pb-40 md:pb-20 px-5 md:px-10">
      <div className="flex flex-col space-y-5 items-center">
        <h1 className="text-3xl font-bold text-black">shop</h1>
        <ShopCollection />
      </div>
    </section>
  )
}
