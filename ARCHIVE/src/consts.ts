// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

// Base Page Metadata, src/layouts/BaseLayout.astro
export const BRAND_NAME = 'Dev Daily Hub'
export const SITE_TITLE = 'Dev Daily Hub'
export const SITE_DESCRIPTION =
  'A place for devs with content written by devs. Writing guides, how-tos and keeping up to date with the latest and greatest in the dev world.'

// Tags Page Metadata, src/pages/tags/index.astro
export const Tags_TITLE = 'Dev Daily Hub - All Tags'
export const Tags_DESCRIPTION =
  'Dev Daily Hub - All tags and the count of articles related to each tag'

// Tags Page Metadata, src/pages/tags/[tag]/[page].astro
export function getTagMetadata(tag: string) {
  return {
    title: `All articles on '${tag}' tag in dev`,
    description: `Explore articles about ${tag} for different perspectives and in-depth analysis.`,
  }
}

// Category Page Metadata, src/pages/category/[category]/[page].astro
export function getCategoryMetadata(category: string) {
  return {
    title: `All articles in '${category}' category in AstroVerse`,
    description: `Browse all articles under the ${category} category in AstroVerse`,
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
  // { href: "/rss.xml", icon: "tabler:rss", label: "RSS" },
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
export const SEARCH_PAGE_TITLE = `${SITE_TITLE} - Site Search`
export const SEARCH_PAGE_DESCRIPTION = `Search all content on ${SITE_TITLE}`
export const domainName = 'devdailyhub.com'
export const domainAlias = 'www.devdailyhub.com'
