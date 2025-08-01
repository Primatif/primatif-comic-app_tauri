---
name: "Error Handling Core Principles"
purpose: "Core principles guiding environment-aware error handling."
tags: ["errors", "principles"]
---

# Core Principles of Error Handling

These principles form the foundation of our error handling strategy, ensuring a balance between security, developer efficiency, and user experience.

-   **Never Leak Sensitive Information**: Production errors, whether user-facing or logged publicly, **must never** expose sensitive information such as stack traces, database queries, internal system states, or API keys. This is a critical security measure.

-   **Developer Clarity**: In development and debugging environments, errors must be highly descriptive and provide ample context for rapid identification and resolution of issues. This includes detailed messages, error types, and potentially full stack traces.

-   **User Experience**: In production environments, users should receive clear, concise, and non-technical error messages. These messages should ideally include a unique, reportable error ID that can be used by support teams to trace the specific incident in logs.
