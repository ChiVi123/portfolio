import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { CVData } from '~/types/cv'
import { PortfolioClient } from '~/components/portfolio-client'

async function getCVData(): Promise<CVData> {
  const filePath = path.join(process.cwd(), 'public', 'assets', 'cv.json')
  const raw = await readFile(filePath, 'utf-8')
  return JSON.parse(raw) as CVData
}

export default async function HomePage() {
  const cv = await getCVData()
  return <PortfolioClient cv={cv} />
}
