# demo-test-automation — Plan

**Status: Proposed — awaiting review**

This plan was produced from the discovery questionnaire. No code, dependencies, or git history have been created yet. Nothing gets scaffolded until this is explicitly approved.

---

## 1. Goals & principles

- **Framework name:** `demo-test-automation`
- **Target application:** KanFlow (`http://192.168.1.253:8100`) — a specific, named target rather than an app-agnostic framework
- **Approach:** Gherkin/BDD — `Given/When/Then` feature files are the source of truth for coverage
- **Scope for v1:** UI-only; API testing, accessibility testing, and visual regression are explicitly deferred (see Section 10)
- **Non-negotiable principles:**
  - Strong, tool-enforced coding style (not review discipline)
  - No magic strings/selectors inline — enforced via the Page Object Model
  - No secrets ever committed to git

---

## 2. Assumptions

| #   | Topic                     | Assumption                                                                                                                                                                                                 |
| --- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Environment scope         | Only a `dev` environment exists today; folder structure is not being pre-shaped for multiple environments since none are needed yet — trivial to add a `config/environments/` layout later if that changes |
| 2   | Merge strategy            | Interpreted "use the default" as **squash-merge** — flag if you meant something else                                                                                                                       |
| 3   | Version pinning           | No org-mandated versions; framework will use current stable majors (Node 20 LTS, latest Playwright/Cucumber/TypeScript) at scaffold time                                                                   |
| 4   | Remote repo               | `https://github.com/devonps/ai-testing-demo` already exists; framework will be scaffolded into it rather than a new repo being created                                                                     |
| 5   | Proof-of-pipeline example | A single example feature file against a stable public page will be added first, to prove the pipeline end-to-end before writing real KanFlow tests                                                         |

---

## 3. Tech stack & runtime

- **Language/runtime:** TypeScript + Node.js 20 LTS
- **Test runner / BDD:** Cucumber
- **Browser automation:** Playwright
- **Browser scope (v1):** Chromium only, headless by default, configurable later via config file
- **Package manager:** npm
- **Execution model:** direct execution (`ts-node`-style, no separate compile step); `tsc --noEmit` still runs in CI as a type-check gate
- **Test reporting (v1):** built-in console output + JSON formatter; HTML/Allure dashboards deferred

---

## 4. Git & repo strategy

- **Host:** GitHub — `https://github.com/devonps/ai-testing-demo` (existing remote)
- **Branch protection:** `main` is protected — PRs required, must pass CI before merge
- **Branch naming:** `feature/<desc>`, `fix/<desc>`, `chore/<desc>`
- **Commit convention:** [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`...)
- **Merge strategy:** squash-merge

---

## 5. Folder structure

```
demo-test-automation/
├── config/           # environment + run config
├── features/         # Gherkin .feature files
├── src/
│   ├── pages/         # Page Object Model classes (selectors live here only)
│   ├── support/        # Cucumber World, hooks, step definitions
│   └── utils/          # shared helpers
```

- **Page Object Model:** yes — step definitions call page classes, page classes wrap Playwright calls. Chosen to satisfy the "no magic strings" principle from Section 1.

---

## 6. Key libraries & versions

- Current stable majors at scaffold time (no pre-mandated versions): TypeScript, Playwright, Cucumber
- **Pre-commit enforcement:** Husky + lint-staged for fast local feedback, with CI as the non-bypassable backstop

---

## 7. Configuration & secrets

- **Environments:** `dev` only for now (see Assumption #1)
- **Non-secret config:** `baseUrl` (KanFlow target URL)
- **Secrets:** none required yet — when they are needed, they'll be read from environment variables via a git-ignored `.env` locally, and from GitHub Actions secrets in CI. Never committed.
- **Environment selection:** `TEST_ENV` variable, defaulting to `dev`

---

## 8. Coding standards enforcement

- **Linter/formatter:** ESLint flat config (`eslint.config.js`, ESLint 9+) with `typescript-eslint` recommended rules, plus Prettier and `eslint-config-prettier` to prevent rule conflicts
- **Enforcement layers:** both — pre-commit hook (Husky + lint-staged) for fast local feedback, and CI as the non-bypassable backstop for lint, format, and type-check

---

## 9. BDD approach

- **Feature file organization:** one file per feature area, refined once real KanFlow coverage exists
- **Shared context:** a Cucumber `World` holding the browser session and loaded config, shared per scenario for test isolation and config access
- **Proof-of-pipeline:** an example feature file against a stable public page will be added first, to prove the framework works end-to-end before writing real KanFlow-specific tests

---

## 10. CI pipeline

- **Platform:** GitHub Actions
- **Trigger:** push/PR only — no scheduled/nightly runs for v1
- **Pipeline steps (confirmed):**
  1. Checkout, install Node, install dependencies (npm)
  2. Lint (no autofix)
  3. Format check
  4. Type-check (`tsc --noEmit`)
  5. Install Playwright browser binaries
  6. Run the test suite headless (Chromium)
  7. Upload the test report as a build artifact

---

## 11. Out of scope for v1 (explicitly deferred)

- Cross-browser matrix / parallel execution
- Visual regression testing
- Rich HTML/Allure reporting or dashboards
- Docker/containerized test execution
- API testing layer
- Accessibility testing
- Test data management/seeding strategy
- Scheduled/nightly runs, Slack/email notifications
- Multiple target applications or app-specific page objects

---

## Next step

Review this plan — amend, reorder, or expand any section as needed. Once you approve it, scaffolding (repo init/clone, folder structure, dependencies, CI config) begins.
