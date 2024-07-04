import { Header } from '@/components/next/Header'
import './global.css'
import { Footer } from '@/components/next/Footer'

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body className='bg-rose-100'>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    )
  }