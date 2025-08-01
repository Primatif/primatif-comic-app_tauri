---
name: "Error Handling Implementation Strategy"
purpose: "Detailed implementation strategy for environment-aware error handling."
tags: ["errors", "implementation", "backend", "frontend"]
---

# Implementation Strategy for Environment-Aware Error Handling

This section details how environment-aware error handling is implemented across the backend and frontend.

## Backend (Rust/Tauri)

-   **Error Serialization**: When an error propagates up to a Tauri command handler, the serialization logic inspects the current environment configuration (`APP_ENV` and `DEBUG_MODE`).
    -   **Production Mode (Secure)**: If `APP_ENV` is `production` AND `DEBUG_MODE` is `false`:
        -   The full, detailed error (including chain and stack trace) is logged internally to the backend console or a local log file. This ensures that developers can access comprehensive error information for debugging without exposing it externally.
        -   A unique error ID (e.g., a UUID) is generated for the specific error instance.
        -   A generic, user-friendly JSON response is returned to the frontend. This response typically includes: `{ "error": "An unexpected error occurred.", "code": "UNEXPECTED_ERROR", "errorId": "<uuid>" }`. This prevents sensitive information from reaching the client.
    -   **Development/Debug Mode (Verbose)**: If `APP_ENV` is `development` OR `DEBUG_MODE` is `true`:
        -   A detailed JSON response is returned to the frontend, containing the full error message, error type, and potentially the error chain. This provides immediate and comprehensive feedback to developers during the development and debugging phases.

## Frontend (SolidJS/TypeScript)

-   **Error Handling Service**: The frontend incorporates a dedicated error handling service or store responsible for processing errors received from the backend.
-   **Display Logic**: UI components, such as toast notifications or error boundaries, adapt their display based on the content of the error payload received from the backend.
    -   **Generic Payload (Production)**: If the error payload is generic (indicating production mode), the frontend displays a user-friendly message along with the `errorId`. This allows users to report issues effectively without being exposed to technical jargon.
    -   **Detailed Payload (Development/Debug)**: If the error payload is detailed (indicating development or debug mode), the frontend displays the full error details, assisting developers in diagnosing and resolving issues directly within the browser's developer tools.
