/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'dev-daily-hub',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
      region: 'us-east-1',
    }
  },
  async run() {
    // SST disallows top-level imports in sst.config.ts. Do a dynamic import
    // for values we need from `@consts` so the config remains valid.
    const { domainAlias, domainName } = await import('@consts')

    new sst.aws.Astro('dev_daily_hub', {
      domain: { name: domainName, redirects: [domainAlias] },
    })
  },
})

