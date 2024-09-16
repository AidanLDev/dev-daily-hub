---
title: Generate QR Codes in React
slug: using-qrcode-react
description: QR codes are visually impactful ways to link to different resources. They have a wide application from product packaging to advertising. Utalise these powerful linking images in your React projects
category:
  - Web-Dev
tags:
  - React
pubDate: 2024-08-23
cover: https://images.unsplash.com/photo-1506220926022-cc5c12acdb35?q=80&w=1960&h=1102&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
coverAlt: Image with the the Free QR Gen logo on it
author: VV
---

<!--  https://devdailyhub.com/blog/FreeQRGenLogo.webp -->

Want to create customisable QR codes on your site? Similar to what sites like <a href="https://freeqrgen.net" target="__blank">freeqrgen.net</a> are doing? Well wonder no more, I will go into the process of installing the pwoerful package <a href="https://www.npmjs.com/package/qrcode.react" target="__blank">qrcode.react</a> and give some examples of how to integrate this tool into your React toolbelt.

qrcode.react have a <a href="https://zpao.github.io/qrcode.react/" target="__blank">fantastic demo</a> where you can play around with the different props and settings that the library offers. Play and see what's possible.

If you'd rather watch how it's done than read, I have a <a href="https://youtu.be/asYpp_AMXd8" target="__blank">code-walkthrough of creating a React QR Code application</a>.

If you're starting from a blank slate, follow along by first creating a react app

```shell
npx create-react-app qr-gen --template typescript
```

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

`QrCode.tsx`

```tsx
import { QRCodeSVG } from 'qrcode.react'

export default function QrCode() {
  return (
    <QrCode
      value="https://http://devdailyhub.com/"
      size={128}
      bgColor={'#FFF'}
      fgColor={'#000'}
    />
  )
}
```

Now wherever you want to display the QR code in your project, simply import and return the component `App.tsx`:

```tsx
import QrCode from './QrCode' // <--- Make this path point to wherever you saved the QrCode component

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Amazing QR Gen App</h1>
      </header>
      {/* some other random content that's top notch */}
      <QrCode />
    </div>
  )
}
```

Easy as pie, we got ourselves a QR code, give it a scan to test it out!

That's all well and good, but it's not that exciting really is it? A plain, black and white QR code with no character... We can do better than that!

We need to update the default styles to stop the header taking up ALL of the height now, in `App.css` make sure your `.App-header` class looks like this:

```css
.App-header {
  background-color: #282c34;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  margin-bottom: 2rem;
}
```

Let's create us a form to capture some config options that's take our QR Code to the NEXT LEVEL 🚀!

First off, we want to create some state so we can update some values and send them to our `QrCode` component.

In `App.tsx`:

```tsx

export default function App() {
  import { useState }, React from "react"

  const [url, setUrl] = useState('');
  const [size, setSize] = useState(128);
  const [bgColour, setBgColour] = useState('#FFF');
  const [fgColour, setFgColour] = useState('#000');

  return (
    // ... our current code
  )
}
```

Okay now let's move onto creating some essential Form Components that we can re-use, we will add a new folder and file called `types/types.ts`:

`types.ts`

```ts
export interface ICoreInput {
  type?: 'text' | 'number'
  id: string
  label: string
}
```

`TextInput.tsx`

```tsx
import React, { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { ICoreInput } from '../types/types'

interface ITextInput<T extends string | number> extends ICoreInput {
  value: T
  setValue: Dispatch<SetStateAction<T>>
  max?: number
  min?: number
}

export default function TextInput<T extends string | number>({
  id,
  label,
  value,
  setValue,
  type,
  max,
  min,
}: ITextInput<T>) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === 'number') {
      setValue(Number(e.target.value) as T)
    } else {
      setValue(e.target.value as T)
    }
  }
  return (
    <div>
      <label htmlFor={id}>{label}: </label>
      <input
        id={id}
        name={id}
        value={value}
        type={type || 'text'}
        onChange={handleChange}
        max={max}
        min={min}
      />
    </div>
  )
}
```

`QRConfigForm.tsx`

```tsx
import React, { Dispatch, SetStateAction } from 'react'
import TextInput from './TextInput'

interface IQrConfigForm {
  url: string
  setUrl: Dispatch<SetStateAction<string>>
  size: number
  setSize: Dispatch<SetStateAction<number>>
  bgColour: string
  setBgColour: Dispatch<SetStateAction<string>>
  fgColour: string
  setFgColour: Dispatch<SetStateAction<string>>
}

export default function QrConfigForm({
  url,
  setUrl,
  size,
  setSize,
  bgColour,
  setBgColour,
  fgColour,
  setFgColour,
}: IQrConfigForm) {
  return (
    <div className="qr-config-form-container">
      <TextInput<string>
        id="url"
        label="QR URL"
        setValue={setUrl}
        value={url}
      />
      <TextInput<number>
        id="size"
        label="QR Size"
        setValue={setSize}
        value={size}
        type="number"
        min={1}
        max={10000}
      />
      <TextInput<string>
        id="background-colour"
        value={bgColour}
        setValue={setBgColour}
        label="Background Colour"
      />
      <TextInput<string>
        id="foreground-colour"
        value={fgColour}
        setValue={setFgColour}
        label="Foreground Colour"
      />
    </div>
  )
}
```

Now we can import and pass the values we set in this form from our `Main.tsx` down to our `QrCode.tsx` component:

First off let's set-up the interface and QrCode component so it's ready to accept our form data as props:

`QrCode.tsx`

```tsx
import { QRCodeSVG } from 'qrcode.react'

interface IQrCode {
  url: string
  size: number
  bgColor: string
  fgColor: string
}

export default function QrCode({ url, size, bgColor, fgColor }) {
  return (
    <QrCode
      value={url ?? 'https://devdailyhub.com/'}
      size={size ?? 128}
      bgColor={bgColor ?? '#FFF'}
      fgColor={fgColor ?? '#000'}
    />
  )
}
```

Now we can pass the state down to the `QrCode` component:

`Main.tsx`

```tsx
import { QRCodeSVG } from 'qrcode.react'

interface IQrCode {
  url: string
  size: number
  bgColour: string
  fgColour: string
}

export default function QrCode({ bgColour, fgColour, size, url }: IQrCode) {
  return (
    <QRCodeSVG
      value={url ?? 'https://devdailyhub.com'}
      size={size ?? 128}
      bgColor={bgColour ?? '#FFF'}
      fgColor={fgColour ?? '#000'}
    />
  )
}
```

It looks so basic, it's pretty horrible, this isn't a guide on how to make the most sexy web app however, so just a few basic styles to stop our eyes from falling out... Add this class to the `App.css` file to spruce up the form a little:

```css
.qr-config-form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1.5em;
  margin-bottom: 1rem;
}
```

Much more interesting! Now we can update the URL our QR code points to, we can update the size and both the foreground & background colours!

There's still a load of improvements we can make however, typing in a colour is kinda lame, how if we use a colour picker instead? Also the way it re-renders every-time we change the URL is a bit dodgy looking.

You can see a fully working version of this with the above improvements at <a href="https://freeqrgen.net" target="__blank">freeqrgen.net</a>

If you'd like me to go through any of the above do let me know at <a href="mailto:dev@aidanlowson.com" target="__blank">dev@aidanlowson.com</a>

Do Subscribe to <a href="https://www.youtube.com/@aidanl94" target="__blank">my YouTube channel</a> where I'll be doing more guides, code-through and other programming related content subscribe here to keep up-to-date.
