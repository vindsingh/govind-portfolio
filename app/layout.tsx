import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export { GeistSans, GeistMono }

export const metadata: Metadata = {
  title: 'Govind Singh Ahluwalia',
  description: 'Designer working in rooms where design does not have a seat yet.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>{children}</body>
    </html>
  )
}
