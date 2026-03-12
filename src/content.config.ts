import { defineCollection } from 'astro:content'
import { z } from "astro/zod";
import { glob } from 'astro/loaders'

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    lastModified: z.string().optional(),
    cover: z.string(),
    coverAlt: z.string(),
    category: z.array(z.string()),
    tags: z.array(z.string()),
    author: z.string(),
  }),
})

export const collections = { posts }
