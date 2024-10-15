---
title: Creating a React 19 Project
slug: create-react-19-project
description: How to Create a React 19 project before it's stable release
category:
  - Web-Dev
tags:
  - React
pubDate: 2024-10-15
cover: https://devdailyhub.com/blog/deploy-your-astro-site.webp
coverAlt: AstroVerse-Aliases
author: VV
---

<!-- TODO: Update cover to https://devdailyhub.com/blog/create-react-19-project.webp -->

# Creating a React 19 project

As React 19 hasn't been released yet, to use the latest `React 19` changes you will have to manually update the `React` and `React DOM` packages.

<!-- TODO Add video here -->

To get up and running from nothing, first use `npx create-react-app <appName>`

Or if you're a `TypeScript` legend, you can use the `--template typescript` flag:
`npx create-react-app <appName> --template typescript`.

Update to the latest version of `React` and `React DOM`
`npm install --save-exact react@rc react-dom@rc`

If you're using TypeScript you also need to update the types. Once React 9s is released as stable you can install the type as usual from `@types/react` and `@types/react-dom`:
`package.json`

```json
{
  "dependencies": {
    "@types/react": "npm:types-react@rc",
    "@types/react-dom": "npm:types-react-dom@rc"
  },
  "overrides": {
    "@types/react": "npm:types-react@rc",
    "@types/react-dom": "npm:types-react-dom@rc"
  }
}
```

[For more info on upgrading to React 19](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
