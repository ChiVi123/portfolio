'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { GlitchText } from '~/components/bits/glitch-text'
import { CloseIcon, GithubIcon, MailIcon, MenuIcon, MoonIcon, SunIcon } from '~/components/ui/icons'
import { slideDown } from '~/lib/motion'

interface NavbarProps {
  email: string
  github: string
  isDark: boolean
  onToggleTheme: () => void
}

const NAV_LINKS = ['About', 'Skills', 'Experience', 'Projects', 'Contact'] as const

export function Navbar({ email, github, isDark, onToggleTheme }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <motion.nav className="navbar" initial="hidden" animate="show" variants={slideDown}>
      <div className="navbar__inner">
        {/* Logo */}
        <div className="navbar__logo">
          <span className="text-[var(--text)]">{'<'}</span>
          <GlitchText text="ChiVi" />
          <span className="text-[var(--accent)]">{'/>'}</span>
        </div>

        <div className="navbar__right">
          {/* Desktop nav links */}
          <div className="navbar__links">
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link}
                onClick={() => scrollTo(link)}
                className="navbar__link"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ color: 'var(--accent)' }}
              >
                {link}
              </motion.button>
            ))}
          </div>

          {/* Social icons */}
          <motion.a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="navbar__icon"
            aria-label="GitHub"
            whileHover={{ color: 'var(--accent)', scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <GithubIcon />
          </motion.a>
          <motion.a
            href={`mailto:${email}`}
            className="navbar__icon"
            aria-label="Email"
            whileHover={{ color: 'var(--accent)', scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            <MailIcon />
          </motion.a>

          {/* Theme toggle */}
          <motion.button
            onClick={onToggleTheme}
            className="navbar__theme-btn"
            aria-label="Toggle theme"
            whileHover={{ scale: 1.05, boxShadow: 'var(--accent-glow)' }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? 'sun' : 'moon'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex' }}
              >
                {isDark ? <SunIcon /> : <MoonIcon />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="navbar__mobile-btn"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? 'close' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'flex' }}
              >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar__mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link}
                onClick={() => scrollTo(link)}
                className="navbar__mobile-link"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {link}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          background: var(--bg-nav);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }
        .navbar__inner {
          max-width: 1100px; margin: 0 auto; padding: 0 24px;
          height: 60px; display: flex; align-items: center; justify-content: space-between;
        }
        .navbar__logo {
          font-family: var(--font-display); font-weight: 700; font-size: 20px;
          letter-spacing: -0.02em; cursor: default; color: var(--accent);
        }
        .navbar__right { display: flex; align-items: center; gap: 4px; }
        .navbar__links { display: flex; gap: 2px; margin-right: 12px; }
        .navbar__link {
          background: none; border: none; color: var(--text-muted); cursor: pointer;
          font-size: 11px; padding: 6px 12px; letter-spacing: 0.1em; text-transform: uppercase;
          font-family: var(--font-mono);
        }
        .navbar__icon {
          color: var(--text-muted); padding: 8px; display: flex; border-radius: 6px;
        }
        .navbar__theme-btn {
          background: var(--accent-dim); border: 1px solid var(--border);
          color: var(--accent); border-radius: 8px; padding: 6px 10px; cursor: pointer;
          display: flex; align-items: center; margin-left: 4px;
        }
        .navbar__mobile-btn {
          display: none; background: none; border: none; color: var(--text-muted);
          cursor: pointer; padding: 6px;
        }
        .navbar__mobile-menu {
          background: var(--bg-card); border-top: 1px solid var(--border);
          padding: 12px 24px 20px;
        }
        .navbar__mobile-link {
          display: block; width: 100%; text-align: left; background: none; border: none;
          color: var(--text-muted); cursor: pointer; font-size: 13px; padding: 10px 0;
          letter-spacing: 0.1em; text-transform: uppercase; font-family: var(--font-mono);
          border-bottom: 1px solid var(--border);
        }
        @media (max-width: 768px) {
          .navbar__links { display: none; }
          .navbar__mobile-btn { display: flex; }
        }
      `}</style>
    </motion.nav>
  )
}
