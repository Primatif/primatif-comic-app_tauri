---
name: "Environment-Aware Error Handling Standard"
purpose: "Standards for environment-aware error handling and debug modes."
tags: ["errors", "logging", "environment", "debug"]
---

# Environment-Aware Error Handling

This standard defines how the application handles errors, providing detailed feedback for developers and clean messages for users.

## 1. Core Principles

- **Never Leak Sensitive Information**: Production errors (user-facing or logged publicly) must never leak sensitive info (stack traces, queries, internal states).
- **Developer Clarity**: In dev/debug, errors must be descriptive for rapid debugging.
- **User Experience**: In production, users get clear, non-technical messages with a reportable error ID.

## 2. Environment Configuration

App behavior is controlled by environment variables, typically from `.env`.

- `APP_ENV`: Defines the current environment. Must be one of `development`, `test`, or `production`.
- `DEBUG_MODE`: A boolean (`true` or `false`) that enables verbose error output independently of `APP_ENV`.

## 3. Implementation Strategy

### Backend (Rust/Tauri)

- **Error Serialization**: When an error reaches a Tauri command handler, serialization logic inspects the environment.
  - **If `APP_ENV` is `production` AND `DEBUG_MODE` is `false`**:
    - Log full, detailed error (including chain/stack trace) to backend console or local log.
    - Generate unique error ID (e.g., UUID).
    - Return generic, user-friendly JSON to frontend: `{ "error": "An unexpected error occurred.", "code": "UNEXPECTED_ERROR", "errorId": "<uuid>" }`.
  - **If `APP_ENV` is `development` OR `DEBUG_MODE` is `true`**:
    - Return detailed JSON with full error message, type, and potential chain.

### Frontend (SolidJS/TypeScript)

- **Error Handling Service**: An error handling service/store processes backend errors.
- **Display Logic**: UI components (e.g., toast, error boundary) adapt display based on error content.
  - **If the error payload is generic (production mode)**: Display user-friendly message and `errorId`.
  - **If the error payload is detailed (development/debug mode)**: Display full error details to developer.

## Example Flow

1. Database error in Rust service.
2. Error propagates to Tauri command handler as `AppError::Database`.
3. Command handler checks `Config`.
4. **Production**: Logs `AppError` internally, generates UUID, returns generic JSON with UUID to frontend.
5. **Development**: Serializes full `AppError` and message into detailed JSON, returns to frontend.
6. Frontend error handler displays appropriate detail based on JSON.
