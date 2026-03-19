'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '~/lib/utils'

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#@$%&~'

interface GlitchTextProps {
  text: string
  className?: string
  speed?: number
  iterations?: number
  mode?: 'hover' | 'loop'
}

export function GlitchText({ text, className, speed = 35, iterations = 10, mode = 'hover' }: GlitchTextProps) {
  const [displayed, setDisplayed] = useState(text)
  const [isGlitching, setIsGlitching] = useState(false)
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const iterRef = useRef(0)

  const scramble = useCallback(() => {
    if (iterRef.current >= text.length + iterations) {
      setDisplayed(text)
      setIsGlitching(false)
      return
    }
    setDisplayed(
      text.split('').map((char, idx) => {
        if (idx < iterRef.current - iterations) return char
        if (char === ' ') return ' '
        return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
      }).join('')
    )
    iterRef.current += 0.5
    frameRef.current = setTimeout(scramble, speed)
  }, [text, iterations, speed])

  const startGlitch = useCallback(() => {
    if (isGlitching) return
    setIsGlitching(true)
    iterRef.current = 0
    if (frameRef.current) clearTimeout(frameRef.current)
    scramble()
  }, [isGlitching, scramble])

  useEffect(() => {
    if (mode !== 'loop') return
    const interval = setInterval(startGlitch, 3000)
    return () => clearInterval(interval)
  }, [mode, startGlitch])

  useEffect(() => () => { if (frameRef.current) clearTimeout(frameRef.current) }, [])

  return (
    <span
      className={cn('cursor-default select-none', className)}
      onMouseEnter={mode === 'hover' ? startGlitch : undefined}
      aria-label={text}
    >
      {displayed}
    </span>
  )
}
