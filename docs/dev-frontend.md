# Dev Frontend (HTMX) — Local development

This document describes how to run the minimal HTMX frontend locally for development.

## Files added

- `templates/base.html` — base template for future renderer use
- `templates/partials/topbar.html`, `templates/partials/footer.html` — partials
- `static/index.html` — local dev home page
- `static/fragments/blog-1.html`, `static/fragments/blog-2.html` — sample fragments

## Local server

A simple static server is sufficient to test HTMX interactions.

Using Python:

1. From the repository root:

```bash
python -m http.server 8000
```

2. Open `http://localhost:8000/static/index.html` in your browser.

Using Node (serve):

```bash
npx serve static -l 8000
```

## Manual test checklist

- [ ] Open the index page and confirm Topbar and Footer render.
- [ ] Click "Blog 1" or "Load Blog 1" and confirm the fragment replaces the `#main-content` container.
- [ ] Use the browser back button to verify history is pushed (enabled via `hx-push-url`).

## Next steps

- When ready, we'll wire `hx-get` endpoints to the Rust Lambda API at `/blogs/{slug}` and set up the content rendering CI pipeline.
