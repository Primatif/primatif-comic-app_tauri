---
name: "Commit Message Style Guide"
purpose: "Specifies the format and style for writing clear and conventional commit messages."
modification_date: "2025-07-21"
tags: ["git", "commits", "style-guide"]
---

# Commit Message Style Guide

To maintain a clear and scannable Git history, this project adheres to the **Conventional Commits** specification. This convention aligns with `semantic-release` and other automated tools.

## Format

Each commit message consists of a **header**, a **body**, and a **footer**.

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 1. Type

The type must be one of the following:

- **feat**: A new feature for the user.
- **fix**: A bug fix for the user.
- **chore**: Routine tasks, maintenance, or changes to the build process. No production code changes.
- **docs**: Documentation only changes.
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
- **refactor**: A code change that neither fixes a bug nor adds a feature.
- **perf**: A code change that improves performance.
- **test**: Adding missing tests or correcting existing tests.
- **ci**: Changes to our CI configuration files and scripts.
- **revert**: Reverts a previous commit.

### 2. Scope (Optional)

The scope provides additional contextual information. It's a noun describing the section of the codebase the commit changes.

- Examples: `feat(api)`, `fix(panels)`, `refactor(state-management)`, `chore(deps)`.

### 3. Description

A short, imperative-tense description of the change.

- Use the imperative: "add" not "added", "change" not "changed".
- Don't capitalize the first letter.
- No dot (.) at the end.

### Example

```
feat(auth): add password reset functionality

Implements the full password reset flow, including token generation,
email sending, and the password update form.

Closes #123
```
