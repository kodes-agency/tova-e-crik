import { Checkout } from '@/components/next/shop/Checkout'
import { getCheckoutCart } from '@/actions/CheckoutActions'

export default async function Page() {
  const data = await getCheckoutCart()

  return (
    <section className="flex flex-col items-center min-h-screen px-5 py-10 pb-40 md:pb-20 md:px-10">
      <Checkout initialCart={data?.cart} shipping_options={data?.shipping_options}/>
    </section>
  )
}
