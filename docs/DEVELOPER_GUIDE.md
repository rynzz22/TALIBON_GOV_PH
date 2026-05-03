# Developer Guide

## Prerequisites

- Node.js 20+
- npm
- Git
- Supabase project credentials
- (Optional) payment provider keys for end-to-end payment testing

## Local Setup

1. Clone repository.
2. Install dependencies:

```bash
npm ci
```

3. Create `.env` from `.env.example` and fill required values.

## Required Environment Variables

- `GEMINI_API_KEY`
- `APP_URL`
- `NODE_ENV`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Optional:

- `HITPAY_API_KEY`
- `HITPAY_SALT`
- `XENDIT_SECRET_KEY`
- `GOOGLE_MAPS_API_KEY`

## Run Commands

- Start dev server:

```bash
npm run dev
```

- Run type checks:

```bash
npm run lint
```

- Run test suite:

```bash
npm test -- --run
```

- Build production output:

```bash
npm run build
```

- Start built server (after build):

```bash
npm run start
```

## Project Layout (High-Level)

- `src/components` - reusable UI components
- `src/pages` - route-level pages
- `src/services` - frontend service/API wrappers
- `src/server` - NestJS backend modules and controllers
- `src/server/api` - feature-specific backend endpoints
- `src/test` - test setup and utilities
- `docs` - project documentation

## API Conventions

- Backend routes are exposed under `/api`.
- Use `/api/health` for health checks and deployment probes.
- Validate inputs for all mutation/payment endpoints.

## Branching and Delivery

- Work in feature branches (or your working branch like `RenzBranch`).
- Keep commits scoped and descriptive.
- Before push, run:
  - `npm run lint`
  - `npm test -- --run`
  - `npm run build`

## Debugging Checklist

- If dev server fails on startup:
  - confirm `.env` exists and required values are filled,
  - check env validation output for missing keys.

- If tests fail:
  - inspect failing suite first,
  - check for API shape mismatches in mocks.

- If build fails:
  - run TypeScript checks,
  - inspect recently changed imports and config files.

## Deployment Readiness Checklist

- [ ] Lint passes
- [ ] Tests pass
- [ ] Build passes
- [ ] Required env vars configured in target platform
- [ ] Health endpoint reachable after deployment
- [ ] Rollback strategy prepared
