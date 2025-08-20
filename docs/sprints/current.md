---
title: "Current Sprint: CI/CD Pipeline and Release Automation"
created_date: 2025-08-19
---

## Current Sprint: CI/CD Pipeline and Release Automation

**Sprint Goal:** To automate the process of testing, building, and releasing the application, ensuring that every change is validated and that releases are consistent and professional.

---

## Tasks

### CI/CD Pipeline Automation - `a1b2c3d4-e5f6-7890-1234-567890abcdef`

- **Description**: Automate the process of testing, building, and releasing the application. This includes configuring workflows for both `dev` and `main` branches.
  - **`dev-branch.yml` Workflow**: Configure a workflow that runs on pushes to `dev` and can be manually dispatched for feature branches. It will run linting, formatting, and build checks. Add caching for `node_modules` and `cargo` directories.
  - **`main-branch.yml` Workflow**: Configure a workflow that runs only on pushes to `main`. It will use the `tauri-apps/tauri-action` with a build matrix for `macos-latest` and `ubuntu-latest`. The action will build the application, create a GitHub Release, and upload the signed application bundles.
- **Acceptance Criteria**:
  - A workflow file named `dev-branch.yml` exists in `.github/workflows/`.
  - The `dev-branch.yml` workflow is triggered on pushes to the `dev` branch and can be manually dispatched.
  - The `dev-branch.yml` workflow includes steps for linting, formatting, and building the application.
  - The `dev-branch.yml` workflow utilizes caching for `node_modules` and `cargo` directories.
  - A workflow file named `main-branch.yml` exists in `.github/workflows/`.
  - The `main-branch.yml` workflow is triggered only on pushes to the `main` branch.
  - The `main-branch.yml` workflow uses the `tauri-apps/tauri-action`.
  - The `main-branch.yml` workflow builds the application for `macos-latest` and `ubuntu-latest`.
  - The `main-branch.yml` workflow creates a GitHub Release.
  - The `main-branch.yml` workflow uploads the signed application bundles to the GitHub Release.
- **Links**:
- **Notes**: This fully automates the release process. It ensures that every release is built in a clean, consistent environment for multiple platforms and that the resulting application bundles are professionally signed and easily accessible to users.
