---
name: "Backend Development Standards"
purpose: "Standards for backend development, API design, and data modeling."
tags: ["backend", "rust", "tauri", "database"]
---

# Backend Development Standards

These standards extend `/.gemini/standards/GEMINI.md` with specific conventions for the Rust/Tauri backend.

## 1. Layered Architecture

The backend uses a layered architecture for separation of concerns.

- **Summary**: Organizes code into Tauri Commands, Service Layer, and Repository Layer for clear responsibilities.
- **For detailed explanation**: Refer to `/.gemini/standards/backend_specific/details/layered_architecture.md`.

## 2. Error Handling

- **Summary**: Defines standards for custom error types, result type aliases, and error propagation.
- **For detailed explanation**: Refer to `/.gemini/standards/backend_specific/details/error_handling.md`.

## 3. Database Management

- **Summary**: Covers connection management, migrations, and transaction handling for data consistency.
- **For detailed explanation**: Refer to `/.gemini/standards/backend_specific/details/database_management.md`.

## 4. Testing

- **Summary**: Outlines principles for unit and integration testing, including isolation strategies.
- **For detailed explanation**: Refer to `/.gemini/standards/backend_specific/details/testing.md`.
