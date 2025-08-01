---
name: "CI/CD Pipeline Details"
purpose: "Detailed explanation of the CI/CD pipeline structure and workflows."
tags: ["ci-cd", "github-actions", "workflows"]
---

# CI/CD Pipeline

The Continuous Integration/Continuous Deployment (CI/CD) pipeline is designed to be modular and efficient, with workflows defined in the `.github/workflows/` directory.

## Workflows

-   **Feature Branch Workflow (`feature-branch.yml`)**:
    -   **Trigger**: Runs on pushes to and Pull Requests targeting `feature/*` branches.
    -   **Purpose**: Provides fast feedback to developers. It includes essential checks such as linters, formatters, unit tests, and security scans.
    -   **Target Duration**: Aims to complete within 5 minutes to ensure rapid iteration.

-   **Dev Branch Workflow (`dev-branch.yml`)**:
    -   **Trigger**: Runs on pushes to and Pull Requests targeting the `dev` branch.
    -   **Purpose**: Integrates and validates changes from multiple feature branches. This workflow runs more comprehensive tests, including integration tests across different platforms, build validation, and reports on code quality metrics (e.g., code coverage).
    -   **Target Duration**: Aims to complete within 15 minutes.

-   **Main Branch Workflow (`main-branch.yml`)**:
    -   **Trigger**: Runs on merges to the `main` branch.
    -   **Purpose**: Handles production releases. This workflow performs final validations, creates signed builds for all target platforms, generates changelogs, and automates the GitHub Release process.
    -   **Target Duration**: Aims to complete within 30 minutes.

## Reusable Components

To ensure consistency and maintainability across workflows, the CI/CD pipeline leverages reusable components:

-   **Shared Workflows**: Common steps and jobs are defined in shared workflow files (e.g., `shared/*.yml`).
-   **Custom GitHub Actions**: Project-specific or complex actions are encapsulated in custom GitHub Actions (`actions/*`).

This modular approach, as outlined in the project scope, reduces duplication and simplifies updates to the CI/CD process.
