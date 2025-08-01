---
name: "Git Commit Message Style Guide"
purpose: "Detailed guide for Git commit messages following Conventional Commits."
tags: ["git", "commits", "style-guide"]
---

# Git Commit Message Style Guide

This project uses **Conventional Commits** for a clear Git history, aligning with `semantic-release`.

## Format

Each commit message has a **header**, **body**, and **footer**.

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Type

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

## Scope (Optional)

Noun describing the changed codebase section.
- Examples: `feat(api)`, `fix(panels)`, `refactor(state-management)`, `chore(deps)`.

## Description

Short, imperative-tense summary of the change.
- Use "add" not "added".
- No capitalization or period at end.

## Example

```
feat(auth): add password reset functionality

Implements the full password reset flow, including token generation,
email sending, and the password update form.

Closes #123
```
