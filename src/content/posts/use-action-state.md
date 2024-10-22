---
title: How to use Action State
slug: use-action-state
description: How to use action state, the new React 19 hook for handling form state and actions
category:
  - Web-Dev
tags:
  - React
pubDate: 2024-10-22
cover: https://devdailyhub.com/blog/create-react-19-project.webp
coverAlt: AstroVerse-Aliases
author: VV
---

<!-- TODO: Update the cover photo -->

# A Guide to useActionState

To complement [React Actions](https://19.react.dev/reference/rsc/server-functions) React have released a new hook `useActionState` that helps manage state, status and visual feedback. These are useful when working with forms.

<!-- TODO: Add YouTube link -->

This hook simplifies managing form states and form submissions. Using Actions, it captures form input data, handles validation, and error states, reducing the need for custom state management logic. It also exposes a `pending` state so you can show a loader while the action is being executed

For example:

```tsx
"use client"

import { useActionState }

async function incrementCount(prevState: number, formData: FormData) {
	return prevState + 1;
}

export default function Counter() {
	const [state, formAction, pending] = useActionState(incrementCount, 0);

	if (pending) {
		return <p>Loading...</p>
	}

	return (
		<form>
			<button formAction={formAction}>Increment</button>
			<span>{state}</span>
		</form>
	)
}
```

The `formState` is the value returned by the `formAction`.

`useActionState()` takes in these 3 parameters:

- `fn`: The function to be called when the form is submitted or button pressed. It takes the previous state of the form (initially the `initialState` that we pass), followed by `FormData`, the argument that a `Action` usually receives.
- `initilState` - The value you want the state it to be initially
- `permalink (optional)` - A string containing the unique page URL that this form modifies. For use on pages with dynamic content (eg: feeds) in conjunction with progressive enhancement: it `fn` is a `serverAction` and the form is submitted before the JS bundle loads, the browser will navigate to the specified permalink URL, rather than the current page's URL.

