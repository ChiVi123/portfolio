'use client'

import { motion } from 'framer-motion'
import { SectionLabel } from '~/components/ui/section-label'
import { MotionSection } from '~/components/ui/motion-section'
import { GithubIcon, ExternalIcon } from '~/components/ui/icons'
import { fadeUp, scaleIn, stagger } from '~/lib/motion'
import type { Project } from '~/types/cv'

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <MotionSection id="projects" className="portfolio-section">
      <SectionLabel index="04" title="Projects" />

      <motion.div className="projects-grid" variants={stagger(0.1, 0.1)} style={{ marginTop: 40 }}>
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </motion.div>

      <style>{`
        .projects-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;
        }
        @media (max-width: 768px) { .projects-grid { grid-template-columns: 1fr; } }
      `}</style>
    </MotionSection>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      className="proj-card card"
      variants={fadeUp}
      whileHover={{
        y: -4,
        borderColor: 'var(--border-hover)',
        transition: { type: 'spring', stiffness: 350, damping: 26 },
      }}
    >
      {/* Scan-line shimmer on hover */}
      <motion.div
        className="proj-card__shimmer"
        initial={{ x: '-100%', opacity: 0 }}
        whileHover={{ x: '200%', opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />

      <div className="proj-card__header">
        <div>
          <div className="proj-card__name">{project.name}</div>
          {project.period && <div className="proj-card__period">{project.period}</div>}
        </div>
      </div>

      <p className="proj-card__desc">{project.description}</p>

      <motion.div className="proj-card__stack" variants={stagger(0.04)}>
        {project.stack.map((s) => (
          <motion.span
            key={s}
            className="proj-chip"
            variants={scaleIn}
            whileHover={{ borderColor: 'var(--accent)', color: 'var(--accent)', scale: 1.05 }}
          >
            {s}
          </motion.span>
        ))}
      </motion.div>

      <div className="proj-card__links">
        {project.demo && (
          <motion.a
            href={project.demo} target="_blank" rel="noreferrer"
            className="proj-link proj-link--primary"
            whileHover={{ scale: 1.03, background: 'var(--accent-dim)' }}
            whileTap={{ scale: 0.97 }}
          >
            <ExternalIcon /> Live Demo
          </motion.a>
        )}
        {project.github && (
          <motion.a
            href={project.github} target="_blank" rel="noreferrer"
            className="proj-link proj-link--secondary"
            whileHover={{ scale: 1.03, color: 'var(--accent)', borderColor: 'var(--border-hover)' }}
            whileTap={{ scale: 0.97 }}
          >
            <GithubIcon /> GitHub
          </motion.a>
        )}
      </div>

      <style>{`
        .proj-card {
          display: flex; flex-direction: column; gap: 16px;
          padding: 28px !important; position: relative; overflow: hidden;
        }
        .proj-card__shimmer {
          position: absolute; top: 0; left: 0; width: 40%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0,240,255,0.04), transparent);
          pointer-events: none; z-index: 0;
        }
        .proj-card__header {
          display: flex; justify-content: space-between; align-items: flex-start;
          position: relative; z-index: 1;
        }
        .proj-card__name {
          font-family: var(--font-display); font-weight: 700; font-size: 18px; color: var(--text);
        }
        .proj-card__period {
          font-size: 11px; color: var(--text-dim); font-family: var(--font-mono); margin-top: 4px;
        }
        .proj-card__desc {
          font-size: 13px; color: var(--text-muted); line-height: 1.7;
          font-family: var(--font-display); flex-grow: 1; position: relative; z-index: 1;
        }
        .proj-card__stack {
          display: flex; flex-wrap: wrap; gap: 6px; position: relative; z-index: 1;
        }
        .proj-chip {
          padding: 3px 9px; border: 1px solid var(--border); border-radius: 4px;
          font-size: 11px; color: var(--text-dim); background: var(--accent-dim);
          font-family: var(--font-mono); cursor: default; display: inline-block;
        }
        .proj-card__links {
          display: flex; gap: 10px; padding-top: 4px;
          border-top: 1px solid var(--border); position: relative; z-index: 1;
        }
        .proj-link {
          display: flex; align-items: center; gap: 6px; font-size: 12px;
          padding: 6px 12px; border-radius: 5px; font-family: var(--font-mono);
        }
        .proj-link--primary { color: var(--accent); border: 1px solid var(--border-hover); }
        .proj-link--secondary { color: var(--text-muted); border: 1px solid var(--border); }
      `}</style>
    </motion.div>
  )
}
