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
    let mut stmt = conn.prepare("SELECT id, text FROM messages ORDER BY id DESC LIMIT 1")?;
    let mut rows = stmt.query([])?;
    if let Some(row) = rows.next()? {
        Ok(Some(Message {
            id: row.get(0)?,
            text: row.get(1)?,
        }))
    } else {
        Ok(None)
    }
}

/**
 * Inserts a new message into the database.
 *
 * This command is exposed to the frontend via Tauri's IPC mechanism.
 *
 * # Arguments
 *
 * * `text` - The content of the message to be inserted.
 * * `db` - A Tauri `State` managed `Arc<Mutex<Connection>>` to the database connection.
 *
 * # Returns
 *
 * An `Ok(())` on successful insertion, or an `Err(AppError::Database)` if the insertion fails.
 */
#[tauri::command]
pub fn update_message(text: String, db: State<'_, Arc<Mutex<Connection>>>) -> Result<()> {
    let conn = db.lock().unwrap();
    conn.execute("INSERT INTO messages (text) VALUES (?1)", params![text])?;
    Ok(())
}
