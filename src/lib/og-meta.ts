export interface OGMeta {
  title?: string
  description?: string
  image?: string
  siteName?: string
  url?: string
}

const OG_TIMEOUT_MS = 4_000

export async function fetchOGMeta(url: string): Promise<OGMeta | null> {
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), OG_TIMEOUT_MS)

    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; portfolio-bot/1.0)' },
      next: { revalidate: 3600 },
    })
    clearTimeout(timer)

    if (!res.ok) return null

    const html = await res.text()
    return parseOGMeta(html, url)
  } catch {
    return null
  }
}

/**
 * Extract all attributes from a single <meta ...> tag string.
 * Handles any attribute order, e.g.:
 *   <meta content="..." property="og:title" data-rh="true">
 *   <meta property="og:image" content="...">
 */
function extractMetaAttrs(tag: string): Record<string, string> {
  const attrs: Record<string, string> = {}
  const re = /(\w[\w-]*)=["']([^"']*)["']/g
  let m: RegExpExecArray | null
  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  while ((m = re.exec(tag)) !== null) {
    attrs[m[1].toLowerCase()] = m[2]
  }
  return attrs
}

function parseOGMeta(html: string, baseUrl: string): OGMeta | null {
  // Only scan <head> to avoid false positives in body content
  const headMatch = html.match(/<head[\s\S]*?<\/head>/i)
  const head = headMatch?.[0] ?? html

  const metaTags = head.match(/<meta[^>]+>/gi) ?? []

  const og: Record<string, string> = {}
  const twitter: Record<string, string> = {}
  let metaDescription: string | undefined
  let pageTitle: string | undefined

  for (const tag of metaTags) {
    const attrs = extractMetaAttrs(tag)
    const property = attrs.property ?? ''
    const name = attrs.name ?? ''
    const content = attrs.content

    if (!content) continue

    if (property.startsWith('og:')) {
      og[property.slice(3)] = content
    } else if (name.startsWith('twitter:')) {
      twitter[name.slice(8)] = content
    } else if (name === 'description') {
      metaDescription = content
    }
  }

  const titleMatch = head.match(/<title[^>]*>([^<]+)<\/title>/i)
  if (titleMatch) pageTitle = titleMatch[1].trim()

  const title = og.title ?? twitter.title ?? pageTitle
  const description = og.description ?? twitter.description ?? metaDescription
  const rawImage = og.image ?? twitter.image
  const image = rawImage ? resolveUrl(rawImage, baseUrl) : undefined
  const siteName = og.site_name
  const url = og.url

  if (!title && !description && !image) return null
  return { title, description, image, siteName, url }
}

function resolveUrl(href: string, base: string): string {
  if (href.startsWith('http')) return href
  try {
    return new URL(href, base).toString()
  } catch {
    return href
  }
}
