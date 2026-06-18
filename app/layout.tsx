import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: 'Mihir Suthar | macOS Portfolio',
  description: 'Personal portfolio of Mihir Suthar',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children} <Analytics /></body>
    </html>
  )
}
