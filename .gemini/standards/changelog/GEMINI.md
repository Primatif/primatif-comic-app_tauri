---
name: "Changelog Management Standard"
purpose: "Defines the standard format and ordering for the project's changelog file."
modification_date: "2025-07-29"
tags: ["changelog", "documentation", "standards"]
---

# Changelog Management Standard

This document outlines the conventions for maintaining the project's changelog, located at `docs/update-logs/changelog.txt`. Adhering to this standard ensures a clear, consistent, and easily digestible history of project updates.

## 1. File Location

The primary changelog file is located at: `docs/update-logs/changelog.txt`

## 2. Ordering

All entries in the `changelog.txt` file **must** be listed in **descending chronological order**, with the most recent update at the top of the file.

## 3. Entry Format

Each changelog entry **must** follow the exact format below:

`YYYY-MM-DD HH:MM | Category | Description`

-   **`YYYY-MM-DD HH:MM`**: The date and time (24-hour format) when the work was completed or the entry was added. This should reflect the actual time of the update.
-   **`Category`**: A concise, high-level classification of the change. This helps in quickly understanding the nature of the update.
    -   Examples: `Backend`, `Frontend`, `CI/CD`, `Documentation`, `Tooling`, `Refactor`, `Bug Fix`, `Feature`.
-   **`Description`**: A brief, clear, and concise summary of the changes.
    -   Use imperative mood (e.g., "Add feature X", "Fix bug Y").
    -   Avoid excessive detail; focus on what was done and its immediate impact.
    -   If a change spans multiple categories, choose the most dominant one or combine them if necessary (e.g., `Backend & Feature`).

## 4. Example Entry

```
2025-07-29 10:30 | Feature | Implemented user authentication module.
2025-07-28 15:00 | Bug Fix | Resolved issue with data persistence on application shutdown.
```
