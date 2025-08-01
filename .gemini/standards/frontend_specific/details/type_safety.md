---
name: "Frontend Type Safety (TypeScript)"
purpose: "Detailed standards for TypeScript usage in the frontend."
tags: ["frontend", "typescript", "type-safety"]
---

# Type Safety (TypeScript)

Leveraging TypeScript effectively is crucial for building robust and maintainable frontend applications. These standards ensure strong type safety throughout the codebase.

## Focused Interfaces

-   **Single Purpose**: Define single-purpose interfaces for specific data structures, such as component props, API responses, or data models. This improves clarity and makes interfaces easier to understand and reuse.

## Composition

-   **Building Complex Types**: Use TypeScript's type composition features (`&` for intersection types and `|` for union types) to build complex types from simpler ones. This promotes reusability and reduces redundancy in type definitions.

## TSDoc

-   **Documentation**: All exported components, interfaces, and types **must** be documented using TSDoc comments (`/** ... */`). TSDoc comments are standard for TypeScript and are used by IDEs for intelligent code completion and by tools like TypeDoc for generating API documentation.
-   **Tags**: Utilize TSDoc tags like `@param`, `@returns`, `@throws`, and `@remarks` to provide detailed, structured information about the code.
