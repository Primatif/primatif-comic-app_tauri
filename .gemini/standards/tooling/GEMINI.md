---
name: "Tooling Standards"
purpose: "Defines standard tooling and commands for the project."
tags: ["tooling", "bun", "scripts", "package-management"]
---

# Tooling Standards

This document outlines standard tools and commands for project consistency and performance.

## 1. Primary Toolkit: Bun

Bun is the official toolkit for package management, script execution, and testing. Use it for a simple, fast, consistent development environment.

## 2. Package Management

Manage all frontend dependencies with Bun.

- **Install:** `bun install`
- **Add:** `bun add <package-name>`
- **Add Dev:** `bun add -d <package-name>`
- **Remove:** `bun remove <package-name>`

`bun.lockb` is the single source of truth for dependency versions and must be committed.

## 3. Script Execution

Execute all `package.json` scripts using Bun. Do not use `npm run` or `yarn`.

- **Standard:** `bun run <script-name>`
- **Shorthand:** For `dev`, `build`, `test`, `start`, omit `run`: `bun <script-name>`

### Examples

| Instead of...      | Use...             |
| :----------------- | :----------------- |
| `npm install`      | `bun install`      |
| `npm run dev`      | `bun dev`          |
| `npm run build`    | `bun build`        |
| `npm test`         | `bun test`         |
| `npm run format`   | `bun run format`   |

Adhering to this standard ensures Bun's performance benefits and efficient CI/CD.
