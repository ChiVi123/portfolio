'use client'

import { motion } from 'framer-motion'
import { slideLeft, fadeIn } from '~/lib/motion'

interface SectionLabelProps {
  index: string
  title: string
}

export function SectionLabel({ index, title }: SectionLabelProps) {
  return (
    <div className="section-label">
      <motion.span className="section-label__index" variants={slideLeft}>
        [ {index} ]
      </motion.span>
      <motion.h2 className="section-label__title" variants={slideLeft}>
        {title}
      </motion.h2>
      <motion.div className="section-label__line" variants={fadeIn} />

      <style>{`
        .section-label {
          display: flex; align-items: center; gap: 16px;
        }
        .section-label__index {
          font-size: 11px; color: var(--accent); font-family: var(--font-mono);
          letter-spacing: 0.2em; flex-shrink: 0;
        }
        .section-label__title {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(24px, 4vw, 36px); color: var(--text);
          letter-spacing: -0.02em; flex-shrink: 0;
        }
        .section-label__line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, var(--border), transparent);
        }
      `}</style>
    </div>
  )
}
