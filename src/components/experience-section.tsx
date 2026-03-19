'use client'

import { motion } from 'framer-motion'
import { SectionLabel } from '~/components/ui/section-label'
import { MotionSection } from '~/components/ui/motion-section'
import { fadeUp, stagger } from '~/lib/motion'
import type { Experience } from '~/types/cv'

interface ExperienceSectionProps {
  experience: Experience[]
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <MotionSection id="experience" className="portfolio-section">
      <SectionLabel index="03" title="Experience" />

      <motion.div className="exp-list" variants={stagger(0.1, 0.1)} style={{ marginTop: 40 }}>
        {experience.map((exp) => (
          <motion.div
            key={exp.company}
            className="exp-card card"
            variants={fadeUp}
            whileHover={{
              y: -3,
              borderColor: 'var(--border-hover)',
              transition: { type: 'spring', stiffness: 350, damping: 28 },
            }}
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

            <div className="exp-card__header">
              <div>
                <h3 className="exp-card__title">{exp.title}</h3>
                <div className="exp-card__company">{exp.company}</div>
              </div>
              <span className="exp-card__period">{exp.period}</span>
            </div>

            <motion.ul className="exp-card__bullets" variants={stagger(0.06)}>
              {exp.bullets.map((bullet, i) => (
                <motion.li
                  key={i}
                  className="exp-card__bullet"
                  variants={fadeUp}
                >
                  <span className="exp-card__bullet-marker">›</span>
                  {bullet}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ))}
      </motion.div>

      <style>{`
        .exp-list { display: flex; flex-direction: column; gap: 24px; }
        .exp-card { position: relative; overflow: hidden; padding: 36px !important; }
        .exp-card__accent {
          position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
          background: var(--accent); border-radius: 10px 0 0 10px;
        }
        .exp-card__header {
          display: flex; justify-content: space-between; align-items: flex-start;
          flex-wrap: wrap; gap: 12px; margin-bottom: 20px;
        }
        .exp-card__title {
          font-family: var(--font-display); font-weight: 600; font-size: 18px; color: var(--text);
        }
        .exp-card__company {
          color: var(--accent); font-size: 13px; margin-top: 4px; font-family: var(--font-mono);
        }
        .exp-card__period {
          font-size: 11px; color: var(--text-dim); font-family: var(--font-mono);
          border: 1px solid var(--border); padding: 4px 10px; border-radius: 4px; flex-shrink: 0;
        }
        .exp-card__bullets { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .exp-card__bullet {
          display: flex; gap: 12px; font-size: 13px; color: var(--text-muted);
          font-family: var(--font-display); line-height: 1.6;
        }
        .exp-card__bullet-marker {
          color: var(--accent); flex-shrink: 0; font-family: var(--font-mono);
        }
      `}</style>
    </MotionSection>
  )
}
