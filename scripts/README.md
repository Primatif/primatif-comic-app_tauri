# Developer Scripts and Utilities

This directory contains small developer utilities that support the workflow (task management, maintenance, etc.). Scripts are written as ES modules and organized by feature.

## Running scripts

- Using npm: `npm run <script>`
- Using bun: `bun run <script>`

Primary entries are exposed via `package.json` scripts. For example:

```json
{
  "scripts": {
    "task:add": "node scripts/add-task/index.js"
  }
}
```

## Structure

```txt
scripts/
  add-task/
    core/           # Reusable units for the add-task CLI
    cli.js          # Orchestrator; exports run(argv)
    index.js        # Barrel; CLI entry (can be called via node)
    task-targets.json # Aliases -> target markdown files (primary location)
```

## Adding a new script

1. Create a new folder under `scripts/<your-script>/` with its own `index.js` and optional `core/` modules.
2. Expose a `run(argv)` from your script's CLI or index, and make the index executable (with a shebang if desired).
3. Add a script entry in the root `package.json` (e.g., `"your-script": "node scripts/your-script/index.js"`).
4. Document usage in a `README.md` within the script folder.

## Configuration

The add-task config lives at `scripts/add-task/task-targets.json`.

For backward compatibility, the CLI will also read `scripts/task-targets.json` if the file under `scripts/add-task/` is not present.
