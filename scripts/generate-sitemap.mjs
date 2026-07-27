// Regenerates public/sitemap.xml from the current route list + project
// slugs — run automatically before every build (see package.json's
// "build" script) so the sitemap can never drift out of sync with
// src/data/projects.js as projects are added or removed.
//
// Reads projects.js as plain text (not imported as a module) since it
// also imports .svg files, which plain Node ESM can't resolve outside
// Vite's own asset pipeline — a slug regex avoids needing that pipeline
// here at all.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const BASE_URL = 'https://makglobal.co.uk'

const projectsSrc = readFileSync(resolve(__dirname, '../src/data/projects.js'), 'utf8')
const slugs = [...projectsSrc.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1])

// /discover-london is deliberately excluded — it's still a placeholder
// "Under Construction" page (noindex'd in DiscoverLondon.jsx too), and
// listing a noindex page in the sitemap sends Google conflicting signals.
// Add it back here once the real page ships.
const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/projects', priority: '0.9', changefreq: 'weekly' },
  { path: '/buyers-guide', priority: '0.8', changefreq: 'monthly' },
  { path: '/services', priority: '0.7', changefreq: 'monthly' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' },
]

const projectRoutes = slugs.map((slug) => ({
  path: `/projects/${slug}`,
  priority: '0.8',
  changefreq: 'monthly',
}))

const urls = [...STATIC_ROUTES, ...projectRoutes]
const today = new Date().toISOString().slice(0, 10)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${BASE_URL}${u.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

writeFileSync(resolve(__dirname, '../public/sitemap.xml'), xml)
console.log(`sitemap.xml written with ${urls.length} URLs (${slugs.length} projects)`)
