export type SkillVariant = 'accent' | 'solid' | 'outline'

export interface SkillItem {
  label: string
  variant: SkillVariant
}

export interface SkillGroup {
  group: string
  items: SkillItem[]
}

export interface ContactInfo {
  email: string
  phone: string
  location: string
  github: string
}

export interface Experience {
  title: string
  company: string
  period: string
  bullets: string[]
}

export interface OGMeta {
  title?: string
  description?: string
  image?: string
  siteName?: string
  url?: string
}

export interface Project {
  name: string
  description: string
  stack: string[]
  demo?: string
  github?: string
  period: string
  og?: OGMeta | null
}

export interface Education {
  school: string
  fullName: string
  degree: string
  period: string
}

export interface CVData {
  name: string
  role: string
  tagline: string
  available: boolean
  contact: ContactInfo
  about: string
  skills: SkillGroup[]
  experience: Experience[]
  projects: Project[]
  education: Education[]
}
