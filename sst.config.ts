/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'dev-daily-hub',
      removal: 'remove', // input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
      region: 'us-east-1',
    }
  },
  async run() {
    new sst.aws.Astro('dev_daily_hub', {
      domain: { name: 'devdailyhub.com', redirects: ['www.devdailyhub.com'] },
      buildCommand: 'astro check --minimumSeverity warning && astro build',
    })
  },
})
