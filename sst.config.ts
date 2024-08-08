import type { SSTConfig } from "sst";
import { AstroSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "dev-daily-hub",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new AstroSite(stack, "site", {
        customDomain: {
          domainName: "devdailyhub.com",
          domainAlias: "www.devdailyhub.com",
        },
      });
      stack.addOutputs({
        url: site.url,
      });
    });
  },
} satisfies SSTConfig;
