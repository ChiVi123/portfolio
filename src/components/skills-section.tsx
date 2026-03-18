'use client'

import { motion } from 'framer-motion'
import { Badge } from '~/components/ui/badge'
import { SectionWrapper } from '~/components/ui/section-wrapper'
import { fadeUp, fadeSide } from '~/lib/motion'
import type { Education, SkillGroup } from '~/types/cv'

interface SkillsSectionProps {
  about: string
  skills: SkillGroup[]
  education: Education[]
}

const BADGE_VARIANT = {
  accent: 'default',
  solid: 'secondary',
  outline: 'outline',
} as const

export function SkillsSection({ about, skills, education }: SkillsSectionProps) {
  return (
    <>
      <SectionWrapper id="about" label="About">
        <motion.p className="text-[13.5px] leading-[1.8] text-muted-foreground" variants={fadeUp}>
          {about}
        </motion.p>
      </SectionWrapper>

      <SectionWrapper id="skills" label="Skills">
        {skills.map(({ group, items }) => (
          <div key={group} className="mb-4 last:mb-0">
            <motion.p
              className="mb-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted-foreground"
              variants={fadeSide}
            >
              {group}
            </motion.p>
            <div className="flex flex-wrap gap-1.5">
              {items.map(({ label, variant }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  whileHover={{ scale: 1.07, transition: { duration: 0.12 } }}
                >
                  <Badge
                    variant={BADGE_VARIANT[variant]}
                    className="cursor-default font-mono text-[10.5px]"
                  >
                    {label}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </SectionWrapper>

      <SectionWrapper label="Education">
        {education.map((edu) => (
          <motion.div key={edu.school} variants={fadeUp}>
            <p className="font-display text-[13.5px] font-bold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
              {edu.school}
            </p>
            <p className="mt-0.5 text-[12px] text-foreground/80">{edu.degree}</p>
            <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">{edu.period}</p>
          </motion.div>
        ))}
      </SectionWrapper>
    </>
  )
}
