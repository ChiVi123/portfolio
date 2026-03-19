'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { stagger } from '~/lib/motion'

interface MotionSectionProps {
  children: ReactNode
  id?: string
  className?: string
  delay?: number
}

export function MotionSection({ children, id, className, delay = 0 }: MotionSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })

  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={stagger(0.08, delay)}
    >
      {children}
    </motion.section>
  )
}
