'use client'

import { motion } from 'framer-motion'
import { MotionSection } from '~/components/ui/motion-section'
import { SectionLabel } from '~/components/ui/section-label'
import { fadeUp, scaleIn, stagger } from '~/lib/motion'
import type { SkillGroup } from '~/types/cv'

interface SkillsSectionProps {
  skills: SkillGroup[]
}

const HOVER_SPRING = { type: 'spring', stiffness: 400, damping: 28 } as const

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <MotionSection id="skills" className="portfolio-section">
      <SectionLabel index="02" title="Skills" />

      <motion.div className="grid grid-cols-2 gap-6 mt-10 max-[768px]:grid-cols-1" variants={stagger(0.07, 0.1)}>
        {skills.map(({ group, items }) => (
          <motion.div
            key={group}
            className="card"
            variants={fadeUp}
            whileHover={{ y: -3, borderColor: 'var(--border-hover)', transition: HOVER_SPRING }}
          >
            <div className="card__label">{group}</div>
            <motion.div className="flex flex-wrap gap-2" variants={stagger(0.04)}>
              {items.map(({ label }) => (
                <motion.span
                  key={label}
                  className="skill-chip"
                  variants={scaleIn}
                  whileHover={{
                    borderColor: 'var(--accent)',
                    color: 'var(--accent)',
                    scale: 1.05,
                    transition: { type: 'spring', stiffness: 500, damping: 25 },
                  }}
                >
                  {label}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <style>{`
        .skill-chip {
          padding: 5px 12px; border: 1px solid var(--border); border-radius: 4px;
          font-size: 12px; color: var(--text-muted); background: var(--accent-dim);
          font-family: var(--font-mono); cursor: default; display: inline-block;
        }
      `}</style>
    </MotionSection>
  )
}
