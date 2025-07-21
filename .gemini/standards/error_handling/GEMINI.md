---
name: "Environment-Aware Error Handling Standard"
purpose: "Defines standards for handling errors differently across various environments (e.g., development, production) and debug modes."
modification_date: "2025-07-21"
tags: ["errors", "logging", "environment", "debug"]
---

# Environment-Aware Error Handling

This standard governs how the application handles and presents errors, ensuring that developers receive detailed feedback while users see clean, safe messages.

## 1. Core Principles

-   **Never Leak Sensitive Information**: Production error messages shown to the user or logged in public-facing services must never contain sensitive information, such as stack traces, database queries, or internal variable states.
-   **Developer Clarity**: In a development or debug environment, errors must be as descriptive as possible to facilitate rapid debugging.
-   **User Experience**: In a production environment, users should be presented with a clear, non-technical message and, where appropriate, a unique error ID that they can report.

## 2. Environment Configuration

The application's behavior will be controlled by environment variables, typically loaded from a `.env` file.

-   `APP_ENV`: Defines the current environment. Must be one of `development`, `test`, or `production`.
-   `DEBUG_MODE`: A boolean (`true` or `false`) that can be used to enable verbose error output independently of the `APP_ENV`.

## 3. Implementation Strategy

### Backend (Rust/Tauri)

-   **Configuration Loading**: The `Config` struct should load `APP_ENV` and `DEBUG_MODE` on startup.
-   **Error Serialization**: When an error is propagated to a Tauri command handler, the serialization logic must inspect the environment.
    -   **If `APP_ENV` is `production` AND `DEBUG_MODE` is `false`**:
        -   Log the full, detailed error (including the original error chain and stack trace, if available) to the backend console or a local log file.
        -   Generate a unique error ID (e.g., a UUID).
        -   Return a generic, user-friendly JSON payload to the frontend, e.g., `{ "error": "An unexpected error occurred.", "code": "UNEXPECTED_ERROR", "errorId": "<uuid>" }`.
    -   **If `APP_ENV` is `development` OR `DEBUG_MODE` is `true`**:
        -   Return a detailed JSON payload containing the full error message, error type, and potentially the error chain.

### Frontend (SolidJS/TypeScript)

-   **Error Handling Service**: An error handling service or store should be responsible for processing errors received from the backend.
-   **Display Logic**: The UI component responsible for displaying errors (e.g., a toast notification or an error boundary fallback) must adapt its display based on the error content.
    -   **If the error payload is generic (production mode)**: Display the user-friendly message and the `errorId`.
    -   **If the error payload is detailed (development/debug mode)**: Display the full error details to the developer.

## Example Flow

1.  A database error occurs in a Rust service.
2.  The error is propagated up to the Tauri command handler as an `AppError::Database` variant.
3.  The command handler checks the `Config`.
4.  **Production**: It logs the detailed `AppError` internally, generates a UUID, and returns a generic JSON object with the UUID to the frontend.
5.  **Development**: It serializes the full `AppError` variant and its message into a detailed JSON object and returns it to the frontend.
6.  The frontend error handler receives the JSON object and displays the appropriate level of detail.
