import type { CollectionEntry } from 'astro:content'
import { AUTHORS, SITE_OWNER, SITE_TITLE } from '@consts'

export const resolveAuthor = (author: string) => AUTHORS[author] ?? { name: author }

export const ogImagePath = (postId: string) => `/og/${postId}.png`

/** BlogPosting + BreadcrumbList structured data for a post page */
export function postStructuredData(post: CollectionEntry<'posts'>, site: URL) {
  const url = new URL(`/posts/${post.id}`, site).href
  const author = resolveAuthor(post.data.author)
  const category = post.data.category[0]

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: url,
    url,
    headline: post.data.title,
    description: post.data.description,
    image: [new URL(ogImagePath(post.id), site).href, new URL(post.data.cover, site).href],
    datePublished: post.data.pubDate.toISOString(),
    dateModified: (post.data.updatedDate ?? post.data.pubDate).toISOString(),
    author: { '@type': 'Person', ...author },
    publisher: { '@type': 'Person', name: SITE_OWNER.name, url: SITE_OWNER.url },
    keywords: post.data.tags.join(', '),
    articleSection: category,
    inLanguage: 'en-GB',
    isPartOf: { '@id': new URL('/#website', site).href },
  }

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: SITE_TITLE, item: site.href },
      ...(category
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: category,
              item: new URL(`/category/${category}/1`, site).href,
            },
          ]
        : []),
      { '@type': 'ListItem', position: category ? 3 : 2, name: post.data.title, item: url },
    ],
  }

  return [blogPosting, breadcrumbs]
}
