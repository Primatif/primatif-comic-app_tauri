# CI/CD Workflows Guide

This guide explains the composable GitHub Workflows used by the Primatif Comics app and how they relate to each other.

## Diagram

See `docs/guides/images/github-workflow-diagram.png` for a visual overview.

## Components

- **Reusable QA Workflow**: `/.github/workflows/reusable-qa.yml`
  - Trigger: `workflow_call`
  - Steps:
    - `Setup Environment` via composite action `/.github/actions/setup-environment`
    - `bun install`
    - `bun run qa:all` (frontend tests + lint; Rust tests, clippy, fmt)
    - Generate and upload a single QA summary artifact
  - Purpose: Centralize all verification logic so `dev` and `main` stay DRY.

- **Composite Action**: `/.github/actions/setup-environment/`
  - Standardizes: checkout, Node, Bun, Rust toolchain, and caches (Cargo + Bun)
  - Used by QA and build/release jobs

- **Dev Workflow**: `/.github/workflows/dev-branch.yml`
  - Triggers: push to `dev`, manual dispatch
  - Flow: Call QA → macOS build checks → Vite build → Tauri build (dmg, debug)
  - Outputs: build artifacts for manual testing (future improvement)

- **Main Workflow**: `/.github/workflows/main-branch.yml`
  - Trigger: push to `main`
  - Flow: Call QA → macOS Release with `tauri-apps/tauri-action`
  - Tag/Release: simple `app-build-${{ github.run_number }}` (semantic versioning deferred)
  - Scope: macOS only for now (Ubuntu/Windows can be added later with a matrix)

## Out of Scope (Planned for later)

- Performance testing
- Selenium/E2E
- Deploying to a dev environment
- Full semantic versioning (see backlog item)

## Notes

- Keep QA logic in `reusable-qa.yml` only; branch workflows should remain thin.
- Prefer adding future checks as separate steps or scripts called by `qa:all` to keep the workflow clean.
