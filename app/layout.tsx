import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
