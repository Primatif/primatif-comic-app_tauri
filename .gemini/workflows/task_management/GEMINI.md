---
name: "Task Management Workflow"
purpose: "Guidelines for managing tasks in sprint and backlog documents."
tags: ["workflow", "tasks", "sprints", "backlog"]
---

# Task Management Workflow

To ensure consistency and proper formatting when adding new tasks to `docs/sprints/current.md` and `docs/sprints/backlog.md`, always use the `add-task` scripts defined in `package.json`.

These scripts automate the process of generating task IDs, formatting the task block, and appending it to the correct document.

## Usage:

- To add a task to the current sprint: `bun run task:add:current -- --title "Your Task Title" --description "Optional description" ...`
- To add a task to the backlog: `bun run task:add:backlog -- --title "Your Task Title" --description "Optional description" ...`
- For general usage and other options: `bun run task:add -- --help`

Refer to the `scripts/add-task/README.md` for full details on available options and usage examples.

## Script API

The `add-task` script accepts the following command-line arguments:

- `--title` (or `-t`): **Required**. The title of the task.
- `--target`: Specifies the target markdown file (e.g., `current`, `backlog`). Defaults to `current`.
- `--description` (or `-d`): An optional one-line description of the task.
- `--ac` (or `--acceptance`): Acceptance criteria for the task. Can be provided multiple times or as a semicolon-separated list for `--acceptance`.
- `--link` (or `--links`): Relevant links for the task. Can be provided multiple times or as a comma-separated list for `--links`.
- `--notes`: Optional notes for the task.
- `--dry`: Performs a dry run, printing the generated markdown without writing to the file.
- `--help` (or `-h`): Displays the usage information.
