'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { Magnet } from '~/components/bits/magnet'
import { Button } from '~/components/ui/button'
import { SectionWrapper } from '~/components/ui/section-wrapper'
import { fadeUp } from '~/lib/motion'
import type { Project } from '~/types/cv'

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <SectionWrapper id="projects" label="Projects">
      {projects.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
    </SectionWrapper>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      className="group relative mb-3 overflow-hidden rounded-lg border border-border bg-card p-4 last:mb-0"
      variants={fadeUp}
      whileHover={{ y: -3, transition: { duration: 0.2, ease: 'easeOut' } }}
    >
      {/* Accent bar — slides in on hover */}
      <div className="absolute left-0 top-0 h-full w-0.75 origin-top scale-y-0 bg-(--warm-accent) transition-transform duration-300 ease-in-out group-hover:scale-y-100" />

      <p className="text-[13px] font-bold text-card-foreground" style={{ fontFamily: 'var(--font-display)' }}>
        {project.name}
      </p>
      <p className="mt-1 text-[12px] leading-[1.65] text-muted-foreground">{project.description}</p>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        {/* Stack */}
        <div className="flex flex-wrap gap-1">
          {project.stack.map((s, i) => (
            <span key={s} className="font-mono text-[10px] text-muted-foreground">
              {i > 0 ? <span className="mx-0.5 opacity-40">·</span> : null}
              {s}
            </span>
          ))}
        </div>

        {/* Links with Magnet */}
        <div className="flex gap-1.5">
          {project.demo && (
            <Magnet strength={0.3}>
              <Button variant="outline" size="sm" className="h-7 gap-1.5 font-mono text-[10px]" asChild>
                <a href={project.demo} target="_blank" rel="noreferrer">
                  <ExternalLink className="size-3" />
                  Demo
                </a>
              </Button>
            </Magnet>
          )}
          {project.github && (
            <Magnet strength={0.3}>
              <Button variant="outline" size="sm" className="h-7 gap-1.5 font-mono text-[10px]" asChild>
                <a href={project.github} target="_blank" rel="noreferrer">
                  <Github className="size-3" />
                  GitHub
                </a>
              </Button>
            </Magnet>
          )}
        </div>
      </div>
    </motion.div>
  )
}
