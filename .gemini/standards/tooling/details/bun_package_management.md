---
name: "Bun Package Management"
purpose: "Details on using Bun for package management."
tags: ["tooling", "bun", "package-management"]
---

# Package Management with Bun

All frontend dependencies for this project **must** be managed using Bun. This ensures consistency and leverages Bun's performance benefits.

## Commands

-   **Install Dependencies**: `bun install`
    -   This command reads the `package.json` and `bun.lockb` files to install all project dependencies.
-   **Add a Package**: `bun add <package-name>`
    -   Adds a new package to the `dependencies` section of `package.json` and installs it.
-   **Add a Development Package**: `bun add -d <package-name>`
    -   Adds a new package to the `devDependencies` section of `package.json` and installs it.
-   **Remove a Package**: `bun remove <package-name>`
    -   Removes a package from `package.json` and uninstalls it.

## `bun.lockb`

-   The `bun.lockb` file is the single source of truth for exact dependency versions used in the project. It **must** be committed to version control to ensure reproducible builds across all environments (development, CI/CD, production).
