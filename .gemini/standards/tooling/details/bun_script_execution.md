---
name: "Bun Script Execution"
purpose: "Details on using Bun for script execution."
tags: ["tooling", "bun", "scripts"]
---

# Script Execution with Bun

All scripts defined in `package.json` **must** be executed using Bun. This standard ensures consistency and leverages Bun's optimized script runner.

## Execution Commands

-   **Standard Execution**: `bun run <script-name>`
    -   This is the general command for executing any script defined in the `scripts` section of `package.json`.

-   **Shorthand for Common Scripts**: For commonly used scripts such as `dev`, `build`, `test`, and `start`, the `run` keyword can be omitted for brevity:
    -   `bun dev` (instead of `bun run dev`)
    -   `bun build` (instead of `bun run build`)
    -   `bun test` (instead of `bun run test`)
    -   `bun start` (instead of `bun run start`)

## Examples

| Instead of...      | Use...             |
| :----------------- | :----------------- |
| `npm install`      | `bun install`      |
| `npm run dev`      | `bun dev`          |
| `npm run build`    | `bun build`        |
| `npm test`         | `bun test`         |
| `npm run format`   | `bun run format`   |

Adhering to this standard ensures Bun's performance benefits and efficient CI/CD processes.
