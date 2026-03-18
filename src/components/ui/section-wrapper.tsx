'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { fadeSide, staggerContainer } from '~/lib/motion'
import { cn } from '~/lib/utils'

interface SectionWrapperProps {
  id?: string
  label: string
  children: ReactNode
  className?: string
}

export function SectionWrapper({ id, label, children, className }: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  return (
    <motion.div
      id={id}
      ref={ref}
      className={cn('border-b border-border py-8 last:border-none', className)}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={staggerContainer}
    >
      {/* Section label */}
      <motion.div className="mb-5 flex items-center gap-3" variants={fadeSide}>
        <p className="font-mono text-[9.5px] uppercase tracking-[0.25em] text-(--warm-accent)">{label}</p>
        <div className="h-px flex-1 bg-border" />
      </motion.div>

      {children}
    </motion.div>
  )
}
