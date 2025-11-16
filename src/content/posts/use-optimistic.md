---
title: How to use Optimistic
slug: use-optimistic
description: How to use optimistic, the new React 19 hook for handling form state and giving the best ux to the user when working with asynchronous updates
category:
  - Web-Dev
tags:
  - React
pubDate: 2024-10-26
cover: /blog/useOptimistic.png
coverAlt: AstroVerse-Aliases
author: VV
---

Allows you to optimistically update the UI before the `Server Action` finishes executing, rather than waiting for the response. When the async action completes, the UI updates with the final state from the server

If you are a visual learning, do checkout <a href="https://youtu.be/Frb0RheJGPU" target="__blank">my YouTube How To on implementing a form in React 19 that uses useOptimistic</a>.

The following will show the new message on the UI while the `formAction` asynchronously stores the message on the server.

```tsx
'use client'

import { useOptimistic } from 'react'
import TextInput from '../TextInput'

const messages = ['Great news', 'Oh what?', 'Well dear...']

export default function Optimistic() {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage: string) => [...state, newMessage],
  )

  async function formAction(formData: FormData) {
    const message = formData.get('message') as string
    addOptimisticMessage(message)
    messages.push(message)
  }

  return (
    <div>
      {optimisticMessages.map((message, idx) => (
        <div key={idx}>{message}</div>
      ))}
      <form action={formAction}>
                <TextInput id='message' label='Message' />
        <button type='submit'>Send Message</button>
      </form>
    </div>
  )
}
```

As you can see from the example above, the use case for this could be an instant messaging app where you want the user to see in real-time that their message has been sent, despite it not having been updated on the backend yet. Then once it has been updated you can show the updated state to the user.

An example of how you could show different states between the local state and the server state is what WhatsApp do with the ticks, they will display 1 tick for sent and 2 for delivered.

[Learn more](https://vercel.com/blog/whats-new-in-react-19)
