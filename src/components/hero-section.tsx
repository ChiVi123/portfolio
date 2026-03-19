'use client'

import { motion } from 'framer-motion'
import { GlitchText } from '~/components/bits/glitch-text'
import { Typewriter } from '~/components/bits/typewriter'
import { ChevronDownIcon, GithubIcon, LocationIcon, MailIcon, PhoneIcon } from '~/components/ui/icons'
import { fadeUp, heroLine, scaleIn, stagger } from '~/lib/motion'
import type { ContactInfo } from '~/types/cv'

interface HeroSectionProps {
  name: string
  tagline: string
  available: boolean
  contact: ContactInfo
}

export function HeroSection({ name, tagline, available, contact }: HeroSectionProps) {
  const nameParts = name.split(' ')
  const lastName = nameParts.slice(-2).join(' ')
  const firstName = nameParts.slice(0, -2).join(' ')

  const contactItems = [
    { icon: <MailIcon size={16} />, label: contact.email, href: `mailto:${contact.email}` },
    { icon: <PhoneIcon />, label: contact.phone, href: `tel:${contact.phone}` },
    { icon: <LocationIcon />, label: contact.location },
    { icon: <GithubIcon />, label: 'ChiVi123', href: contact.github },
  ]

  const scrollToProjects = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="hero">
      <motion.div
        initial="hidden"
        animate="show"
        variants={stagger(0.09, 0.1)}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {/* Available badge */}
        {available && (
          <motion.div className="hero__badge" variants={fadeUp}>
            <div className="hero__badge-dot">
              <div className="hero__badge-dot-inner" />
              <div className="hero__badge-dot-pulse" />
            </div>
            <span className="hero__badge-text">Available for work · 2025</span>
          </motion.div>
        )}

        {/* Subtitle */}
        <motion.div className="hero__subtitle" variants={fadeUp}>
          <Typewriter text="// Front-end Developer" delay={400} />
        </motion.div>

        {/* Name */}
        <div className="hero__name-block">
          <motion.span className="hero__first-name" variants={heroLine}>
            {firstName}
          </motion.span>
          <motion.span className="hero__last-name" variants={heroLine}>
            <GlitchText text={lastName} />
          </motion.span>
        </div>

        {/* Tagline */}
        <motion.p className="hero__tagline" variants={fadeUp}>
          {tagline}
        </motion.p>

        {/* Contact pills */}
        <motion.div className="hero__pills" variants={stagger(0.06, 0)}>
          {contactItems.map(({ icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="hero__pill"
              style={{ cursor: href ? 'pointer' : 'default' }}
              variants={scaleIn}
              whileHover={{ borderColor: 'var(--accent)', color: 'var(--accent)', y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <span className="hero__pill-icon">{icon}</span>
              {label}
            </motion.a>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div className="hero__ctas" variants={fadeUp}>
          <motion.button
            onClick={scrollToProjects}
            className="hero__btn-primary"
            whileHover={{ scale: 1.03, boxShadow: 'var(--accent-glow)' }}
            whileTap={{ scale: 0.97 }}
          >
            View Projects
          </motion.button>
          <motion.button
            onClick={scrollToContact}
            className="hero__btn-secondary"
            whileHover={{ scale: 1.03, background: 'var(--accent-dim)' }}
            whileTap={{ scale: 0.97 }}
          >
            Contact Me
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        onClick={scrollToProjects}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.9 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
        >
          <span className="hero__scroll-text">Scroll</span>
          <ChevronDownIcon />
        </motion.div>
      </motion.div>

      <style>{`
        .hero {
          min-height: 100vh;
          display: flex; flex-direction: column; justify-content: center;
          padding-top: 80px; position: relative;
        }
        .hero__badge {
          display: flex; align-items: center; gap: 10px; margin-bottom: 32px;
        }
        .hero__badge-dot {
          position: relative; width: 10px; height: 10px;
        }
        .hero__badge-dot-inner {
          width: 10px; height: 10px; border-radius: 50%;
          background: var(--green); position: absolute;
        }
        .hero__badge-dot-pulse {
          width: 10px; height: 10px; border-radius: 50%;
          background: var(--green); position: absolute;
          animation: pulse-ring 1.5s ease-out infinite;
        }
        .hero__badge-text {
          font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--green); font-family: var(--font-mono);
        }
        .hero__subtitle {
          font-size: 13px; letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--text-muted); margin-bottom: 12px; font-family: var(--font-mono);
        }
        .hero__name-block {
          display: flex; flex-direction: column;
          margin-bottom: 20px; overflow: hidden;
        }
        .hero__first-name {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(48px, 10vw, 100px);
          line-height: 0.92; letter-spacing: -0.04em;
          color: var(--text); display: block;
        }
        .hero__last-name {
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(48px, 10vw, 100px);
          line-height: 0.92; letter-spacing: -0.04em;
          color: var(--accent); display: block;
          text-shadow: var(--accent-glow);
        }
        .hero__tagline {
          font-size: clamp(14px, 2vw, 18px); color: var(--text-muted);
          max-width: 520px; line-height: 1.7; margin-bottom: 40px;
          font-family: var(--font-display); font-weight: 400;
        }
        .hero__pills {
          display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 48px;
        }
        .hero__pill {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 14px; border-radius: 6px;
          border: 1px solid var(--border); color: var(--text-muted);
          font-size: 12px; background: var(--accent-dim);
          font-family: var(--font-mono); transition: border-color 0.2s, color 0.2s;
        }
        .hero__pill-icon { color: var(--accent); display: flex; }
        .hero__ctas { display: flex; gap: 12px; flex-wrap: wrap; }
        .hero__btn-primary {
          background: var(--accent); color: #000; border: none;
          padding: 12px 28px; border-radius: 6px; font-family: var(--font-mono);
          font-size: 13px; font-weight: 600; cursor: pointer;
          letter-spacing: 0.08em; text-transform: uppercase;
        }
        .hero__btn-secondary {
          background: transparent; color: var(--accent);
          border: 1px solid var(--border-hover);
          padding: 12px 28px; border-radius: 6px; font-family: var(--font-mono);
          font-size: 13px; font-weight: 600; cursor: pointer;
          letter-spacing: 0.08em; text-transform: uppercase;
        }
        .hero__scroll {
          position: absolute; bottom: 40px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          color: var(--text-dim); cursor: pointer;
        }
        .hero__scroll-text {
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        @media (max-width: 640px) { .hero__scroll { display: none; } }
      `}</style>
    </section>
  )
}
