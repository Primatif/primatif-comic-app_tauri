---
name: "Branching Strategy Details"
purpose: "Detailed explanation of the Git branching strategy."
tags: ["git", "branching", "strategy"]
---

# Branching Strategy

This section details the Git branching strategy employed in the project, designed to ensure a stable release process and efficient feature development.

## Branch Structure

- **`main` branch**: This branch represents the production-ready state of the application. It is always deployable and stable. Merges into `main` automatically trigger automated releases. This branch is protected by mandatory Pull Request (PR) reviews and comprehensive CI/CD checks.

- **`dev` branch**: This serves as the integration branch for ongoing development. All feature branches are branched from `dev` and merged back into it. Changes in `dev` must pass all automated tests before being considered stable enough for promotion to `main`.

- **`feature/*` branches**: These branches are created for individual features or bug fixes. They are branched from `dev` and, once completed and reviewed, are merged back into `dev` via a Pull Request. After a successful merge, the feature branch is deleted.
  - **Naming Convention**: Feature branches should follow the naming convention: `feature/short-description-of-feature` (e.g., `feature/user-authentication`, `feature/panel-resizing`).

## Workflow Process

1. **Feature Development**: When starting a new feature or bug fix, create a new `feature/*` branch from the latest `dev` branch.

2. **Integration**: Once the feature is complete and tested locally, create a Pull Request from your `feature/*` branch to the `dev` branch. This PR will undergo review and automated CI checks.

3. **Release Preparation**: When the `dev` branch reaches a stable state and is ready for a new release, a Pull Request is created from `dev` to `main`.

4. **Release**: Merging changes into the `main` branch automatically triggers the automated release process, which includes building, testing, and deploying the application.
