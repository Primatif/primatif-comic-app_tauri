---
name: "Rust Doc Example"
purpose: "Example of rustdoc usage for in-code documentation."
tags: ["rust", "rustdoc", "example", "documentation"]
---

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
