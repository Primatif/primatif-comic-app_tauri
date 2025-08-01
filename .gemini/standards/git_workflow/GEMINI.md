---
name: "Git Workflow Standards"
purpose: "Defines standards for Git commit messages and changelog management."
tags: ["git", "commits", "changelog", "style-guide", "standards"]
---

# Git Workflow Standards

This document outlines conventions for a clear Git history, including commit message style and changelog management.

## 1. Commit Message Style Guide

This project uses **Conventional Commits** for a clear Git history, aligning with `semantic-release`.

### Format

Each commit message has a **header**, **body**, and **footer**.

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Type

Must be one of:

- **feat**: New user-facing feature.
- **fix**: User-facing bug fix.
- **chore**: Routine tasks, maintenance, build process changes (no production code).
- **docs**: Documentation-only changes.
- **style**: Code formatting (whitespace, etc.) without affecting meaning.
- **refactor**: Code change that neither fixes a bug nor adds a feature.
- **perf**: Code change improving performance.
- **test**: Add/correct tests.
- **ci**: CI configuration/script changes.
- **revert**: Reverts a previous commit.

### Scope (Optional)

Noun describing the changed codebase section.
- Examples: `feat(api)`, `fix(panels)`, `refactor(state-management)`, `chore(deps)`.

### Description

Short, imperative-tense summary of the change.
- Use "add" not "added".
- No capitalization or period at end.

### Example

```
feat(auth): add password reset functionality

Implements the full password reset flow, including token generation,
email sending, and the password update form.

Closes #123
```

## 2. Changelog Management Standard

This document outlines conventions for `docs/update-logs/changelog.txt`, ensuring a clear, consistent history.

### File Location

`docs/update-logs/changelog.txt`

### Ordering

Entries **must** be in **descending chronological order** (most recent at top).

### Entry Format

`YYYY-MM-DD HH:MM | Category | Description`

-   **`YYYY-MM-DD HH:MM`**: Date and time (24-hour) of completion/entry.
-   **`Category`**: High-level classification (e.g., `Backend`, `Frontend`, `Bug Fix`).
-   **`Description`**: Brief, clear summary. Use imperative mood. Focus on immediate impact.

### Example Entry

```
2025-07-29 10:30 | Feature | Implemented user authentication module.
2025-07-28 15:00 | Bug Fix | Resolved issue with data persistence on application shutdown.
```