---
name: "Backend Layered Architecture Details"
purpose: "Detailed explanation of the backend's layered architecture."
tags: ["backend", "architecture", "layers"]
---

# Layered Architecture

The backend uses a layered architecture for separation of concerns, promoting modularity and maintainability.

## Tauri Commands (`src/commands/`)

-   **Purpose**: These serve as the primary entry point for frontend-to-backend communication.
-   **Responsibility**: They are responsible for handling serialization and deserialization of data between the frontend and backend. Crucially, they should delegate core business logic to the service layer.
-   **Principle**: Keep logic within Tauri commands minimal, focusing primarily on input validation and orchestrating calls to the appropriate service functions.

## Service Layer (`src/services/`)

-   **Purpose**: This layer contains the core business logic of the application.
-   **Responsibility**: Services orchestrate data access by interacting with the repository layer. They encapsulate the application's rules and operations.
-   **Principle**: Services should be agnostic of the data source implementation details, relying on traits/interfaces defined in the repository layer.

## Repository Layer (`src/database/` or `src/repositories/`)

-   **Purpose**: This layer handles all interactions with the database or any other persistent storage.
-   **Responsibility**: It abstracts the underlying data source, providing a clean and consistent API for the service layer (e.g., `create_layout`, `get_user_by_id`).
-   **Principle**: Repositories should focus solely on data persistence and retrieval, without containing business logic.
