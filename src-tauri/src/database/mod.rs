use rusqlite::{Connection, Result};
use std::sync::{Arc, Mutex};

/**
 * Manages the application's database connection and schema.
 *
 * This struct is responsible for initializing the database connection and ensuring
 * the required table schema is created on application startup.
 */
pub struct DatabaseManager {
    /// The SQLite database connection, wrapped in an `Arc` and `Mutex` for thread-safe access.
    /// This allows multiple parts of the application to share and interact with the database concurrently.
    connection: Arc<Mutex<Connection>>,
}

impl DatabaseManager {
    /**
     * Creates a new `DatabaseManager` instance and opens a connection to the SQLite database.
     *
     * This function establishes a connection to the specified SQLite database file.
     * It is crucial for setting up the database access layer of the application.
     *
     * # Arguments
     *
     * * `db_path` - The path to the SQLite database file (e.g., `"sqlite.db"`).
     *
     * # Returns
     *
     * An `Ok(DatabaseManager)` on successful connection, or a `rusqlite::Result` error
     * if the connection fails (e.g., due to invalid path or permissions).
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
     * tables and their structure exist in the database. It reads the SQL from `schema.sql`
     * and executes it as a batch.
     *
     * # Returns
     *
     * An `Ok(())` on success, or a `rusqlite::Result` error if schema initialization fails
     * (e.g., due to malformed SQL or database access issues).
     */
    pub fn initialize_schema(&self) -> Result<()> {
        let schema = include_str!("schema.sql");
        self.connection.lock().unwrap().execute_batch(schema)?;
        Ok(())
    }
}
