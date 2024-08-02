import '../global.css'
import { Footer } from '@/components/next/Footer'
import { Montserrat } from 'next/font/google'

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
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    )
  }