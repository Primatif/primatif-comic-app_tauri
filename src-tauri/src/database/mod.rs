use rusqlite::{Connection, Result};
use std::sync::{Arc, Mutex};

/**
 * Manages the application's database connection and schema.
 *
 * This struct is responsible for initializing the database connection and ensuring
 * the required table schema is created on application startup.
 */
pub struct DatabaseManager {
    connection: Arc<Mutex<Connection>>,
}

impl DatabaseManager {
    /**
     * Creates a new `DatabaseManager` instance and opens a connection to the SQLite database.
     *
     * # Arguments
     *
     * * `db_path` - The path to the SQLite database file.
     *
     * # Returns
     *
     * An `Ok(DatabaseManager)` on success, or a `rusqlite::Result` error if the connection fails.
     */
    pub fn new(db_path: &str) -> Result<Self> {
        let connection = Connection::open(db_path)?;
        Ok(Self {
            connection: Arc::new(Mutex::new(connection)),
        })
    }

    /**
     * Initializes the database schema by executing the `schema.sql` script.
     *
     * This method should be called once on application startup to ensure the necessary
     * tables exist.
     *
     * # Returns
     *
     * An `Ok(())` on success, or a `rusqlite::Result` error if schema initialization fails.
     */
    pub fn initialize_schema(&self) -> Result<()> {
        let schema = include_str!("schema.sql");
        self.connection.lock().unwrap().execute_batch(schema)?;
        Ok(())
    }
}
