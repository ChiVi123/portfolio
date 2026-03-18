'use client'

import { motion } from 'framer-motion'
import { SectionWrapper } from '~/src/components/ui/section-wrapper'
import { fadeUp } from '~/src/lib/motion'
import type { Education } from '~/src/types/cv'

interface EducationSectionProps {
  education: Education[]
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <SectionWrapper label="Education">
      {education.map((edu) => (
        <motion.div key={edu.school} variants={fadeUp}>
          <p className="edu__school">{edu.school}</p>
          <p className="edu__degree">{edu.degree}</p>
          <p className="edu__period">{edu.period}</p>
        </motion.div>
      ))}

      <style>{`
        .edu__school {
          font-family: 'Syne', sans-serif;
          font-size: 13.5px;
          font-weight: 700;
          color: var(--ink);
        }
        .edu__degree {
          font-size: 12px;
          color: var(--ink-2);
          margin-top: 3px;
        }
        .edu__period {
          font-size: 10px;
          color: var(--muted);
          font-family: 'DM Mono', monospace;
          margin-top: 3px;
        }
      `}</style>
    </SectionWrapper>
  )
}
