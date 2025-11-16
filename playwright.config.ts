import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 30_000,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
  use: {
    baseURL: 'http://localhost:4322',
    headless: true,
    actionTimeout: 0,
    trace: 'on-first-retry',
  },
  webServer: {
    // Try pnpm if available, otherwise fall back to npm.
    // Pass the port to the dev script so the server listens on the configured baseURL.
    command:
      'sh -c "command -v pnpm >/dev/null 2>&1 && pnpm dev -- --port 4322 || npm run dev -- --port 4322"',
    url: 'http://localhost:4322',
    // Reuse an existing server during local development, but make sure CI always starts a fresh one.
    reuseExistingServer: process.env.CI ? false : true,
    timeout: 120_000,
  },
})
