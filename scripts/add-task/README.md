# add-task CLI

Appends a new task block to configured markdown files (e.g., `docs/sprints/current.md`, `docs/sprints/backlog.md`).

## Usage

```bash
# Using npm
npm run task:add -- \
  --title "My Task" \
  --target current \
  --description "One-line description" \
  --ac "First criterion" --ac "Second criterion" \
  --link "https://example.com/spec" \
  --notes "Optional notes"

# Using bun
bun run task:add -- --title "My Task" --target backlog --acceptance "A; B; C" --links "https://doc1, https://doc2"

# Dry run (no write, prints generated markdown)
npm run task:add -- --title "Preview Task" --dry
```

### Convenience aliases

```bash
# Target the current sprint file by default
npm run task:add:current -- --title "My Task"

# Target the backlog file by default
npm run task:add:backlog -- --title "My Task"
```

- `--target` corresponds to an alias in `scripts/add-task/task-targets.json` (defaults to `current`). If not found there, the CLI will fall back to `scripts/task-targets.json`.
- Acceptance criteria can be passed multiple times (`--ac`) or as a semicolon-separated list (`--acceptance "A; B; C"`).
- Links can be passed multiple times (`--link`) or as a comma-separated list (`--links "u1, u2"`).
- `--dry` performs a dry run and prints the task markdown without writing to the file.

## File structure

```txt
scripts/
  add-task/
    core/
      args.js        # Parse CLI args -> options
      config.js      # Load targets config
      file.js        # Append to file
      target.js      # Resolve alias -> validated path
      task.js        # Task domain model + markdown render
      uuid.js        # UUID v4 helper
    cli.js           # Orchestrator; exports run(argv)
    index.js         # Barrel; CLI entry
  task-targets.json  # Configurable targets
```
