---
name: "Branching and CI/CD Strategy"
purpose: "Defines Git branching, CI/CD, and deployment standards."
tags: ["git", "branching", "ci-cd", "deployment"]
---

# Branching and CI/CD Strategy

Based on `docs/PROJECT_SCOPE.md`.

## 1. Branching Strategy

### Branch Structure

- **`main`**: Production-ready, always deployable. Merges trigger automated releases, protected by PR reviews and CI/CD checks.
- **`dev`**: Integration branch for ongoing development. Target for feature branches, must pass all automated tests. Only stable changes promote to `main`.
- **`feature/*`**: For individual features. Branch from `dev`, merge back via PR. Delete after merge.
  - **Naming**: `feature/short-description-of-feature`

### Workflow Process

1.  **Feature**: Create `feature/*` branch from `dev`.
2.  **Integrate**: Merge feature branch to `dev` via PR.
3.  **Release Prep**: When `dev` is stable, create PR from `dev` to `main`.
4.  **Release**: Merging to `main` triggers automated release.

## 2. CI/CD Pipeline

CI/CD is modular, with workflows in `.github/workflows/`.

### Workflows

- **Feature Branch (`feature-branch.yml`)**: Validates feature branches on push/PR. Fast feedback: linters, formatters, unit tests, security scans. Target < 5 min.
- **Dev Branch (`dev-branch.yml`)**: Integrates/validates `dev` changes. Runs comprehensive tests (including integration) across platforms, build validation, and reports quality (e.g., code coverage). Target < 15 min.
- **Main Branch (`main-branch.yml`)**: Handles production releases on `main` merge. Runs final validations, creates signed builds for all platforms, generates changelogs, and automates GitHub Release. Target < 30 min.

### Reusable Components

Workflows use reusable components (`shared/*.yml`) and custom GitHub Actions (`actions/*`) for consistency and maintainability (as per project scope).
