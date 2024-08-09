// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

// Base Page Metadata, src/layouts/BaseLayout.astro
export const BRAND_NAME = 'Dev Daily Hub'
export const SITE_TITLE = 'Dev Daily Hub'
export const SITE_DESCRIPTION =
  'A place for devs with content written by devs. Writing guides, how-tos, self help and keeping up to date with the latest and greatest in the dev world.'

// Tags Page Metadata, src/pages/tags/index.astro
export const Tags_TITLE = 'Dev Daily Hub - All Tags'
export const Tags_DESCRIPTION =
  'Dev Daily Hub - All tags and the count of articles related to each tag'

// Tags Page Metadata, src/pages/tags/[tag]/[page].astro
export function getTagMetadata(tag: string) {
  return {
    title: `All articles on '${tag}' tag in AstroVerse`,
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
  { href: '/category/Self-Help/1', title: 'Self-Help' },
]

// Footer Links, src/components/Footer.astro
export const FooterLinks = [{ href: '/tags', title: 'Tags' }]

// Social Links, src/components/Footer.astro
export const SocialLinks = [
  // { href: "/rss.xml", icon: "tabler:rss", label: "RSS" },
  {
    href: 'https://x.com/aidanl94',
    icon: 'tabler:brand-twitter',
    label: 'Twitter',
  },
  {
    href: 'https://github.com/aidanldev',
    icon: 'tabler:brand-github',
    label: 'GitHub',
  },
  // TODO: Add the rest of my links
]

// Search Page Metadata, src/pages/search.astro
export const SEARCH_PAGE_TITLE = `${SITE_TITLE} - Site Search`
export const SEARCH_PAGE_DESCRIPTION = `Search all content on ${SITE_TITLE}`
