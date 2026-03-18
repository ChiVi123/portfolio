import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ExperienceSection } from '~/components/experience-section'
import { HeroSection } from '~/components/hero-section'
import { Navbar } from '~/components/layouts/navbar'
import { ProjectsSection } from '~/components/projects-section'
import { SkillsSection } from '~/components/skills-section'
import type { CVData } from '~/types/cv'

async function getCVData(): Promise<CVData> {
  const filePath = path.join(process.cwd(), 'public', 'assets', 'cv.json')
  const raw = await readFile(filePath, 'utf-8')
  return JSON.parse(raw) as CVData
}

export default async function HomePage() {
  const cv = await getCVData()

  // "Nguyễn Hoàng Chí Vĩ" → "ChiVi" cho logo
  const parts = cv.name.split(' ')
  const shortName = parts.slice(-2).join('')

  return (
    <>
      <Navbar shortName={shortName} />

      <main className="mx-auto max-w-225 px-6 pb-20">
        <HeroSection name={cv.name} tagline={cv.tagline} available={cv.available} contact={cv.contact} />

        {/* Two-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Left column */}
          <div className="border-border sm:border-r sm:pr-8">
            <SkillsSection about={cv.about} skills={cv.skills} education={cv.education} />
          </div>

          {/* Right column */}
          <div className="sm:pl-8">
            <ExperienceSection experience={cv.experience} />
            <ProjectsSection projects={cv.projects} />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-0 flex flex-wrap items-center justify-between gap-3 border-t-[1.5px] border-foreground py-7">
          <span className="text-[13px] font-bold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
            {cv.name}
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">Front-end Developer · HCM City · 2025</span>
        </footer>
      </main>
    </>
  )
}
