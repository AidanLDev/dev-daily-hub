---
title: Generate QR Codes in React
slug: using-qrcode-react.md
description: QR codes are visually impactful ways to link to different resources. They have a wide application from product packaging to advertising. Utalise these powerful linking images in your React projects
category:
  - Web-Dev
tags:
  - React
pubDate: 2024-08-23
cover: https://devdailyhub.com/blog/leetcode-1-two-sums.webp
# FreeQRGenLogo.webp
coverAlt: Image with the the Free QR Gen logo on it
author: VV
---

Want to create customisable QR codes on your site? Similar to what sites like <a href="https://freeqrgen.net" target="__blank">freeqrgen.net</a> are doing? Well wonder no more, I will go into the process of installing the pwoerful package <a href="https://www.npmjs.com/package/qrcode.react" target="__blank">qrcode.react</a> and give some examples of how to integrate this tool into your React toolbelt.

qrcode.react have a <a href="https://zpao.github.io/qrcode.react/" target="__blank">fantastic demo</a> where you can play around with the different props and settings that the library offers. Play and see what's possible.

Now first step to using this library is to download it!

NPM:

```shell
npm install qrcode.react
```

PNPM:

```shell
pnpm add qrcode.react
```

YARN:

```shell
yarn add qrcode.react
```

Step one wasn't so bad... now let's create us a QR component that will render the QR code we're generating to the FE so we can see our magic come to life before our eyes:

`QRCodeSVG.tsx`

```React
import { QRCodeSVG } from 'qrcode.react'

export default function QRCodeSvg() {
  return (
    <QRCodeSVG
      value="https://http://devdailyhub.com/"
      size={128}
      bgColor={'#FFF'}
      fgColor={'#000'}
    />
  )
}
```

Now wherever you want to display the QR code in your project, simply import and return the component:

```Main.tsx
import QRCodeSvg from './QRCodeSvg' // <--- Make this path point to wherever you saved the QRCodeSvg component

export default function Main() {
  return (
    <div>
       <h1>Hello guys</h1>
       {/* some other random content that's top notch */}
       <QrCodeSvg />
    </div>
  )
}
```

Easy as pie, we got ourselves a QR code, give it a scan to test it out!

That's all well and good, but it's not that exciting really is it? A plain, black and white QR code with no character... We can do better than that!

Let's create us a form to capture some config options that's take our QR Code to the NEXT LEVEL 🚀!

First off, we want to create some state so we can update some values and send them to our `QRCodeSVG` component.

In `Main.tsx`:
```React

export default function Main() {
```

`QRConfigForm.tsx`

```React
"use client"

interface IQRConfigForm {

}

export default function QRConfigForm({}: IQRConfigForm) {

}
```
