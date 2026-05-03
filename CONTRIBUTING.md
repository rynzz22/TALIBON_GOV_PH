# Contributing

## Prerequisites

- **Node.js** — Use the version in [`.nvmrc`](./.nvmrc) (install via [nvm](https://github.com/nvm-sh/nvm), [fnm](https://github.com/Schniz/fnm), or your preferred manager).
- Copy [`.env.example`](./.env.example) to `.env` and fill in values for the features you are working on. Never commit `.env` or real API keys.

## Local workflow

```bash
npm ci
npm run dev
```

Before opening a PR:

```bash
npm run lint
npm run test:ci
npm run build
```

These same checks run on GitHub Actions for pushes and pull requests to `main` / `master`.

## Branches and PRs

- Use short, descriptive branch names (for example `feat/news-carousel`, `fix/hero-image`).
- Keep PRs focused on one concern when possible.
- Fill out the pull request template so reviewers know what changed and how you verified it.

## Tests

Add or update tests when you change behavior that matters for users or data safety (auth, forms, payments, Supabase access). Prefer `*.test.tsx` next to UI components and `*.spec.ts` for services if that matches existing files.
