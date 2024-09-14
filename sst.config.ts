/// <reference path="./.sst/platform/config.d.ts" />

import { domainAlias, domainName } from '@consts'

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
    new sst.aws.Astro('dev_daily_hub', {
      domain: { name: domainName, redirects: [domainAlias] },
    })
  },
})

