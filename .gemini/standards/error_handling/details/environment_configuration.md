---
name: "Error Handling Environment Configuration"
purpose: "Details on environment variables for error handling."
tags: ["errors", "environment", "configuration"]
---

# Environment Configuration for Error Handling

Application behavior regarding error reporting is controlled by specific environment variables, typically loaded from a `.env` file.

-   `APP_ENV`: This variable defines the current operational environment of the application. It **must** be set to one of the following values:
    -   `development`: For local development and testing.
    -   `test`: For automated testing environments.
    -   `production`: For live deployments where sensitive information must be protected.

-   `DEBUG_MODE`: This is a boolean variable (`true` or `false`) that provides an independent control for enabling verbose error output. When `DEBUG_MODE` is `true`, detailed error information will be provided, regardless of the `APP_ENV` setting. This is particularly useful for debugging production issues without changing the `APP_ENV` to `development`.
