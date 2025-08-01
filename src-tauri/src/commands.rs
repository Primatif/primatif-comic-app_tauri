use crate::errors::Result;
use crate::models::Message;
use rusqlite::{params, Connection};
use std::sync::{Arc, Mutex};
use tauri::State;

/**
 * Retrieves the most recent message from the database.
 *
 * This command is exposed to the frontend via Tauri's IPC mechanism.
 *
 * # Arguments
 *
 * * `db` - A Tauri `State` managed `Arc<Mutex<Connection>>` to the database connection.
 *
 * # Returns
 *
 * An `Ok(Some(Message))` if a message is found, `Ok(None)` if the messages table is empty,
 * or an `Err(AppError::Database)` if a database query fails.
 */
#[tauri::command]
pub fn get_message(db: State<'_, Arc<Mutex<Connection>>>) -> Result<Option<Message>> {
    let conn = db.lock().unwrap();
    let mut stmt = conn.prepare("SELECT id, text, x, y FROM messages ORDER BY id DESC LIMIT 1")?;
    let mut rows = stmt.query([])?;
    if let Some(row) = rows.next()? {
        Ok(Some(Message {
            id: row.get(0)?,
            text: row.get(1)?,
            x: row.get(2)?,
            y: row.get(3)?,
        }))
    } else {
        Ok(None)
    }
}

/**
 * Inserts a new message entry into the database.
 *
 * This command is exposed to the frontend via Tauri's IPC mechanism.
 * It creates a new record for the message text and its coordinates.
 *
 * # Arguments
 *
 * * `text` - The text content of the message.
 * * `new_x` - The X coordinate of the message.
 * * `new_y` - The Y coordinate of the message.
 * * `db` - A Tauri `State` managed `Arc<Mutex<Connection>>` to the database connection.
 *
 * # Returns
 *
 * An `Ok(())` on success, or an `Err(AppError::Database)` if the insertion fails.
 */
#[tauri::command]
pub fn update_message(text: String, new_x: f64, new_y: f64, db: State<'_, Arc<Mutex<Connection>>>) -> Result<()> {
    let conn = db.lock().unwrap();
    conn.execute("INSERT INTO messages (text, x, y) VALUES (?1, ?2, ?3)", params![text, new_x, new_y])?;
    Ok(())
}
