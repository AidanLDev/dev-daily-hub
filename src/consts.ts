// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

// Base Page Metadata, src/layouts/BaseLayout.astro
export const BRAND_NAME = 'Dev Daily Hub'
export const SITE_TITLE = 'Dev Daily Hub'
export const SITE_DESCRIPTION =
  'A place for devs with content written by devs. Writing guides, how-tos and keeping up to date with the latest and greatest in the dev world.'

// SEO, src/components/BaseHead.astro
export const SITE_LOCALE = 'en_GB'
export const TWITTER_HANDLE = '@aidanl94'
export const DEFAULT_OG_IMAGE = '/og/site.png'

// Site owner, used for structured data and as the default post author
export const SITE_OWNER = {
  name: 'Aidan Lowson',
  url: 'https://aidanlowson.com',
}

// Maps the `author` initials used in post frontmatter to a full author.
// Any author not listed here is used as-is.
export const AUTHORS: Record<string, { name: string; url?: string }> = {
  VV: SITE_OWNER,
  AL: SITE_OWNER,
  A: SITE_OWNER,
}

// Tags Page Metadata, src/pages/tags/index.astro
export const Tags_TITLE = 'All tags'
export const Tags_DESCRIPTION = `Every topic covered on ${SITE_TITLE}, with the number of articles for each tag.`

// Tags Page Metadata, src/pages/tags/[tag]/[page].astro
export function getTagMetadata(tag: string) {
  return {
    title: `${tag} articles`,
    description: `Guides, tutorials and write-ups about ${tag} from ${SITE_TITLE}.`,
  }
}

// Category Page Metadata, src/pages/category/[category]/[page].astro
export function getCategoryMetadata(category: string) {
  return {
    title: `${category} articles`,
    description: `Browse all ${category} articles on ${SITE_TITLE}: guides, tutorials and lessons learnt.`,
  }
}

// Header Links, src/components/Header.astro
export const HeaderLinks = [
  { href: '/category/Web-Dev/1', title: 'Web-Dev' },
  { href: '/category/DevOps/1', title: 'DevOps' },
]

// Footer Links, src/components/Footer.astro
export const FooterLinks = [
  { href: '/tags', title: 'Tags' },
  { href: '/about', title: 'About' },
  { href: '/privacy-policy', title: 'Privacy Policy' },
]

// Social Links, src/components/Footer.astro
export const SocialLinks = [
  { href: '/rss.xml', icon: 'tabler:rss', label: 'RSS' },
  {
    href: 'https://x.com/aidanl94',
    icon: 'tabler:brand-x',
    label: 'Twitter',
  },
  {
    href: 'https://github.com/aidanldev',
    icon: 'tabler:brand-github',
    label: 'GitHub',
  },
  {
    href: 'https://www.youtube.com/channel/UCDJAFkcMY5Ze3SKQS-fhg0A',
    icon: 'tabler:brand-youtube',
    label: 'YouTube',
  },
  {
    href: 'https://www.instagram.com/lowsonaidan/',
    icon: 'tabler:brand-instagram',
    label: 'Instagram',
  },
  {
    href: 'https://www.linkedin.com/in/aidanlowson1/',
    icon: 'tabler:brand-linkedin',
    label: 'LinkedIn',
  },
  {
    href: 'https://www.tiktok.com/@aidanlowson',
    icon: 'tabler:brand-tiktok',
    label: 'TikTok',
  },
  {
    href: 'https://aidanlowson.com',
    icon: 'tabler:world-www',
    label: 'Portfolio',
  },
]

// Search Page Metadata, src/pages/search.astro
export const SEARCH_PAGE_TITLE = 'Search'
export const SEARCH_PAGE_DESCRIPTION = `Search all content on ${SITE_TITLE}`
export const domainName = 'devdailyhub.com'
export const domainAlias = 'www.devdailyhub.com'
