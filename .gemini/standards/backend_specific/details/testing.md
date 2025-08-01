---
name: "Backend Testing Standards Details"
purpose: "Detailed explanation of backend testing standards."
tags: ["backend", "testing", "unit-tests", "integration-tests"]
---

# Testing

Comprehensive testing is essential for ensuring the reliability and correctness of the backend.

## Unit Tests

-   **Scope**: Unit tests should focus on individual functions, methods, or modules in isolation.
-   **Purpose**: They verify the correctness of the smallest testable parts of the codebase, especially the business logic within the service layer.
-   **Isolation**: Unit tests should not interact with external dependencies like databases or network services. Mocks, stubs, or fakes should be used to simulate these dependencies.

## Integration Tests

-   **Scope**: Integration tests verify the interactions between different components or layers of the application.
-   **Purpose**: For the backend, this typically involves testing the interaction between the service layer and the database (via the repository layer).
-   **Isolation**: To ensure test reliability and prevent side effects, integration tests should use isolated environments. This can be achieved by:
    -   **In-memory SQLite**: For tests that require a database, using an in-memory SQLite database provides a fast and isolated environment.
    -   **Temporary Databases**: Alternatively, a temporary, dedicated database instance can be spun up and torn down for each test run.
