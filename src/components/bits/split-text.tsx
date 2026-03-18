'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '~/lib/utils'

interface SplitTextProps {
  text: string
  className?: string
  charClassName?: string
  /** delay giữa mỗi ký tự (giây) */
  stagger?: number
  /** delay trước khi bắt đầu animate */
  delay?: number
  once?: boolean
}

export function SplitText({ text, className, charClassName, stagger = 0.03, delay = 0, once = true }: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once, margin: '0px 0px -40px 0px' })

  const chars = text.split('')

  return (
    <span ref={ref} className={cn('inline-block', className)} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={i + char}
          className={cn('inline-block', charClassName)}
          aria-hidden="true"
          initial={{ opacity: 0, y: 32, rotateX: -60 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 32, rotateX: -60 }}
          transition={{
            duration: 0.5,
            delay: delay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ transformOrigin: 'bottom center', display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00a0' : char}
        </motion.span>
      ))}
    </span>
  )
}
