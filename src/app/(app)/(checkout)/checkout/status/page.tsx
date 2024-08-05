import { getOrder } from '@/actions/CheckoutActions'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import { formatPrice } from '@/functions/next/formatFunctions'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export const dynamic = 'force-dynamic'


export default async function Page({
  searchParams,
}: {
  searchParams: { cart_id: string; error: '' }
}) {
  const order = await getOrder(searchParams.cart_id)
  if (!order)
    return (
      <div className="flex flex-col items-center min-h-screen py-10 pb-40 md:pb-20 px-5 md:px-10">
        <div className="grid grid-cols-3 w-full mb-5">
          <div className="flex items-end">
          </div>
          <div className="flex items-center justify-center">
            <Link href="/">
              <Image
                src={"/files/logo.webp"}
                alt="TOVA E CIRK LOGO"
                width={60}
                height={60}
                priority={true}
                className="w-14 h-14 md:w-20 md:h-20"
              />
            </Link>
          </div>
          <div>

          </div>
        </div>
        <Card className="max-w-md ">
          <CardHeader>
            <CardTitle>Ooops. We cannot find an order with the provided ID.</CardTitle>
            <CardDescription>
              If you think that this is a mistake, contact us via email:
              <a href="mailto:tovaecirk@gmail.com" className="text-blue-500">
                {' '}
                tovaecirk@gmail.com
              </a>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link className={buttonVariants({ variant: 'default' })} href="/shop">
              Back to shop
            </Link>
          </CardContent>
        </Card>
      </div>
    )

  return (
    <section className="flex flex-col items-center min-h-screen px-5 py-10 pb-40 md:pb-20 md:px-10">
      <div className="grid grid-cols-3 w-full mb-5">
        <div className="flex items-end">
        </div>
        <div className="flex items-center justify-center">
          <Link href="/">
            <Image
              src="/files/logo.webp"
              alt="TOVA E CIRK LOGO"
              width={60}
              height={60}
              priority={true}
              className="w-14 h-14 md:w-20 md:h-20"
            />
          </Link>
        </div>
        <div>
        </div>
      </div>
      <Card className="max-w-md ">
        <CardHeader>
          <CardTitle>Your order has been recieved sucessfully!</CardTitle>
          <CardDescription>Here are your order details:</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <p>Name:</p>
            <p className='font-medium'>
              {order?.order?.shipping_address?.first_name}{' '}
              {order?.order?.shipping_address.last_name}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Shipping Address:</p>
            <p className='font-medium'>{order?.order?.shipping_address?.address_1}</p>
          </div>
          <div className="flex justify-between">
            <p>City:</p>
            <p className='font-medium'>{order?.order?.shipping_address?.city}</p>
          </div>
          <div className="flex justify-between">
            <p>Phone:</p>
            <p className='font-medium'>{order?.order?.shipping_address?.phone}</p>
          </div>
          <div className="flex justify-between">
            <p>Email:</p>
            <p className='font-medium'>{order?.order?.email}</p>
          </div>
          <div>
            <p>Your order:</p>
            {order?.order?.items.map((item, id) => (
              <div
                key={id}
                className=" justify-between flex items-center border-b border-black mb-2"
              >
                <div className="flex items-center">
                  <p className="w-4">{id + 1}.</p>
                  <Image
                    src={item.thumbnail || ''}
                    alt={item.title}
                    width={50}
                    height={50}
                    priority
                    className="w-20 h-20 aspect-square object-cover"
                  />
                  <div className="ml-2">
                    <script type="module" src=""></script>
                    <p className="font-bold">{item.title}</p>
                    <p className=" opacity-50">{item.variant.title}</p>
                  </div>
                </div>
                <div>
                  <p className='font-medium'>{item.quantity} x</p>
                  <p className='font-medium'>{formatPrice(item.unit_price)}</p>
                </div>
              </div>
            ))}
            <div className="flex justify-between">
              <p>Subtotal:</p>
              <p className='font-medium'>{formatPrice(order?.order?.subtotal || 0)}</p>
            </div>
            {
              order?.order?.discount_total &&
              order?.order?.discount_total > 0 && (
                <div className="flex justify-between">
                  <p>Discount:</p>
                  <p className='font-medium'>{formatPrice(order?.order?.discount_total || 0)}</p>
                </div>
              )
            }
            <div className="flex justify-between">
              <p>Shipping:</p>
              <p className='font-medium'>{formatPrice(order?.order?.shipping_total || 0)}</p>
            </div>
            <div className="flex justify-between">
              <p className='font-bold'>Total:</p>
              <p className='font-bold'>{formatPrice(order?.order?.total || 0)}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link className={buttonVariants({ variant: 'default' })} href="/">
            Back to home
          </Link>
        </CardFooter>
      </Card>
    </section>
  )
}
