'use client'

import { motion } from 'framer-motion'
import { SectionLabel } from '~/components/ui/section-label'
import { MotionSection } from '~/components/ui/motion-section'
import { fadeUp, scaleIn, stagger } from '~/lib/motion'
import type { SkillGroup } from '~/types/cv'

interface SkillsSectionProps {
  skills: SkillGroup[]
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <MotionSection id="skills" className="portfolio-section">
      <SectionLabel index="02" title="Skills" />

      <motion.div className="skills-grid" variants={stagger(0.07, 0.1)} style={{ marginTop: 40 }}>
        {skills.map(({ group, items }) => (
          <motion.div
            key={group}
            className="card"
            variants={fadeUp}
            whileHover={{ y: -3, borderColor: 'var(--border-hover)', transition: { type: 'spring', stiffness: 400, damping: 28 } }}
          >
            <div className="card__label">{group}</div>
            <motion.div className="skills-chips" variants={stagger(0.04)}>
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
        .skills-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;
        }
        .skills-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .skill-chip {
          padding: 5px 12px; border: 1px solid var(--border); border-radius: 4px;
          font-size: 12px; color: var(--text-muted); background: var(--accent-dim);
          font-family: var(--font-mono); cursor: default; display: inline-block;
        }
        @media (max-width: 768px) { .skills-grid { grid-template-columns: 1fr; } }
      `}</style>
    </MotionSection>
  )
}
