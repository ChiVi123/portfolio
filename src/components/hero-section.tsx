'use client'

import { motion } from 'framer-motion'
import { GlitchText } from '~/components/bits/glitch-text'
import { Magnet } from '~/components/bits/magnet'
import { SplitText } from '~/components/bits/split-text'
import { fadeSide, fadeUp, staggerContainer } from '~/lib/motion'
import type { ContactInfo } from '~/types/cv'

interface HeroSectionProps {
  name: string
  tagline: string
  available: boolean
  contact: ContactInfo
}

function getNameParts(name: string) {
  const parts = name.split(' ')
  const last = parts.slice(-2).join(' ')
  const first = parts.slice(0, -2).join(' ')
  return { first, last }
}

const contactItems = (contact: ContactInfo) => [
  { label: contact.email, href: `mailto:${contact.email}` },
  { label: contact.phone, href: `tel:${contact.phone}` },
  { label: contact.location, href: undefined },
  { label: 'github/ChiVi123', href: contact.github },
]

export function HeroSection({ name, tagline, available, contact }: HeroSectionProps) {
  const { first, last } = getNameParts(name)

  return (
    <motion.header
      className="border-b-[1.5px] border-foreground pb-10 pt-14"
      initial="hidden"
      animate="show"
      variants={staggerContainer}
    >
      {/* Eyebrow */}
      <motion.p
        className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-(--warm-accent)"
        variants={fadeSide}
      >
        <span className="h-px w-6 bg-(--warm-accent)" />
        Portfolio · Front-end Developer
      </motion.p>

      {/* Name — SplitText cho first name, GlitchText cho last name */}
      <h1
        className="leading-[0.92] tracking-tight"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.6rem, 9vw, 5.4rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
        }}
      >
        <SplitText text={first} className="block text-foreground" stagger={0.04} delay={0.1} />
        <span className="block text-(--warm-accent)">
          <GlitchText text={last} mode="hover" speed={35} iterations={10} />
        </span>
      </h1>

      {/* Tagline */}
      <motion.p
        className="mt-3 text-muted-foreground"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(0.95rem, 2.2vw, 1.2rem)',
        }}
        variants={fadeUp}
      >
        {tagline}
      </motion.p>

      {/* Bar — contacts + available badge */}
      <motion.div className="mt-8 flex flex-wrap items-center justify-between gap-4" variants={fadeUp}>
        <div className="flex flex-wrap gap-2">
          {contactItems(contact).map((item) => (
            <Magnet key={item.label} strength={0.25}>
              <a
                href={item.href}
                target={item.href?.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="inline-block rounded-full border border-border bg-secondary px-3 py-1.5 font-mono text-[11px] text-secondary-foreground transition-colors hover:bg-foreground hover:text-background hover:border-transparent"
              >
                {item.label}
              </a>
            </Magnet>
          ))}
        </div>

        {available && (
          <div className="flex items-center gap-2 font-mono text-[11px] text-(--warm-accent)">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-(--warm-accent) opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-(--warm-accent)" />
            </span>
            Open to work · 2025
          </div>
        )}
      </motion.div>
    </motion.header>
  )
}
