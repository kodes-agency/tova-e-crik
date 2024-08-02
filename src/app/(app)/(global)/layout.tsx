import '../global.css'
import { Header } from '@/components/next/Header'
import { Footer } from '@/components/next/Footer'
import { Montserrat } from 'next/font/google'
import Medusa from '@medusajs/medusa-js'
import { Cart } from '@/components/next/Cart'

const medusa = new Medusa({
  maxRetries: 3,
  baseUrl: 'http://localhost:9000',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en" className={`${montserrat.className} bg-rose-100`}>
        <body className='bg-rose-100'>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    )
  }