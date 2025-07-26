---
name: "Backend Development Standards"
purpose: "Contains standards for backend development, including API design and data modeling."
modification_date: "2025-07-21"
tags: ["backend", "rust", "tauri", "database"]
---

# Backend Development Standards

These standards build upon the general principles defined in `/.gemini/standards/GEMINI.md` and provide specific conventions for the Rust backend using Tauri.

## 1. Layered Architecture

The backend follows a clear layered architecture to separate concerns.

- **Tauri Commands (`src/commands/`)**: The entry point for frontend-to-backend communication. These functions handle request/response serialization and delegate business logic to the service layer. They should contain minimal logic.
- **Service Layer (`src/services/`)**: Contains the core business logic of the application. Services orchestrate data access and operations by calling repositories.
- **Repository Layer (`src/database/` or `src/repositories/`)**: Responsible for all database interactions. The repository pattern abstracts the data source, providing a clean API for data access (e.g., `create_layout`, `find_layout_by_id`).

## 2. Error Handling

- **Custom Error Types**: Use a custom, comprehensive error enum (e.g., `AppError`) with `thiserror` to represent all possible application errors (Database, Validation, NotFound, etc.).
- **Result Type Alias**: Define a standard `Result<T>` type alias (e.g., `pub type Result<T> = std::result::Result<T, AppError>;`).
- **Error Propagation**: Use the `?` operator for concise and clear error propagation up to the Tauri command handler, which will serialize the error to the frontend.

## 3. Database Management

- **Connection Management**: Use a managed connection pool (like `r2d2` or Tauri's managed state) to handle database connections efficiently.
- **Migrations**: Implement a migration system to manage database schema changes versionally. Migrations should be embedded in the application and run on startup.
- **Transactions**: Use explicit database transactions for operations that involve multiple steps to ensure data consistency. Wrap transactional logic in dedicated functions or closures.

## 4. Testing

- **Unit Tests**: Each module should have unit tests for its logic, especially for services.
- **Integration Tests**: Write integration tests that cover the interaction between services and the database. Use an in-memory SQLite database or a temporary test database to isolate tests.
