'use client'

import { motion } from 'framer-motion'
import { ExternalIcon, GithubIcon } from '~/components/ui/icons'
import { MotionSection } from '~/components/ui/motion-section'
import { SectionLabel } from '~/components/ui/section-label'
import { fadeUp, scaleIn, stagger } from '~/lib/motion'
import type { OGMeta, Project } from '~/types/cv'

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
  const og = project.og
  const hasOG = !!(og?.image || og?.title || og?.description)

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

      {/* OG image preview */}
      {hasOG && og?.image && <OGPreview og={og} demoUrl={project.demo} />}

      <div className="proj-card__header">
        <div>
          <div className="proj-card__name">{project.name}</div>
          {project.period && <div className="proj-card__period">{project.period}</div>}
        </div>
      </div>

      <p className="proj-card__desc">{project.description}</p>

      {/* OG description as quote if different from project description */}
      {hasOG && og?.description && og.description !== project.description && (
        <OGDescriptionQuote description={og.description} siteName={og.siteName} />
      )}

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
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="proj-link proj-link--primary"
            whileHover={{ scale: 1.03, background: 'var(--accent-dim)' }}
            whileTap={{ scale: 0.97 }}
          >
            <ExternalIcon /> Live Demo
          </motion.a>
        )}
        {project.github && (
          <motion.a
            href={project.github}
            target="_blank"
            rel="noreferrer"
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
          font-family: var(--font-display); font-weight: 700; font-size: 19px; color: var(--text);
        }
        .proj-card__period {
          font-size: 12px; color: var(--text-dim); font-family: var(--font-mono); margin-top: 4px;
        }
        .proj-card__desc {
          font-size: 14px; color: var(--text-muted); line-height: 1.7;
          font-family: var(--font-display); flex-grow: 1; position: relative; z-index: 1;
        }
        .proj-card__stack {
          display: flex; flex-wrap: wrap; gap: 6px; position: relative; z-index: 1;
        }
        .proj-chip {
          padding: 3px 9px; border: 1px solid var(--border); border-radius: 4px;
          font-size: 12px; color: var(--text-dim); background: var(--accent-dim);
          font-family: var(--font-mono); cursor: default; display: inline-block;
        }
        .proj-card__links {
          display: flex; gap: 10px; padding-top: 4px;
          border-top: 1px solid var(--border); position: relative; z-index: 1;
        }
        .proj-link {
          display: flex; align-items: center; gap: 6px; font-size: 13px;
          padding: 6px 12px; border-radius: 5px; font-family: var(--font-mono);
        }
        .proj-link--primary { color: var(--accent); border: 1px solid var(--border-hover); }
        .proj-link--secondary { color: var(--text-muted); border: 1px solid var(--border); }
      `}</style>
    </motion.div>
  )
}

function OGPreview({ og, demoUrl }: { og: OGMeta; demoUrl?: string }) {
  return (
    <motion.a
      href={demoUrl}
      target="_blank"
      rel="noreferrer"
      className="og-preview"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ scale: 1.01 }}
      style={{ display: 'block', position: 'relative', zIndex: 1, cursor: demoUrl ? 'pointer' : 'default' }}
    >
      <div className="og-preview__img-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={og.image}
          alt={og.title ?? 'Preview'}
          className="og-preview__img"
          loading="lazy"
          onError={(e) => {
            const el = e.currentTarget.closest('.og-preview') as HTMLElement | null
            if (el) el.style.display = 'none'
          }}
        />
        <div className="og-preview__overlay">
          <div className="og-preview__badge">
            <ExternalIcon />
            <span>{og.siteName ?? new URL(demoUrl ?? 'https://example.com').hostname}</span>
          </div>
        </div>
      </div>

      {og.title && (
        <div className="og-preview__meta">
          <span className="og-preview__title">{og.title}</span>
        </div>
      )}

      <style>{`
        .og-preview {
          border: 1px solid var(--border); border-radius: 8px; overflow: hidden;
          background: var(--bg); transition: border-color 0.2s;
          text-decoration: none;
        }
        .og-preview:hover { border-color: var(--border-hover); }
        .og-preview__img-wrap {
          position: relative; width: 100%; aspect-ratio: 1200/630; overflow: hidden;
        }
        .og-preview__img {
          width: 100%; height: 100%; object-fit: cover;
          display: block; transition: transform 0.4s ease;
        }
        .og-preview:hover .og-preview__img { transform: scale(1.03); }
        .og-preview__overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(8,12,16,0.7) 0%, transparent 50%);
          display: flex; align-items: flex-end; padding: 10px 12px;
        }
        .og-preview__badge {
          display: flex; align-items: center; gap: 5px;
          background: rgba(0,240,255,0.12); border: 1px solid rgba(0,240,255,0.25);
          border-radius: 4px; padding: 3px 8px;
          color: var(--accent); font-size: 11px; font-family: var(--font-mono);
          letter-spacing: 0.05em; backdrop-filter: blur(4px);
        }
        .og-preview__meta {
          padding: 8px 12px 10px;
          border-top: 1px solid var(--border);
          background: var(--bg-card);
        }
        .og-preview__title {
          font-size: 12px; color: var(--text-dim); font-family: var(--font-mono);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;
        }
      `}</style>
    </motion.a>
  )
}

function OGDescriptionQuote({ description, siteName }: { description: string; siteName?: string }) {
  const truncated = description.length > 100 ? `${description.slice(0, 97)}…` : description

  return (
    <div className="og-quote">
      <span className="og-quote__bar" />
      <div className="og-quote__content">
        {siteName && <span className="og-quote__source">{siteName}</span>}
        <p className="og-quote__text">{truncated}</p>
      </div>

      <style>{`
        .og-quote {
          display: flex; gap: 10px; align-items: flex-start;
          position: relative; z-index: 1;
        }
        .og-quote__bar {
          flex-shrink: 0; width: 2px; background: var(--accent);
          border-radius: 2px; margin-top: 2px; align-self: stretch;
          opacity: 0.5;
        }
        .og-quote__content { display: flex; flex-direction: column; gap: 2px; }
        .og-quote__source {
          font-size: 11px; color: var(--accent); font-family: var(--font-mono);
          letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.7;
        }
        .og-quote__text {
          font-size: 12px; color: var(--text-dim); font-family: var(--font-display);
          line-height: 1.6; font-style: italic;
        }
      `}</style>
    </div>
  )
}
