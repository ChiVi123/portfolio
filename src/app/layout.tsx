import type { Metadata } from 'next'
import { ThemeProvider } from '~/components/theme-provider'
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
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange={false}>
          {/* Noise texture overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-9999 opacity-[0.025]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: '180px',
            }}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
