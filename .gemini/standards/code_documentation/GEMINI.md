---
name: "Standardized In-Code Documentation"
purpose: "Defines the official, language-idiomatic standards for documenting code via comments."
modification_date: "2025-07-29"
tags: ["documentation", "comments", "rustdoc", "tsdoc"]
---

# Standardized In-Code Documentation

This document outlines the official standard for documenting code. The goal is to use the idiomatic, tool-supported documentation method for each language in the project.

This standard complements, but does not replace, the high-level documentation requirements in other parts of the project constitution.

## 1. Core Philosophy: Document the "Why," Not the "What"

Good code should be self-explanatory about *what* it is doing. Comments should focus on the *why*.

- **Bad (Restates the code):** `// Increment the counter`
- **Good (Explains the purpose):** `// We increment here to account for an off-by-one error from the legacy API.`

## 2. Documentation Maintenance: Always Keep Current

All in-code documentation (rustdoc, TSDoc, etc.) **must** be updated concurrently with any code modifications. This ensures that the documentation accurately reflects the current state and behavior of the codebase, preventing stale or misleading information.

## 2. Language-Specific Standards

### Rust: `rustdoc`

All public-facing items (`modules`, `structs`, `enums`, `functions`, `traits`, `type aliases`) **must** be documented using either `///` or `/** ... */` doc comments. The `/** ... */` block comment style is preferred for multi-line documentation to enhance readability and consistency with TSDoc/JSDoc. Both formats are directly used by the built-in `cargo doc` tool to generate browsable HTML documentation.

- **Summary**: Start with a concise one-sentence summary.
- **Details**: Add more detailed paragraphs if necessary.
- **Arguments/Returns**: Use the `# Arguments` and `# Returns` headers to explain function parameters and return values.
- **Errors**: Use the `# Errors` header to explain the conditions under which a function will return an `Err` variant.
- **Internal Logic**: Use `//` for clarifying non-obvious implementation details inside a function.

**Example:**
```rust
/**
 * A Result type alias for this module, using the application's `AppError`.
 *
 * This provides a consistent error handling mechanism throughout the module.
 */
pub type Result<T> = std::result::Result<T, AppError>;

/**
 * Manages the application's database connection and schema.
 *
 * This struct is responsible for initializing the database connection and ensuring
 * the required table schema is created on application startup.
 */
pub struct DatabaseManager { ... }

/**
 * Retrieves the most recent message from the database.
 *
 * # Arguments
 *
 * * `db` - A Tauri `State` managed `Arc<Mutex<Connection>>` to the database.
 *
 * # Returns
 *
 * An `Ok(Some(Message))` if a message is found, `Ok(None)` if the table is empty,
 * or an `Err(AppError::Database)` if a database query fails.
 */
#[tauri::command]
pub fn get_message(db: State<'_, Arc<Mutex<Connection>>>) -> Result<Option<Message>> { ... }
```

### TypeScript/JavaScript: TSDoc

All exported items (`functions`, `classes`, `interfaces`, `types`) **must** be documented using TSDoc (`/** ... */`) comments. This format is the standard for the TypeScript ecosystem and is used by IDEs for rich IntelliSense and by tools like TypeDoc to generate documentation.

- **Use TSDoc tags**: Use tags like `@param`, `@returns`, `@throws`, and `@remarks` to provide detailed, structured information.

**Example:**
```typescript
/**
 * Represents a user in the system.
 * @remarks This interface is used for both API responses and internal state.
 */
export interface User {
  id: string;
  name: string;
}

/**
 * Fetches a user from the API by their ID.
 *
 * @param userId - The unique identifier of the user to fetch.
 * @returns A promise that resolves to the User object, or null if not found.
 * @throws Will throw an error if the network request fails.
 */
export async function fetchUser(userId: string): Promise<User | null> {
  // ...
}
```
