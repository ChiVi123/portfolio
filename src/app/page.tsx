import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { PortfolioClient } from '~/components/portfolio-client'
import { fetchOGMeta } from '~/lib/og-meta'
import type { CVData } from '~/types/cv'

async function getCVData(): Promise<CVData> {
  const filePath = path.join(process.cwd(), 'public', 'assets', 'cv.json')
  const raw = await readFile(filePath, 'utf-8')
  return JSON.parse(raw) as CVData
}

export default async function HomePage() {
  const cv = await getCVData()

  // Fetch OG metadata for all demo URLs in parallel
  const ogResults = await Promise.all(cv.projects.map((p) => (p.demo ? fetchOGMeta(p.demo) : Promise.resolve(null))))

  const projects = cv.projects.map((p, i) => ({ ...p, og: ogResults[i] }))

  return <PortfolioClient cv={{ ...cv, projects }} />
}
