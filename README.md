# Dev Daily Hub

[![site-status]][site-link] [![build]][build-link] [![license]][license-link]

Dev Daily Hub is an Astro-based developer blog and resource site that publishes guides, how-tos, and practical developer content. The site is built with Astro (v5) and MDX, styled with Tailwind CSS, and uses PageFind for local search. It's configured to output a static site and can be deployed via SST (Serverless Stack) / AWS.

Quick Start

- Install dependencies:

```bash
pnpm install
```

- Run development server:

```bash
pnpm dev
```

- Build for production:

```bash
pnpm build
```

- Preview the production build locally:

```bash
pnpm preview
```

Project Structure (high level)

- `src/` — all site source: pages, layouts, components, and content collections.
- `public/` — static assets (images, icons, favicons).
- `astro.config.mjs` — Astro configuration and integrations (Tailwind, PageFind, MDX, SST adapter).
- `package.json` — scripts and dependencies (uses `pnpm`).

Contributing

Contributions are welcome. See `CONTRIBUTING.md` for details on filing issues, branch naming, and pull request expectations. Please follow the `CODE_OF_CONDUCT.md` when interacting in issues and PRs.

License

This project is open source and released under the MIT License — see `LICENSE`.

Author / Contact

- Aidan Lowson — dev@aidanlowson.com

[site-status]: #
[site-link]: #
[build]: #
[build-link]: #
[license]: #
[license-link]: #

