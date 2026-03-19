'use client'

import { motion } from 'framer-motion'
import { SectionLabel } from '~/components/ui/section-label'
import { MotionSection } from '~/components/ui/motion-section'
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

export function AboutSection({ about, education }: AboutSectionProps) {
  const edu = education[0]

  return (
    <MotionSection id="about" className="portfolio-section">
      <SectionLabel index="01" title="About" />

      <motion.div className="about-grid" variants={stagger(0.07, 0.1)} style={{ marginTop: 40 }}>
        {/* Bio card */}
        <motion.div
          className="card"
          variants={fadeUp}
          whileHover={{ y: -3, borderColor: 'var(--border-hover)', transition: { type: 'spring', stiffness: 400, damping: 28 } }}
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
        <motion.div className="about-facts" variants={stagger(0.06)}>
          {QUICK_FACTS.map(({ label, value, accent }) => (
            <motion.div
              key={label}
              className="card about-fact"
              variants={scaleIn}
              whileHover={{ y: -2, borderColor: 'var(--border-hover)', transition: { type: 'spring', stiffness: 400, damping: 28 } }}
            >
              <span className="about-fact__label">{label}</span>
              <span className={`about-fact__value${accent ? ' about-fact__value--accent' : ''}`}>{value}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <style>{`
        .about-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 32px;
        }
        .about-bio {
          font-size: 14px; line-height: 1.9; color: var(--text-muted);
          font-family: var(--font-display);
        }
        .about-edu {
          margin-top: 24px; padding: 16px 20px;
          background: var(--accent-dim); border-radius: 8px;
          border: 1px solid var(--border);
        }
        .about-edu__label {
          font-size: 11px; color: var(--text-dim); letter-spacing: 0.15em;
          text-transform: uppercase; margin-bottom: 10px; font-family: var(--font-mono);
        }
        .about-edu__school {
          font-family: var(--font-display); font-size: 14px; font-weight: 600; color: var(--text);
        }
        .about-edu__fullname { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
        .about-edu__degree { font-size: 12px; color: var(--accent); margin-top: 4px; }
        .about-edu__period {
          font-size: 11px; color: var(--text-dim); margin-top: 2px; font-family: var(--font-mono);
        }
        .about-facts { display: flex; flex-direction: column; gap: 16px; }
        .about-fact {
          display: flex; justify-content: space-between; align-items: center;
          padding: 20px 24px !important;
        }
        .about-fact__label {
          font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--text-dim); font-family: var(--font-mono);
        }
        .about-fact__value {
          font-size: 13px; color: var(--text);
          font-family: var(--font-display); font-weight: 500;
        }
        .about-fact__value--accent { color: var(--accent); font-family: var(--font-mono); }
        @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr; } }
      `}</style>
    </MotionSection>
  )
}
