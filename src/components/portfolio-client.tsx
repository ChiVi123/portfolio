'use client'

import { useEffect, useState } from 'react'
import type { CVData } from '~/types/cv'
import { Navbar } from '~/components/layouts/navbar'
import { HeroSection } from '~/components/hero-section'
import { AboutSection } from '~/components/about-section'
import { SkillsSection } from '~/components/skills-section'
import { ExperienceSection } from '~/components/experience-section'
import { ProjectsSection } from '~/components/projects-section'
import { ContactSection } from '~/components/contact-section'

interface PortfolioClientProps {
  cv: CVData
}

export function PortfolioClient({ cv }: PortfolioClientProps) {
  const [isDark, setIsDark] = useState(true)

  // Apply theme class to <html>
  useEffect(() => {
    const html = document.documentElement
    if (isDark) {
      html.classList.remove('light')
    } else {
      html.classList.add('light')
    }
  }, [isDark])

  return (
    <>
      <Navbar
        email={cv.contact.email}
        github={cv.contact.github}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />

      <main className="portfolio-main">
        <HeroSection
          name={cv.name}
          tagline={cv.tagline}
          available={cv.available}
          contact={cv.contact}
        />

        <div className="divider" />

        <AboutSection about={cv.about} education={cv.education} />

        <SkillsSection skills={cv.skills} />

        <ExperienceSection experience={cv.experience} />

        <ProjectsSection projects={cv.projects} />

        <ContactSection email={cv.contact.email} github={cv.contact.github} />

        <footer className="portfolio-footer">
          <span className="footer-name">{cv.name}</span>
          <span className="footer-meta">Front-end Developer · HCM City · 2025</span>
        </footer>
      </main>

      <style>{`
        .portfolio-main {
          position: relative; z-index: 1;
          max-width: 1100px; margin: 0 auto; padding: 0 24px;
        }
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border), transparent);
          margin: 0 0 80px;
        }
        .portfolio-footer {
          border-top: 1px solid var(--border);
          padding: 28px 0;
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 12px;
        }
        .footer-name {
          font-family: var(--font-display); font-weight: 700; font-size: 15px;
          color: var(--text);
        }
        .footer-meta {
          font-size: 11px; color: var(--text-dim); font-family: var(--font-mono);
          letter-spacing: 0.1em;
        }
      `}</style>
    </>
  )
}
