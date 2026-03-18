'use client'

import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Magnet } from '~/components/bits/magnet'
import { Button } from '~/components/ui/button'
import { EASE_OUT_EXPO } from '~/lib/motion'

const NAV_LINKS = ['about', 'skills', 'experience', 'projects'] as const

interface NavbarProps {
  shortName: string
}

export function Navbar({ shortName }: NavbarProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = theme === 'dark'

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } }}
    >
      <div className="mx-auto flex h-13 max-w-225 items-center justify-between px-6">
        {/* Logo */}
        <span
          className="font-display text-[1.05rem] font-extrabold tracking-tight text-foreground"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {shortName.slice(0, -2)}
          <span className="text-(--warm-accent)">{shortName.slice(-2)}</span>
        </span>

        <div className="flex items-center gap-3">
          {/* Nav links — hidden on mobile */}
          <div className="hidden items-center gap-0.5 sm:flex">
            {NAV_LINKS.map((link) => (
              <Button
                key={link}
                variant="ghost"
                size="sm"
                className="h-8 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground"
                onClick={() => scrollTo(link)}
              >
                {link}
              </Button>
            ))}
          </div>

          {/* Theme toggle wrapped in Magnet */}
          {mounted && (
            <Magnet strength={0.4}>
              <Button
                variant="outline"
                size="icon"
                className="size-8 rounded-full border-border"
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
              </Button>
            </Magnet>
          )}
        </div>
      </div>
    </motion.nav>
  )
}
