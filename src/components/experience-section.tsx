'use client'

import { motion } from 'framer-motion'
import { MotionSection } from '~/components/ui/motion-section'
import { SectionLabel } from '~/components/ui/section-label'
import { fadeUp, stagger } from '~/lib/motion'
import type { Experience } from '~/types/cv'

interface ExperienceSectionProps {
  experience: Experience[]
}

const HOVER_SPRING = { type: 'spring', stiffness: 350, damping: 28 } as const

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <MotionSection id="experience" className="portfolio-section">
      <SectionLabel index="03" title="Experience" />

      <motion.div className="flex flex-col gap-6 mt-10" variants={stagger(0.1, 0.1)}>
        {experience.map((exp) => (
          <motion.div
            key={exp.company}
            className="card relative overflow-hidden p-9!"
            variants={fadeUp}
            whileHover={{ y: -3, borderColor: 'var(--border-hover)', transition: HOVER_SPRING }}
          >
            {/* Animated accent bar */}
            <motion.div
              className="exp-card__accent"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              style={{ originY: 0 }}
            />

            <div className="flex justify-between items-start flex-wrap gap-3 mb-5">
              <div>
                <h3 className="exp-card__title">{exp.title}</h3>
                <div className="exp-card__company">{exp.company}</div>
              </div>
              <span className="exp-card__period">{exp.period}</span>
            </div>

            <motion.ul className="flex flex-col gap-2.5 list-none" variants={stagger(0.06)}>
              {exp.bullets.map((bullet, i) => (
                <motion.li
                  key={i + bullet}
                  className="flex gap-3 text-[14px] leading-relaxed"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-display)' }}
                  variants={fadeUp}
                >
                  <span className="shrink-0" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                    ›
                  </span>
                  {bullet}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ))}
      </motion.div>

      <style>{`
        .exp-card__accent {
          position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
          background: var(--accent); border-radius: 10px 0 0 10px;
        }
        .exp-card__title {
          font-family: var(--font-display); font-weight: 600; font-size: 19px; color: var(--text);
        }
        .exp-card__company {
          color: var(--accent); font-size: 14px; margin-top: 4px; font-family: var(--font-mono);
        }
        .exp-card__period {
          font-size: 12px; color: var(--text-dim); font-family: var(--font-mono);
          border: 1px solid var(--border); padding: 4px 10px; border-radius: 4px; flex-shrink: 0;
        }
      `}</style>
    </MotionSection>
  )
}
