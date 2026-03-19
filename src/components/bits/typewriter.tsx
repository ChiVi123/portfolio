'use client'

import { useEffect, useState } from 'react'

interface TypewriterProps {
  text: string
  delay?: number
  speed?: number
}

export function Typewriter({ text, delay = 0, speed = 30 }: TypewriterProps) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (!started) return
    let i = 0
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(interval)
    }, speed)
    return () => clearInterval(interval)
  }, [started, text, speed])

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <span style={{ animation: 'blink 0.8s step-end infinite', opacity: 0.7 }}>_</span>
      )}
    </span>
  )
}
