import * as Sentry from '@sentry/astro'

Sentry.init({
  dsn: 'https://fb12ebc0acf269cd93a5f4861cfd6dd2@o4510397968154624.ingest.de.sentry.io/4510398283317328',
  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/astro/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
})
