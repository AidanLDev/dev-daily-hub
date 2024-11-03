---
title: How I use useFormStatus
slug: use-form-status
description: How I will be using use form status, the new React 19 hook used for managing form state across multiple child forms.
category:
  - Web-Dev
tags:
  - React
pubDate: 2024-11-02
cover: https://devdailyhub.com/blog/useFormStatus.webp
coverAlt: AstroVerse-Aliases
author: VV
---

If you prefer to watch a code walk-through of this hook in action, please visit <a href="https://youtu.be/KvO3pf-s3Sw" target="__blank">my React 19 useFormStatus how to</a>

`useFormStatus` makes working with complex forms, where you have multiple child forms within a parent form, much easier. Before, you would have to manage state either using `context`, a state management library such as `Redux` or just by storing the state in a parent and passing it down to the child components. This hook removes that added boilerplate and complexity, simply call `useFormStatus` in a child of a `<form>` and you can access both the `pending` state and the `data` of the form.

In a standard one page form, this hook isn't too useful, however, if you have a more complicated form with multiple pages this hook saves a lot of repeated logic and state management. You may have a form where you capture "Personal Details", "Address Details" and "Order Details" etc etc... Each of those sections can be their own page. You can use this hook to gain access to the `pending` state, which will be true while the form's action is running. This is useful for disabling buttons or displaying a loading spinner while asynchronous operations happen in your backend.

For example, even though `<Submit />` is a different component to where our `<form>` is defined below. We can call the `useFormStatus()` hook to check if the `pending` status is true:

```tsx
'use client'

import { useFormStatus } from 'react-dom'
import { useActionState } from 'react'
import TextInput from '../TextInput'

function Submit() {
  const status = useFormStatus()
  return (
    <button disabled={status.pending} type="submit">
            Submit    {' '}
    </button>
  )
}

async function submitUser(
  prevState: Record<string, string>,
  formData: FormData,
) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string

  console.log({ name, email })
  return {
    name,
    email,
  }
}

const initialState = {
  name: '',
  email: '',
}

export default function FormStatus() {
  const [state, formAction, pending] = useActionState(submitUser, initialState)

  return (
    <form action={formAction}>
            <TextInput id="name" label="Name" />
            <TextInput id="email" label="Email" />
            <Submit />   {' '}
    </form>
  )
}
```

`useFormStatus()` gives us access to two values:

```ts
const { pending, data } = useFormStatus()
```

To really see this hook shine, you need to have a more complex form structure than the above, checkout <a href="https://youtu.be/KvO3pf-s3Sw" target="__blank">my video</a> to see how two child forms can be used within a `<form>` container.
