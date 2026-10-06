import { readdirSync, readFileSync } from 'node:fs'
import { defineConfig } from 'astro/config'
import { unified } from '@astrojs/markdown-remark'
import { remarkModifiedTime } from './src/utils/remark-modified-time.mjs'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import partytown from '@astrojs/partytown'
import pagefind from 'astro-pagefind'
import icon from 'astro-icon'
import tailwindcss from '@tailwindcss/vite'
import aws from 'astro-sst'

import sentry from '@sentry/astro'

const SITE = 'https://devdailyhub.com'

// Pages that shouldn't be in the sitemap (they're noindex or duplicate the home page)
const SITEMAP_EXCLUDE = new Set([`${SITE}/search`, `${SITE}/404`, `${SITE}/page/1`])

// Map each post URL to its last modified date (updatedDate, falling back to pubDate).
// The content layer isn't available in the config, so read the frontmatter directly.
// Post IDs follow the glob loader: the `slug` frontmatter field, or the slugified file name.
function getPostLastModified() {
  const dir = new URL('./src/content/posts/', import.meta.url)
  const dates = new Map()
  for (const file of readdirSync(dir)) {
    if (!/\.mdx?$/.test(file)) continue
    const frontmatter = readFileSync(new URL(file, dir), 'utf8').split(/^---$/m)[1] ?? ''
    const field = (name) =>
      frontmatter.match(new RegExp(`^${name}:\\s*['"]?([^'"\\n]+)`, 'm'))?.[1]?.trim()
    const id =
      field('slug') ??
      file
        .replace(/\.mdx?$/, '')
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9_-]/g, '')
    const date = field('updatedDate') ?? field('pubDate')
    if (date) dates.set(`${SITE}/posts/${id}`, new Date(date).toISOString())
  }
  return dates
}
const postLastModified = getPostLastModified()

// https://astro.build/config
export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.unsplash.com',
      },
    ],
  },

  markdown: {
    processor: unified({
      remarkPlugins: [remarkModifiedTime],
    }),
  },

  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !SITEMAP_EXCLUDE.has(page.replace(/\/$/, '')),
      serialize: (item) => {
        const lastmod = postLastModified.get(item.url.replace(/\/$/, ''))
        return lastmod ? { ...item, lastmod } : item
      },
    }),
    pagefind(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
        debug: false,
      },
    }),
    icon({
      include: {
        tabler: ['*'],
      },
    }),
    sentry({
      project: 'dev-daily-hub',
      org: 'processvision',
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
  adapter: aws(),
})
