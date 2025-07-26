---
name: "Tooling Standards"
purpose: "Defines the standard tooling and commands for the project, including package management and script execution."
modification_date: "2025-07-26"
tags: ["tooling", "bun", "scripts", "package-management"]
---

# Tooling Standards

This document outlines the standard tools and commands to be used across the project to ensure consistency and leverage the performance benefits of our chosen toolchain.

## 1. Primary Toolkit: Bun

Bun is the official toolkit for this project. It should be used for package management, script execution, and testing to maintain a simple, fast, and consistent development environment.

## 2. Package Management

All frontend dependencies must be managed using Bun.

- **Installing dependencies:** `bun install`
- **Adding a dependency:** `bun add <package-name>`
- **Adding a development dependency:** `bun add -d <package-name>`
- **Removing a dependency:** `bun remove <package-name>`

The `bun.lockb` file is the single source of truth for dependency versions and must be committed to version control.

## 3. Script Execution

All scripts defined in `package.json` must be executed using Bun. Do not use `npm run` or `yarn`.

- **Standard syntax:** `bun run <script-name>`
- **Shorthand syntax:** For common scripts (`dev`, `build`, `test`, `start`), the `run` keyword can be omitted: `bun <script-name>`

### Examples

| Instead of...      | Use...             |
| :----------------- | :----------------- |
| `npm install`      | `bun install`      |
| `npm run dev`      | `bun dev`          |
| `npm run build`    | `bun build`        |
| `npm test`         | `bun test`         |
| `npm run format`   | `bun run format`   |

Adhering to this standard ensures that all developers benefit from Bun's performance and that our CI/CD pipelines are simple and efficient.
