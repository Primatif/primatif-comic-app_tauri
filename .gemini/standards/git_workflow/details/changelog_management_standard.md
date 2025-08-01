---
name: "Changelog Management Standard"
purpose: "Detailed standard for managing the project changelog."
tags: ["changelog", "git", "standards"]
---

# Changelog Management Standard

This document outlines conventions for `docs/update-logs/changelog.txt`, ensuring a clear, consistent history.

## File Location

`docs/update-logs/changelog.txt`

## Ordering

Entries **must** be in **descending chronological order** (most recent at top).

## Entry Format

`YYYY-MM-DD HH:MM | Category | Description`

-   **`YYYY-MM-DD HH:MM`**: Date and time (24-hour) of completion/entry.
-   **`Category`**: High-level classification (e.g., `Backend`, `Frontend`, `Bug Fix`).
-   **`Description`**: Brief, clear summary. Use imperative mood. Focus on immediate impact.

## Example Entry

```
2025-07-29 10:30 | Feature | Implemented user authentication module.
2025-07-28 15:00 | Bug Fix | Resolved issue with data persistence on application shutdown.
```
