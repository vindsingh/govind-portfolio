import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Space_Mono, Cardo, Hind } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'

const cardo = Cardo({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-cardo',
  display: 'swap',
})

const hind = Hind({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-hind',
  display: 'swap',
})

const helveticaNeue = localFont({
  src: [
    {
      path: '../public/fonts/HelveticaNeueLight.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/HelveticaNeueRoman.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/HelveticaNeueBold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-helvetica-neue',
  display: 'swap',
})

const fragmentMono = localFont({
  src: '../public/fonts/FragmentMono-Regular.ttf',
  variable: '--font-fragment-mono',
  weight: '400',
  display: 'swap',
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Govind Singh Ahluwalia',
  description: 'Designer working in rooms where design does not have a seat yet.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${helveticaNeue.variable} ${fragmentMono.variable} ${spaceMono.variable} ${cardo.variable} ${hind.variable}`}
        style={{
          overflowX: 'clip',
          maxWidth: '100vw',
        }}
      >
        <div style={{ overflowX: 'clip', maxWidth: '100vw', width: '100%' }}>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
