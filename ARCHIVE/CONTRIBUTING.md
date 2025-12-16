# Contributing to Dev Daily Hub

Thanks for your interest in contributing! This project aims to be welcoming and easy to contribute to. The sections below explain how to file issues, propose changes, and prepare pull requests.

File an issue

- Search existing issues before opening a new one.
- For bug reports include: steps to reproduce, expected vs actual behavior, Node/pnpm versions, and any logs or screenshots.
- For feature requests describe the problem and a proposed solution or desired outcome.

Branching & Commits

- Use a clear branch name: `fix/<short-desc>`, `feat/<short-desc>`, or `docs/<short-desc>`.
- Write clear commit messages and keep changes focused.

Formatting & Linting

- This project uses Prettier. Format your changes before opening a PR:

```bash
pnpm install
pnpm format
```

- If you add code, ensure it follows existing patterns in `src/` and keep style consistent.

Pull Request Checklist

- [ ] The PR has a clear description and purpose.
- [ ] Related issue(s) referenced (if applicable).
- [ ] Code is formatted (`pnpm format`).
- [ ] Any relevant linting/type checks pass locally.
- [ ] If the change affects the UI, attach screenshots or a short demo GIF.

Tests

- There are no automated tests in the baseline project. If you add tests, include instructions to run them in your PR.

Code of Conduct

- By participating you agree to follow `CODE_OF_CONDUCT.md`. To report a serious issue privately, contact the project owner at `dev@aidanlowson.com`.

Thanks for helping improve Dev Daily Hub — your contributions are appreciated!
