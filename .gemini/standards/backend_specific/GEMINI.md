---
name: "Backend Development Standards"
purpose: "Standards for backend development, API design, and data modeling."
tags: ["backend", "rust", "tauri", "database"]
---

# Backend Development Standards

These standards extend `/.gemini/standards/GEMINI.md` with specific conventions for the Rust/Tauri backend.

## 1. Layered Architecture

The backend uses a layered architecture for separation of concerns.

- **Tauri Commands (`src/commands/`)**: Entry point for frontend-to-backend communication. Handle serialization and delegate business logic to services. Keep logic minimal.
- **Service Layer (`src/services/`)**: Contains core business logic. Services orchestrate data access via repositories.
- **Repository Layer (`src/database/` or `src/repositories/`)**: Handles all database interactions. Abstracts data source with a clean API (e.g., `create_layout`).

## 2. Error Handling

- **Custom Error Types**: Use a custom error enum (e.g., `AppError`) with `thiserror` for all application errors (Database, Validation, NotFound, etc.).
- **Result Type Alias**: Define `Result<T>` type alias (e.g., `pub type Result<T> = std::result::Result<T, AppError>;`).
- **Error Propagation**: Use `?` for concise error propagation to Tauri command handlers, which serialize errors to the frontend.

## 3. Database Management

- **Connection Management**: Use a managed connection pool (e.g., `r2d2`) for efficient database connections.
- **Migrations**: Implement a migration system for schema changes. Embed migrations in the app and run on startup.
- **Transactions**: Use explicit transactions for multi-step operations to ensure data consistency. Wrap logic in dedicated functions.

## 4. Testing

- **Unit Tests**: Unit tests for each module's logic, especially services.
- **Integration Tests**: Integration tests cover service-database interaction. Use in-memory SQLite or temporary databases for isolation.
