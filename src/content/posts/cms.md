---
title: Use a CMS with Astro
slug: use-cms
description: How to use a CMS to add content to Astro
category:
  - Two
tags:
  - Tailwind
  - Find
  - SEO
pubDate: 2023-09-01
cover: https://images.unsplash.com/photo-1638184984605-af1f05249a56?w=1960&h=1102&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGJsYWNrfGVufDB8MHwwfHx8Mg%3D%3D
coverAlt: AstroVerse-Aliases
author: VV
---

**Ready to connect a Headless CMS to your Astro project?** Follow one of our guides to integrate a CMS.

:::tip
Find [community-maintained integrations](https://astro.build/integrations/?search=cms) for connecting a CMS to your project in our integrations directory.
:::

## CMS Guides

Note that many of these pages are **stubs**: they're collections of resources waiting for your contribution!

<CMSGuidesNav />

## Why use a CMS?

A Content Management System lets you write content and manage assets outside of your Astro project.

This unlocks new features for working with content. Most CMSes give you a visual content editor, the ability to specify standard types of content, and a way to collaborate with others.

A CMS can be useful for content that follows a particular structure, often giving you a dashboard-like experience and WYSIWYG editing tools. You might use a CMS to write blog posts using a CMS's rich text editor instead of Markdown files. Or you might use a CMS to maintain product listings for an eCommerce shop, making certain fields required to avoid incomplete listings.

Your Astro project can then fetch your content from your CMS and display it, wherever and however you want on your site.

## Which CMSes work well with Astro?

### Headless CMSes

These CMSes provide content through APIs, making them ideal for Astro's architecture.

- Contentful: A popular headless CMS with a robust API, it’s well-suited for delivering content to Astro sites
- Sanity: Sanity is known for its real-time collaboration, flexible content modeling, and excellent developer experience. It integrates well with Astro
- Strapi: Strapi is an open-source headless CMS that offers great flexibility and a customizable API, making it a good fit for Astro
- Prismic: A headless CMS with a visual content editor, offering an intuitive way to manage content that can be easily integrated with Astro
- DatoCMS: DatoCMS provides a powerful API and rich content modeling options, with a straightforward integration process with Astro
- Ghost: Originally a blogging platform, Ghost has evolved into a headless CMS. It offers a seamless API that works well with Astro for content delivery

### Git-based CMSes

These CMSes store content in Git repositories, which works well for static site generators like Astro.

- Netlify CMS: An open-source content management system that works with Git, allowing content creators to edit content through a simple UI. It's easily integrated with Astro
- Forestry: Another Git-based CMS that allows content management in Markdown and integrates well with static site generators like Astro
- TinaCMS: A Git-backed CMS that enables live editing of content. It’s flexible and designed to work smoothly with frameworks like Astro

### Traditional CMSes

These are more conventional CMSes that have either headless capabilities or ways to export content for static site generation.

- WordPress: WordPress can be used as a headless CMS through its REST API or GraphQL endpoints, making it possible to use WordPress for content management while using Astro for site generation
- Drupal: Similar to WordPress, Drupal can be used as a headless CMS by exposing content through JSON
  or GraphQL, making it compatible with Astro
- Craft CMS: Craft CMS is a flexible content management system that offers both traditional and headless modes, allowing easy integration with Astro

### Others

- MDX or Markdown: If you prefer a simpler setup, Astro natively supports Markdown and MDX files, making it easy to manage content directly in the repository
- Hygraph (formerly GraphCMS): Hygraph is a headless CMS with a powerful GraphQL API, designed for complex content structures. It integrates well with Astro for dynamic content needs

Because Astro takes care of the _presentation_ of your content, you'll want to choose a _headless_ CMS, like those in the list above. This means that the CMS helps you write your content, but doesn't generate a site that displays it. Instead, you fetch the content data and use in your Astro project.

Some headless CMSes, like Storyblok, provide an Astro [integration](/en/guides/integrations-guide/) that helps fetch the content specifically for an Astro site. Others provide a JavaScript SDK, a library that you install and use to fetch your remote content.

## Can I use Astro without a CMS?

Yes! Astro provides built-in ways to [author content](/en/guides/content/), including support for Markdown pages.

The CMSes mentioned offer different approaches to content management, so the best choice depends on your specific needs, such as whether you want a headless CMS, Git-based content management, or a traditional CMS with headless capabilities.
