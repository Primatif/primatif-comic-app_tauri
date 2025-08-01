---
name: "Environment-Aware Error Handling Standard"
purpose: "Standards for environment-aware error handling and debug modes."
tags: ["errors", "logging", "environment", "debug"]
---

# Environment-Aware Error Handling

This standard defines how the application handles errors, providing detailed feedback for developers and clean messages for users.

## 1. Core Principles

- **Summary**: Defines the fundamental rules for error handling, focusing on security, developer clarity, and user experience.
- **For detailed explanation**: Refer to `/.gemini/standards/error_handling/details/core_principles.md`.

## 2. Environment Configuration

- **Summary**: Describes the environment variables (`APP_ENV`, `DEBUG_MODE`) that control error reporting behavior.
- **For detailed explanation**: Refer to `/.gemini/standards/error_handling/details/environment_configuration.md`.

## 3. Implementation Strategy

- **Summary**: Outlines how environment-aware error handling is implemented in both the backend (Rust/Tauri) and frontend (SolidJS/TypeScript).
- **For detailed explanation**: Refer to `/.gemini/standards/error_handling/details/implementation_strategy.md`.

## Example Flow

- **Summary**: Illustrates a typical error handling flow from a backend error to its presentation on the frontend.
- **For detailed explanation**: Refer to `/.gemini/standards/error_handling/details/example_flow.md`.
