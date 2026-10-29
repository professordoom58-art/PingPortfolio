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
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body className="dark bg-black text-white">
        {children} <Analytics />
      </body>
    </html>
  )
}
