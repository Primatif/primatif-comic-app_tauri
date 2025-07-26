---
name: "Standards Index"
purpose: "Provides a table of contents for all coding, documentation, and operational standards within the project."
modification_date: "2025-07-21"
tags: ["standards", "index", "principles"]
---

# Standards Index & General Principles

This file serves as a directory to all specific standards and defines the general, cross-cutting principles that apply to all code in this project.

## 1. General Architectural Principles

These principles apply to both frontend and backend development.

- **Modularity**: Code should be organized into discrete, feature-based modules. This promotes separation of concerns and makes the codebase easier to navigate and maintain.
- **Layered Architecture**: Adhere to a layered architecture (e.g., Presentation/UI -> Service/Business Logic -> Data Access). This ensures a clean separation of concerns and a clear data flow.
- **Configuration Management**: Externalize configuration from the code. Use environment variables or configuration files with sensible defaults.

## 2. General Testing Principles

- **Test Coverage**: All new features and bug fixes must be accompanied by tests. This includes unit tests for individual components/modules and integration tests for interactions between them.
- **Test Utilities**: Create and use shared testing utilities to ensure a consistent and efficient testing environment.
- **Isolation**: Tests should be isolated from each other and from external services. Use test databases, mocking, and stubs where appropriate.

## 3. General Error Handling Principles

- **Clarity and Consistency**: Error handling should be clear, consistent, and predictable.
- **Graceful Failure**: The application should handle errors gracefully, preventing crashes and providing clear feedback to the user where appropriate.
- **Specific Errors**: Use specific, custom error types/classes rather than generic ones. This allows for more precise error handling and debugging.

## 4. Specific Standards Directory

Refer to the table below to find the relevant guidelines for a particular task. These specific standards build upon the general principles defined above.

| Topic Directory      | Description                                                                             |
| :------------------- | :-------------------------------------------------------------------------------------- |
| `architecture/`      | Defines core patterns for frontend-backend interaction, performance, and decoupling.    |
| `branching_ci_cd/`   | Defines the Git branching model, CI/CD pipeline standards, and deployment protocols.    |
| `commit_messages/`   | Specifies the format and style for writing clear and conventional commit messages.      |
| `error_handling/`    | Defines standards for handling errors differently across various environments.          |
| `frontend_specific/` | Contains standards for frontend development, including component structure and styling. |
| `backend_specific/`  | Contains standards for backend development, including API design and data modeling.     |
| `tooling/`           | Defines the standard tooling and commands for the project.                              |
| `tooling/`           | Defines the standard tooling and commands for the project.                              |
