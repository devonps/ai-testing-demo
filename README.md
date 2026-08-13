# demo-test-automation

UI test automation framework for **KanFlow** (`http://192.168.1.253:8100`), built with TypeScript, Cucumber (Gherkin), and Playwright.

See [`plan.md`](./plan.md) for the full design decisions behind this framework.

## Prerequisites

- Node.js 20 LTS
- npm

## Setup

```bash
npm install
npx playwright install --with-deps chromium
cp .env.example .env
```

## Running tests

```bash
npm test
```

By default this runs against the `dev` environment (`config/dev.json`). Override with:

```bash
TEST_ENV=dev npm test
```

## Project structure

```
config/            Environment config (baseUrl, etc.), selected via TEST_ENV
features/          Gherkin .feature files
src/pages/         Page Object Model classes — selectors live here only
src/support/       Cucumber World, hooks, and step definitions
src/utils/         Shared helpers (e.g. config loading)
```

## Quality gates

```bash
npm run lint         # ESLint
npm run format:check # Prettier check
npm run typecheck    # tsc --noEmit
```

These also run as a pre-commit hook (Husky + lint-staged) and again in CI as the non-bypassable backstop.

## Proof-of-pipeline

`features/pipeline-smoke-test.feature` runs against a stable public page (`https://example.com`) to prove the framework works end-to-end. Real KanFlow coverage will be added alongside/after this.
