import type { Metadata } from 'next'
import { Be_Vietnam_Pro, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-mono',
  display: 'swap',
})

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
    <html lang="en" suppressHydrationWarning className={`${beVietnamPro.variable} ${jetBrainsMono.variable}`}>
      <body>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: prevent flash of wrong theme
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.classList.add('light')}catch(e){}})()`,
          }}
        />
        {children}
      </body>
    </html>
  )
}
