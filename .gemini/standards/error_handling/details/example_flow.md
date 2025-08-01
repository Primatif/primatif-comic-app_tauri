---
name: "Error Handling Example Flow"
purpose: "Example of an error handling flow from backend to frontend."
tags: ["errors", "example", "flow"]
---

# Example Error Handling Flow

This example illustrates a typical error handling flow from a backend database error to its presentation on the frontend, demonstrating the environment-aware behavior.

1.  **Database Error in Rust Service**: An operation within a Rust service (e.g., a database query) encounters an error, resulting in an `AppError::Database` being returned.

2.  **Error Propagation to Tauri Command Handler**: This `AppError::Database` propagates up the call stack until it reaches a Tauri command handler, which is the entry point for frontend requests.

3.  **Command Handler Checks Configuration**: The Tauri command handler, before returning the error to the frontend, checks the application's environment configuration (e.g., `APP_ENV` and `DEBUG_MODE`).

4.  **Production Mode Behavior**:
    -   The `AppError` is logged internally with full details (including stack trace) to the backend's logging system.
    -   A unique UUID is generated for this specific error instance.
    -   A generic JSON response is returned to the frontend, such as: `{ "error": "An unexpected error occurred.", "code": "UNEXPECTED_ERROR", "errorId": "<generated_uuid>" }`.

5.  **Development Mode Behavior**:
    -   The full `AppError` details, including the specific error message and type, are serialized into a detailed JSON response.
    -   This detailed JSON is returned directly to the frontend.

6.  **Frontend Error Handler Displays Appropriate Detail**: The frontend's error handling mechanism (e.g., an error boundary or a global error store) receives the JSON response and displays information based on its content:
    -   If the JSON is generic (production mode), it displays a user-friendly message and the `errorId`.
    -   If the JSON is detailed (development mode), it displays the full error details, aiding the developer in debugging.
