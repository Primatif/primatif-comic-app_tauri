---
name: "Standardized In-Code Documentation"
purpose: "Defines language-idiomatic standards for in-code documentation."
tags: ["documentation", "comments", "rustdoc", "tsdoc"]
---

# Standardized In-Code Documentation

This document outlines official code documentation standards, using idiomatic, tool-supported methods for each language.

This standard complements, but doesn't replace, other high-level documentation requirements.

## 1. Document "Why," Not "What"

Code should explain *what* it does. Comments explain *why*.

- **Bad (Restates the code):** `// Increment the counter`
- **Good (Explains the purpose):** `// We increment here to account for an off-by-one error from the legacy API.`

## 2. Keep Documentation Current

All in-code documentation (rustdoc, TSDoc, etc.) **must** be updated with code changes to ensure accuracy and prevent stale information.

## 2. Language-Specific Standards

### Rust: `rustdoc`

All public Rust items (`modules`, `structs`, `enums`, `functions`, `traits`, `type aliases`) **must** use `///` or `/** ... */` doc comments. `/** ... */` is preferred for multi-line. `cargo doc` uses these for HTML documentation.

- **Summary**: Concise one-sentence summary.
- **Details**: Add more paragraphs if needed.
- **Arguments/Returns**: Use `# Arguments` and `# Returns` to explain parameters and return values.
- **Errors**: Use `# Errors` to explain `Err` conditions.
- **Internal Logic**: Use `//` for non-obvious implementation details.

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

All exported TypeScript items (`functions`, `classes`, `interfaces`, `types`) **must** use TSDoc (`/** ... */`) comments. This is standard for TypeScript, used by IDEs and TypeDoc.

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
