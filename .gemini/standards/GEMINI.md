---
name: "Standards Index"
purpose: "Provides a table of contents for all coding, documentation, and operational standards within the project."
tags: ["standards", "index", "principles"]
---

# Standards Index & General Principles

This file indexes specific standards and defines general, cross-cutting principles for all project code.

## 1. General Architectural Principles

These principles apply to both frontend and backend development.

- **Modularity**: Organize code into discrete, feature-based modules for separation of concerns and maintainability.
- **Layered Architecture**: Adhere to a layered architecture (e.g., Presentation/UI -> Service/Business Logic -> Data Access) for clear separation and data flow.
- **Configuration Management**: Externalize configuration from code using environment variables or configuration files with sensible defaults.

## 2. General Testing Principles

- **Test Coverage**: All new features and bug fixes require tests (unit and integration).
- **Test Utilities**: Use shared testing utilities for consistent, efficient testing.
- **Isolation**: Isolate tests from each other and external services using test databases, mocking, and stubs.

## 3. Specific Standards Directory

Refer to the table below for task-specific guidelines, which build upon the general principles.

| Topic Directory      | Description                                                                 |
| :------------------- | :-------------------------------------------------------------------------- |
| `architecture/`      | Defines core patterns for frontend-backend interaction, performance, and decoupling. |
| `branching_ci_cd/`   | Defines Git branching, CI/CD pipeline standards, and deployment protocols.  |
| `git_workflow/`      | Defines standards for Git commit messages and changelog management.         |
| `code_documentation/`| Defines in-code documentation standards (rustdoc, TSDoc).                   |
| `error_handling/`    | Defines environment-aware error handling standards.                         |
| `frontend_specific/` | Contains frontend development standards (component structure, styling).     |
| `backend_specific/`  | Contains backend development standards (API design, data modeling).         |
| `tooling/`           | Defines standard project tooling and commands.                              |
