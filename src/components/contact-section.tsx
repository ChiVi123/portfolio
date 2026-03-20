'use client'

import { motion } from 'framer-motion'
import { GithubIcon, MailIcon } from '~/components/ui/icons'
import { MotionSection } from '~/components/ui/motion-section'
import { SectionLabel } from '~/components/ui/section-label'
import { fadeUp, scaleIn, stagger } from '~/lib/motion'

interface ContactSectionProps {
  email: string
  github: string
}

export function ContactSection({ email, github }: ContactSectionProps) {
  return (
    <MotionSection id="contact" className="portfolio-section">
      <SectionLabel index="05" title="Contact" />

      <motion.div
        className="contact-card card"
        variants={fadeUp}
        whileHover={{
          borderColor: 'var(--border-hover)',
          transition: { type: 'spring', stiffness: 300, damping: 28 },
        }}
        style={{ marginTop: 40 }}
      >
        {/* Animated radial glow */}
        <motion.div
          className="contact-card__glow"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
        />

        <motion.div className="contact-card__inner" variants={stagger(0.1, 0.15)}>
          <motion.div className="contact-card__eyebrow" variants={scaleIn}>
            Get in touch
          </motion.div>
          <motion.h2 className="contact-card__heading" variants={fadeUp}>
            Let's Build Something
          </motion.h2>
          <motion.p className="contact-card__body" variants={fadeUp}>
            Open to internship opportunities, freelance projects, and collaborations. Let's talk.
          </motion.p>

          <motion.div className="contact-card__actions" variants={stagger(0.08)}>
            <motion.a
              href={`mailto:${email}`}
              className="contact-btn contact-btn--primary"
              variants={scaleIn}
              whileHover={{ scale: 1.04, boxShadow: 'var(--accent-glow)' }}
              whileTap={{ scale: 0.97 }}
            >
              <MailIcon size={16} /> Send Email
            </motion.a>
            <motion.a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="contact-btn contact-btn--secondary"
              variants={scaleIn}
              whileHover={{ scale: 1.04, background: 'var(--accent-dim)' }}
              whileTap={{ scale: 0.97 }}
            >
              <GithubIcon /> GitHub
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      <style>{`
        .contact-card {
          padding: 48px !important; text-align: center;
          position: relative; overflow: hidden;
        }
        .contact-card__glow {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 320px; height: 320px;
          background: radial-gradient(circle, var(--accent-dim) 0%, transparent 70%);
          pointer-events: none; border-radius: 50%;
        }
        .contact-card__inner { position: relative; z-index: 1; }
        .contact-card__eyebrow {
          font-size: 12px; letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--accent); margin-bottom: 16px; font-family: var(--font-mono);
          display: inline-block;
        }
        .contact-card__heading {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(28px, 5vw, 48px); color: var(--text);
          line-height: 1.1; margin-bottom: 16px; letter-spacing: -0.02em;
        }
        .contact-card__body {
          font-size: 15px; color: var(--text-muted); max-width: 420px;
          margin: 0 auto 40px; line-height: 1.8; font-family: var(--font-display);
        }
        .contact-card__actions {
          display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;
        }
        .contact-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 14px 28px; border-radius: 6px; font-family: var(--font-mono);
          font-size: 14px; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .contact-btn--primary { background: var(--accent); color: #000; border: none; }
        .contact-btn--secondary {
          color: var(--accent); border: 1px solid var(--border-hover); background: transparent;
        }
      `}</style>
    </MotionSection>
  )
}
