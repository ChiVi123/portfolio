'use client'

import { motion } from 'framer-motion'
import { MotionSection } from '~/components/ui/motion-section'
import { SectionLabel } from '~/components/ui/section-label'
import { fadeUp, scaleIn, stagger } from '~/lib/motion'
import type { Education } from '~/types/cv'

interface AboutSectionProps {
  about: string
  education: Education[]
}

const QUICK_FACTS = [
  { label: 'Current Status', value: 'Interning @ FPT Software', accent: true },
  { label: 'Primary Stack', value: 'TypeScript · React · Next.js' },
  { label: 'Location', value: 'Ho Chi Minh City, Vietnam' },
  { label: 'Focus', value: 'High-quality, optimised web products' },
]

const HOVER_SPRING = { type: 'spring', stiffness: 400, damping: 28 } as const

export function AboutSection({ about, education }: AboutSectionProps) {
  const edu = education[0]

  return (
    <MotionSection id="about" className="portfolio-section">
      <SectionLabel index="01" title="About" />

      <motion.div className="grid grid-cols-2 gap-8 mt-10 max-[768px]:grid-cols-1" variants={stagger(0.07, 0.1)}>
        {/* Bio card */}
        <motion.div
          className="card"
          variants={fadeUp}
          whileHover={{ y: -3, borderColor: 'var(--border-hover)', transition: HOVER_SPRING }}
        >
          <div className="card__label">Bio</div>
          <p className="about-bio">{about}</p>

          <div className="about-edu">
            <div className="about-edu__label">Education</div>
            <div className="about-edu__school">{edu.school}</div>
            <div className="about-edu__fullname">{edu.fullName}</div>
            <div className="about-edu__degree">{edu.degree}</div>
            <div className="about-edu__period">{edu.period}</div>
          </div>
        </motion.div>

        {/* Quick facts */}
        <motion.div className="flex flex-col gap-4" variants={stagger(0.06)}>
          {QUICK_FACTS.map(({ label, value, accent }) => (
            <motion.div
              key={label}
              className="card flex justify-between items-center px-6 py-5"
              variants={scaleIn}
              whileHover={{ y: -2, borderColor: 'var(--border-hover)', transition: HOVER_SPRING }}
            >
              <span className="about-fact__label">{label}</span>
              <span className={`about-fact__value${accent ? ' about-fact__value--accent' : ''}`}>{value}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <style>{`
        .about-bio {
          font-size: 15px; line-height: 1.9; color: var(--text-muted);
          font-family: var(--font-display);
        }
        .about-edu {
          margin-top: 24px; padding: 16px 20px;
          background: var(--accent-dim); border-radius: 8px;
          border: 1px solid var(--border);
        }
        .about-edu__label {
          font-size: 12px; color: var(--text-dim); letter-spacing: 0.15em;
          text-transform: uppercase; margin-bottom: 10px; font-family: var(--font-mono);
        }
        .about-edu__school {
          font-family: var(--font-display); font-size: 15px; font-weight: 600; color: var(--text);
        }
        .about-edu__fullname { font-size: 13px; color: var(--text-muted); margin-top: 2px; }
        .about-edu__degree { font-size: 13px; color: var(--accent); margin-top: 4px; }
        .about-edu__period {
          font-size: 12px; color: var(--text-dim); margin-top: 2px; font-family: var(--font-mono);
        }
        .about-fact__label {
          font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--text-dim); font-family: var(--font-mono);
        }
        .about-fact__value {
          font-size: 14px; color: var(--text);
          font-family: var(--font-display); font-weight: 500;
        }
        .about-fact__value--accent { color: var(--accent); font-family: var(--font-mono); }
      `}</style>
    </MotionSection>
  )
}
