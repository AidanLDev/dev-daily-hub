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

// https://astro.build/config
export default defineConfig({
  site: 'https://devdailyhub.com',
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
    sitemap(),
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
