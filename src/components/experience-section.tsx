'use client'

import { motion } from 'framer-motion'
import { SectionWrapper } from '~/components/ui/section-wrapper'
import { fadeUp } from '~/lib/motion'
import type { Experience } from '~/types/cv'

interface ExperienceSectionProps {
  experience: Experience[]
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <SectionWrapper id="experience" label="Experience">
      {experience.map((exp) => (
        <motion.div key={exp.company} className="mb-6 last:mb-0" variants={fadeUp}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[14px] font-bold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
                {exp.title}
              </p>
              <p className="mt-0.5 font-mono text-[11px] text-(--warm-accent)">{exp.company}</p>
            </div>
            <span className="shrink-0 pt-0.5 font-mono text-[10px] text-muted-foreground">{exp.period}</span>
          </div>

          <ul className="mt-3 space-y-1">
            {exp.bullets.map((bullet) => (
              <li
                key={bullet}
                className="relative pl-4 text-[12.5px] leading-[1.7] text-muted-foreground before:absolute before:left-0 before:top-1.25 before:font-mono before:text-[11px] before:text-(--warm-accent) before:content-['—']"
              >
                {bullet}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </SectionWrapper>
  )
}
