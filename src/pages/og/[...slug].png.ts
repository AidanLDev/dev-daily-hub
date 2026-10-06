import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { APIRoute, GetStaticPaths } from 'astro'
import { getCollection, type CollectionEntry } from 'astro:content'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import sharp from 'sharp'
import { SITE_DESCRIPTION, SITE_TITLE, domainName } from '@consts'

// Builds a 1200x630 social share image for every post (and one for the site)
// at build time. Fonts are bundled so the output doesn't depend on the system.

const WIDTH = 1200
const HEIGHT = 630

const root = process.cwd()
const fonts = [
  {
    name: 'DejaVu Sans',
    data: readFileSync(join(root, 'src/assets/fonts/DejaVuSans.ttf')),
    weight: 400 as const,
  },
  {
    name: 'DejaVu Sans',
    data: readFileSync(join(root, 'src/assets/fonts/DejaVuSans-Bold.ttf')),
    weight: 700 as const,
  },
]

type Node = { type: string; props: Record<string, unknown> }
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra = {}): Node => ({
  type,
  props: { style, children, ...extra },
})

async function toDataUri(publicPath: string, width: number) {
  const png = await sharp(join(root, 'public', publicPath))
    .resize({ width, withoutEnlargement: false })
    .png()
    .toBuffer()
  return `data:image/png;base64,${png.toString('base64')}`
}

function card({ title, subtitle, cover }: { title: string; subtitle: string; cover?: string }) {
  const titleSize = title.length > 70 ? 46 : title.length > 45 ? 54 : 64

  return h(
    'div',
    {
      width: WIDTH,
      height: HEIGHT,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 64,
      backgroundColor: '#111318',
      color: '#f5f5f5',
      fontFamily: 'DejaVu Sans',
    },
    [
      h('div', { display: 'flex', fontSize: 28, fontWeight: 700, color: '#a3a3a3' }, SITE_TITLE),
      h('div', { display: 'flex', alignItems: 'center', gap: 48 }, [
        h('div', { display: 'flex', flexDirection: 'column', flex: 1, gap: 24 }, [
          h(
            'div',
            { display: 'flex', fontSize: titleSize, fontWeight: 700, lineHeight: 1.15 },
            title,
          ),
          h('div', { display: 'flex', fontSize: 26, color: '#a3a3a3', lineHeight: 1.4 }, subtitle),
        ]),
        ...(cover
          ? [
              h(
                'img',
                { width: 440, height: 248, objectFit: 'cover', borderRadius: 16 },
                undefined,
                {
                  src: cover,
                },
              ),
            ]
          : []),
      ]),
      h('div', { display: 'flex', fontSize: 24, color: '#737373' }, domainName),
    ],
  )
}

async function render(node: Node) {
  // satori's types expect React elements; the plain object shape is what it reads at runtime
  const svg = await satori(node as unknown as Parameters<typeof satori>[0], {
    width: WIDTH,
    height: HEIGHT,
    fonts,
  })
  return new Resvg(svg).render().asPng()
}

export const getStaticPaths = (async () => {
  const posts = await getCollection('posts')
  return [
    { params: { slug: 'site' }, props: { post: undefined } },
    ...posts.map((post) => ({ params: { slug: post.id }, props: { post } })),
  ]
}) satisfies GetStaticPaths

export const GET: APIRoute<{ post?: CollectionEntry<'posts'> }> = async ({ props }) => {
  const { post } = props

  const node = post
    ? card({
        title: post.data.title,
        subtitle: post.data.tags.join('  ·  '),
        cover: await toDataUri(post.data.cover, 880),
      })
    : card({ title: SITE_TITLE, subtitle: SITE_DESCRIPTION })

  return new Response(new Uint8Array(await render(node)), {
    headers: { 'Content-Type': 'image/png' },
  })
}
