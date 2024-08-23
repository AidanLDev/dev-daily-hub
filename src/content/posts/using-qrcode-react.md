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
  import { useState }, React from "react"

  const [url, setUrl] = useState('')
  const [size, setSize] = useState(300)
  const [backgroundColour, setBackgroundColour] = useState('#FFF')
  const [foregroundColour, setForegroundColour] = useState('#000')

  return (
    // ... our current code
  )
}
```

Okay now let's move onto creating some essential Form Components that we can re-use

`TextInput.tsx`

```React
import React, { Dispatch, SetStateAction } from "react";

interface ITextInput {
  id: string
  label: string
  value: string
  setValue: Dispatch<SetStateAction<string>>
  type?: string
  inputClassName?: string
  containerClassName?: string
  setFocus?: Dispatch<SetStateAction<boolean>>
}

export default function Input({
  id,
  label,
  value,
  setValue,
  type,
  inputClassName,
  containerClassName,
  setFocus,
}: ITextInput) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        onFocus={() => setFocus && setFocus(true)}
        onBlur={() => setFocus && setFocus(false)}
      />
    </div>
  );
}
```

`NumberInput.tsx`

```React
import React, { Dispatch, SetStateAction } from 'react'

interface INumberInputProps {
  min?: number
  max?: number
  id: string
  label: string
  value: number
  setValue: Dispatch<SetStateAction<number>>
  inputClassName?: string
  containerClassName?: string
  setFocus?: Dispatch<SetStateAction<boolean>>
}

export default function NumberInput({
  min,
  max,
  id,
  label,
  value,
  setValue,
  inputClassName,
  containerClassName,
  setFocus,
}: INumberInputProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        value={value}
        onChange={(e) => {
          if (min && max) {
            if (Number(e.target.value) > max || Number(e.target.value) < min) {
              return
            }
          }
          setValue(Number(e.target.value))
        }}
        type="number"
        onFocus={() => setFocus && setFocus(true)}
        onBlur={() => setFocus && setFocus(false)}
        min={min}
        max={max}
      />
    </div>
  )
}

```

`QRConfigForm.tsx`

```React
"use client"

import React, { Dispatch, SetStateAction } from "react"

interface IQRConfigForm {
  url: string
  setUrl: Dispatch<SetStateAction<string>>
  size: number
  setSize: Dispatch<SetStateAction<number>>
  backgroundColour: string
  setBackgroundColour: Dispatch<SetStateAction<string>>
  foregroundColour: string
  setForegroundColour: Dispatch<SetStateAction<string>>
}

export default function QRConfigForm({
  url,
  setUrl,
  size,
  setSize,
  backgroundColour,
  setBackgroundColour,
  foregroundColour,
  setForegroundColour
}: IQRConfigForm) {

  return (
    <div>
      <TextInput
        id="url"
        label="QR URL"
        setValue={setUrl}
        value={url}
      />
      <NumberInput
        id="size"
        label="size"
        min={1}
        max={10000}
        value={size}
        setValue={setSize}
      />
      <TextInput
        id="bgColour"
        label="Background Colour"
        setValue={setBackgroundColour}
        value={backgroundColour}
      />
      <TextInput
        id="fgColour"
        label="Foreground Colour"
        setValue={setForegroundColour}
        value={foregroundColour}
      />
    </div>
  )
}
```

Now we can import and pass the values we set in this form from our `Main.tsx` down to our `QRCodeSVG.tsx` component:

First off let's set-up the interface and QRCodeSVG component so it's ready to accept our form data as props:

`QRCodeSVG.tsx`

```React
import { QRCodeSVG } from 'qrcode.react'

interface IQRCodeSVg {
  url: string;
  size: number;
  bgColor: string;
  fgColor: string;
}

export default function QRCodeSvg({
  url,
  size,
  bgColor,
  fgColor
}) {
  return (
    <QRCodeSVG
      value={url ?? "https://http://devdailyhub.com/"}
      size={size ?? 128}
      bgColor={bgColor ?? '#FFF'}
      fgColor={fgColor ?? '#000'}
    />
  )
}
```

Now we can pass the state down to the `QRCodeSVG` component:

`Main.tsx`

```React
/* Imports and other code... */
return (
  {/* Other code in our return */}
  <QRCodeSVG
    url={url}
    size={size}
    bgColor={backgroundColour}
    fgColor={foregroundColour}
  />
)
```

Much more interesting! Now we can update the URL our QR code points to, we can update the size and both the foreground & background colours!

There's still a load of improvements we can make however, typing in a colour is kinda lame, how if we use a colour picker instead? Also the way it re-renders every-time we change the URL is a bit dodgy looking.

You can see a fully working version of this with the above improvements at <a href="https://freeqrgen.net" target="__blank">freeqrgen.net</a>

If you'd like me to go through any of the above do let me know at <a href="mailto:dev@aidanlowson.com">dev@aidanlowson.com</a>

<!-- TODO: Check this link works -->

Also a YT video will be coming soon, <a href="https://www.youtube.com/@aidanl94" target="__blank">subscribe here to keep up-to-date</a>.
