import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nguyễn Hoàng Chí Vĩ — Front-end Developer',
  description: 'Portfolio of Nguyễn Hoàng Chí Vĩ — Front-end Developer specialising in React and Next.js.',
  openGraph: {
    title: 'Nguyễn Hoàng Chí Vĩ — Front-end Developer',
    description: 'Portfolio of Nguyễn Hoàng Chí Vĩ — Front-end Developer specialising in React and Next.js.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
