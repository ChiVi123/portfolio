'use client'

import { useEffect, useState } from 'react'
import { AboutSection } from '~/components/about-section'
import { ContactSection } from '~/components/contact-section'
import { ExperienceSection } from '~/components/experience-section'
import { HeroSection } from '~/components/hero-section'
import { Navbar } from '~/components/layouts/navbar'
import { ProjectsSection } from '~/components/projects-section'
import { SkillsSection } from '~/components/skills-section'
import type { CVData } from '~/types/cv'

interface PortfolioClientProps {
  cv: CVData
}

export function PortfolioClient({ cv }: PortfolioClientProps) {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'light') setIsDark(false)
  }, [])

  useEffect(() => {
    const html = document.documentElement
    if (isDark) {
      html.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    } else {
      html.classList.add('light')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <>
      <Navbar
        email={cv.contact.email}
        github={cv.contact.github}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
      />

      <main className="relative z-10 max-w-275 mx-auto px-6">
        <HeroSection name={cv.name} tagline={cv.tagline} available={cv.available} contact={cv.contact} />

        <div
          className="h-px mb-20"
          style={{ background: 'linear-gradient(90deg, transparent, var(--border), transparent)' }}
        />

        <AboutSection about={cv.about} education={cv.education} />

        <SkillsSection skills={cv.skills} />

        <ExperienceSection experience={cv.experience} />

        <ProjectsSection projects={cv.projects} />

        <ContactSection email={cv.contact.email} github={cv.contact.github} />

        <footer
          className="border-t py-7 flex justify-between items-center flex-wrap gap-3"
          style={{ borderColor: 'var(--border)' }}
        >
          <span className="font-bold text-[16px]" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>
            {cv.name}
          </span>
          <span
            className="text-[12px] tracking-widest"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}
          >
            Front-end Developer · HCM City · 2025
          </span>
        </footer>
      </main>
    </>
  )
}
