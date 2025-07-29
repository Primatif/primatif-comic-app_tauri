/*!
 * Defines the custom error types and a common Result alias for the application.
 *
 * This module centralizes error handling, providing a consistent way to manage
 * and propagate errors throughout the backend. Errors are designed to be serializable
 * for easy communication with the frontend.
 */

use log::error;
use serde::Serialize;
use thiserror::Error;

/**
 * Represents the various types of errors that can occur within the application.
 *
 * This enum provides a structured way to categorize and handle different error conditions,
 * making debugging and error reporting more consistent.
 */
#[derive(Debug, Error, Serialize)]
pub enum AppError {
    /**
     * An error originating from database operations.
     * Contains a string representation of the underlying `rusqlite::Error`.
     */
    #[error("Database error: {0}")]
    Database(String),

    /**
     * An error indicating invalid input or state.
     * Contains a descriptive string of the validation failure.
     */
    #[error("Validation error: {0}")]
    Validation(String),

    /**
     * An error indicating that a requested resource was not found.
     * Contains a descriptive string of the missing resource.
     */
    #[error("Not found: {0}")]
    NotFound(String),

    /**
     * An error related to file system operations.
     * Contains a string representation of the underlying `std::io::Error`.
     */
    #[error("File system error: {0}")]
    FileSystem(String),
}

impl From<rusqlite::Error> for AppError {
    /**
     * Converts a `rusqlite::Error` into an `AppError::Database`.
     */
    fn from(err: rusqlite::Error) -> Self {
        error!("Database error: {:?}", err);
        AppError::Database(err.to_string())
    }
}

impl From<std::io::Error> for AppError {
    /**
     * Converts a `std::io::Error` into an `AppError::FileSystem`.
     */
    fn from(err: std::io::Error) -> Self {
        error!("File system error: {:?}", err);
        AppError::FileSystem(err.to_string())
    }
}

/**
 * A common `Result` type alias for the application.
 *
 * This simplifies function signatures by providing a shorthand for `std::result::Result<T, AppError>`.
 */
pub type Result<T> = std::result::Result<T, AppError>;
